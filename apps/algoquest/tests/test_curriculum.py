"""Pytest verification suite for all 10 AlgoQuest curriculum levels and sandbox rules."""

from __future__ import annotations

from dataclasses import dataclass

import pytest

from python_engine.sandbox import AlgoQuestSandbox


@dataclass
class QuestSpec:
    level_id: str
    number: int
    hero_start: tuple[int, int]
    goal: tuple[int, int]
    tiles: list[list[str]]
    starter_code: str
    solution_code: str
    wrapper_template: str
    expected_gems: int = 0


QUEST_SPECS: list[QuestSpec] = [
    QuestSpec(
        level_id="level-1-first-step",
        number=1,
        hero_start=(0, 0),
        goal=(3, 0),
        tiles=[["path", "path", "path", "chest"]],
        starter_code="steps = 1\n",
        solution_code="steps = 3\n",
        wrapper_template=(
            "{code}\nif 'steps' in locals():\n    for _ in range(int(steps)):\n        step()\n"
        ),
    ),
    QuestSpec(
        level_id="level-2-the-gatekeeper",
        number=2,
        hero_start=(0, 0),
        goal=(4, 0),
        tiles=[["path", "path", "gate", "path", "chest"]],
        starter_code='password = "closed"\n',
        solution_code='password = "open"\n',
        wrapper_template=(
            '{code}\nif "password" in locals() and password == "open":\n'
            "    for _ in range(4):\n        step()\n"
        ),
    ),
    QuestSpec(
        level_id="level-3-the-danger-tile",
        number=3,
        hero_start=(0, 0),
        goal=(2, 0),
        tiles=[["path", "lava", "chest"]],
        starter_code='if tile == "lava":\n    pass\nelse:\n    step()\n',
        solution_code='if tile == "lava":\n    jump()\nelse:\n    step()\n',
        wrapper_template='tile = "lava"\n{code}\n',
    ),
    QuestSpec(
        level_id="level-4-march-forward",
        number=4,
        hero_start=(0, 0),
        goal=(4, 0),
        tiles=[["path", "path", "path", "path", "chest"]],
        starter_code="while not at_goal():\n    break\n",
        solution_code="while not at_goal():\n    step()\n",
        wrapper_template="{code}\n",
    ),
    QuestSpec(
        level_id="level-5-gem-collector",
        number=5,
        hero_start=(0, 0),
        goal=(5, 0),
        tiles=[["path", "bridge", "bridge", "bridge", "bridge", "chest"]],
        starter_code="for i in range(5):\n    pass\n",
        solution_code="for i in range(5):\n    step()\n    collect()\n",
        wrapper_template="{code}\n",
        expected_gems=5,
    ),
    QuestSpec(
        level_id="level-6-the-inventory-bag",
        number=6,
        hero_start=(0, 0),
        goal=(3, 0),
        tiles=[["path", "path", "door", "chest"]],
        starter_code="potion = items[0]\nkey = items[0]\n",
        solution_code="potion = items[0]\nkey = items[2]\n",
        wrapper_template=(
            'items = ["potion", "shield", "key"]\n{code}\n'
            "if locals().get('potion') == items[0] and locals().get('key') == items[2]:\n"
            "    for _ in range(3):\n        step()\n"
        ),
    ),
    QuestSpec(
        level_id="level-7-the-stone-pedestal",
        number=7,
        hero_start=(0, 0),
        goal=(1, 0),
        tiles=[["path", "pedestal"]],
        starter_code='stack = []\nstack.append("stone")\n',
        solution_code=(
            'stack = []\nstack.append("stone")\nstack.append("stone")\n'
            'stack.append("stone")\nkey = stack.pop()\n'
        ),
        wrapper_template="{code}\nif 'stack' in locals() and len(stack) == 2:\n    step()\n",
    ),
    QuestSpec(
        level_id="level-8-the-dual-bridges",
        number=8,
        hero_start=(0, 0),
        goal=(3, 0),
        tiles=[["bridge", "bridge", "bridge", "chest", "bridge", "bridge", "bridge"]],
        starter_code="left = 0\nright = 6\n",
        solution_code="left = 0\nright = 6\n\nwhile left < right:\n    left += 1\n    right -= 1\n",
        wrapper_template=(
            "{code}\nif 'left' in locals() and 'right' in locals() "
            "and left == 3 and right == 3:\n"
            "    if not at_goal():\n        for _ in range(3):\n            step()\n"
        ),
    ),
    QuestSpec(
        level_id="level-9-the-ancient-tome",
        number=9,
        hero_start=(0, 0),
        goal=(3, 0),
        tiles=[["path", "stone", "door", "chest"]],
        starter_code='runes["fire"] = 0\npower = 0\n',
        solution_code='runes["fire"] = 3\npower = runes["ice"]\n',
        wrapper_template=(
            'runes = {{"wind": 1, "ice": 2}}\n{code}\n'
            'if isinstance(runes, dict) and runes.get("fire") == 3 '
            'and locals().get("power") == 2:\n'
            "    for _ in range(3):\n        step()\n"
        ),
    ),
    QuestSpec(
        level_id="level-10-the-crystal-archives",
        number=10,
        hero_start=(0, 0),
        goal=(3, 0),
        tiles=[["stone", "stone", "stone", "chest", "stone", "stone", "stone"]],
        starter_code="low = 0\nhigh = 6\nfound_index = -1\n",
        solution_code=(
            "low = 0\nhigh = 6\nfound_index = -1\n"
            "while low <= high:\n"
            "    mid = (low + high) // 2\n"
            "    if crystals[mid] == target:\n"
            "        found_index = mid\n"
            "        break\n"
            "    elif crystals[mid] < target:\n"
            "        low = mid + 1\n"
            "    else:\n"
            "        high = mid - 1\n"
        ),
        wrapper_template=(
            "crystals = [10, 20, 30, 42, 50, 60, 70]\ntarget = 42\n{code}\n"
            "if locals().get('found_index') == 3:\n"
            "    for _ in range(3):\n        step()\n"
        ),
    ),
]


@pytest.mark.parametrize("spec", QUEST_SPECS, ids=[q.level_id for q in QUEST_SPECS])
def test_quest_solution_passes_and_is_lint_clean(spec: QuestSpec) -> None:
    """Every level's canonical Python solution must reach the goal with zero lint warnings."""
    sandbox = AlgoQuestSandbox(
        hero_start=spec.hero_start,
        goal=spec.goal,
        tiles=spec.tiles,
    )
    prepared = spec.wrapper_template.format(code=spec.solution_code)
    result = sandbox.execute(prepared, raw_user_code=spec.solution_code)

    assert result.success is True, f"Failed on {spec.level_id}: {result.error}"
    assert result.at_goal is True, f"Hero did not reach goal on {spec.level_id}"
    assert result.hazard_hit is None
    assert len(result.inventory) >= spec.expected_gems
    assert result.lint_diagnostics == [], (
        f"Solution code for {spec.level_id} produced lint warnings: {result.lint_diagnostics}"
    )


@pytest.mark.parametrize("spec", QUEST_SPECS, ids=[q.level_id for q in QUEST_SPECS])
def test_quest_starter_code_does_not_auto_pass(spec: QuestSpec) -> None:
    """Starter code must compile cleanly and never pass the level before the user edits it."""
    sandbox = AlgoQuestSandbox(
        hero_start=spec.hero_start,
        goal=spec.goal,
        tiles=spec.tiles,
    )
    prepared = spec.wrapper_template.format(code=spec.starter_code)
    result = sandbox.execute(prepared, raw_user_code=spec.starter_code)

    assert result.at_goal is False, f"Starter code falsely passed {spec.level_id}"


def test_level_3_stepping_on_lava_fails_immediately() -> None:
    """Stepping directly onto (1, 0) lava instead of calling jump() must trigger HazardError."""
    sandbox = AlgoQuestSandbox(
        hero_start=(0, 0),
        goal=(2, 0),
        tiles=[["path", "lava", "chest"]],
    )
    result = sandbox.execute("step()\nstep()\n")

    assert result.success is False
    assert result.at_goal is False
    assert result.hazard_hit is not None
    assert result.hazard_hit["type"] == "lava"
    assert "molten lava" in (result.error or "")


def test_out_of_bounds_raises_error() -> None:
    """Walking off the grid boundaries must fail with OutOfBoundsError."""
    sandbox = AlgoQuestSandbox(
        hero_start=(0, 0),
        goal=(2, 0),
        tiles=[["path", "path", "chest"]],
    )
    result = sandbox.execute('step("west")\n')

    assert result.success is False
    assert result.hazard_hit is not None
    assert result.hazard_hit["type"] == "out_of_bounds"
