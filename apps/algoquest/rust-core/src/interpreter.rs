use std::collections::HashMap;
use crate::linter::escape_json;

#[derive(Debug, Clone, PartialEq)]
pub enum Value {
    Int(i64),
    Bool(bool),
    Str(String),
    List(Vec<Value>),
    Map(HashMap<String, Value>),
    Null,
}

impl Value {
    pub fn as_int(&self) -> i64 {
        match self {
            Value::Int(n) => *n,
            Value::Bool(b) => if *b { 1 } else { 0 },
            Value::Str(s) => s.parse::<i64>().unwrap_or(0),
            _ => 0,
        }
    }

    pub fn as_bool(&self) -> bool {
        match self {
            Value::Bool(b) => *b,
            Value::Int(n) => *n != 0,
            Value::Str(s) => !s.is_empty(),
            Value::List(v) => !v.is_empty(),
            Value::Map(m) => !m.is_empty(),
            Value::Null => false,
        }
    }

    pub fn as_str(&self) -> String {
        match self {
            Value::Str(s) => s.clone(),
            Value::Int(n) => n.to_string(),
            Value::Bool(b) => b.to_string(),
            Value::List(v) => {
                let inner: Vec<String> = v.iter().map(|x| x.as_str()).collect();
                format!("[{}]", inner.join(", "))
            }
            Value::Map(m) => {
                let mut pairs: Vec<String> = m.iter().map(|(k, v)| format!("{}: {}", k, v.as_str())).collect();
                pairs.sort();
                format!("{{{}}}", pairs.join(", "))
            }
            Value::Null => "()".to_string(),
        }
    }
}

#[derive(Debug, Clone)]
pub struct VariableBinding {
    pub value: Value,
    pub mutable: bool,
    pub decl_line: usize,
}

#[derive(Debug, Clone)]
pub struct RuntimeDiagnosticError {
    pub error_type: String,
    pub message: String,
    pub line: usize,
}

#[derive(Debug, Clone)]
pub struct GridEntity {
    pub id: String,
    pub x: i64,
    pub y: i64,
    pub item_type: String,
    pub collected: bool,
}

#[derive(Debug, Clone)]
pub struct SimState {
    pub x: i64,
    pub y: i64,
    pub direction: String,
    pub goal_x: i64,
    pub goal_y: i64,
    pub width: i64,
    pub height: i64,
    pub tiles: Vec<Vec<String>>,
    pub items: Vec<GridEntity>,
    pub inventory: Vec<String>,
    pub stdout: Vec<String>,
    pub steps_json: Vec<String>,
    pub step_count: usize,
    pub hazard_hit: Option<String>,
    pub vars: HashMap<String, VariableBinding>,
    pub loop_ticks: usize,
}

impl SimState {
    pub fn new(
        start_x: i64,
        start_y: i64,
        direction: String,
        goal_x: i64,
        goal_y: i64,
        width: i64,
        height: i64,
        tiles: Vec<Vec<String>>,
        items: Vec<GridEntity>,
    ) -> Self {
        Self {
            x: start_x,
            y: start_y,
            direction,
            goal_x,
            goal_y,
            width,
            height,
            tiles,
            items,
            inventory: Vec::new(),
            stdout: Vec::new(),
            steps_json: Vec::new(),
            step_count: 0,
            hazard_hit: None,
            vars: HashMap::new(),
            loop_ticks: 0,
        }
    }

    fn check_spatial_hazard(&mut self, line: usize) -> Result<(), RuntimeDiagnosticError> {
        if self.width > 0 && self.height > 0 {
            if self.x < 0 || self.y < 0 || self.x >= self.width || self.y >= self.height {
                let msg = format!(
                    "OutOfBoundsError: Hero walked off the dungeon map at ({}, {})!",
                    self.x, self.y
                );
                self.hazard_hit = Some(msg.clone());
                self.steps_json.push(format!(
                    "{{\"type\":\"hazard\",\"timestamp\":0,\"data\":{{\"position\":{{\"x\":{},\"y\":{}}},\"tileType\":\"out_of_bounds\",\"message\":\"{}\"}}}}",
                    self.x, self.y, escape_json(&msg)
                ));
                return Err(RuntimeDiagnosticError {
                    error_type: "OutOfBoundsError".to_string(),
                    message: msg,
                    line,
                });
            }
        }

        if let Some(row) = self.tiles.get(self.y as usize) {
            if let Some(tile) = row.get(self.x as usize) {
                if tile == "lava" {
                    let msg = format!(
                        "HazardError: Hero stepped onto molten lava at ({}, {})! Use jump() to clear lava traps.",
                        self.x, self.y
                    );
                    self.hazard_hit = Some(msg.clone());
                    self.steps_json.push(format!(
                        "{{\"type\":\"hazard\",\"timestamp\":0,\"data\":{{\"position\":{{\"x\":{},\"y\":{}}},\"tileType\":\"lava\",\"message\":\"{}\"}}}}",
                        self.x, self.y, escape_json(&msg)
                    ));
                    return Err(RuntimeDiagnosticError {
                        error_type: "HazardError".to_string(),
                        message: msg,
                        line,
                    });
                } else if tile == "wall" {
                    let msg = format!(
                        "HazardError: Hero collided with a solid stone wall at ({}, {})!",
                        self.x, self.y
                    );
                    self.hazard_hit = Some(msg.clone());
                    self.steps_json.push(format!(
                        "{{\"type\":\"hazard\",\"timestamp\":0,\"data\":{{\"position\":{{\"x\":{},\"y\":{}}},\"tileType\":\"wall\",\"message\":\"{}\"}}}}",
                        self.x, self.y, escape_json(&msg)
                    ));
                    return Err(RuntimeDiagnosticError {
                        error_type: "HazardError".to_string(),
                        message: msg,
                        line,
                    });
                }
            }
        }

        Ok(())
    }

    pub fn do_step(&mut self, dir_override: Option<String>, line: usize) -> Result<(), RuntimeDiagnosticError> {
        let dir = dir_override.unwrap_or_else(|| self.direction.clone());
        match dir.as_str() {
            "north" | "up" => self.y -= 1,
            "south" | "down" => self.y += 1,
            "west" | "left" => self.x -= 1,
            _ => self.x += 1,
        }
        self.step_count += 1;
        self.steps_json.push(format!(
            "{{\"type\":\"step\",\"timestamp\":0,\"data\":{{\"direction\":\"{}\",\"position\":{{\"x\":{},\"y\":{}}}}}}}",
            escape_json(&dir), self.x, self.y
        ));
        self.check_spatial_hazard(line)
    }

    pub fn do_jump(&mut self, line: usize) -> Result<(), RuntimeDiagnosticError> {
        let dir = self.direction.clone();
        match dir.as_str() {
            "north" | "up" => self.y -= 2,
            "south" | "down" => self.y += 2,
            "west" | "left" => self.x -= 2,
            _ => self.x += 2,
        }
        self.step_count += 1;
        self.steps_json.push(format!(
            "{{\"type\":\"jump\",\"timestamp\":0,\"data\":{{\"direction\":\"{}\",\"position\":{{\"x\":{},\"y\":{}}}}}}}",
            escape_json(&dir), self.x, self.y
        ));
        self.check_spatial_hazard(line)
    }

    pub fn do_turn(&mut self, dir_arg: Option<String>) {
        let dirs = ["north", "east", "south", "west"];
        if let Some(d) = dir_arg {
            if d == "left" {
                let idx = dirs.iter().position(|&x| x == self.direction).unwrap_or(1);
                self.direction = dirs[(idx + 3) % 4].to_string();
            } else if d == "right" {
                let idx = dirs.iter().position(|&x| x == self.direction).unwrap_or(1);
                self.direction = dirs[(idx + 1) % 4].to_string();
            } else if dirs.contains(&d.as_str()) {
                self.direction = d;
            }
        } else {
            let idx = dirs.iter().position(|&x| x == self.direction).unwrap_or(1);
            self.direction = dirs[(idx + 1) % 4].to_string();
        }
        self.step_count += 1;
        self.steps_json.push(format!(
            "{{\"type\":\"turn\",\"timestamp\":0,\"data\":{{\"direction\":\"{}\",\"position\":{{\"x\":{},\"y\":{}}}}}}}",
            escape_json(&self.direction), self.x, self.y
        ));
    }

    pub fn do_collect(&mut self, item_arg: Option<String>) {
        let mut collected_type = item_arg.unwrap_or_else(|| "gem".to_string());
        for ent in self.items.iter_mut() {
            if !ent.collected && ent.x == self.x && ent.y == self.y {
                ent.collected = true;
                collected_type = ent.item_type.clone();
                break;
            }
        }
        self.inventory.push(collected_type.clone());
        self.step_count += 1;
        self.steps_json.push(format!(
            "{{\"type\":\"collect\",\"timestamp\":0,\"data\":{{\"item\":\"{}\",\"position\":{{\"x\":{},\"y\":{}}}}}}}",
            escape_json(&collected_type), self.x, self.y
        ));
    }

    pub fn at_goal(&self) -> bool {
        self.x == self.goal_x && self.y == self.goal_y
    }

    fn emit_telemetry_if_needed(&mut self, var_name: &str) {
        if var_name == "stack" {
            if let Some(binding) = self.vars.get("stack") {
                if let Value::List(ref items) = binding.value {
                    let arr: Vec<String> = items
                        .iter()
                        .map(|v| format!("\"{}\"", escape_json(&v.as_str())))
                        .collect();
                    self.steps_json.push(format!(
                        "{{\"type\":\"stack\",\"timestamp\":0,\"data\":{{\"stack\":[{}]}}}}",
                        arr.join(",")
                    ));
                }
            }
        } else if var_name == "left" || var_name == "right" {
            let l = self.vars.get("left").map(|b| b.value.as_int());
            let r = self.vars.get("right").map(|b| b.value.as_int());
            if let (Some(left), Some(right)) = (l, r) {
                self.steps_json.push(format!(
                    "{{\"type\":\"pointer\",\"timestamp\":0,\"data\":{{\"pointers\":{{\"left\":{},\"right\":{}}}}}}}",
                    left, right
                ));
            }
        } else if var_name == "mid" || var_name == "low" || var_name == "high" {
            let low = self.vars.get("low").map(|b| b.value.as_int());
            let high = self.vars.get("high").map(|b| b.value.as_int());
            let mid = self.vars.get("mid").map(|b| b.value.as_int());
            if let (Some(l), Some(h)) = (low, high) {
                let m_str = mid.map(|m| format!(",\"mid\":{}", m)).unwrap_or_default();
                self.steps_json.push(format!(
                    "{{\"type\":\"binary_search\",\"timestamp\":0,\"data\":{{\"pointers\":{{\"left\":{},\"right\":{}{}}}}}}}",
                    l, h, m_str
                ));
            }
        } else if var_name == "runes" {
            if let Some(binding) = self.vars.get("runes") {
                if let Value::Map(ref map) = binding.value {
                    let mut entries: Vec<String> = map
                        .iter()
                        .map(|(k, v)| match v {
                            Value::Int(n) => format!("\"{}\":{}", escape_json(k), n),
                            _ => format!("\"{}\":\"{}\"", escape_json(k), escape_json(&v.as_str())),
                        })
                        .collect();
                    entries.sort();
                    self.steps_json.push(format!(
                        "{{\"type\":\"hashmap\",\"timestamp\":0,\"data\":{{\"hashmap\":{{{}}}}}}}",
                        entries.join(",")
                    ));
                }
            }
        }
    }
}

#[derive(Debug, Clone)]
enum Stmt {
    Let {
        name: String,
        mutable: bool,
        expr: String,
        line: usize,
    },
    Assign {
        target: String,
        op: String, // "=", "+=", "-="
        expr: String,
        line: usize,
    },
    IndexAssign {
        var_name: String,
        index_expr: String,
        val_expr: String,
        line: usize,
    },
    MethodCall {
        var_name: String,
        method: String,
        args: Vec<String>,
        line: usize,
    },
    FuncCall {
        name: String,
        args: Vec<String>,
        line: usize,
    },
    If {
        branches: Vec<(Option<String>, Vec<Stmt>)>, // (Some(cond) or None for else, body)
        line: usize,
    },
    While {
        cond: String,
        body: Vec<Stmt>,
        line: usize,
    },
    ForRange {
        var_name: String,
        start_expr: String,
        end_expr: String,
        inclusive: bool,
        body: Vec<Stmt>,
        line: usize,
    },
    Break,
}

enum ExecSignal {
    Normal,
    Break,
}

fn strip_comment(line: &str) -> &str {
    let mut in_quotes = false;
    let bytes = line.as_bytes();
    let mut i = 0;
    while i < bytes.len() {
        if bytes[i] == b'"' && (i == 0 || bytes[i - 1] != b'\\') {
            in_quotes = !in_quotes;
        } else if !in_quotes && i + 1 < bytes.len() && bytes[i] == b'/' && bytes[i + 1] == b'/' {
            return &line[..i];
        }
        i += 1;
    }
    line
}

/// Splits source into logical lines with line numbers, handling brace blocks.
fn parse_statements(lines: &[&str], idx: &mut usize) -> Result<Vec<Stmt>, RuntimeDiagnosticError> {
    let mut stmts = Vec::new();

    while *idx < lines.len() {
        let line_num = *idx + 1;
        let raw = strip_comment(lines[*idx]).trim();
        *idx += 1;

        if raw.is_empty() || raw.starts_with("use ") || raw.starts_with("#[") {
            continue;
        }

        // Ignore outer `fn main() {` wrapper if user writes it
        if raw.starts_with("fn main") && raw.ends_with('{') {
            continue;
        }

        if raw == "}" || raw == "};" || raw.starts_with('}') {
            break;
        }

        // Check for `if `
        if raw.starts_with("if ") {
            let mut branches = Vec::new();
            let cond = raw
                .strip_prefix("if ")
                .unwrap_or("")
                .trim_end_matches('{')
                .trim()
                .to_string();
            let body = parse_statements(lines, idx)?;
            branches.push((Some(cond), body));

            // Check if the line that closed the block or next lines have `else if` / `else`
            loop {
                // Check previous closing line if it had `} else`
                let prev_line = if *idx > 0 {
                    strip_comment(lines[*idx - 1]).trim()
                } else {
                    ""
                };

                let else_part = if prev_line.starts_with('}') && prev_line.contains("else") {
                    Some(prev_line.trim_start_matches('}').trim())
                } else if *idx < lines.len() {
                    let peek = strip_comment(lines[*idx]).trim();
                    if peek.starts_with("else") {
                        *idx += 1;
                        Some(peek)
                    } else {
                        None
                    }
                } else {
                    None
                };

                if let Some(ep) = else_part {
                    if let Some(elif_rest) = ep.strip_prefix("else if ") {
                        let c = elif_rest.trim_end_matches('{').trim().to_string();
                        let b = parse_statements(lines, idx)?;
                        branches.push((Some(c), b));
                    } else if ep.starts_with("else") {
                        let b = parse_statements(lines, idx)?;
                        branches.push((None, b));
                        break;
                    } else {
                        break;
                    }
                } else {
                    break;
                }
            }

            stmts.push(Stmt::If {
                branches,
                line: line_num,
            });
            continue;
        }

        // Check for `while `
        if let Some(rest) = raw.strip_prefix("while ") {
            let cond = rest.trim_end_matches('{').trim().to_string();
            let body = parse_statements(lines, idx)?;
            stmts.push(Stmt::While {
                cond,
                body,
                line: line_num,
            });
            continue;
        }

        // Check for `for <var> in <start>..<end> {`
        if let Some(rest) = raw.strip_prefix("for ") {
            let header = rest.trim_end_matches('{').trim();
            if let Some(in_pos) = header.find(" in ") {
                let var_name = header[..in_pos].trim().to_string();
                let range_str = header[in_pos + 4..].trim();
                let (start_expr, end_expr, inclusive) = if let Some(eq_pos) = range_str.find("..=") {
                    (
                        range_str[..eq_pos].trim().to_string(),
                        range_str[eq_pos + 3..].trim().to_string(),
                        true,
                    )
                } else if let Some(dot_pos) = range_str.find("..") {
                    (
                        range_str[..dot_pos].trim().to_string(),
                        range_str[dot_pos + 2..].trim().to_string(),
                        false,
                    )
                } else {
                    ("0".to_string(), range_str.to_string(), false)
                };
                let body = parse_statements(lines, idx)?;
                stmts.push(Stmt::ForRange {
                    var_name,
                    start_expr,
                    end_expr,
                    inclusive,
                    body,
                    line: line_num,
                });
                continue;
            }
        }

        // Handle multiple semicolon-separated statements on a single line if no braces
        let stmt_str = raw.trim_end_matches(';').trim();
        if stmt_str.is_empty() {
            continue;
        }

        if stmt_str == "break" {
            stmts.push(Stmt::Break);
            continue;
        }

        // `let mut x: T = expr` or `let x = expr`
        if let Some(rest) = stmt_str.strip_prefix("let ") {
            let (mutable, after_let) = if let Some(r) = rest.strip_prefix("mut ") {
                (true, r.trim())
            } else {
                (false, rest.trim())
            };

            if let Some(eq_pos) = after_let.find('=') {
                let lhs = after_let[..eq_pos].trim();
                let expr = after_let[eq_pos + 1..].trim().to_string();
                let name = match lhs.find(':') {
                    Some(colon) => lhs[..colon].trim().to_string(),
                    None => lhs.to_string(),
                };
                stmts.push(Stmt::Let {
                    name,
                    mutable,
                    expr,
                    line: line_num,
                });
                continue;
            }
        }

        // Index assignment: `runes["fire"] = 3` or `items[0] = "gem"`
        if let Some(bracket_open) = stmt_str.find('[') {
            if let Some(bracket_close) = stmt_str.find(']') {
                if bracket_open < bracket_close {
                    let after_bracket = stmt_str[bracket_close + 1..].trim();
                    if let Some(val_str) = after_bracket.strip_prefix('=') {
                        if !val_str.starts_with('=') {
                            let var_name = stmt_str[..bracket_open].trim().to_string();
                            let index_expr = stmt_str[bracket_open + 1..bracket_close].trim().to_string();
                            stmts.push(Stmt::IndexAssign {
                                var_name,
                                index_expr,
                                val_expr: val_str.trim().to_string(),
                                line: line_num,
                            });
                            continue;
                        }
                    }
                }
            }
        }

        // Compound assignment `+=`, `-=`
        if let Some(pos) = stmt_str.find("+=") {
            let target = stmt_str[..pos].trim().to_string();
            let expr = stmt_str[pos + 2..].trim().to_string();
            stmts.push(Stmt::Assign {
                target,
                op: "+=".to_string(),
                expr,
                line: line_num,
            });
            continue;
        }
        if let Some(pos) = stmt_str.find("-=") {
            let target = stmt_str[..pos].trim().to_string();
            let expr = stmt_str[pos + 2..].trim().to_string();
            stmts.push(Stmt::Assign {
                target,
                op: "-=".to_string(),
                expr,
                line: line_num,
            });
            continue;
        }

        // Method call: `stack.push("stone")`, `runes.insert("fire", 3)`
        if let Some(dot_pos) = stmt_str.find('.') {
            let before_dot = stmt_str[..dot_pos].trim();
            if before_dot.chars().all(|c| c.is_alphanumeric() || c == '_') && !before_dot.is_empty() {
                let after_dot = stmt_str[dot_pos + 1..].trim();
                if let Some(paren_open) = after_dot.find('(') {
                    if after_dot.ends_with(')') {
                        let method = after_dot[..paren_open].trim().to_string();
                        let args_str = &after_dot[paren_open + 1..after_dot.len() - 1];
                        let args = split_args(args_str);
                        stmts.push(Stmt::MethodCall {
                            var_name: before_dot.to_string(),
                            method,
                            args,
                            line: line_num,
                        });
                        continue;
                    }
                }
            }
        }

        // Standard assignment: `x = expr`
        if let Some(eq_pos) = find_single_equals(stmt_str) {
            let target = stmt_str[..eq_pos].trim().to_string();
            let expr = stmt_str[eq_pos + 1..].trim().to_string();
            stmts.push(Stmt::Assign {
                target,
                op: "=".to_string(),
                expr,
                line: line_num,
            });
            continue;
        }

        // Function or macro call: `step()`, `jump()`, `println!(...)`
        if let Some(paren_open) = stmt_str.find('(') {
            if stmt_str.ends_with(')') {
                let name = stmt_str[..paren_open].trim().to_string();
                let args_str = &stmt_str[paren_open + 1..stmt_str.len() - 1];
                let args = split_args(args_str);
                stmts.push(Stmt::FuncCall {
                    name,
                    args,
                    line: line_num,
                });
                continue;
            }
        }

        return Err(RuntimeDiagnosticError {
            error_type: "rustc[SyntaxError]".to_string(),
            message: format!("expected expression or statement, found `{}`", stmt_str),
            line: line_num,
        });
    }

    Ok(stmts)
}

fn find_single_equals(s: &str) -> Option<usize> {
    let bytes = s.as_bytes();
    let mut in_quotes = false;
    for i in 0..bytes.len() {
        if bytes[i] == b'"' && (i == 0 || bytes[i - 1] != b'\\') {
            in_quotes = !in_quotes;
        } else if !in_quotes && bytes[i] == b'=' {
            let prev = if i > 0 { bytes[i - 1] } else { 0 };
            let next = if i + 1 < bytes.len() { bytes[i + 1] } else { 0 };
            if prev != b'=' && prev != b'!' && prev != b'<' && prev != b'>' && prev != b'+' && prev != b'-' && next != b'=' {
                return Some(i);
            }
        }
    }
    None
}

fn split_args(s: &str) -> Vec<String> {
    let trimmed = s.trim();
    if trimmed.is_empty() {
        return Vec::new();
    }
    let mut out = Vec::new();
    let mut current = String::new();
    let mut in_quotes = false;
    let mut depth = 0i32;

    for c in trimmed.chars() {
        if c == '"' {
            in_quotes = !in_quotes;
            current.push(c);
        } else if !in_quotes {
            if c == '(' || c == '[' {
                depth += 1;
                current.push(c);
            } else if c == ')' || c == ']' {
                depth -= 1;
                current.push(c);
            } else if c == ',' && depth == 0 {
                out.push(current.trim().to_string());
                current.clear();
            } else {
                current.push(c);
            }
        } else {
            current.push(c);
        }
    }
    if !current.trim().is_empty() {
        out.push(current.trim().to_string());
    }
    out
}

fn eval_expr(expr_raw: &str, state: &mut SimState, line: usize) -> Result<Value, RuntimeDiagnosticError> {
    let mut expr = expr_raw.trim();

    // Strip common Rust suffixes like `.unwrap()`, `.unwrap_or(...)`, `.cloned()`, `.to_string()`, `as usize`, `as i32`, `&`
    if let Some(stripped) = expr.strip_suffix(".unwrap()") {
        expr = stripped.trim();
    }
    if let Some(stripped) = expr.strip_suffix(".to_string()") {
        expr = stripped.trim();
    }
    if let Some(stripped) = expr.strip_suffix(".clone()") {
        expr = stripped.trim();
    }
    for cast_suffix in [" as usize", " as i32", " as i64", " as isize"] {
        if let Some(stripped) = expr.strip_suffix(cast_suffix) {
            expr = stripped.trim();
        }
    }
    if let Some(stripped) = expr.strip_prefix('&') {
        if !stripped.starts_with('&') {
            expr = stripped.trim();
        }
    }

    // Strip outer balanced parens
    while expr.starts_with('(') && expr.ends_with(')') && is_balanced_outer_parens(expr) {
        expr = expr[1..expr.len() - 1].trim();
    }

    // Logical OR `||`
    if let Some((lhs, rhs)) = split_binary_op(expr, "||") {
        let l = eval_expr(lhs, state, line)?.as_bool();
        if l {
            return Ok(Value::Bool(true));
        }
        let r = eval_expr(rhs, state, line)?.as_bool();
        return Ok(Value::Bool(r));
    }

    // Logical AND `&&`
    if let Some((lhs, rhs)) = split_binary_op(expr, "&&") {
        let l = eval_expr(lhs, state, line)?.as_bool();
        if !l {
            return Ok(Value::Bool(false));
        }
        let r = eval_expr(rhs, state, line)?.as_bool();
        return Ok(Value::Bool(r));
    }

    // Comparisons: `==`, `!=`, `<=`, `>=`, `<`, `>`
    for op in ["==", "!=", "<=", ">=", "<", ">"] {
        if let Some((lhs, rhs)) = split_binary_op(expr, op) {
            let l = eval_expr(lhs, state, line)?;
            let r = eval_expr(rhs, state, line)?;
            let res = match op {
                "==" => l == r,
                "!=" => l != r,
                "<=" => l.as_int() <= r.as_int(),
                ">=" => l.as_int() >= r.as_int(),
                "<" => l.as_int() < r.as_int(),
                ">" => l.as_int() > r.as_int(),
                _ => false,
            };
            return Ok(Value::Bool(res));
        }
    }

    // Unary `!`
    if let Some(rest) = expr.strip_prefix('!') {
        if !rest.starts_with('=') {
            let v = eval_expr(rest, state, line)?;
            return Ok(Value::Bool(!v.as_bool()));
        }
    }

    // Addition / Subtraction (`+`, `-`)
    if let Some((lhs, rhs)) = split_add_sub(expr, '+') {
        let l = eval_expr(lhs, state, line)?;
        let r = eval_expr(rhs, state, line)?;
        return Ok(Value::Int(l.as_int() + r.as_int()));
    }
    if let Some((lhs, rhs)) = split_add_sub(expr, '-') {
        if !lhs.trim().is_empty() {
            let l = eval_expr(lhs, state, line)?;
            let r = eval_expr(rhs, state, line)?;
            return Ok(Value::Int(l.as_int() - r.as_int()));
        }
    }

    // Multiplication / Division (`*`, `/`)
    if let Some((lhs, rhs)) = split_binary_op(expr, "*") {
        let l = eval_expr(lhs, state, line)?.as_int();
        let r = eval_expr(rhs, state, line)?.as_int();
        return Ok(Value::Int(l * r));
    }
    if let Some((lhs, rhs)) = split_binary_op(expr, "/") {
        let l = eval_expr(lhs, state, line)?.as_int();
        let r = eval_expr(rhs, state, line)?.as_int();
        if r == 0 {
            return Err(RuntimeDiagnosticError {
                error_type: "PanicError".to_string(),
                message: "attempt to divide by zero".to_string(),
                line,
            });
        }
        return Ok(Value::Int(l / r));
    }

    // Literals: boolean, integer, string
    if expr == "true" {
        return Ok(Value::Bool(true));
    }
    if expr == "false" {
        return Ok(Value::Bool(false));
    }
    if let Ok(n) = expr.parse::<i64>() {
        return Ok(Value::Int(n));
    }
    if expr.starts_with('"') && expr.ends_with('"') && expr.len() >= 2 {
        return Ok(Value::Str(expr[1..expr.len() - 1].to_string()));
    }

    // Empty Vec constructors: `Vec::new()`, `vec![]`, `[]`
    if expr == "Vec::new()" || expr == "vec![]" || expr == "[]" {
        return Ok(Value::List(Vec::new()));
    }
    if let Some(inner) = expr.strip_prefix("vec![").and_then(|s| s.strip_suffix(']')) {
        let parts = split_args(inner);
        let mut items = Vec::new();
        for p in parts {
            items.push(eval_expr(&p, state, line)?);
        }
        return Ok(Value::List(items));
    }
    if expr.starts_with('[') && expr.ends_with(']') {
        let inner = &expr[1..expr.len() - 1];
        let parts = split_args(inner);
        let mut items = Vec::new();
        for p in parts {
            items.push(eval_expr(&p, state, line)?);
        }
        return Ok(Value::List(items));
    }

    // HashMap::new() or HashMap::from([...])
    if expr == "HashMap::new()" {
        return Ok(Value::Map(HashMap::new()));
    }
    if let Some(inner) = expr
        .strip_prefix("HashMap::from([")
        .and_then(|s| s.strip_suffix("])"))
    {
        let tuples = split_args(inner);
        let mut map = HashMap::new();
        for t in tuples {
            let trimmed = t.trim().trim_start_matches('(').trim_end_matches(')');
            let kv = split_args(trimmed);
            if kv.len() == 2 {
                let k = eval_expr(&kv[0], state, line)?.as_str();
                let v = eval_expr(&kv[1], state, line)?;
                map.insert(k, v);
            }
        }
        return Ok(Value::Map(map));
    }

    // Built-in functions: `at_goal()`
    if expr == "at_goal()" {
        return Ok(Value::Bool(state.at_goal()));
    }

    // Method expressions on variables: `stack.pop()`, `stack.len()`, `runes.get("ice")`
    if let Some(dot_pos) = expr.find('.') {
        let var_name = expr[..dot_pos].trim();
        let after_dot = expr[dot_pos + 1..].trim();
        if let Some(paren_open) = after_dot.find('(') {
            if after_dot.ends_with(')') {
                let method = after_dot[..paren_open].trim();
                let args_str = &after_dot[paren_open + 1..after_dot.len() - 1];
                let args = split_args(args_str);
                return eval_method_call(var_name, method, &args, state, line);
            }
        }
    }

    // Indexing expression: `items[0]`, `crystals[mid]`, `runes["ice"]`
    if let Some(bracket_open) = expr.find('[') {
        if expr.ends_with(']') && bracket_open > 0 {
            let var_name = expr[..bracket_open].trim();
            let idx_expr = &expr[bracket_open + 1..expr.len() - 1];
            let idx_val = eval_expr(idx_expr, state, line)?;

            if let Some(binding) = state.vars.get(var_name).cloned() {
                match binding.value {
                    Value::List(list) => {
                        let i = idx_val.as_int();
                        if i < 0 || (i as usize) >= list.len() {
                            return Err(RuntimeDiagnosticError {
                                error_type: "PanicError".to_string(),
                                message: format!(
                                    "index out of bounds: the len is {} but the index is {}",
                                    list.len(),
                                    i
                                ),
                                line,
                            });
                        }
                        if var_name == "items" {
                            state.steps_json.push(format!(
                                "{{\"type\":\"array\",\"timestamp\":0,\"data\":{{\"accessedIndex\":{}}}}}",
                                i
                            ));
                        }
                        return Ok(list[i as usize].clone());
                    }
                    Value::Map(map) => {
                        let k = idx_val.as_str();
                        if let Some(v) = map.get(&k) {
                            return Ok(v.clone());
                        } else {
                            return Err(RuntimeDiagnosticError {
                                error_type: "PanicError".to_string(),
                                message: format!("no entry found for key `{}`", k),
                                line,
                            });
                        }
                    }
                    _ => {}
                }
            }
        }
    }

    // Variable lookup
    if let Some(binding) = state.vars.get(expr) {
        return Ok(binding.value.clone());
    }

    Err(RuntimeDiagnosticError {
        error_type: "rustc[E0425]".to_string(),
        message: format!("cannot find value `{}` in this scope", expr),
        line,
    })
}

fn eval_method_call(
    var_name: &str,
    method: &str,
    args: &[String],
    state: &mut SimState,
    line: usize,
) -> Result<Value, RuntimeDiagnosticError> {
    let mut evaluated_args = Vec::new();
    for a in args {
        evaluated_args.push(eval_expr(a, state, line)?);
    }

    let binding = state.vars.get(var_name).cloned().ok_or_else(|| RuntimeDiagnosticError {
        error_type: "rustc[E0425]".to_string(),
        message: format!("cannot find value `{}` in this scope", var_name),
        line,
    })?;

    match method {
        "len" => match &binding.value {
            Value::List(v) => Ok(Value::Int(v.len() as i64)),
            Value::Map(m) => Ok(Value::Int(m.len() as i64)),
            Value::Str(s) => Ok(Value::Int(s.len() as i64)),
            _ => Ok(Value::Int(0)),
        },
        "get" => {
            if let Some(arg0) = evaluated_args.first() {
                match &binding.value {
                    Value::Map(m) => Ok(m.get(&arg0.as_str()).cloned().unwrap_or(Value::Null)),
                    Value::List(v) => {
                        let i = arg0.as_int();
                        if i >= 0 && (i as usize) < v.len() {
                            if var_name == "items" {
                                state.steps_json.push(format!(
                                    "{{\"type\":\"array\",\"timestamp\":0,\"data\":{{\"accessedIndex\":{}}}}}",
                                    i
                                ));
                            }
                            Ok(v[i as usize].clone())
                        } else {
                            Ok(Value::Null)
                        }
                    }
                    _ => Ok(Value::Null),
                }
            } else {
                Ok(Value::Null)
            }
        }
        "push" => {
            if !binding.mutable {
                return Err(RuntimeDiagnosticError {
                    error_type: "rustc[E0596]".to_string(),
                    message: format!(
                        "cannot borrow `{}` as mutable, as it is not declared as mutable (help: consider changing this to be mutable: `let mut {}`)",
                        var_name, var_name
                    ),
                    line,
                });
            }
            if let Some(val) = evaluated_args.first() {
                if let Some(b) = state.vars.get_mut(var_name) {
                    if let Value::List(ref mut list) = b.value {
                        list.push(val.clone());
                    }
                }
                state.step_count += 1;
                state.emit_telemetry_if_needed(var_name);
            }
            Ok(Value::Null)
        }
        "pop" => {
            if !binding.mutable {
                return Err(RuntimeDiagnosticError {
                    error_type: "rustc[E0596]".to_string(),
                    message: format!(
                        "cannot borrow `{}` as mutable, as it is not declared as mutable (help: consider changing this to be mutable: `let mut {}`)",
                        var_name, var_name
                    ),
                    line,
                });
            }
            let mut popped = Value::Null;
            if let Some(b) = state.vars.get_mut(var_name) {
                if let Value::List(ref mut list) = b.value {
                    popped = list.pop().unwrap_or(Value::Null);
                }
            }
            state.step_count += 1;
            state.emit_telemetry_if_needed(var_name);
            Ok(popped)
        }
        "insert" => {
            if !binding.mutable {
                return Err(RuntimeDiagnosticError {
                    error_type: "rustc[E0596]".to_string(),
                    message: format!(
                        "cannot borrow `{}` as mutable, as it is not declared as mutable (help: consider changing this to be mutable: `let mut {}`)",
                        var_name, var_name
                    ),
                    line,
                });
            }
            if evaluated_args.len() >= 2 {
                let k = evaluated_args[0].as_str();
                let v = evaluated_args[1].clone();
                if let Some(b) = state.vars.get_mut(var_name) {
                    if let Value::Map(ref mut map) = b.value {
                        map.insert(k, v);
                    }
                }
                state.step_count += 1;
                state.emit_telemetry_if_needed(var_name);
            }
            Ok(Value::Null)
        }
        _ => Err(RuntimeDiagnosticError {
            error_type: "rustc[E0599]".to_string(),
            message: format!("no method named `{}` found for variable `{}`", method, var_name),
            line,
        }),
    }
}

fn is_balanced_outer_parens(s: &str) -> bool {
    let mut depth = 0i32;
    let mut in_quotes = false;
    let chars: Vec<char> = s.chars().collect();
    for (i, &c) in chars.iter().enumerate() {
        if c == '"' {
            in_quotes = !in_quotes;
        } else if !in_quotes {
            if c == '(' {
                depth += 1;
            } else if c == ')' {
                depth -= 1;
                if depth == 0 && i < chars.len() - 1 {
                    return false;
                }
            }
        }
    }
    depth == 0
}

fn split_binary_op<'a>(expr: &'a str, op: &str) -> Option<(&'a str, &'a str)> {
    let bytes = expr.as_bytes();
    let op_bytes = op.as_bytes();
    let mut in_quotes = false;
    let mut depth = 0i32;

    let mut i = 0;
    while i + op_bytes.len() <= bytes.len() {
        let b = bytes[i];
        if b == b'"' && (i == 0 || bytes[i - 1] != b'\\') {
            in_quotes = !in_quotes;
        } else if !in_quotes {
            if b == b'(' || b == b'[' {
                depth += 1;
            } else if b == b')' || b == b']' {
                depth -= 1;
            } else if depth == 0 && &bytes[i..i + op_bytes.len()] == op_bytes {
                // Prevent `<` matching `<=` or `>` matching `>=`
                if (op == "<" || op == ">") && i + 1 < bytes.len() && bytes[i + 1] == b'=' {
                    i += 2;
                    continue;
                }
                return Some((&expr[..i], &expr[i + op_bytes.len()..]));
            }
        }
        i += 1;
    }
    None
}

fn split_add_sub(expr: &str, target_op: char) -> Option<(&str, &str)> {
    let bytes = expr.as_bytes();
    let mut in_quotes = false;
    let mut depth = 0i32;
    let mut last_match = None;

    for i in 0..bytes.len() {
        let b = bytes[i];
        if b == b'"' && (i == 0 || bytes[i - 1] != b'\\') {
            in_quotes = !in_quotes;
        } else if !in_quotes {
            if b == b'(' || b == b'[' {
                depth += 1;
            } else if b == b')' || b == b']' {
                depth -= 1;
            } else if depth == 0 && b == (target_op as u8) && i > 0 {
                last_match = Some(i);
            }
        }
    }

    last_match.map(|idx| (&expr[..idx], &expr[idx + 1..]))
}

fn execute_block(stmts: &[Stmt], state: &mut SimState) -> Result<ExecSignal, RuntimeDiagnosticError> {
    for stmt in stmts {
        state.loop_ticks += 1;
        if state.loop_ticks > 2000 {
            return Err(RuntimeDiagnosticError {
                error_type: "TimeoutError".to_string(),
                message: "Execution exceeded 2,000 loop steps (possible infinite loop in Rust code).".to_string(),
                line: 1,
            });
        }

        match stmt {
            Stmt::Break => return Ok(ExecSignal::Break),
            Stmt::Let {
                name,
                mutable,
                expr,
                line,
            } => {
                let val = eval_expr(expr, state, *line)?;
                state.vars.insert(
                    name.clone(),
                    VariableBinding {
                        value: val,
                        mutable: *mutable,
                        decl_line: *line,
                    },
                );
                state.emit_telemetry_if_needed(name);
            }
            Stmt::Assign {
                target,
                op,
                expr,
                line,
            } => {
                let rhs = eval_expr(expr, state, *line)?;
                let existing = state.vars.get(target).cloned().ok_or_else(|| RuntimeDiagnosticError {
                    error_type: "rustc[E0425]".to_string(),
                    message: format!("cannot find value `{}` in this scope (help: declare with `let` or `let mut`)", target),
                    line: *line,
                })?;

                if !existing.mutable {
                    return Err(RuntimeDiagnosticError {
                        error_type: "rustc[E0384]".to_string(),
                        message: format!(
                            "cannot assign twice to immutable variable `{}` (first assigned on line {}; help: consider making this binding mutable: `let mut {}`)",
                            target, existing.decl_line, target
                        ),
                        line: *line,
                    });
                }

                let new_val = match op.as_str() {
                    "+=" => Value::Int(existing.value.as_int() + rhs.as_int()),
                    "-=" => Value::Int(existing.value.as_int() - rhs.as_int()),
                    _ => rhs,
                };

                if let Some(b) = state.vars.get_mut(target) {
                    b.value = new_val;
                }
                if target == "left" || target == "right" || target == "mid" {
                    state.step_count += 1;
                }
                state.emit_telemetry_if_needed(target);
            }
            Stmt::IndexAssign {
                var_name,
                index_expr,
                val_expr,
                line,
            } => {
                let idx_val = eval_expr(index_expr, state, *line)?;
                let val = eval_expr(val_expr, state, *line)?;
                let existing = state.vars.get(var_name).cloned().ok_or_else(|| RuntimeDiagnosticError {
                    error_type: "rustc[E0425]".to_string(),
                    message: format!("cannot find value `{}` in this scope", var_name),
                    line: *line,
                })?;

                if !existing.mutable {
                    return Err(RuntimeDiagnosticError {
                        error_type: "rustc[E0596]".to_string(),
                        message: format!(
                            "cannot borrow `{}` as mutable, as it is not declared as mutable (help: consider changing this to `let mut {}`)",
                            var_name, var_name
                        ),
                        line: *line,
                    });
                }

                if let Some(b) = state.vars.get_mut(var_name) {
                    match b.value {
                        Value::Map(ref mut m) => {
                            m.insert(idx_val.as_str(), val);
                        }
                        Value::List(ref mut list) => {
                            let i = idx_val.as_int();
                            if i >= 0 && (i as usize) < list.len() {
                                list[i as usize] = val;
                            }
                        }
                        _ => {}
                    }
                }
                state.step_count += 1;
                state.emit_telemetry_if_needed(var_name);
            }
            Stmt::MethodCall {
                var_name,
                method,
                args,
                line,
            } => {
                let _ = eval_method_call(var_name, method, args, state, *line)?;
            }
            Stmt::FuncCall { name, args, line } => {
                let mut eval_args = Vec::new();
                for a in args {
                    eval_args.push(eval_expr(a, state, *line)?);
                }
                match name.as_str() {
                    "step" => {
                        let dir = eval_args.first().map(|v| v.as_str());
                        state.do_step(dir, *line)?;
                    }
                    "jump" => {
                        state.do_jump(*line)?;
                    }
                    "turn" => {
                        let dir = eval_args.first().map(|v| v.as_str());
                        state.do_turn(dir);
                    }
                    "collect" => {
                        let item = eval_args.first().map(|v| v.as_str());
                        state.do_collect(item);
                    }
                    "println!" | "print!" => {
                        if eval_args.is_empty() {
                            state.stdout.push(String::new());
                        } else {
                            let fmt_str = eval_args[0].as_str();
                            let mut formatted = fmt_str.clone();
                            for arg in eval_args.iter().skip(1) {
                                if let Some(pos) = formatted.find("{}") {
                                    formatted.replace_range(pos..pos + 2, &arg.as_str());
                                } else if let Some(pos) = formatted.find("{:?}") {
                                    formatted.replace_range(pos..pos + 4, &arg.as_str());
                                }
                            }
                            if state.stdout.len() < 200 {
                                state.stdout.push(formatted);
                            }
                        }
                    }
                    _ => {
                        return Err(RuntimeDiagnosticError {
                            error_type: "rustc[E0425]".to_string(),
                            message: format!("cannot find function `{}` in this scope", name),
                            line: *line,
                        });
                    }
                }
            }
            Stmt::If { branches, line } => {
                for (cond_opt, body) in branches {
                    let should_run = match cond_opt {
                        Some(c) => eval_expr(c, state, *line)?.as_bool(),
                        None => true,
                    };
                    if should_run {
                        if let ExecSignal::Break = execute_block(body, state)? {
                            return Ok(ExecSignal::Break);
                        }
                        break;
                    }
                }
            }
            Stmt::While { cond, body, line } => {
                while eval_expr(cond, state, *line)?.as_bool() {
                    state.loop_ticks += 1;
                    if state.loop_ticks > 2000 {
                        return Err(RuntimeDiagnosticError {
                            error_type: "TimeoutError".to_string(),
                            message: "Infinite `while` loop detected in Rust code (exceeded 2,000 iterations).".to_string(),
                            line: *line,
                        });
                    }
                    if let ExecSignal::Break = execute_block(body, state)? {
                        break;
                    }
                }
            }
            Stmt::ForRange {
                var_name,
                start_expr,
                end_expr,
                inclusive,
                body,
                line,
            } => {
                let start = eval_expr(start_expr, state, *line)?.as_int();
                let end = eval_expr(end_expr, state, *line)?.as_int();
                let limit = if *inclusive { end + 1 } else { end };

                for i in start..limit {
                    state.vars.insert(
                        var_name.clone(),
                        VariableBinding {
                            value: Value::Int(i),
                            mutable: false,
                            decl_line: *line,
                        },
                    );
                    if let ExecSignal::Break = execute_block(body, state)? {
                        break;
                    }
                }
            }
        }
    }

    Ok(ExecSignal::Normal)
}

pub fn execute_rust_code_on_state(
    code: &str,
    state: &mut SimState,
) -> Result<(), RuntimeDiagnosticError> {
    let lines: Vec<&str> = code.split('\n').collect();
    let mut idx = 0;
    let stmts = parse_statements(&lines, &mut idx)?;
    let _ = execute_block(&stmts, state)?;
    Ok(())
}
