use std::collections::HashMap;
use std::hint::black_box;
use crate::linter::escape_json;

#[derive(Debug, Clone)]
pub struct BenchmarkResult {
    pub operation_name: String,
    pub iterations: usize,
    pub checksum: u64,
}

impl BenchmarkResult {
    pub fn to_json(&self) -> String {
        format!(
            "{{\"engine\":\"rust-wasm\",\"operationName\":\"{}\",\"iterations\":{},\"checksum\":{}}}",
            escape_json(&self.operation_name),
            self.iterations,
            self.checksum
        )
    }
}

/// Runs a 100,000-iteration native Rust WebAssembly stress benchmark tailored to the active quest's algorithm.
/// Uses `std::hint::black_box` so LLVM executes the actual machine instructions inside WebAssembly.
pub fn run_stress_benchmark(level_id: &str) -> BenchmarkResult {
    let iterations: usize = 100_000;
    let mut checksum: u64 = 0;

    let operation_name = if level_id.contains("level-10") || level_id.contains("binary") {
        let vault: [i32; 16] = [4, 8, 10, 15, 16, 20, 23, 30, 42, 50, 60, 70, 81, 90, 99, 108];
        for i in 0..iterations {
            let target = black_box(if i & 1 == 0 { 42 } else { 23 });
            let mut low: usize = 0;
            let mut high: usize = vault.len() - 1;
            while low <= high {
                let mid = (low + high) >> 1;
                let val = unsafe { *vault.get_unchecked(mid) };
                if val == target {
                    checksum = checksum.wrapping_add(mid as u64);
                    break;
                } else if val < target {
                    low = mid + 1;
                } else {
                    if mid == 0 {
                        break;
                    }
                    high = mid - 1;
                }
            }
        }
        "O(log n) Binary Search (100k Vault Lookups)"
    } else if level_id.contains("level-9") || level_id.contains("tome") || level_id.contains("hashmap") {
        let mut map: HashMap<&str, u64> = HashMap::with_capacity(8);
        map.insert("wind", 1);
        map.insert("ice", 2);
        map.insert("earth", 5);
        for i in 0..iterations {
            map.insert(black_box("fire"), black_box((i & 7) as u64 + 3));
            if let Some(&v) = map.get(black_box("ice")) {
                checksum = checksum.wrapping_add(v);
            }
            if let Some(&f) = map.get(black_box("fire")) {
                checksum = checksum.wrapping_add(f);
            }
        }
        "O(1) HashMap Insert & Lookup (100k Ops)"
    } else if level_id.contains("level-8") || level_id.contains("bridge") || level_id.contains("pointer") {
        let span: [u64; 11] = [1, 3, 5, 7, 9, 42, 9, 7, 5, 3, 1];
        for _ in 0..iterations {
            let mut left: usize = 0;
            let mut right: usize = black_box(span.len() - 1);
            while left < right {
                checksum = checksum.wrapping_add(span[left] ^ span[right]);
                left += 1;
                right -= 1;
            }
            checksum = checksum.wrapping_add(span[left]);
        }
        "Two-Pointer Convergence (100k Passes)"
    } else if level_id.contains("level-7") || level_id.contains("pedestal") || level_id.contains("stack") {
        let mut stack: Vec<u64> = Vec::with_capacity(8);
        for i in 0..iterations {
            stack.push(black_box(10));
            stack.push(black_box(20));
            stack.push(black_box((i & 255) as u64));
            if let Some(top) = stack.pop() {
                checksum = checksum.wrapping_add(top);
            }
            stack.clear();
        }
        "LIFO Vec<T> Stack Push/Pop (100k Cycles)"
    } else {
        // Spatial Dungeon Collision & Path Verification
        let tiles: [u8; 8] = [0, 0, 1, 0, 0, 0, 0, 2];
        for i in 0..iterations {
            let mut x: usize = 0;
            let goal: usize = black_box(7);
            while x < goal {
                let next_tile = tiles[(x + 1) & 7];
                if next_tile == 1 {
                    x += 2; // jump over lava
                } else {
                    x += 1; // step
                }
                checksum = checksum.wrapping_add((x ^ (i & 3)) as u64);
            }
        }
        "Spatial Grid Collision & Path Sim (100k Steps)"
    };

    BenchmarkResult {
        operation_name: operation_name.to_string(),
        iterations,
        checksum,
    }
}
