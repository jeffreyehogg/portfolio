import { Level, World } from './types'

export const WORLD_3: World = {
  id: 'world-3-data',
  number: 3,
  title: 'Citadel of Data',
  subtitle: 'LIFO Stacks & Converging Two-Pointers',
  description:
    'Purify ancient altar stacks using Last-In, First-Out (LIFO) operations and balance dual bridges with converging pointer algorithms.',
  badge: 'Algorithm Grandmaster',
  themeColor: 'amber',
  levelIds: ['level-7-the-stone-pedestal', 'level-8-the-dual-bridges'],
}

export const WORLD_3_LEVELS: Level[] = [
  {
    id: 'level-7-the-stone-pedestal',
    worldId: 'world-3-data',
    number: 7,
    title: 'The Stone Pedestal',
    subtitle: 'LIFO Stack Purification',
    concept: 'Stacks (LIFO)',
    badge: 'Stack Master',
    xp: 250,
    optimalSteps: 5,
    objective:
      'Push "bronze", "silver", and "cursed" onto the stack, then pop "cursed" off the top so ["bronze", "silver"] remain.',
    instructions: [
      'A Stack is Last-In, First-Out (LIFO): the last item pushed is the first item removed by pop().',
      'Push "silver" between "bronze" and "cursed", then pop the top item ("cursed") off the stack.',
    ],
    howItWorks:
      'When stack equals ["bronze", "silver"] at the end of your code, the altar unlocks and your hero steps onto (1, 0).',
    availableActions: [
      {
        name: 'push',
        kind: 'command',
        signature: 'stack.push(item)',
        signatures: {
          python: 'stack.append(item)',
          javascript: 'stack.push(item);',
          typescript: 'stack.push(item);',
          ruby: 'stack.push(item)',
          lua: 'table.insert(stack, item)',
          rust: 'stack.push(item);',
        },
        description: 'Adds an item to the top of the stack',
      },
      {
        name: 'pop',
        kind: 'command',
        signature: 'stack.pop()',
        signatures: {
          python: 'stack.pop()',
          javascript: 'stack.pop();',
          typescript: 'stack.pop();',
          ruby: 'stack.pop',
          lua: 'table.remove(stack)',
          rust: 'stack.pop();',
        },
        description: 'Removes the most recently pushed item from the top',
      },
    ],
    gridConfig: {
      width: 2,
      height: 1,
      heroStart: { x: 0, y: 0 },
      heroDirection: 'east',
      goal: { x: 1, y: 0 },
      tiles: [['path', 'pedestal']],
      entities: [{ id: 'pedestal-1', x: 1, y: 0, type: 'chest' }],
    },
    visualizerConfig: {
      type: 'stack',
      initialStack: [],
      targetStack: ['bronze', 'silver'],
    },
    starterCode: {
      python:
        'stack = []\nstack.append("bronze")\n# TODO 1: Push "silver" onto stack before "cursed"\nstack.append("cursed")\n\n# TODO 2: Pop the top item ("cursed") off stack\n',
      javascript:
        'const stack = [];\nstack.push("bronze");\n// TODO 1: Push "silver" onto stack before "cursed"\nstack.push("cursed");\n\n// TODO 2: Pop the top item ("cursed") off stack\n',
      typescript:
        'const stack: string[] = [];\nstack.push("bronze");\n// TODO 1: Push "silver" onto stack before "cursed"\nstack.push("cursed");\n\n// TODO 2: Pop the top item ("cursed") off stack\n',
      ruby:
        'stack = []\nstack.push("bronze")\n# TODO 1: Push "silver" onto stack before "cursed"\nstack.push("cursed")\n\n# TODO 2: Pop the top item ("cursed") off stack\n',
      lua:
        'stack = {}\ntable.insert(stack, "bronze")\n-- TODO 1: Push "silver" onto stack before "cursed"\ntable.insert(stack, "cursed")\n\n-- TODO 2: Pop the top item ("cursed") off stack\n',
      rust:
        'let mut stack = Vec::new();\nstack.push("bronze");\n// TODO 1: Push "silver" onto stack before "cursed"\nstack.push("cursed");\n\n// TODO 2: Pop the top item ("cursed") off stack\n',
    },
    solutionCode: {
      python:
        'stack = []\nstack.append("bronze")\nstack.append("silver")\nstack.append("cursed")\nremoved = stack.pop()\n',
      javascript:
        'const stack = [];\nstack.push("bronze");\nstack.push("silver");\nstack.push("cursed");\nconst removed = stack.pop();\n',
      typescript:
        'const stack: string[] = [];\nstack.push("bronze");\nstack.push("silver");\nstack.push("cursed");\nconst removed = stack.pop();\n',
      ruby:
        'stack = []\nstack.push("bronze")\nstack.push("silver")\nstack.push("cursed")\nremoved = stack.pop\n',
      lua:
        'stack = {}\ntable.insert(stack, "bronze")\ntable.insert(stack, "silver")\ntable.insert(stack, "cursed")\nremoved = table.remove(stack)\n',
      rust:
        'let mut stack = Vec::new();\nstack.push("bronze");\nstack.push("silver");\nstack.push("cursed");\nlet removed = stack.pop();\n',
    },
    hints: [
      {
        tier: 1,
        title: 'Last-In, First-Out (LIFO)',
        description:
          'When you push "bronze", then "silver", then "cursed", "cursed" sits at the top of the stack.',
      },
      {
        tier: 2,
        title: 'Popping the Cursed Rune',
        description:
          'Call pop() once after pushing all three items to remove "cursed" and leave ["bronze", "silver"].',
        codeSnippet: {
          python: 'removed = stack.pop()',
          javascript: 'const removed = stack.pop();',
          typescript: 'const removed = stack.pop();',
          ruby: 'removed = stack.pop',
          lua: 'removed = table.remove(stack)',
          rust: 'let removed = stack.pop();',
        },
      },
      {
        tier: 3,
        title: 'Direct Solution',
        description: 'Push "bronze", "silver", and "cursed", then pop the top item.',
        codeSnippet: {
          python:
            'stack = []\nstack.append("bronze")\nstack.append("silver")\nstack.append("cursed")\nremoved = stack.pop()',
          javascript:
            'const stack = [];\nstack.push("bronze");\nstack.push("silver");\nstack.push("cursed");\nconst removed = stack.pop();',
          typescript:
            'const stack: string[] = [];\nstack.push("bronze");\nstack.push("silver");\nstack.push("cursed");\nconst removed = stack.pop();',
          ruby:
            'stack = []\nstack.push("bronze")\nstack.push("silver")\nstack.push("cursed")\nremoved = stack.pop',
          lua:
            'stack = {}\ntable.insert(stack, "bronze")\ntable.insert(stack, "silver")\ntable.insert(stack, "cursed")\nremoved = table.remove(stack)',
          rust:
            'let mut stack = Vec::new();\nstack.push("bronze");\nstack.push("silver");\nstack.push("cursed");\nlet removed = stack.pop();',
        },
      },
    ],
    testCases: [
      {
        id: 'tc-1',
        name: 'Purify stack to ["bronze", "silver"] and reach altar at (1, 0)',
        expected: true,
        description: 'Stack must hold ["bronze", "silver"] after popping "cursed"',
      },
    ],
    prepareCode: (userCode, language) => {
      if (language === 'python') {
        return `${userCode}\nif 'stack' in locals() and stack == ["bronze", "silver"]:\n    step()\n`
      }
      if (language === 'ruby') {
        return `${userCode}\nif defined?(stack) && stack == ["bronze", "silver"]\n  step\nend\n`
      }
      if (language === 'lua') {
        return `${userCode}\nif stack ~= nil and #stack == 2 and stack[1] == "bronze" and stack[2] == "silver" then\n  step()\nend\n`
      }
      if (language === 'rust') {
        return `${userCode}\nif stack.len() == 2 && stack[0] == "bronze" && stack[1] == "silver" {\n    step();\n}\n`
      }
      return `${userCode}\nif (typeof stack !== 'undefined' && Array.isArray(stack) && stack.length === 2 && stack[0] === "bronze" && stack[1] === "silver") {\n  step();\n}\n`
    },
  },
  {
    id: 'level-8-the-dual-bridges',
    worldId: 'world-3-data',
    number: 8,
    title: 'The Dual Bridges',
    subtitle: 'Converging Two-Pointers Algorithm',
    concept: 'Two Pointers',
    badge: 'Convergence Sage',
    xp: 300,
    optimalSteps: 6,
    objective:
      'Move left (0) and right (6) inward by 1 each step until both pointers meet at index 3.',
    instructions: [
      'Two Pointers scan from both ends toward the middle in O(n) time.',
      'Inside the while left < right loop, add 1 to left and subtract 1 from right.',
    ],
    howItWorks:
      'When the loop finishes with left == 3 and right == 3, the bridge aligns and your hero walks to the chest at (3, 0).',
    availableActions: [
      {
        name: 'left',
        kind: 'variable',
        signature: 'left += 1',
        signatures: {
          python: 'left += 1',
          javascript: 'left += 1;',
          typescript: 'left += 1;',
          ruby: 'left += 1',
          lua: 'left = left + 1',
          rust: 'left += 1;',
        },
        description: 'Moves the left pointer 1 index toward the center',
      },
      {
        name: 'right',
        kind: 'variable',
        signature: 'right -= 1',
        signatures: {
          python: 'right -= 1',
          javascript: 'right -= 1;',
          typescript: 'right -= 1;',
          ruby: 'right -= 1',
          lua: 'right = right - 1',
          rust: 'right -= 1;',
        },
        description: 'Moves the right pointer 1 index toward the center',
      },
    ],
    gridConfig: {
      width: 7,
      height: 1,
      heroStart: { x: 0, y: 0 },
      heroDirection: 'east',
      goal: { x: 3, y: 0 },
      tiles: [['bridge', 'bridge', 'bridge', 'chest', 'bridge', 'bridge', 'bridge']],
      entities: [{ id: 'chest-1', x: 3, y: 0, type: 'chest' }],
    },
    visualizerConfig: {
      type: 'pointers',
      initialPointers: { left: 0, right: 6 },
      initialArray: ['2', '3', '5', '7', '8', '11', '15'],
    },
    starterCode: {
      python:
        'left = 0\nright = 6\n\nwhile left < right:\n    # TODO 1: Move left inward (+1)\n    # TODO 2: Move right inward (-1)\n    pass\n',
      javascript:
        'let left = 0;\nlet right = 6;\n\nwhile (left < right) {\n  // TODO 1: Move left inward (+1)\n  // TODO 2: Move right inward (-1)\n}\n',
      typescript:
        'let left = 0;\nlet right = 6;\n\nwhile (left < right) {\n  // TODO 1: Move left inward (+1)\n  // TODO 2: Move right inward (-1)\n}\n',
      ruby:
        'left = 0\nright = 6\n\nwhile left < right\n  # TODO 1: Move left inward (+1)\n  # TODO 2: Move right inward (-1)\nend\n',
      lua:
        'left = 0\nright = 6\n\nwhile left < right do\n  -- TODO 1: Move left inward (+1)\n  -- TODO 2: Move right inward (-1)\nend\n',
      rust:
        'let mut left = 0;\nlet mut right = 6;\n\nwhile left < right {\n    // TODO 1: Move left inward (+1)\n    // TODO 2: Move right inward (-1)\n}\n',
    },
    solutionCode: {
      python: 'left = 0\nright = 6\n\nwhile left < right:\n    left += 1\n    right -= 1\n',
      javascript: 'let left = 0;\nlet right = 6;\n\nwhile (left < right) {\n  left += 1;\n  right -= 1;\n}\n',
      typescript: 'let left = 0;\nlet right = 6;\n\nwhile (left < right) {\n  left += 1;\n  right -= 1;\n}\n',
      ruby: 'left = 0\nright = 6\n\nwhile left < right\n  left += 1\n  right -= 1\nend\n',
      lua: 'left = 0\nright = 6\n\nwhile left < right do\n  left = left + 1\n  right = right - 1\nend\n',
      rust: 'let mut left = 0;\nlet mut right = 6;\n\nwhile left < right {\n    left += 1;\n    right -= 1;\n}\n',
    },
    hints: [
      {
        tier: 1,
        title: 'Inward Traversal',
        description:
          'To move pointers toward the center keystone, increment left (+1) and decrement right (-1).',
      },
      {
        tier: 2,
        title: 'Meeting Condition',
        description:
          'The while loop condition left < right ensures the pointers stop when they converge at index 3.',
        codeSnippet: {
          python: 'while left < right:\n    left += 1\n    right -= 1',
          javascript: 'while (left < right) {\n  left += 1;\n  right -= 1;\n}',
          typescript: 'while (left < right) {\n  left += 1;\n  right -= 1;\n}',
          ruby: 'while left < right\n  left += 1\n  right -= 1\nend',
          lua: 'while left < right do\n  left = left + 1\n  right = right - 1\nend',
          rust: 'while left < right {\n    left += 1;\n    right -= 1;\n}',
        },
      },
      {
        tier: 3,
        title: 'Direct Solution',
        description: 'Inside the while loop, advance left and decrement right.',
        codeSnippet: {
          python: 'left = 0\nright = 6\nwhile left < right:\n    left += 1\n    right -= 1',
          javascript: 'let left = 0;\nlet right = 6;\nwhile (left < right) {\n  left += 1;\n  right -= 1;\n}',
          typescript: 'let left = 0;\nlet right = 6;\nwhile (left < right) {\n  left += 1;\n  right -= 1;\n}',
          ruby: 'left = 0\nright = 6\nwhile left < right\n  left += 1\n  right -= 1\nend',
          lua: 'left = 0\nright = 6\nwhile left < right do\n  left = left + 1\n  right = right - 1\nend',
          rust: 'let mut left = 0;\nlet mut right = 6;\nwhile left < right {\n    left += 1;\n    right -= 1;\n}',
        },
      },
    ],
    testCases: [
      {
        id: 'tc-1',
        name: 'Converge pointers at center keystone (3, 0)',
        expected: true,
        description: 'Pointers meet at index 3, moving hero to goal',
      },
    ],
    prepareCode: (userCode, language) => {
      if (language === 'python') {
        return `${userCode}\nif 'left' in locals() and 'right' in locals() and left == 3 and right == 3:\n    if not at_goal():\n        for _ in range(3):\n            step()\n`
      }
      if (language === 'ruby') {
        return `${userCode}\nif defined?(left) && defined?(right) && left == 3 && right == 3\n  if !at_goal\n    3.times { step }\n  end\nend\n`
      }
      if (language === 'lua') {
        return `${userCode}\nif left == 3 and right == 3 then\n  if not at_goal() then\n    for i = 1, 3 do step() end\n  end\nend\n`
      }
      if (language === 'rust') {
        return `${userCode}\nif left == 3 && right == 3 {\n    if !at_goal() {\n        for _i in 0..3 {\n            step();\n        }\n    }\n}\n`
      }
      return `${userCode}\nif (typeof left !== 'undefined' && typeof right !== 'undefined' && left === 3 && right === 3) {\n  if (!at_goal()) {\n    for (let i = 0; i < 3; i++) {\n      step();\n    }\n  }\n}\n`
    },
  },
]
