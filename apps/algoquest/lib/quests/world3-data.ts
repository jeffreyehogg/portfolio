import { Level, World } from './types'

export const WORLD_3: World = {
  id: 'world-3-data',
  number: 3,
  title: 'Citadel of Data',
  subtitle: 'Stacks & Algorithmic Pointers',
  description:
    'Unlock ancient pedestals using LIFO stacks and traverse vast bridges with converging two-pointer algorithms.',
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
    subtitle: 'Stacks & LIFO Operations',
    concept: 'Stacks',
    badge: 'Stack Master',
    xp: 250,
    objective:
      'Push 3 stones onto the pedestal stack, then pop the top stone to reveal the hidden key.',
    instructions: [
      'A Stack is a Last-In, First-Out (LIFO) data structure where elements are pushed onto the top and popped off the top.',
      'Initialize an empty stack: stack = [] (or stack = {} in Lua).',
      'Push 3 stones onto the stack using append/push (or table.insert in Lua).',
      'Call stack.pop() (or table.remove in Lua) to pop the topmost stone and retrieve the key, lowering the barrier so the hero can step to (1, 0).',
    ],
    availableActions: [
      { name: 'push', signature: 'stack.push() / append() / table.insert()', description: 'Pushes a stone onto the top of the stack' },
      { name: 'pop', signature: 'stack.pop() / table.remove()', description: 'Pops and retrieves the topmost stone from the stack' },
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
      targetStack: ['stone', 'stone'],
    },
    starterCode: {
      python: '# The pedestal stack holds ancient weighted runes.\n# 1. Push 3 stones onto the stack using stack.append("stone")\n# 2. Pop the top stone using stack.pop() to reveal the key!\n\nstack = []\n\n# Push 3 stones:\nstack.append("stone")\n\n# Pop the top stone:\n# key = stack.pop()\n',
      javascript: '// The pedestal stack holds ancient weighted runes.\n// 1. Push 3 stones onto the stack using stack.push("stone")\n// 2. Pop the top stone using stack.pop() to reveal the key!\n\nconst stack = [];\n\n// Push 3 stones:\nstack.push("stone");\n\n// Pop the top stone:\n// const key = stack.pop();\n',
      typescript: '// The pedestal stack holds ancient weighted runes.\n// 1. Push 3 stones onto the stack using stack.push("stone")\n// 2. Pop the top stone using stack.pop() to reveal the key!\n\nconst stack: string[] = [];\n\n// Push 3 stones:\nstack.push("stone");\n\n// Pop the top stone:\n// const key = stack.pop();\n',
      ruby: '# The pedestal stack holds ancient weighted runes.\n# 1. Push 3 stones onto the stack using stack.push("stone")\n# 2. Pop the top stone using stack.pop to reveal the key!\n\nstack = []\n\n# Push 3 stones:\nstack.push("stone")\n\n# Pop the top stone:\n# key = stack.pop\n',
      lua: '-- The pedestal stack holds ancient weighted runes.\n-- 1. Push 3 stones onto the stack using table.insert(stack, "stone")\n-- 2. Pop the top stone using table.remove(stack) to reveal the key!\n\nstack = {}\n\n-- Push 3 stones:\ntable.insert(stack, "stone")\n\n-- Pop the top stone:\n-- key = table.remove(stack)\n',
    },
    solutionCode: {
      python: 'stack = []\nstack.append("stone")\nstack.append("stone")\nstack.append("stone")\nkey = stack.pop()\n',
      javascript: 'const stack = [];\nstack.push("stone");\nstack.push("stone");\nstack.push("stone");\nconst key = stack.pop();\n',
      typescript: 'const stack: string[] = [];\nstack.push("stone");\nstack.push("stone");\nstack.push("stone");\nconst key = stack.pop();\n',
      ruby: 'stack = []\nstack.push("stone")\nstack.push("stone")\nstack.push("stone")\nkey = stack.pop\n',
      lua: 'stack = {}\ntable.insert(stack, "stone")\ntable.insert(stack, "stone")\ntable.insert(stack, "stone")\nkey = table.remove(stack)\n',
    },
    hints: [
      {
        tier: 1,
        title: 'Pushing Elements',
        description: 'Add stones to the stack three times, then pop one item off the top.',
      },
      {
        tier: 2,
        title: 'LIFO Pop',
        description:
          'Call pop to remove and retrieve the most recently pushed item. The stack will end with 2 stones.',
        codeSnippet: {
          python: 'key = stack.pop()',
          javascript: 'const key = stack.pop();',
          typescript: 'const key = stack.pop();',
          ruby: 'key = stack.pop',
          lua: 'key = table.remove(stack)',
        },
      },
      {
        tier: 3,
        title: 'Direct Solution',
        description: 'Push 3 stones, then pop one so the stack has length 2.',
        codeSnippet: {
          python:
            'stack = []\nstack.append("stone")\nstack.append("stone")\nstack.append("stone")\nkey = stack.pop()',
          javascript:
            'const stack = [];\nstack.push("stone");\nstack.push("stone");\nstack.push("stone");\nconst key = stack.pop();',
          typescript:
            'const stack: string[] = [];\nstack.push("stone");\nstack.push("stone");\nstack.push("stone");\nconst key = stack.pop();',
          ruby:
            'stack = []\nstack.push("stone")\nstack.push("stone")\nstack.push("stone")\nkey = stack.pop',
          lua:
            'stack = {}\ntable.insert(stack, "stone")\ntable.insert(stack, "stone")\ntable.insert(stack, "stone")\nkey = table.remove(stack)',
        },
      },
    ],
    testCases: [
      {
        id: 'tc-1',
        name: 'Stack has 2 stones remaining and hero reaches pedestal',
        expected: true,
        description: 'Stack operations activate the pedestal at (1, 0)',
      },
    ],
    prepareCode: (userCode, language) => {
      if (language === 'python') {
        return `${userCode}\nif 'stack' in locals() and len(stack) == 2:\n    step()\n`
      }
      if (language === 'ruby') {
        return `${userCode}\nif defined?(stack) && stack.length == 2\n  step\nend\n`
      }
      if (language === 'lua') {
        return `${userCode}\nif stack ~= nil and #stack == 2 then\n  step()\nend\n`
      }
      return `${userCode}\nif (typeof stack !== 'undefined' && Array.isArray(stack) && stack.length === 2) {\n  step();\n}\n`
    },
  },
  {
    id: 'level-8-the-dual-bridges',
    worldId: 'world-3-data',
    number: 8,
    title: 'The Dual Bridges',
    subtitle: 'Converging Pointers Algorithm',
    concept: 'Two Pointers',
    badge: 'Convergence Sage',
    xp: 300,
    objective:
      'Advance two pointers from opposite ends of the bridge until they meet at the central keystone (3, 0).',
    instructions: [
      'The Two Pointers technique uses two references traversing a sequence from different ends toward each other.',
      'Initialize left = 0 and right = 6 representing the bridge span.',
      'Run a while loop while left < right: increment left by 1 and decrement right by 1 on each step.',
      'When the pointers meet at index 3, the bridge stabilizes and the hero claims the central keystone.',
    ],
    availableActions: [
      { name: 'pointers', signature: 'left += 1 / right -= 1', description: 'Advances pointer indices inward toward center' },
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
      initialArray: ['0', '1', '2', '3', '4', '5', '6'],
    },
    starterCode: {
      python: '# The bridge extends from index 0 to index 6.\n# Use two pointers converging toward each other.\nleft = 0\nright = 6\n\nwhile left < right:\n    # Advance left pointer inward\n    # Advance right pointer inward\n    pass\n',
      javascript: '// The bridge extends from index 0 to index 6.\n// Use two pointers converging toward each other.\nlet left = 0;\nlet right = 6;\n\nwhile (left < right) {\n  // Advance left pointer inward\n  // Advance right pointer inward\n}\n',
      typescript: '// The bridge extends from index 0 to index 6.\n// Use two pointers converging toward each other.\nlet left = 0;\nlet right = 6;\n\nwhile (left < right) {\n  // Advance left pointer inward\n  // Advance right pointer inward\n}\n',
      ruby: '# The bridge extends from index 0 to index 6.\n# Use two pointers converging toward each other.\nleft = 0\nright = 6\n\nwhile left < right\n  # Advance left pointer inward\n  # Advance right pointer inward\nend\n',
      lua: '-- The bridge extends from index 0 to index 6.\n-- Use two pointers converging toward each other.\nleft = 0\nright = 6\n\nwhile left < right do\n  -- Advance left pointer inward\n  -- Advance right pointer inward\nend\n',
    },
    solutionCode: {
      python: 'left = 0\nright = 6\n\nwhile left < right:\n    left += 1\n    right -= 1\n',
      javascript: 'let left = 0;\nlet right = 6;\n\nwhile (left < right) {\n  left += 1;\n  right -= 1;\n}\n',
      typescript: 'let left = 0;\nlet right = 6;\n\nwhile (left < right) {\n  left += 1;\n  right -= 1;\n}\n',
      ruby: 'left = 0\nright = 6\n\nwhile left < right\n  left += 1\n  right -= 1\nend\n',
      lua: 'left = 0\nright = 6\n\nwhile left < right do\n  left = left + 1\n  right = right - 1\nend\n',
    },
    hints: [
      {
        tier: 1,
        title: 'Inward Traversal',
        description:
          'To move pointers toward the center, increment left (+1) and decrement right (-1).',
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
      return `${userCode}\nif (typeof left !== 'undefined' && typeof right !== 'undefined' && left === 3 && right === 3) {\n  if (!at_goal()) {\n    for (let i = 0; i < 3; i++) {\n      step();\n    }\n  }\n}\n`
    },
  },
]
