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
      'Use while not at_goal(): step() in Python/Lua or while (!at_goal()) { step(); } in JavaScript/TypeScript.',
    ],
    availableActions: [
      { name: 'step', signature: 'step()', description: 'Moves hero forward 1 tile' },
      { name: 'at_goal', signature: 'at_goal()', description: 'Returns true when the hero reaches the goal' },
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
      python: '# Keep walking forward until the hero reaches the goal.\n# Built-in actions: at_goal() checks position, step() moves forward 1 tile.\n\nwhile not at_goal():\n    # Take a step forward using step()\n    pass\n',
      javascript: '// Keep walking forward until the hero reaches the goal.\n// Built-in actions: at_goal() checks position, step() moves forward 1 tile.\n\nwhile (!at_goal()) {\n  // Take a step forward using step()\n}\n',
      typescript: '// Keep walking forward until the hero reaches the goal.\n// Built-in actions: at_goal() checks position, step() moves forward 1 tile.\n\nwhile (!at_goal()) {\n  // Take a step forward using step()\n}\n',
      ruby: '# Keep walking forward until the hero reaches the goal.\n# Built-in actions: at_goal checks position, step moves forward 1 tile.\n\nwhile !at_goal\n  # Take a step forward using step\nend\n',
      lua: '-- Keep walking forward until the hero reaches the goal.\n-- Built-in actions: at_goal() checks position, step() moves forward 1 tile.\n\nwhile not at_goal() do\n  -- Take a step forward using step()\nend\n',
    },
    solutionCode: {
      python: 'while not at_goal():\n    step()\n',
      javascript: 'while (!at_goal()) {\n  step();\n}\n',
      typescript: 'while (!at_goal()) {\n  step();\n}\n',
      ruby: 'while !at_goal\n  step\nend\n',
      lua: 'while not at_goal() do\n  step()\nend\n',
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
          javascript: 'while (!at_goal()) {\n  step();\n}',
          typescript: 'while (!at_goal()) {\n  step();\n}',
          ruby: 'while !at_goal\n  step\nend',
          lua: 'while not at_goal() do\n  step()\nend',
        },
      },
      {
        tier: 3,
        title: 'Direct Solution',
        description: 'Advance step-by-step until reaching the goal.',
        codeSnippet: {
          python: 'while not at_goal():\n    step()',
          javascript: 'while (!at_goal()) {\n  step();\n}',
          typescript: 'while (!at_goal()) {\n  step();\n}',
          ruby: 'while !at_goal\n  step\nend',
          lua: 'while not at_goal() do\n  step()\nend',
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
      'Inside the loop, call step() to move forward onto each tile, then call collect() to pick up the gem!',
    ],
    availableActions: [
      { name: 'step', signature: 'step()', description: 'Moves hero forward 1 tile' },
      { name: 'collect', signature: 'collect()', description: 'Picks up the gem on the current tile' },
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
      python: '# Cross the 5-tile bridge and harvest every gem!\n# Built-in actions: step() moves forward 1 tile, collect() gathers the gem.\n\nfor i in range(5):\n    # Step onto the next tile (use step())\n    # Collect the gem (use collect())\n    pass\n',
      javascript: '// Cross the 5-tile bridge and harvest every gem!\n// Built-in actions: step() moves forward 1 tile, collect() gathers the gem.\n\nfor (let i = 0; i < 5; i++) {\n  // Step onto the next tile (use step())\n  // Collect the gem (use collect())\n}\n',
      typescript: '// Cross the 5-tile bridge and harvest every gem!\n// Built-in actions: step() moves forward 1 tile, collect() gathers the gem.\n\nfor (let i = 0; i < 5; i++) {\n  // Step onto the next tile (use step())\n  // Collect the gem (use collect())\n}\n',
      ruby: '# Cross the 5-tile bridge and harvest every gem!\n# Built-in actions: step moves forward 1 tile, collect gathers the gem.\n\n5.times do\n  # Step onto the next tile (use step)\n  # Collect the gem (use collect)\nend\n',
      lua: '-- Cross the 5-tile bridge and harvest every gem!\n-- Built-in actions: step() moves forward 1 tile, collect() gathers the gem.\n\nfor i = 1, 5 do\n  -- Step onto the next tile (use step())\n  -- Collect the gem (use collect())\nend\n',
    },
    solutionCode: {
      python: 'for i in range(5):\n    step()\n    collect()\n',
      javascript: 'for (let i = 0; i < 5; i++) {\n  step();\n  collect();\n}\n',
      typescript: 'for (let i = 0; i < 5; i++) {\n  step();\n  collect();\n}\n',
      ruby: '5.times do\n  step\n  collect\nend\n',
      lua: 'for i = 1, 5 do\n  step()\n  collect()\nend\n',
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
        description: 'Iterate 5 times across the bridge, calling step() and collect() each iteration.',
        codeSnippet: {
          python: 'for i in range(5):\n    step()\n    collect()',
          javascript: 'for (let i = 0; i < 5; i++) {\n  step();\n  collect();\n}',
          typescript: 'for (let i = 0; i < 5; i++) {\n  step();\n  collect();\n}',
          ruby: '5.times do\n  step\n  collect\nend',
          lua: 'for i = 1, 5 do\n  step()\n  collect()\nend',
        },
      },
      {
        tier: 3,
        title: 'Direct Solution',
        description: 'Execute step() followed by collect() on each iteration of the 5-step loop.',
        codeSnippet: {
          python: 'for i in range(5):\n    step()\n    collect()',
          javascript: 'for (let i = 0; i < 5; i++) {\n  step();\n  collect();\n}',
          typescript: 'for (let i = 0; i < 5; i++) {\n  step();\n  collect();\n}',
          ruby: '5.times do\n  step\n  collect\nend',
          lua: 'for i = 1, 5 do\n  step()\n  collect()\nend',
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
      'Arrays and lists allow index-based access: retrieve items by their offset.',
      'Your adventurer bag holds items = ["potion", "shield", "key"].',
      'Assign the potion and key from the items array to unlock the gate and step 3 times to (3, 0).',
    ],
    availableActions: [
      { name: 'items', signature: 'items[index]', description: 'Accesses item in bag at index (0 = potion, 2 = key)' },
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
      javascript: '// items = ["potion", "shield", "key"] is in your inventory.\n// Access the 1st item (index 0) for your health potion\n// and the 3rd item (index 2) for the bronze key.\n\nlet potion = items[0];\nlet key = items[0]; // Fix this index to get the key!\n',
      typescript: '// items = ["potion", "shield", "key"] is in your inventory.\n// Access the 1st item (index 0) for your health potion\n// and the 3rd item (index 2) for the bronze key.\n\nconst potion = items[0];\nconst key = items[0]; // Fix this index to get the key!\n',
      ruby: '# items = ["potion", "shield", "key"] is in your inventory.\n# Access the 1st item (index 0) for your health potion\n# and the 3rd item (index 2) for the bronze key.\n\npotion = items[0]\nkey = items[0]  # Fix this index to get the key!\n',
      lua: '-- items = {"potion", "shield", "key"} is in your inventory.\n-- Access the potion and the bronze key.\n\npotion = items[0]\nkey = items[0]  -- Fix this index to get the key!\n',
    },
    solutionCode: {
      python: 'potion = items[0]\nkey = items[2]\n',
      javascript: 'let potion = items[0];\nlet key = items[2];\n',
      typescript: 'const potion = items[0];\nconst key = items[2];\n',
      ruby: 'potion = items[0]\nkey = items[2]\n',
      lua: 'potion = items[0]\nkey = items[2]\n',
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
          javascript: 'let key = items[2];',
          typescript: 'const key = items[2];',
          ruby: 'key = items[2]',
          lua: 'key = items[2]',
        },
      },
      {
        tier: 3,
        title: 'Direct Solution',
        description: 'Set potion = items[0] and key = items[2] to unlock the gate.',
        codeSnippet: {
          python: 'potion = items[0]\nkey = items[2]',
          javascript: 'let potion = items[0];\nlet key = items[2];',
          typescript: 'const potion = items[0];\nconst key = items[2];',
          ruby: 'potion = items[0]\nkey = items[2]',
          lua: 'potion = items[0]\nkey = items[2]',
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
      if (language === 'ruby') {
        return `items = ["potion", "shield", "key"]\n${userCode}\nif defined?(potion) && defined?(key) && potion == items[0] && key == items[2]\n  3.times { step }\nend\n`
      }
      if (language === 'lua') {
        return `items = { [0] = "potion", [1] = "shield", [2] = "key", "potion", "shield", "key" }\n${userCode}\nif (potion == "potion") and (key == "key") then\n  for i = 1, 3 do step() end\nend\n`
      }
      return `const items = ["potion", "shield", "key"];\n${userCode}\nif (typeof potion !== 'undefined' && typeof key !== 'undefined' && potion === items[0] && key === items[2]) {\n  for (let i = 0; i < 3; i++) {\n    step();\n  }\n}\n`
    },
  },
]
