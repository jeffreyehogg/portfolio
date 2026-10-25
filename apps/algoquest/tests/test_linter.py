"""Unit tests for the AlgoQuest Python AST & PEP 8 / Ruff-inspired code analyzer."""

from __future__ import annotations

from python_engine.sandbox import analyze_python_code


def test_clean_python_code_returns_zero_diagnostics() -> None:
    code = 'for i in range(5):\n    step()\n    collect("gem")\n'
    diags = analyze_python_code(code)
    assert diags == []


def test_detects_unnecessary_pass_statement_pie790() -> None:
    code = "while not at_goal():\n    step()\n    pass\n"
    diags = analyze_python_code(code)
    codes = [d.code for d in diags]
    assert "PIE790" in codes


def test_detects_semicolon_statement_separator_e702() -> None:
    code = "step(); collect()\n"
    diags = analyze_python_code(code)
    codes = [d.code for d in diags]
    assert "E702" in codes


def test_detects_boolean_equality_comparison_e712() -> None:
    code = "if at_goal() == True:\n    step()\n"
    diags = analyze_python_code(code)
    codes = [d.code for d in diags]
    assert "E712" in codes


def test_detects_long_lines_e501() -> None:
    long_line = "x = " + ("1 + " * 30) + "1\n"
    diags = analyze_python_code(long_line)
    codes = [d.code for d in diags]
    assert "E501" in codes
