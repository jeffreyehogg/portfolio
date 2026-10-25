"""Pure-Python AlgoQuest Sandbox & AST/Ruff-inspired Code Quality Analyzer.

Mirrors the in-browser Pyodide WebAssembly worker runtime so all quest levels,
starter templates, solutions, hazard rules, and AST lint diagnostics can be
deterministically verified via `uv run pytest` and `uv run ruff`.
"""

from __future__ import annotations

import ast
from dataclasses import dataclass, field
from typing import Any


class HazardError(RuntimeError):
    """Raised when the hero steps onto lava or a solid wall."""


class OutOfBoundsError(RuntimeError):
    """Raised when the hero steps outside the dungeon grid coordinates."""


@dataclass
class LintDiagnostic:
    line: int
    column: int
    code: str
    rule: str
    severity: str
    message: str


@dataclass
class SandboxResult:
    success: bool
    position: dict[str, int]
    direction: str
    inventory: list[str]
    at_goal: bool
    steps: list[dict[str, Any]] = field(default_factory=list)
    stdout: list[str] = field(default_factory=list)
    lint_diagnostics: list[LintDiagnostic] = field(default_factory=list)
    hazard_hit: dict[str, Any] | None = None
    error: str | None = None
    locals_snapshot: dict[str, Any] = field(default_factory=dict)


def analyze_python_code(source_code: str) -> list[LintDiagnostic]:
    """Run AST and PEP 8/Ruff-style checks on raw user Python code."""
    diagnostics: list[LintDiagnostic] = []
    lines = source_code.split("\n")

    for idx, line in enumerate(lines, start=1):
        stripped = line.strip()
        if not stripped or stripped.startswith("#"):
            continue

        if len(line) > 100:
            diagnostics.append(
                LintDiagnostic(
                    line=idx,
                    column=101,
                    code="E501",
                    rule="Ruff/E501",
                    severity="info",
                    message=f"Line too long ({len(line)} > 100 characters).",
                )
            )

        if ";" in stripped and '"' not in stripped and "'" not in stripped:
            diagnostics.append(
                LintDiagnostic(
                    line=idx,
                    column=line.find(";") + 1,
                    code="E702",
                    rule="Ruff/E702",
                    severity="warning",
                    message="Multiple statements on one line (semicolon); prefer PEP 8 newline.",
                )
            )

    tree = ast.parse(source_code)
    for node in ast.walk(tree):
        if isinstance(node, ast.Pass):
            diagnostics.append(
                LintDiagnostic(
                    line=getattr(node, "lineno", 1),
                    column=getattr(node, "col_offset", 0) + 1,
                    code="PIE790",
                    rule="Ruff/PIE790",
                    severity="warning",
                    message="Unnecessary 'pass' placeholder statement can be removed.",
                )
            )
        elif isinstance(node, ast.Compare):
            for comp in node.comparators:
                if isinstance(comp, ast.Constant) and isinstance(comp.value, bool):
                    diagnostics.append(
                        LintDiagnostic(
                            line=getattr(node, "lineno", 1),
                            column=getattr(node, "col_offset", 0) + 1,
                            code="E712",
                            rule="Ruff/E712",
                            severity="info",
                            message=(
                                f"Avoid equality comparison to '{comp.value}'; "
                                "check truthiness directly."
                            ),
                        )
                    )

    return diagnostics


class AlgoQuestSandbox:
    """Deterministic Python simulation of the AlgoQuest spatial grid & runtime."""

    def __init__(
        self,
        *,
        hero_start: tuple[int, int] = (0, 0),
        hero_direction: str = "east",
        goal: tuple[int, int] = (0, 0),
        tiles: list[list[str]] | None = None,
    ) -> None:
        self.position = {"x": hero_start[0], "y": hero_start[1]}
        self.direction = hero_direction
        self.goal = {"x": goal[0], "y": goal[1]}
        self.tiles = tiles or []
        self.height = len(self.tiles)
        self.width = len(self.tiles[0]) if self.height > 0 else 0
        self.inventory: list[str] = []
        self.steps: list[dict[str, Any]] = []
        self.stdout: list[str] = []
        self.hazard_hit: dict[str, Any] | None = None

    def _record_step(self, step_type: str, data: dict[str, Any]) -> None:
        if len(self.steps) < 1000:
            self.steps.append({"type": step_type, "data": data})

    def _check_hazard(self) -> None:
        x, y = self.position["x"], self.position["y"]
        if (
            self.width > 0
            and self.height > 0
            and (x < 0 or y < 0 or x >= self.width or y >= self.height)
        ):
            msg = f"OutOfBoundsError: Hero walked off the dungeon map at ({x}, {y})!"
            self.hazard_hit = {"type": "out_of_bounds", "x": x, "y": y, "message": msg}
            self._record_step("hazard", {"position": dict(self.position), "tileType": "bounds"})
            raise OutOfBoundsError(msg)

        if self.tiles and 0 <= y < len(self.tiles) and 0 <= x < len(self.tiles[y]):
            tile = self.tiles[y][x]
            if tile == "lava":
                msg = (
                    f"HazardError: Hero stepped onto molten lava at ({x}, {y})! "
                    "Use jump() to clear lava traps."
                )
                self.hazard_hit = {"type": "lava", "x": x, "y": y, "message": msg}
                self._record_step("hazard", {"position": dict(self.position), "tileType": "lava"})
                raise HazardError(msg)
            if tile == "wall":
                msg = f"HazardError: Hero collided with a solid stone wall at ({x}, {y})!"
                self.hazard_hit = {"type": "wall", "x": x, "y": y, "message": msg}
                self._record_step("hazard", {"position": dict(self.position), "tileType": "wall"})
                raise HazardError(msg)

    def step(self, direction: str | None = None) -> dict[str, int]:
        dir_str = str(direction).lower() if direction else (self.direction or "east")
        self.direction = dir_str
        if dir_str in ("north", "up"):
            self.position["y"] -= 1
        elif dir_str in ("south", "down"):
            self.position["y"] += 1
        elif dir_str in ("east", "right"):
            self.position["x"] += 1
        elif dir_str in ("west", "left"):
            self.position["x"] -= 1

        self._record_step(
            "step",
            {"direction": dir_str, "position": dict(self.position)},
        )
        self._check_hazard()
        return dict(self.position)

    def jump(self) -> dict[str, int]:
        dir_str = self.direction or "east"
        if dir_str in ("north", "up"):
            self.position["y"] -= 2
        elif dir_str in ("south", "down"):
            self.position["y"] += 2
        elif dir_str in ("east", "right"):
            self.position["x"] += 2
        elif dir_str in ("west", "left"):
            self.position["x"] -= 2

        self._record_step(
            "jump",
            {"direction": dir_str, "position": dict(self.position)},
        )
        self._check_hazard()
        return dict(self.position)

    def turn(self, direction: str) -> str:
        self.direction = str(direction).lower()
        self._record_step(
            "turn",
            {"direction": self.direction, "position": dict(self.position)},
        )
        return self.direction

    def collect(self, item: str | None = None) -> str:
        collected = str(item) if item else "gem"
        self.inventory.append(collected)
        self._record_step(
            "collect",
            {
                "item": collected,
                "inventory": list(self.inventory),
                "position": dict(self.position),
            },
        )
        return collected

    def at_goal(self) -> bool:
        reached = (
            self.hazard_hit is None
            and self.position["x"] == self.goal["x"]
            and self.position["y"] == self.goal["y"]
        )
        self._record_step(
            "at_goal",
            {"atGoal": reached, "position": dict(self.position), "goal": dict(self.goal)},
        )
        return reached

    def execute(self, prepared_code: str, *, raw_user_code: str | None = None) -> SandboxResult:
        """Execute prepared Python code in the isolated sandbox scope."""
        lint_source = raw_user_code if raw_user_code is not None else prepared_code
        lint_diags = analyze_python_code(lint_source)

        def _custom_print(*args: Any, **_kwargs: Any) -> None:
            line = " ".join(str(a) for a in args)
            if len(self.stdout) < 200:
                self.stdout.append(line)

        scope: dict[str, Any] = {
            "step": self.step,
            "jump": self.jump,
            "turn": self.turn,
            "collect": self.collect,
            "at_goal": self.at_goal,
            "print": _custom_print,
        }

        try:
            exec(compile(prepared_code, "<algoquest>", "exec"), scope, scope)
            return SandboxResult(
                success=True,
                position=dict(self.position),
                direction=self.direction,
                inventory=list(self.inventory),
                at_goal=self.at_goal(),
                steps=list(self.steps),
                stdout=list(self.stdout),
                lint_diagnostics=lint_diags,
                hazard_hit=self.hazard_hit,
                locals_snapshot=scope,
            )
        except Exception as exc:
            return SandboxResult(
                success=False,
                position=dict(self.position),
                direction=self.direction,
                inventory=list(self.inventory),
                at_goal=False,
                steps=list(self.steps),
                stdout=list(self.stdout),
                lint_diagnostics=lint_diags,
                hazard_hit=self.hazard_hit,
                error=str(exc),
                locals_snapshot=scope,
            )
