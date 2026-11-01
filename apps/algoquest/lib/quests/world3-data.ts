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
      'Push "bronze", "silver", and "cursed" onto the stack, then pop the topmost "cursed" rune off the top to leave ["bronze", "silver"].',
    instructions: [
      'A Stack is a Last-In, First-Out (LIFO) data structure: the last item pushed is always the first item popped.',
      'Push "bronze", then "silver", then "cursed" onto the stack.',
      'Because "cursed" was pushed last, calling pop() removes "cursed" from the top—leaving ["bronze", "silver"] to unlock the altar at (1, 0)!',
    ],
    availableActions: [
      { name: 'push', signature: 'stack.push() / append() / table.insert()', description: 'Pushes a rune onto the top of the LIFO stack' },
      { name: 'pop', signature: 'stack.pop() / table.remove()', description: 'Pops and removes the most recently pushed rune' },
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
        '# 1. Push "bronze", "silver", and "cursed" onto stack\n# 2. Pop the top "cursed" rune using stack.pop() so only ["bronze", "silver"] remain!\n\nstack = []\nstack.append("bronze")\nstack.append("cursed")\n',
      javascript:
        '// 1. Push "bronze", "silver", and "cursed" onto stack\n// 2. Pop the top "cursed" rune using stack.pop() so only ["bronze", "silver"] remain!\n\nconst stack = [];\nstack.push("bronze");\nstack.push("cursed");\n',
      typescript:
        '// 1. Push "bronze", "silver", and "cursed" onto stack\n// 2. Pop the top "cursed" rune using stack.pop() so only ["bronze", "silver"] remain!\n\nconst stack: string[] = [];\nstack.push("bronze");\nstack.push("cursed");\n',
      ruby:
        '# 1. Push "bronze", "silver", and "cursed" onto stack\n# 2. Pop the top "cursed" rune using stack.pop so only ["bronze", "silver"] remain!\n\nstack = []\nstack.push("bronze")\nstack.push("cursed")\n',
      lua:
        '-- 1. Push "bronze", "silver", and "cursed" onto stack\n-- 2. Pop the top "cursed" rune using table.remove(stack) so only {"bronze", "silver"} remain!\n\nstack = {}\ntable.insert(stack, "bronze")\ntable.insert(stack, "cursed")\n',
      rust:
        '// 1. Push "bronze", "silver", and "cursed" onto the mutable Vec\n// 2. Pop the top "cursed" rune using stack.pop() so only ["bronze", "silver"] remain!\n\nlet mut stack = Vec::new();\nstack.push("bronze");\nstack.push("cursed");\n',
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
      'Converge left (0) and right (6) inward across the rune weights [2, 3, 5, 7, 8, 11, 15] until they meet at the central keystone (index 3).',
    instructions: [
      'The Two Pointers pattern scans a sequence from both ends toward the center in O(n) time.',
      'The bridge pillars hold sorted weights [2, 3, 5, 7, 8, 11, 15] from left = 0 to right = 6.',
      'Inside the while left < right loop, increment left by 1 and decrement right by 1 so both pointers converge on the keystone weight 7 at index 3!',
    ],
    availableActions: [
      { name: 'pointers', signature: 'left += 1 / right -= 1', description: 'Advances left and right pointer indices inward' },
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
        '# Bridge rune weights: [2, 3, 5, 7, 8, 11, 15] (indices 0..6)\n# Converge left and right pointers inward until they meet at index 3.\nleft = 0\nright = 6\n\nwhile left < right:\n    # Increment left and decrement right\n    pass\n',
      javascript:
        '// Bridge rune weights: [2, 3, 5, 7, 8, 11, 15] (indices 0..6)\n// Converge left and right pointers inward until they meet at index 3.\nlet left = 0;\nlet right = 6;\n\nwhile (left < right) {\n  // Increment left and decrement right\n}\n',
      typescript:
        '// Bridge rune weights: [2, 3, 5, 7, 8, 11, 15] (indices 0..6)\n// Converge left and right pointers inward until they meet at index 3.\nlet left = 0;\nlet right = 6;\n\nwhile (left < right) {\n  // Increment left and decrement right\n}\n',
      ruby:
        '# Bridge rune weights: [2, 3, 5, 7, 8, 11, 15] (indices 0..6)\n# Converge left and right pointers inward until they meet at index 3.\nleft = 0\nright = 6\n\nwhile left < right\n  # Increment left and decrement right\nend\n',
      lua:
        '-- Bridge rune weights: [2, 3, 5, 7, 8, 11, 15] (indices 0..6)\n-- Converge left and right pointers inward until they meet at index 3.\nleft = 0\nright = 6\n\nwhile left < right do\n  -- Increment left and decrement right\nend\n',
      rust:
        '// Bridge rune weights: [2, 3, 5, 7, 8, 11, 15] (indices 0..6)\n// Converge mutable left and right pointers inward until they meet at index 3.\nlet mut left = 0;\nlet mut right = 6;\n\nwhile left < right {\n    // Increment left and decrement right\n}\n',
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
