import { Level, World } from './types'

export const WORLD_2: World = {
  id: 'world-2-loops',
  number: 2,
  title: 'Looping Labyrinth',
  subtitle: 'Repetition & Iteration',
  description:
    'Harness while loops, bounded for iterations, and zero-indexed arrays to navigate dungeon corridors.',
  badge: 'Loop Sorcerer',
  themeColor: 'cyan',
  levelIds: ['level-4-march-forward', 'level-5-gem-collector', 'level-6-the-inventory-bag'],
}

export const WORLD_2_LEVELS: Level[] = [
  {
    id: 'level-4-march-forward',
    worldId: 'world-2-loops',
    number: 4,
    title: 'March Forward',
    subtitle: 'Indefinite Iteration with While Loops',
    concept: 'While Loops',
    badge: 'Persistent Strider',
    xp: 180,
    objective: 'Advance across the corridor using a while loop until the hero reaches the goal.',
    instructions: [
      'A while loop repeats instructions as long as its condition evaluates to true.',
      'The function at_goal() returns false while the hero has not yet reached (4, 0), and true once reached.',
      'Use while not at_goal(): step() in Python or while (!at_goal()) { step(); } in TypeScript.',
    ],
    gridConfig: {
      width: 5,
      height: 1,
      heroStart: { x: 0, y: 0 },
      heroDirection: 'east',
      goal: { x: 4, y: 0 },
      tiles: [['path', 'path', 'path', 'path', 'chest']],
      entities: [{ id: 'chest-1', x: 4, y: 0, type: 'chest' }],
    },
    visualizerConfig: {
      type: 'grid',
    },
    starterCode: {
      python: '# Keep walking forward until the hero reaches the goal.\n# Use at_goal() to test your position.\n\nwhile not at_goal():\n    # Take a step forward\n    pass\n',
      typescript: '// Keep walking forward until the hero reaches the goal.\n// Use at_goal() to test your position.\n\nwhile (!at_goal()) {\n  // Take a step forward\n}\n',
    },
    solutionCode: {
      python: 'while not at_goal():\n    step()\n',
      typescript: 'while (!at_goal()) {\n  step();\n}\n',
    },
    hints: [
      {
        tier: 1,
        title: 'Loop Termination',
        description: 'The while loop will continue running until at_goal() evaluates to true.',
      },
      {
        tier: 2,
        title: 'Taking Action',
        description: 'Inside the loop body, call step() to move one unit east each turn.',
        codeSnippet: {
          python: 'while not at_goal():\n    step()',
          typescript: 'while (!at_goal()) {\n  step();\n}',
        },
      },
      {
        tier: 3,
        title: 'Direct Solution',
        description: 'Replace pass or the empty body with step() so the hero traverses each corridor tile.',
        codeSnippet: {
          python: 'while not at_goal():\n    step()',
          typescript: 'while (!at_goal()) {\n  step();\n}',
        },
      },
    ],
    testCases: [
      {
        id: 'tc-1',
        name: 'March to the goal at (4, 0)',
        expected: true,
        description: 'Loop until at_goal() returns true at coordinate (4, 0)',
      },
    ],
    prepareCode: (userCode) => {
      return `${userCode}\n`
    },
  },
  {
    id: 'level-5-gem-collector',
    worldId: 'world-2-loops',
    number: 5,
    title: 'Gem Collector',
    subtitle: 'Definite Iteration & For Loops',
    concept: 'For Loops',
    badge: 'Gem Harvester',
    xp: 200,
    objective: 'Traverse the 5-tile bridge, collecting all gems along the way.',
    instructions: [
      'A for loop executes a block of code a fixed number of times using a range or counter.',
      'There are 5 bridge tiles from (0, 0) to (5, 0). Each tile contains a sparkling gem.',
      'Use a for loop running 5 times. Inside the loop, take a step and collect the gem.',
    ],
    gridConfig: {
      width: 6,
      height: 1,
      heroStart: { x: 0, y: 0 },
      heroDirection: 'east',
      goal: { x: 5, y: 0 },
      tiles: [['path', 'bridge', 'bridge', 'bridge', 'bridge', 'chest']],
      entities: [
        { id: 'gem-1', x: 1, y: 0, type: 'gem' },
        { id: 'gem-2', x: 2, y: 0, type: 'gem' },
        { id: 'gem-3', x: 3, y: 0, type: 'gem' },
        { id: 'gem-4', x: 4, y: 0, type: 'gem' },
        { id: 'gem-5', x: 5, y: 0, type: 'gem' },
      ],
    },
    visualizerConfig: {
      type: 'grid',
    },
    starterCode: {
      python: '# Cross the 5-tile bridge and harvest every gem!\n# On each repetition, step forward and collect the gem.\n\nfor i in range(5):\n    # Step onto the next tile\n    # Collect the gem\n    pass\n',
      typescript: '// Cross the 5-tile bridge and harvest every gem!\n// On each repetition, step forward and collect the gem.\n\nfor (let i = 0; i < 5; i++) {\n  // Step onto the next tile\n  // Collect the gem\n}\n',
    },
    solutionCode: {
      python: 'for i in range(5):\n    step()\n    collect()\n',
      typescript: 'for (let i = 0; i < 5; i++) {\n  step();\n  collect();\n}\n',
    },
    hints: [
      {
        tier: 1,
        title: 'Sequential Actions',
        description:
          'Inside the loop body, you should perform two actions: move to the tile with step(), then pick up the gem with collect().',
      },
      {
        tier: 2,
        title: 'Loop Structure',
        description: 'In Python use range(5). In TypeScript use for (let i = 0; i < 5; i++).',
        codeSnippet: {
          python: 'for i in range(5):\n    step()\n    collect()',
          typescript: 'for (let i = 0; i < 5; i++) {\n  step();\n  collect();\n}',
        },
      },
      {
        tier: 3,
        title: 'Direct Solution',
        description: 'Execute step() followed by collect() on each iteration of the 5-step loop.',
        codeSnippet: {
          python: 'for i in range(5):\n    step()\n    collect()',
          typescript: 'for (let i = 0; i < 5; i++) {\n  step();\n  collect();\n}',
        },
      },
    ],
    testCases: [
      {
        id: 'tc-1',
        name: 'Reach the end of the bridge at (5, 0)',
        expected: true,
        description: 'Hero must step 5 times to reach coordinate (5, 0)',
      },
    ],
    prepareCode: (userCode) => {
      return `${userCode}\n`
    },
  },
  {
    id: 'level-6-the-inventory-bag',
    worldId: 'world-2-loops',
    number: 6,
    title: 'The Inventory Bag',
    subtitle: 'Array & List Indexing',
    concept: 'Array Indexing',
    badge: 'Packmaster',
    xp: 220,
    objective:
      'Extract the potion from index 0 and the key from index 2 to unlock the sealed gate at (3, 0).',
    instructions: [
      'Arrays and lists are zero-indexed: the first element is at index 0, the second at 1, and the third at 2.',
      'Your adventurer bag holds items = ["potion", "shield", "key"].',
      'Assign items[0] to potion and items[2] to key. When both are retrieved, the sealed door opens and the hero steps 3 times to (3, 0).',
    ],
    gridConfig: {
      width: 4,
      height: 1,
      heroStart: { x: 0, y: 0 },
      heroDirection: 'east',
      goal: { x: 3, y: 0 },
      tiles: [['path', 'path', 'door', 'chest']],
      entities: [
        { id: 'door-1', x: 2, y: 0, type: 'door' },
        { id: 'chest-1', x: 3, y: 0, type: 'chest' },
      ],
    },
    visualizerConfig: {
      type: 'array',
      initialArray: ['potion', 'shield', 'key'],
    },
    starterCode: {
      python: '# items = ["potion", "shield", "key"] is in your inventory.\n# Access the 1st item (index 0) for your health potion\n# and the 3rd item (index 2) for the bronze key.\n\npotion = items[0]\nkey = items[0]  # Fix this index to get the key!\n',
      typescript: '// items = ["potion", "shield", "key"] is in your inventory.\n// Access the 1st item (index 0) for your health potion\n// and the 3rd item (index 2) for the bronze key.\n\nconst potion = items[0];\nconst key = items[0]; // Fix this index to get the key!\n',
    },
    solutionCode: {
      python: 'potion = items[0]\nkey = items[2]\n',
      typescript: 'const potion = items[0];\nconst key = items[2];\n',
    },
    hints: [
      {
        tier: 1,
        title: 'Zero-Based Indexing',
        description:
          "In programming, list indexing starts at 0. So items[0] is 'potion', items[1] is 'shield', and items[2] is 'key'.",
      },
      {
        tier: 2,
        title: 'Selecting the Key',
        description: 'The bronze key is the third item in the array, so its index is 2.',
        codeSnippet: {
          python: 'key = items[2]',
          typescript: 'const key = items[2];',
        },
      },
      {
        tier: 3,
        title: 'Direct Solution',
        description: 'Set potion = items[0] and key = items[2] to unlock the gate.',
        codeSnippet: {
          python: 'potion = items[0]\nkey = items[2]',
          typescript: 'const potion = items[0];\nconst key = items[2];',
        },
      },
    ],
    testCases: [
      {
        id: 'tc-1',
        name: 'Unlock door and reach chest at (3, 0)',
        expected: true,
        description: 'Correct indexing unlocks the door and advances hero 3 steps',
      },
    ],
    prepareCode: (userCode, language) => {
      if (language === 'python') {
        return `items = ["potion", "shield", "key"]\n${userCode}\nif locals().get('potion') == items[0] and locals().get('key') == items[2]:\n    for _ in range(3):\n        step()\n`
      }
      return `const items = ["potion", "shield", "key"];\n${userCode}\nif (typeof potion !== 'undefined' && typeof key !== 'undefined' && potion === items[0] && key === items[2]) {\n  for (let i = 0; i < 3; i++) {\n    step();\n  }\n}\n`
    },
  },
]
