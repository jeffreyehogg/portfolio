#[derive(Debug, Clone, PartialEq)]
pub struct LintDiagnostic {
    pub line: usize,
    pub column: usize,
    pub code: String,
    pub rule: String,
    pub severity: String,
    pub message: String,
}

impl LintDiagnostic {
    pub fn to_json(&self) -> String {
        format!(
            "{{\"line\":{},\"column\":{},\"code\":\"{}\",\"rule\":\"{}\",\"severity\":\"{}\",\"message\":\"{}\"}}",
            self.line,
            self.column,
            escape_json(&self.code),
            escape_json(&self.rule),
            escape_json(&self.severity),
            escape_json(&self.message)
        )
    }
}

pub fn escape_json(input: &str) -> String {
    let mut out = String::with_capacity(input.len() + 8);
    for c in input.chars() {
        match c {
            '"' => out.push_str("\\\""),
            '\\' => out.push_str("\\\\"),
            '\n' => out.push_str("\\n"),
            '\r' => out.push_str("\\r"),
            '\t' => out.push_str("\\t"),
            _ => out.push(c),
        }
    }
    out
}

/// Fast, deterministic static code analyzer implemented in Rust (compiled to WASM).
/// Enforces Ruff, ESLint, and Rust Clippy hygiene diagnostics in microseconds.
pub fn analyze_code(code: &str, language: &str) -> Vec<LintDiagnostic> {
    let mut diagnostics = Vec::new();
    let lines: Vec<&str> = code.split('\n').collect();

    // Track Rust `let mut` declarations to detect `unused_mut`
    let mut declared_mut_vars: Vec<(String, usize, bool)> = Vec::new();

    for (idx, raw_line) in lines.iter().enumerate() {
        let line_num = idx + 1;
        let trimmed = raw_line.trim();

        if trimmed.is_empty()
            || trimmed.starts_with('#')
            || trimmed.starts_with("//")
            || trimmed.starts_with("--")
        {
            continue;
        }

        // Rule E501: Line exceeds 100 characters
        if raw_line.len() > 100 {
            diagnostics.push(LintDiagnostic {
                line: line_num,
                column: 101,
                code: "E501".to_string(),
                rule: if language == "rust" {
                    "rustfmt::max_width".to_string()
                } else if language == "python" {
                    "Ruff/E501".to_string()
                } else {
                    "Style/max-len".to_string()
                },
                severity: "info".to_string(),
                message: format!("Line exceeds 100 characters ({} > 100).", raw_line.len()),
            });
        }

        // Rule W291: Trailing whitespace
        if raw_line.ends_with(' ') || raw_line.ends_with('\t') {
            diagnostics.push(LintDiagnostic {
                line: line_num,
                column: raw_line.len(),
                code: "W291".to_string(),
                rule: "Style/trailing-whitespace".to_string(),
                severity: "info".to_string(),
                message: "Trailing whitespace detected at end of line.".to_string(),
            });
        }

        if language == "rust" {
            // Strip inline comment
            let code_part = match trimmed.find("//") {
                Some(pos) => trimmed[..pos].trim(),
                None => trimmed,
            };

            // Detect `let mut <var>` for unused_mut tracking
            if let Some(rest) = code_part.strip_prefix("let mut ") {
                let var_name: String = rest
                    .chars()
                    .take_while(|c| c.is_alphanumeric() || *c == '_')
                    .collect();
                if !var_name.is_empty() {
                    declared_mut_vars.push((var_name, line_num, false));
                }
            } else {
                // Check if any declared_mut_var is mutated on this line
                for (var_name, _, ref mut mutated) in declared_mut_vars.iter_mut() {
                    let assign_pat = format!("{} =", var_name);
                    let add_pat = format!("{} +=", var_name);
                    let sub_pat = format!("{} -=", var_name);
                    let push_pat = format!("{}.push(", var_name);
                    let pop_pat = format!("{}.pop(", var_name);
                    let insert_pat = format!("{}.insert(", var_name);
                    let idx_pat = format!("{}[", var_name);

                    if code_part.starts_with(&assign_pat)
                        || code_part.contains(&add_pat)
                        || code_part.contains(&sub_pat)
                        || code_part.contains(&push_pat)
                        || code_part.contains(&pop_pat)
                        || code_part.contains(&insert_pat)
                        || (code_part.starts_with(&idx_pat) && code_part.contains('='))
                    {
                        *mutated = true;
                    }
                }
            }

            // Clippy rule: needless_bool / explicit comparison with true/false
            if code_part.contains("== true") || code_part.contains("== false") {
                diagnostics.push(LintDiagnostic {
                    line: line_num,
                    column: 1,
                    code: "clippy::bool_comparison".to_string(),
                    rule: "Clippy/bool_comparison".to_string(),
                    severity: "warning".to_string(),
                    message: "Equality checks against true/false are redundant; use the boolean expression or `!` directly.".to_string(),
                });
            }

            // Clippy rule: needless parens around `if` or `while` condition in Rust
            if (code_part.starts_with("if (") && code_part.contains(") {"))
                || (code_part.starts_with("while (") && code_part.contains(") {"))
            {
                diagnostics.push(LintDiagnostic {
                    line: line_num,
                    column: 1,
                    code: "unused_parens".to_string(),
                    rule: "rustc/unused_parens".to_string(),
                    severity: "warning".to_string(),
                    message: "Unnecessary parentheses around `if` or `while` condition in Rust.".to_string(),
                });
            }
        }
    }

    if language == "rust" {
        for (var_name, decl_line, mutated) in declared_mut_vars {
            if !mutated {
                diagnostics.push(LintDiagnostic {
                    line: decl_line,
                    column: 5,
                    code: "unused_mut".to_string(),
                    rule: "rustc/unused_mut".to_string(),
                    severity: "info".to_string(),
                    message: format!(
                        "variable `{}` does not need to be mutable (`help: remove this mut`).",
                        var_name
                    ),
                });
            }
        }
    }

    diagnostics
}

pub fn diagnostics_to_json(diagnostics: &[LintDiagnostic]) -> String {
    let items: Vec<String> = diagnostics.iter().map(|d| d.to_json()).collect();
    format!("[{}]", items.join(","))
}
