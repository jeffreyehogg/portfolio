import { Level, World } from './types'

export const WORLD_1: World = {
  id: 'world-1-basics',
  number: 1,
  title: 'Verdant Vale',
  subtitle: 'Variables, 2D Navigation & Branching',
  description:
    'Master variables, 2D corner navigation with turn() and step(), string passwords, and conditional lava vaulting.',
  badge: 'Rune Initiate',
  themeColor: 'emerald',
  levelIds: ['level-1-first-step', 'level-2-the-gatekeeper', 'level-3-the-danger-tile'],
}

export const WORLD_1_LEVELS: Level[] = [
  {
    id: 'level-1-first-step',
    worldId: 'world-1-basics',
    number: 1,
    title: 'The First Step',
    subtitle: 'Variables & 2D Corner Navigation',
    concept: 'Variables & 2D Moves',
    badge: 'First Spark',
    xp: 100,
    optimalSteps: 5,
    objective:
      'Step South around the stone wall to (0, 1), face East, and set steps = 3 to march to the chest at (3, 1).',
    instructions: [
      'A stone wall blocks row y:0! The hero must first step South to (0, 1) and turn("east") to face the open corridor.',
      'Once aligned on row y:1, the variable steps controls how many tiles East the hero marches.',
      'Update steps from 1 to 3 so the hero marches all the way to the treasure chest at (3, 1)!',
    ],
    availableActions: [
      { name: 'turn', signature: 'turn("south" | "east")', description: 'Rotates the hero to face a new compass direction' },
      { name: 'step', signature: 'step()', description: 'Moves the hero 1 tile forward in the current direction' },
      { name: 'steps', signature: 'steps = 3', description: 'Number of tiles to march East along row y:1' },
    ],
    gridConfig: {
      width: 4,
      height: 2,
      heroStart: { x: 0, y: 0 },
      heroDirection: 'east',
      goal: { x: 3, y: 1 },
      tiles: [
        ['path', 'wall', 'wall', 'wall'],
        ['stone', 'path', 'path', 'chest'],
      ],
      entities: [{ id: 'chest-1', x: 3, y: 1, type: 'chest' }],
    },
    visualizerConfig: {
      type: 'grid',
    },
    starterCode: {
      python:
        '# Step around the wall to (0, 1) and face East:\nturn("south")\nstep()\nturn("east")\n\n# Update steps to 3 to reach the treasure chest at (3, 1):\nsteps = 1\n',
      javascript:
        '// Step around the wall to (0, 1) and face East:\nturn("south");\nstep();\nturn("east");\n\n// Update steps to 3 to reach the treasure chest at (3, 1):\nlet steps = 1;\n',
      typescript:
        '// Step around the wall to (0, 1) and face East:\nturn("south");\nstep();\nturn("east");\n\n// Update steps to 3 to reach the treasure chest at (3, 1):\nconst steps: number = 1;\n',
      ruby:
        '# Step around the wall to (0, 1) and face East:\nturn("south")\nstep\nturn("east")\n\n# Update steps to 3 to reach the treasure chest at (3, 1):\nsteps = 1\n',
      lua:
        '-- Step around the wall to (0, 1) and face East:\nturn("south")\nstep()\nturn("east")\n\n-- Update steps to 3 to reach the treasure chest at (3, 1):\nsteps = 1\n',
      rust:
        '// Step around the wall to (0, 1) and face East:\nturn("south");\nstep();\nturn("east");\n\n// Update steps to 3 to reach the treasure chest at (3, 1):\nlet steps: i32 = 1;\n',
    },
    solutionCode: {
      python: 'turn("south")\nstep()\nturn("east")\nsteps = 3\n',
      javascript: 'turn("south");\nstep();\nturn("east");\nlet steps = 3;\n',
      typescript: 'turn("south");\nstep();\nturn("east");\nconst steps: number = 3;\n',
      ruby: 'turn("south")\nstep\nturn("east")\nsteps = 3\n',
      lua: 'turn("south")\nstep()\nturn("east")\nsteps = 3\n',
      rust: 'turn("south");\nstep();\nturn("east");\nlet steps: i32 = 3;\n',
    },
    hints: [
      {
        tier: 1,
        title: '2D Corridor Distance',
        description:
          'After stepping South to (0, 1) and turning East, count how many tiles remain between x:0 and the chest at x:3.',
      },
      {
        tier: 2,
        title: 'Update the steps Variable',
        description:
          'Keep the turn("south"), step(), and turn("east") calls, and change steps = 1 to steps = 3.',
        codeSnippet: {
          python: 'turn("south")\nstep()\nturn("east")\nsteps = 3',
          javascript: 'turn("south");\nstep();\nturn("east");\nlet steps = 3;',
          typescript: 'turn("south");\nstep();\nturn("east");\nconst steps: number = 3;',
          ruby: 'turn("south")\nstep\nturn("east")\nsteps = 3',
          lua: 'turn("south")\nstep()\nturn("east")\nsteps = 3',
          rust: 'turn("south");\nstep();\nturn("east");\nlet steps: i32 = 3;',
        },
      },
      {
        tier: 3,
        title: 'Direct Solution',
        description: 'Step South to row y:1, turn East, and set steps = 3 to reach (3, 1).',
        codeSnippet: {
          python: 'turn("south")\nstep()\nturn("east")\nsteps = 3',
          javascript: 'turn("south");\nstep();\nturn("east");\nlet steps = 3;',
          typescript: 'turn("south");\nstep();\nturn("east");\nconst steps: number = 3;',
          ruby: 'turn("south")\nstep\nturn("east")\nsteps = 3',
          lua: 'turn("south")\nstep()\nturn("east")\nsteps = 3',
          rust: 'turn("south");\nstep();\nturn("east");\nlet steps: i32 = 3;',
        },
      },
    ],
    testCases: [
      {
        id: 'tc-1',
        name: 'Navigate 2D corner and reach chest at (3, 1)',
        expected: true,
        description: 'Hero must step South to (0, 1), turn East, and advance 3 steps to (3, 1)',
      },
    ],
    prepareCode: (userCode, language) => {
      if (language === 'python') {
        return `${userCode}\nif 'steps' in locals():\n    for _ in range(int(steps)):\n        step()\n`
      }
      if (language === 'ruby') {
        return `${userCode}\nif defined?(steps)\n  (steps.to_i).times { step }\nend\n`
      }
      if (language === 'lua') {
        return `${userCode}\nif steps ~= nil then\n  for i = 1, tonumber(steps) do\n    step()\n  end\nend\n`
      }
      if (language === 'rust') {
        return `${userCode}\nfor _i in 0..steps {\n    step();\n}\n`
      }
      return `${userCode}\nif (typeof steps !== 'undefined') {\n  for (let i = 0; i < Number(steps); i++) {\n    step();\n  }\n}\n`
    },
  },
  {
    id: 'level-2-the-gatekeeper',
    worldId: 'world-1-basics',
    number: 2,
    title: 'The Gatekeeper',
    subtitle: 'Strings & 2D Gatehouse Passage',
    concept: 'Strings & Gates',
    badge: 'Wordweaver',
    xp: 120,
    optimalSteps: 6,
    objective:
      'Step South into the gatehouse hall (0, 1), face East, and set password = "open" to cross the gate to (4, 1).',
    instructions: [
      'The iron gate at (2, 1) guards the lower vault hall along row y:1.',
      'First, step South from (0, 0) to (0, 1) and call turn("east") to face the gate.',
      'Then set password = "open" to lower the iron bars and march 4 tiles East to the chest at (4, 1)!',
    ],
    availableActions: [
      { name: 'turn', signature: 'turn("south" | "east")', description: 'Rotates the hero to face the gatehouse corridor' },
      { name: 'step', signature: 'step()', description: 'Moves 1 tile forward' },
      { name: 'password', signature: 'password = "open"', description: 'Unseals the gate and advances 4 tiles East' },
    ],
    gridConfig: {
      width: 5,
      height: 2,
      heroStart: { x: 0, y: 0 },
      heroDirection: 'east',
      goal: { x: 4, y: 1 },
      tiles: [
        ['path', 'wall', 'wall', 'wall', 'wall'],
        ['stone', 'path', 'gate', 'path', 'chest'],
      ],
      entities: [
        { id: 'gate-1', x: 2, y: 1, type: 'gate' },
        { id: 'chest-1', x: 4, y: 1, type: 'chest' },
      ],
    },
    visualizerConfig: {
      type: 'grid',
    },
    starterCode: {
      python:
        '# Enter the lower gatehouse corridor at (0, 1):\nturn("south")\nstep()\nturn("east")\n\n# Change password to "open" to lower the gate and cross to (4, 1):\npassword = "closed"\n',
      javascript:
        '// Enter the lower gatehouse corridor at (0, 1):\nturn("south");\nstep();\nturn("east");\n\n// Change password to "open" to lower the gate and cross to (4, 1):\nlet password = "closed";\n',
      typescript:
        '// Enter the lower gatehouse corridor at (0, 1):\nturn("south");\nstep();\nturn("east");\n\n// Change password to "open" to lower the gate and cross to (4, 1):\nconst password: string = "closed";\n',
      ruby:
        '# Enter the lower gatehouse corridor at (0, 1):\nturn("south")\nstep\nturn("east")\n\n# Change password to "open" to lower the gate and cross to (4, 1):\npassword = "closed"\n',
      lua:
        '-- Enter the lower gatehouse corridor at (0, 1):\nturn("south")\nstep()\nturn("east")\n\n-- Change password to "open" to lower the gate and cross to (4, 1):\npassword = "closed"\n',
      rust:
        '// Enter the lower gatehouse corridor at (0, 1):\nturn("south");\nstep();\nturn("east");\n\n// Change password to "open" to lower the gate and cross to (4, 1):\nlet password: &str = "closed";\n',
    },
    solutionCode: {
      python: 'turn("south")\nstep()\nturn("east")\npassword = "open"\n',
      javascript: 'turn("south");\nstep();\nturn("east");\nlet password = "open";\n',
      typescript: 'turn("south");\nstep();\nturn("east");\nconst password: string = "open";\n',
      ruby: 'turn("south")\nstep\nturn("east")\npassword = "open"\n',
      lua: 'turn("south")\nstep()\nturn("east")\npassword = "open"\n',
      rust: 'turn("south");\nstep();\nturn("east");\nlet password: &str = "open";\n',
    },
    hints: [
      {
        tier: 1,
        title: 'String Password',
        description: 'Strings are enclosed in quotes. The gate only responds to the string "open".',
      },
      {
        tier: 2,
        title: 'Unsealing the Lower Hall',
        description:
          'Keep the 2D movement into (0, 1) and change password from "closed" to "open".',
        codeSnippet: {
          python: 'turn("south")\nstep()\nturn("east")\npassword = "open"',
          javascript: 'turn("south");\nstep();\nturn("east");\nlet password = "open";',
          typescript: 'turn("south");\nstep();\nturn("east");\nconst password: string = "open";',
          ruby: 'turn("south")\nstep\nturn("east")\npassword = "open"',
          lua: 'turn("south")\nstep()\nturn("east")\npassword = "open"',
          rust: 'turn("south");\nstep();\nturn("east");\nlet password: &str = "open";',
        },
      },
      {
        tier: 3,
        title: 'Direct Solution',
        description: 'Step into the lower hall, face East, and set password = "open".',
        codeSnippet: {
          python: 'turn("south")\nstep()\nturn("east")\npassword = "open"',
          javascript: 'turn("south");\nstep();\nturn("east");\nlet password = "open";',
          typescript: 'turn("south");\nstep();\nturn("east");\nconst password: string = "open";',
          ruby: 'turn("south")\nstep\nturn("east")\npassword = "open"',
          lua: 'turn("south")\nstep()\nturn("east")\npassword = "open"',
          rust: 'turn("south");\nstep();\nturn("east");\nlet password: &str = "open";',
        },
      },
    ],
    testCases: [
      {
        id: 'tc-1',
        name: 'Unseal the gate and reach the vault chest at (4, 1)',
        expected: true,
        description: 'Setting password to "open" after entering row y:1 advances hero to (4, 1)',
      },
    ],
    prepareCode: (userCode, language) => {
      if (language === 'python') {
        return `${userCode}\nif 'password' in locals() and password == "open":\n    for _ in range(4):\n        step()\n`
      }
      if (language === 'ruby') {
        return `${userCode}\nif defined?(password) && password == "open"\n  4.times { step }\nend\n`
      }
      if (language === 'lua') {
        return `${userCode}\nif password == "open" then\n  for i = 1, 4 do\n    step()\n  end\nend\n`
      }
      if (language === 'rust') {
        return `${userCode}\nif password == "open" {\n    for _i in 0..4 {\n        step();\n    }\n}\n`
      }
      return `${userCode}\nif (typeof password !== 'undefined' && password === "open") {\n  for (let i = 0; i < 4; i++) {\n    step();\n  }\n}\n`
    },
  },
  {
    id: 'level-3-the-danger-tile',
    worldId: 'world-1-basics',
    number: 3,
    title: 'The Danger Tile',
    subtitle: 'Conditionals & Lava Vaulting',
    concept: 'Conditionals',
    badge: 'Lava Vaulter',
    xp: 150,
    optimalSteps: 2,
    objective:
      'Inspect the tile ahead. If tile == "lava", jump() over the trap to (2, 0), then step() onto the chest at (3, 0).',
    instructions: [
      'A molten lava fissure blocks tile (1, 0). Stepping onto it triggers a fatal HazardError.',
      'The sensor variable tile is set to "lava". Inside the if branch, call jump() to leap 2 tiles from (0, 0) to (2, 0).',
      'After the if/else block completes, call step() once more to advance from (2, 0) onto the chest at (3, 0)!',
    ],
    availableActions: [
      { name: 'jump', signature: 'jump()', description: 'Leaps 2 tiles forward over lava traps' },
      { name: 'step', signature: 'step()', description: 'Moves hero forward 1 tile' },
    ],
    gridConfig: {
      width: 4,
      height: 1,
      heroStart: { x: 0, y: 0 },
      heroDirection: 'east',
      goal: { x: 3, y: 0 },
      tiles: [['path', 'lava', 'path', 'chest']],
      entities: [{ id: 'chest-1', x: 3, y: 0, type: 'chest' }],
    },
    visualizerConfig: {
      type: 'grid',
    },
    starterCode: {
      python:
        '# tile is set to "lava" at (1, 0).\n# 1. If tile == "lava", call jump() to land on (2, 0)\n# 2. Then call step() after the if/else block to reach the chest at (3, 0)\n\nif tile == "lava":\n    pass\nelse:\n    step()\n',
      javascript:
        '// tile is set to "lava" at (1, 0).\n// 1. If tile === "lava", call jump() to land on (2, 0)\n// 2. Then call step() after the if/else block to reach the chest at (3, 0)\n\nif (tile === "lava") {\n  // Leap over the lava\n} else {\n  step();\n}\n',
      typescript:
        '// tile is set to "lava" at (1, 0).\n// 1. If tile === "lava", call jump() to land on (2, 0)\n// 2. Then call step() after the if/else block to reach the chest at (3, 0)\n\nif (tile === "lava") {\n  // Leap over the lava\n} else {\n  step();\n}\n',
      ruby:
        '# tile is set to "lava" at (1, 0).\n# 1. If tile == "lava", call jump to land on (2, 0)\n# 2. Then call step after the if/else block to reach the chest at (3, 0)\n\nif tile == "lava"\n  # Leap over the lava\nelse\n  step\nend\n',
      lua:
        '-- tile is set to "lava" at (1, 0).\n-- 1. If tile == "lava", call jump() to land on (2, 0)\n-- 2. Then call step() after the if/else block to reach the chest at (3, 0)\n\nif tile == "lava" then\n  -- Leap over the lava\nelse\n  step()\nend\n',
      rust:
        '// tile is set to "lava" at (1, 0).\n// 1. If tile == "lava", call jump() to land on (2, 0)\n// 2. Then call step() after the if/else block to reach the chest at (3, 0)\n\nif tile == "lava" {\n    // Leap over the lava\n} else {\n    step();\n}\n',
    },
    solutionCode: {
      python: 'if tile == "lava":\n    jump()\nelse:\n    step()\nstep()\n',
      javascript: 'if (tile === "lava") {\n  jump();\n} else {\n  step();\n}\nstep();\n',
      typescript: 'if (tile === "lava") {\n  jump();\n} else {\n  step();\n}\nstep();\n',
      ruby: 'if tile == "lava"\n  jump\nelse\n  step\nend\nstep\n',
      lua: 'if tile == "lava" then\n  jump()\nelse\n  step()\nend\nstep()\n',
      rust: 'if tile == "lava" {\n    jump();\n} else {\n    step();\n}\nstep();\n',
    },
    hints: [
      {
        tier: 1,
        title: 'Jump First, Then Step',
        description:
          'Calling jump() from (0, 0) lands the hero safely on (2, 0). From (2, 0), one final step() reaches (3, 0).',
      },
      {
        tier: 2,
        title: 'Branching + Final Advance',
        description:
          'Put jump() inside the if branch, and add step() after the if/else statement.',
        codeSnippet: {
          python: 'if tile == "lava":\n    jump()\nelse:\n    step()\nstep()',
          javascript: 'if (tile === "lava") {\n  jump();\n} else {\n  step();\n}\nstep();',
          typescript: 'if (tile === "lava") {\n  jump();\n} else {\n  step();\n}\nstep();',
          ruby: 'if tile == "lava"\n  jump\nelse\n  step\nend\nstep',
          lua: 'if tile == "lava" then\n  jump()\nelse\n  step()\nend\nstep()',
          rust: 'if tile == "lava" {\n    jump();\n} else {\n    step();\n}\nstep();',
        },
      },
      {
        tier: 3,
        title: 'Complete Solution',
        description: 'Jump over the lava at (1, 0) and take one final step to (3, 0).',
        codeSnippet: {
          python: 'if tile == "lava":\n    jump()\nelse:\n    step()\nstep()',
          javascript: 'if (tile === "lava") {\n  jump();\n} else {\n  step();\n}\nstep();',
          typescript: 'if (tile === "lava") {\n  jump();\n} else {\n  step();\n}\nstep();',
          ruby: 'if tile == "lava"\n  jump\nelse\n  step\nend\nstep',
          lua: 'if tile == "lava" then\n  jump()\nelse\n  step()\nend\nstep()',
          rust: 'if tile == "lava" {\n    jump();\n} else {\n    step();\n}\nstep();',
        },
      },
    ],
    testCases: [
      {
        id: 'tc-1',
        name: 'Vault over lava at (1, 0) and reach chest at (3, 0)',
        expected: true,
        description: 'Hero must jump over lava to (2, 0) and step to (3, 0)',
      },
      {
        id: 'tc-2',
        name: 'Clear hazard without stepping into lava',
        expected: { atGoal: true, noHazards: true },
        description: 'Hero must not step onto the lava fissure at (1, 0)',
      },
    ],
    prepareCode: (userCode, language) => {
      if (language === 'python' || language === 'ruby' || language === 'lua') {
        return `tile = "lava"\n${userCode}\n`
      }
      if (language === 'rust') {
        return `let tile = "lava";\n${userCode}\n`
      }
      return `const tile = "lava";\n${userCode}\n`
    },
  },
]
