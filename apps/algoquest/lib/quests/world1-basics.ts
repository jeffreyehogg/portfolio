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
      'Move around the stone wall to row y:1, face East, and march 3 tiles to the treasure chest.',
    instructions: [
      'A stone wall blocks row y:0. The starter code already steps South to (0, 1) and turns East.',
      'Update the steps variable from 1 to 3 so your hero marches to the chest at (3, 1).',
    ],
    howItWorks:
      'Your turn() and step() calls move the hero first; then the level automatically steps forward `steps` times.',
    availableActions: [
      {
        name: 'turn',
        kind: 'command',
        signature: 'turn("south" | "east")',
        signatures: {
          python: 'turn("south")',
          javascript: 'turn("south");',
          typescript: 'turn("south");',
          ruby: 'turn("south")',
          lua: 'turn("south")',
          rust: 'turn("south");',
        },
        description: 'Rotates the hero to face a compass direction',
      },
      {
        name: 'step',
        kind: 'command',
        signature: 'step()',
        signatures: {
          ruby: 'step',
        },
        description: 'Moves the hero 1 tile forward',
      },
      {
        name: 'steps',
        kind: 'variable',
        signature: 'steps = 3',
        signatures: {
          python: 'steps = <number>',
          javascript: 'let steps = <number>;',
          typescript: 'const steps: number = <number>;',
          ruby: 'steps = <number>',
          lua: 'steps = <number>',
          rust: 'let steps: i32 = <number>;',
        },
        description: 'Sets how many tiles East the hero marches along y:1',
      },
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
        '# Already done: step around the wall to (0, 1) and face East\nturn("south")\nstep()\nturn("east")\n\n# TODO: Change 1 to the number of tiles needed to reach (3, 1)\nsteps = 1\n',
      javascript:
        '// Already done: step around the wall to (0, 1) and face East\nturn("south");\nstep();\nturn("east");\n\n// TODO: Change 1 to the number of tiles needed to reach (3, 1)\nlet steps = 1;\n',
      typescript:
        '// Already done: step around the wall to (0, 1) and face East\nturn("south");\nstep();\nturn("east");\n\n// TODO: Change 1 to the number of tiles needed to reach (3, 1)\nconst steps: number = 1;\n',
      ruby:
        '# Already done: step around the wall to (0, 1) and face East\nturn("south")\nstep\nturn("east")\n\n# TODO: Change 1 to the number of tiles needed to reach (3, 1)\nsteps = 1\n',
      lua:
        '-- Already done: step around the wall to (0, 1) and face East\nturn("south")\nstep()\nturn("east")\n\n-- TODO: Change 1 to the number of tiles needed to reach (3, 1)\nsteps = 1\n',
      rust:
        '// Already done: step around the wall to (0, 1) and face East\nturn("south");\nstep();\nturn("east");\n\n// TODO: Change 1 to the number of tiles needed to reach (3, 1)\nlet steps: i32 = 1;\n',
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
      'Enter the lower gatehouse hall and set password = "open" to unseal the iron gate.',
    instructions: [
      'The starter code already steps South to (0, 1) and turns East toward the gate.',
      'Change password from "closed" to "open" to lower the iron bars and reach the chest at (4, 1).',
    ],
    howItWorks:
      'When password == "open", the gate opens and your hero automatically marches 4 tiles East to the chest.',
    availableActions: [
      {
        name: 'turn',
        kind: 'command',
        signature: 'turn("south" | "east")',
        description: 'Rotates the hero to face the gatehouse corridor',
      },
      {
        name: 'step',
        kind: 'command',
        signature: 'step()',
        signatures: { ruby: 'step' },
        description: 'Moves 1 tile forward',
      },
      {
        name: 'password',
        kind: 'variable',
        signature: 'password = "open"',
        signatures: {
          python: 'password = "<word>"',
          javascript: 'let password = "<word>";',
          typescript: 'const password: string = "<word>";',
          ruby: 'password = "<word>"',
          lua: 'password = "<word>"',
          rust: 'let password: &str = "<word>";',
        },
        description: 'Must be set to "open" to unseal the gate',
      },
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
        '# Already done: step into the lower hall at (0, 1) and face East\nturn("south")\nstep()\nturn("east")\n\n# TODO: Change "closed" to "open" to unseal the gate\npassword = "closed"\n',
      javascript:
        '// Already done: step into the lower hall at (0, 1) and face East\nturn("south");\nstep();\nturn("east");\n\n// TODO: Change "closed" to "open" to unseal the gate\nlet password = "closed";\n',
      typescript:
        '// Already done: step into the lower hall at (0, 1) and face East\nturn("south");\nstep();\nturn("east");\n\n// TODO: Change "closed" to "open" to unseal the gate\nconst password: string = "closed";\n',
      ruby:
        '# Already done: step into the lower hall at (0, 1) and face East\nturn("south")\nstep\nturn("east")\n\n# TODO: Change "closed" to "open" to unseal the gate\npassword = "closed"\n',
      lua:
        '-- Already done: step into the lower hall at (0, 1) and face East\nturn("south")\nstep()\nturn("east")\n\n-- TODO: Change "closed" to "open" to unseal the gate\npassword = "closed"\n',
      rust:
        '// Already done: step into the lower hall at (0, 1) and face East\nturn("south");\nstep();\nturn("east");\n\n// TODO: Change "closed" to "open" to unseal the gate\nlet password: &str = "closed";\n',
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
      'Use an if/else check to jump() over the lava tile at (1, 0), then step() onto the chest at (3, 0).',
    instructions: [
      'A molten lava trap sits at (1, 0). Stepping on it triggers a HazardError.',
      'Inside the if tile == "lava" branch, call jump() to leap 2 tiles safely to (2, 0).',
      'After the if/else block, call step() once more to reach the chest at (3, 0).',
    ],
    howItWorks:
      'Calling jump() moves 2 tiles forward over lava; calling step() moves 1 tile forward to the chest.',
    preloadedContext: {
      python: 'tile = "lava"',
      javascript: 'const tile = "lava";',
      typescript: 'const tile = "lava";',
      ruby: 'tile = "lava"',
      lua: 'tile = "lava"',
      rust: 'let tile = "lava";',
    },
    availableActions: [
      {
        name: 'jump',
        kind: 'command',
        signature: 'jump()',
        signatures: { ruby: 'jump' },
        description: 'Leaps 2 tiles forward over lava traps',
      },
      {
        name: 'step',
        kind: 'command',
        signature: 'step()',
        signatures: { ruby: 'step' },
        description: 'Moves hero forward 1 tile',
      },
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
        'if tile == "lava":\n    # TODO: Leap 2 tiles over the lava using jump()\n    pass\nelse:\n    step()\n\n# TODO: Call step() once more to reach the chest at (3, 0)\n',
      javascript:
        'if (tile === "lava") {\n  // TODO: Leap 2 tiles over the lava using jump()\n} else {\n  step();\n}\n\n// TODO: Call step() once more to reach the chest at (3, 0)\n',
      typescript:
        'if (tile === "lava") {\n  // TODO: Leap 2 tiles over the lava using jump()\n} else {\n  step();\n}\n\n// TODO: Call step() once more to reach the chest at (3, 0)\n',
      ruby:
        'if tile == "lava"\n  # TODO: Leap 2 tiles over the lava using jump\nelse\n  step\nend\n\n# TODO: Call step once more to reach the chest at (3, 0)\n',
      lua:
        'if tile == "lava" then\n  -- TODO: Leap 2 tiles over the lava using jump()\nelse\n  step()\nend\n\n-- TODO: Call step() once more to reach the chest at (3, 0)\n',
      rust:
        'if tile == "lava" {\n    // TODO: Leap 2 tiles over the lava using jump()\n} else {\n    step();\n}\n\n// TODO: Call step() once more to reach the chest at (3, 0)\n',
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
