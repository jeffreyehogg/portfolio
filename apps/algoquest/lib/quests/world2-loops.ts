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
    objective: 'Use a while loop to keep stepping forward until the hero reaches the chest at (4, 0).',
    instructions: [
      'at_goal() returns false while your hero is still on the path, and true once you reach (4, 0).',
      'Inside the while loop, call step() so the hero keeps moving 1 tile at a time.',
    ],
    howItWorks:
      'Each loop iteration calls step(), advancing your hero 1 tile East until at_goal() becomes true.',
    availableActions: [
      {
        name: 'step',
        kind: 'command',
        signature: 'step()',
        signatures: { ruby: 'step' },
        description: 'Moves hero forward 1 tile',
      },
      {
        name: 'at_goal',
        kind: 'command',
        signature: 'at_goal()',
        signatures: { ruby: 'at_goal' },
        description: 'Returns true when the hero reaches the goal',
      },
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
      python: 'while not at_goal():\n    # TODO: Move forward 1 tile using step()\n    pass\n',
      javascript: 'while (!at_goal()) {\n  // TODO: Move forward 1 tile using step()\n}\n',
      typescript: 'while (!at_goal()) {\n  // TODO: Move forward 1 tile using step()\n}\n',
      ruby: 'while !at_goal\n  # TODO: Move forward 1 tile using step\nend\n',
      lua: 'while not at_goal() do\n  -- TODO: Move forward 1 tile using step()\nend\n',
      rust: 'while !at_goal() {\n    // TODO: Move forward 1 tile using step()\n}\n',
    },
    solutionCode: {
      python: 'while not at_goal():\n    step()\n',
      javascript: 'while (!at_goal()) {\n  step();\n}\n',
      typescript: 'while (!at_goal()) {\n  step();\n}\n',
      ruby: 'while !at_goal\n  step\nend\n',
      lua: 'while not at_goal() do\n  step()\nend\n',
      rust: 'while !at_goal() {\n    step();\n}\n',
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
          rust: 'while !at_goal() {\n    step();\n}',
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
          rust: 'while !at_goal() {\n    step();\n}',
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
    objective: 'Cross the 5-tile bridge in a for loop and collect all 5 gems along the way.',
    instructions: [
      'Your for loop runs 5 times—once for each tile from (1, 0) to (5, 0).',
      'Inside the loop, call step() to move onto the tile, then call collect() to pick up its gem.',
    ],
    howItWorks:
      'You pass when your hero reaches (5, 0) with all 5 gems collected.',
    availableActions: [
      {
        name: 'step',
        kind: 'command',
        signature: 'step()',
        signatures: { ruby: 'step' },
        description: 'Moves hero forward 1 tile',
      },
      {
        name: 'collect',
        kind: 'command',
        signature: 'collect()',
        signatures: { ruby: 'collect' },
        description: 'Picks up the gem on the current tile',
      },
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
      python: 'for i in range(5):\n    # TODO 1: Move onto the next tile with step()\n    # TODO 2: Pick up the gem with collect()\n    pass\n',
      javascript: 'for (let i = 0; i < 5; i++) {\n  // TODO 1: Move onto the next tile with step()\n  // TODO 2: Pick up the gem with collect()\n}\n',
      typescript: 'for (let i = 0; i < 5; i++) {\n  // TODO 1: Move onto the next tile with step()\n  // TODO 2: Pick up the gem with collect()\n}\n',
      ruby: '5.times do\n  # TODO 1: Move onto the next tile with step\n  # TODO 2: Pick up the gem with collect\nend\n',
      lua: 'for i = 1, 5 do\n  -- TODO 1: Move onto the next tile with step()\n  -- TODO 2: Pick up the gem with collect()\nend\n',
      rust: 'for i in 0..5 {\n    // TODO 1: Move onto the next tile with step()\n    // TODO 2: Pick up the gem with collect()\n}\n',
    },
    solutionCode: {
      python: 'for i in range(5):\n    step()\n    collect()\n',
      javascript: 'for (let i = 0; i < 5; i++) {\n  step();\n  collect();\n}\n',
      typescript: 'for (let i = 0; i < 5; i++) {\n  step();\n  collect();\n}\n',
      ruby: '5.times do\n  step\n  collect\nend\n',
      lua: 'for i = 1, 5 do\n  step()\n  collect()\nend\n',
      rust: 'for i in 0..5 {\n    step();\n    collect();\n}\n',
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
          rust: 'for i in 0..5 {\n    step();\n    collect();\n}',
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
          rust: 'for i in 0..5 {\n    step();\n    collect();\n}',
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
      {
        id: 'tc-2',
        name: 'Harvest all 5 gems along the bridge',
        expected: { atGoal: true, inventoryCount: 5 },
        description: 'Hero must call collect() on all 5 bridge tiles',
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
      'Use zero-based array indexing to grab "potion" (index 0) and "key" (index 2) from your inventory.',
    instructions: [
      'Arrays start at index 0: index 0 is "potion", index 1 is "shield", and index 2 is "key".',
      'Update key = items[0] in the editor so it reads the key at index 2 instead.',
    ],
    howItWorks:
      'When potion == "potion" and key == "key", the sealed door opens and your hero walks to the chest.',
    preloadedContext: {
      python: 'items = ["potion", "shield", "key"]',
      javascript: 'const items = ["potion", "shield", "key"];',
      typescript: 'const items = ["potion", "shield", "key"];',
      ruby: 'items = ["potion", "shield", "key"]',
      lua: 'items = { [0]="potion", [1]="shield", [2]="key" }',
      rust: 'let items = vec!["potion", "shield", "key"];',
    },
    availableActions: [
      {
        name: 'potion',
        kind: 'variable',
        signature: 'potion = items[0]',
        signatures: {
          python: 'potion = items[0]',
          javascript: 'let potion = items[0];',
          typescript: 'const potion = items[0];',
          ruby: 'potion = items[0]',
          lua: 'potion = items[0]',
          rust: 'let potion = items[0];',
        },
        description: '1st item in items ("potion")',
      },
      {
        name: 'key',
        kind: 'variable',
        signature: 'key = items[2]',
        signatures: {
          python: 'key = items[<index>]',
          javascript: 'let key = items[<index>];',
          typescript: 'const key = items[<index>];',
          ruby: 'key = items[<index>]',
          lua: 'key = items[<index>]',
          rust: 'let key = items[<index>];',
        },
        description: 'Must point to "key" (3rd item) to unlock the door',
      },
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
      python: 'potion = items[0]\n# TODO: Change index 0 to the index of "key"\nkey = items[0]\n',
      javascript: 'let potion = items[0];\n// TODO: Change index 0 to the index of "key"\nlet key = items[0];\n',
      typescript: 'const potion = items[0];\n// TODO: Change index 0 to the index of "key"\nconst key = items[0];\n',
      ruby: 'potion = items[0]\n# TODO: Change index 0 to the index of "key"\nkey = items[0]\n',
      lua: 'potion = items[0]\n-- TODO: Change index 0 to the index of "key"\nkey = items[0]\n',
      rust: 'let potion = items[0];\n// TODO: Change index 0 to the index of "key"\nlet key = items[0];\n',
    },
    solutionCode: {
      python: 'potion = items[0]\nkey = items[2]\n',
      javascript: 'let potion = items[0];\nlet key = items[2];\n',
      typescript: 'const potion = items[0];\nconst key = items[2];\n',
      ruby: 'potion = items[0]\nkey = items[2]\n',
      lua: 'potion = items[0]\nkey = items[2]\n',
      rust: 'let potion = items[0];\nlet key = items[2];\n',
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
          rust: 'let key = items[2];',
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
          rust: 'let potion = items[0];\nlet key = items[2];',
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
      if (language === 'rust') {
        return `let items = vec!["potion", "shield", "key"];\n${userCode}\nif potion == "potion" && key == "key" {\n    for _i in 0..3 {\n        step();\n    }\n}\n`
      }
      return `const items = ["potion", "shield", "key"];\n${userCode}\nif (typeof potion !== 'undefined' && typeof key !== 'undefined' && potion === items[0] && key === items[2]) {\n  for (let i = 0; i < 3; i++) {\n    step();\n  }\n}\n`
    },
  },
]
