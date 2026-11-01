pub mod benchmark;
pub mod interpreter;
pub mod linter;

use crate::benchmark::run_stress_benchmark;
use crate::interpreter::{execute_rust_code_on_state, GridEntity, SimState};
use crate::linter::{analyze_code, diagnostics_to_json, escape_json};

/// Allocates a buffer of `len` bytes in WASM linear memory for JS host string passing.
#[no_mangle]
pub extern "C" fn wasm_alloc(len: usize) -> *mut u8 {
    let mut buf = Vec::<u8>::with_capacity(len);
    let ptr = buf.as_mut_ptr();
    std::mem::forget(buf);
    ptr
}

/// Deallocates a buffer previously allocated via `wasm_alloc` or returned by WASM functions.
#[no_mangle]
pub unsafe extern "C" fn wasm_dealloc(ptr: *mut u8, len: usize) {
    if !ptr.is_null() && len > 0 {
        let _ = Vec::from_raw_parts(ptr, len, len);
    }
}

fn pack_string_to_u64(s: String) -> u64 {
    let bytes = s.into_bytes().into_boxed_slice();
    let len = bytes.len() as u64;
    let ptr = Box::into_raw(bytes) as *mut u8 as u64;
    (ptr << 32) | len
}

unsafe fn read_input_str<'a>(ptr: *const u8, len: usize) -> &'a str {
    if ptr.is_null() || len == 0 {
        return "";
    }
    let slice = std::slice::from_raw_parts(ptr, len);
    std::str::from_utf8(slice).unwrap_or("")
}

/// Option A: Static Code Quality & Clippy/Ruff Linter in Rust WASM.
/// Input format: `<language>\n<code>`
#[no_mangle]
pub unsafe extern "C" fn analyze_code_wasm(ptr: *const u8, len: usize) -> u64 {
    let input = read_input_str(ptr, len);
    let (lang, code) = match input.find('\n') {
        Some(idx) => (&input[..idx], &input[idx + 1..]),
        None => ("rust", input),
    };
    let diags = analyze_code(code, lang.trim());
    pack_string_to_u64(diagnostics_to_json(&diags))
}

/// Option A: 100,000-iteration native Rust WASM Stress Benchmark.
/// Input format: `<level_id>`
#[no_mangle]
pub unsafe extern "C" fn run_stress_benchmark_wasm(ptr: *const u8, len: usize) -> u64 {
    let level_id = read_input_str(ptr, len);
    let res = run_stress_benchmark(level_id.trim());
    pack_string_to_u64(res.to_json())
}

/// Option B: Playable Rust Track execution + Dungeon Physics + Borrow/Mutability Checker + Benchmark.
/// Envelope format (lines separated by `\n` before `===RAW_CODE===` and `===EXEC_CODE===`):
/// Line 0: `level_id`
/// Line 1: `start_x,start_y,direction,goal_x,goal_y,width,height`
/// Line 2: `tiles` (`row0_col0,row0_col1;row1_col0,row1_col1`)
/// Line 3: `items` (`id,x,y,type;id2,x2,y2,type2`)
/// Marker `===RAW_CODE===` followed by user's raw code
/// Marker `===EXEC_CODE===` followed by prepared Rust code
#[no_mangle]
pub unsafe extern "C" fn execute_rust_quest_wasm(ptr: *const u8, len: usize) -> u64 {
    let input = read_input_str(ptr, len);
    let response = execute_rust_payload(input);
    pack_string_to_u64(response)
}

pub fn execute_rust_payload(input: &str) -> String {
    let (header_part, rest) = match input.split_once("\n===RAW_CODE===\n") {
        Some(parts) => parts,
        None => ("", input),
    };

    let (raw_code, exec_code) = match rest.split_once("\n===EXEC_CODE===\n") {
        Some(parts) => parts,
        None => (rest, rest),
    };

    let mut header_lines = header_part.lines();
    let level_id = header_lines.next().unwrap_or("level-1");
    let coords_line = header_lines.next().unwrap_or("0,0,east,3,0,4,1");
    let tiles_line = header_lines.next().unwrap_or("");
    let items_line = header_lines.next().unwrap_or("");

    let coord_parts: Vec<&str> = coords_line.split(',').collect();
    let start_x = coord_parts.first().and_then(|s| s.parse::<i64>().ok()).unwrap_or(0);
    let start_y = coord_parts.get(1).and_then(|s| s.parse::<i64>().ok()).unwrap_or(0);
    let direction = coord_parts.get(2).copied().unwrap_or("east").to_string();
    let goal_x = coord_parts.get(3).and_then(|s| s.parse::<i64>().ok()).unwrap_or(0);
    let goal_y = coord_parts.get(4).and_then(|s| s.parse::<i64>().ok()).unwrap_or(0);
    let width = coord_parts.get(5).and_then(|s| s.parse::<i64>().ok()).unwrap_or(0);
    let height = coord_parts.get(6).and_then(|s| s.parse::<i64>().ok()).unwrap_or(0);

    let tiles: Vec<Vec<String>> = if tiles_line.trim().is_empty() {
        Vec::new()
    } else {
        tiles_line
            .split(';')
            .map(|row| row.split(',').map(|s| s.trim().to_string()).collect())
            .collect()
    };

    let items: Vec<GridEntity> = if items_line.trim().is_empty() {
        Vec::new()
    } else {
        items_line
            .split(';')
            .filter_map(|entry| {
                let p: Vec<&str> = entry.split(',').collect();
                if p.len() >= 4 {
                    Some(GridEntity {
                        id: p[0].to_string(),
                        x: p[1].parse::<i64>().unwrap_or(0),
                        y: p[2].parse::<i64>().unwrap_or(0),
                        item_type: p[3].to_string(),
                        collected: false,
                    })
                } else {
                    None
                }
            })
            .collect()
    };

    let mut state = SimState::new(
        start_x, start_y, direction, goal_x, goal_y, width, height, tiles, items,
    );

    let diags = analyze_code(raw_code, "rust");
    let bench = run_stress_benchmark(level_id);
    let exec_res = execute_rust_code_on_state(exec_code, &mut state);

    let stdout_json: Vec<String> = state
        .stdout
        .iter()
        .map(|s| format!("\"{}\"", escape_json(s)))
        .collect();

    let inv_json: Vec<String> = state
        .inventory
        .iter()
        .map(|s| format!("\"{}\"", escape_json(s)))
        .collect();

    let reached_goal = state.hazard_hit.is_none() && state.at_goal();

    match exec_res {
        Ok(()) => format!(
            "{{\"success\":true,\"reachedGoal\":{},\"position\":{{\"x\":{},\"y\":{}}},\"direction\":\"{}\",\"inventory\":[{}],\"stepCount\":{},\"output\":[{}],\"steps\":[{}],\"lintDiagnostics\":{},\"wasmBenchmark\":{}}}",
            reached_goal,
            state.x,
            state.y,
            escape_json(&state.direction),
            inv_json.join(","),
            state.step_count,
            stdout_json.join(","),
            state.steps_json.join(","),
            diagnostics_to_json(&diags),
            bench.to_json()
        ),
        Err(err) => {
            // Adjust error line number if prepended lines were added before user code
            let prepended_lines = exec_code.lines().count().saturating_sub(raw_code.lines().count());
            let adjusted_line = if err.line > prepended_lines && prepended_lines < 5 {
                err.line - prepended_lines
            } else {
                err.line.max(1)
            };
            format!(
                "{{\"success\":false,\"reachedGoal\":false,\"position\":{{\"x\":{},\"y\":{}}},\"direction\":\"{}\",\"inventory\":[{}],\"stepCount\":{},\"output\":[{}],\"steps\":[{}],\"lintDiagnostics\":{},\"wasmBenchmark\":{},\"error\":\"{}: {}\",\"errorDetails\":{{\"type\":\"{}\",\"message\":\"{}\",\"line\":{}}}}}",
                state.x,
                state.y,
                escape_json(&state.direction),
                inv_json.join(","),
                state.step_count,
                stdout_json.join(","),
                state.steps_json.join(","),
                diagnostics_to_json(&diags),
                bench.to_json(),
                escape_json(&err.error_type),
                escape_json(&err.message),
                escape_json(&err.error_type),
                escape_json(&err.message),
                adjusted_line
            )
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_option_a_rust_linter_detects_unused_mut_and_bool_comparison() {
        let code = "let mut x = 3;\nif x == 3 == true {\n    step();\n}\n";
        let diags = analyze_code(code, "rust");
        assert!(diags.iter().any(|d| d.code == "unused_mut"));
        assert!(diags.iter().any(|d| d.code == "clippy::bool_comparison"));
    }

    #[test]
    fn test_option_a_stress_benchmark_all_domains() {
        let b10 = run_stress_benchmark("level-10-the-crystal-archives");
        assert_eq!(b10.iterations, 100_000);
        assert!(b10.operation_name.contains("Binary Search"));
        assert!(b10.checksum > 0);

        let b9 = run_stress_benchmark("level-9-the-ancient-tome");
        assert!(b9.operation_name.contains("HashMap"));
        assert!(b9.checksum > 0);
    }

    #[test]
    fn test_option_b_rust_immutability_check_e0384() {
        let payload = "level-1\n0,0,east,3,0,4,1\npath,path,path,chest\n\n===RAW_CODE===\nlet steps = 1;\nsteps = 3;\n===EXEC_CODE===\nlet steps = 1;\nsteps = 3;\n";
        let out = execute_rust_payload(payload);
        assert!(out.contains("\"success\":false"));
        assert!(out.contains("rustc[E0384]"));
        assert!(out.contains("cannot assign twice to immutable variable `steps`"));
    }

    #[test]
    fn test_option_b_worlds_1_to_4_rust_solutions() {
        // Level 1: Variables
        let l1 = "level-1\n0,0,east,3,0,4,1\npath,path,path,chest\n\n===RAW_CODE===\nlet steps: i32 = 3;\n===EXEC_CODE===\nlet steps: i32 = 3;\nfor i in 0..steps {\n    step();\n}\n";
        let res1 = execute_rust_payload(l1);
        assert!(res1.contains("\"reachedGoal\":true"), "Level 1 failed: {}", res1);

        // Level 3: Conditionals & Lava Jump
        let l3 = "level-3\n0,0,east,2,0,3,1\npath,lava,chest\n\n===RAW_CODE===\nif tile == \"lava\" {\n    jump();\n} else {\n    step();\n}\n===EXEC_CODE===\nlet tile = \"lava\";\nif tile == \"lava\" {\n    jump();\n} else {\n    step();\n}\n";
        let res3 = execute_rust_payload(l3);
        assert!(res3.contains("\"reachedGoal\":true"), "Level 3 failed: {}", res3);

        // Level 7: LIFO Stack Vec
        let l7 = "level-7\n0,0,east,1,0,2,1\npath,pedestal\n\n===RAW_CODE===\nlet mut stack = Vec::new();\nstack.push(\"stone\");\nstack.push(\"stone\");\nstack.push(\"stone\");\nlet key = stack.pop();\n===EXEC_CODE===\nlet mut stack = Vec::new();\nstack.push(\"stone\");\nstack.push(\"stone\");\nstack.push(\"stone\");\nlet key = stack.pop();\nif stack.len() == 2 {\n    step();\n}\n";
        let res7 = execute_rust_payload(l7);
        assert!(res7.contains("\"reachedGoal\":true"), "Level 7 failed: {}", res7);

        // Level 9: HashMap
        let l9 = "level-9\n0,0,east,3,0,4,1\npath,stone,door,chest\n\n===RAW_CODE===\nrunes.insert(\"fire\", 3);\nlet power = runes[\"ice\"];\n===EXEC_CODE===\nlet mut runes = HashMap::from([(\"wind\", 1), (\"ice\", 2)]);\nrunes.insert(\"fire\", 3);\nlet power = runes[\"ice\"];\nif runes[\"fire\"] == 3 && power == 2 {\n    for i in 0..3 {\n        step();\n    }\n}\n";
        let res9 = execute_rust_payload(l9);
        assert!(res9.contains("\"reachedGoal\":true"), "Level 9 failed: {}", res9);

        // Level 10: Binary Search
        let l10 = "level-10\n0,0,east,3,0,7,1\nstone,stone,stone,chest,stone,stone,stone\n\n===RAW_CODE===\nlet mut low = 0;\n===EXEC_CODE===\nlet crystals = vec![10, 20, 30, 42, 50, 60, 70];\nlet target = 42;\nlet mut low = 0;\nlet mut high = 6;\nlet mut found_index = -1;\nwhile low <= high {\n    let mid = (low + high) / 2;\n    if crystals[mid] == target {\n        found_index = mid;\n        break;\n    } else if crystals[mid] < target {\n        low = mid + 1;\n    } else {\n        high = mid - 1;\n    }\n}\nif found_index == 3 {\n    for i in 0..3 {\n        step();\n    }\n}\n";
        let res10 = execute_rust_payload(l10);
        assert!(res10.contains("\"reachedGoal\":true"), "Level 10 failed: {}", res10);
    }
}
