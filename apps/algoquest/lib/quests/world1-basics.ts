import { Level, World } from './types'

export const WORLD_1: World = {
  id: 'world-1-basics',
  number: 1,
  title: 'Verdant Vale',
  subtitle: 'Variables & Conditional Logic',
  description:
    'Master the fundamental runes of programming: variables, strings, and conditional branch choices.',
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
    subtitle: 'Variables & Assignment',
    concept: 'Variables',
    badge: 'First Spark',
    xp: 100,
    objective: 'Set the variable steps to 3 to walk the hero forward to the treasure chest.',
    instructions: [
      'A variable stores a value that your program can use.',
      'Assign the integer 3 to the variable steps.',
      'Run your code to watch the hero march across the path to open the chest!',
    ],
    gridConfig: {
      width: 4,
      height: 1,
      heroStart: { x: 0, y: 0 },
      heroDirection: 'east',
      goal: { x: 3, y: 0 },
      tiles: [['path', 'path', 'path', 'chest']],
      entities: [{ id: 'chest-1', x: 3, y: 0, type: 'chest' }],
    },
    visualizerConfig: {
      type: 'grid',
    },
    starterCode: {
      python: '# The hero needs 3 steps to reach the treasure chest.\n# Assign the number 3 to the variable \'steps\'.\nsteps = 1\n',
      typescript: '// The hero needs 3 steps to reach the treasure chest.\n// Assign the number 3 to the variable \'steps\'.\nconst steps = 1;\n',
    },
    solutionCode: {
      python: 'steps = 3\n',
      typescript: 'const steps = 3;\n',
    },
    hints: [
      {
        tier: 1,
        title: 'Variable Assignment',
        description: "In programming, variables hold data. You can change the number assigned to 'steps'.",
      },
      {
        tier: 2,
        title: 'Count the Distance',
        description: 'The chest is located at coordinate (3, 0). From (0, 0), the hero needs exactly 3 steps.',
        codeSnippet: {
          python: 'steps = 3',
          typescript: 'const steps = 3;',
        },
      },
      {
        tier: 3,
        title: 'Direct Solution',
        description: 'Update steps to equal 3 so the game loop advances your hero directly onto the chest.',
        codeSnippet: {
          python: 'steps = 3',
          typescript: 'const steps = 3;',
        },
      },
    ],
    testCases: [
      {
        id: 'tc-1',
        name: 'Reach the chest at (3, 0)',
        expected: true,
        description: 'Hero must take 3 steps forward to open the chest',
      },
    ],
    prepareCode: (userCode, language) => {
      if (language === 'python') {
        return `${userCode}\nif 'steps' in locals():\n    for _ in range(int(steps)):\n        step()\n`
      }
      return `${userCode}\nif (typeof steps !== 'undefined') {\n  for (let i = 0; i < Number(steps); i++) {\n    step();\n  }\n}\n`
    },
  },
  {
    id: 'level-2-the-gatekeeper',
    worldId: 'world-1-basics',
    number: 2,
    title: 'The Gatekeeper',
    subtitle: 'Strings & Text Encodings',
    concept: 'Strings',
    badge: 'Wordweaver',
    xp: 120,
    objective: 'Set the variable password to "open" to lower the iron gate and walk 4 paces to the goal.',
    instructions: [
      'Strings represent sequences of text surrounded by quotes.',
      'The ancient iron gate is sealed shut until you set password = "open".',
      'Once the gate lowers, the hero will march forward across the bridge to (4, 0).',
    ],
    gridConfig: {
      width: 5,
      height: 1,
      heroStart: { x: 0, y: 0 },
      heroDirection: 'east',
      goal: { x: 4, y: 0 },
      tiles: [['path', 'path', 'gate', 'path', 'chest']],
      entities: [
        { id: 'gate-1', x: 2, y: 0, type: 'gate' },
        { id: 'chest-1', x: 4, y: 0, type: 'chest' },
      ],
    },
    visualizerConfig: {
      type: 'grid',
    },
    starterCode: {
      python: '# The gatekeeper demands the secret password.\n# Change the string to "open" to lower the gate and cross.\npassword = "closed"\n',
      typescript: '// The gatekeeper demands the secret password.\n// Change the string to "open" to lower the gate and cross.\nconst password = "closed";\n',
    },
    solutionCode: {
      python: 'password = "open"\n',
      typescript: 'const password = "open";\n',
    },
    hints: [
      {
        tier: 1,
        title: 'String Quotes',
        description: 'Strings in Python and TypeScript are enclosed in double quotes or single quotes, like "open".',
      },
      {
        tier: 2,
        title: 'The Password Value',
        description: 'Replace the text "closed" with the text "open" so the gatekeeper lets you pass.',
        codeSnippet: {
          python: 'password = "open"',
          typescript: 'const password = "open";',
        },
      },
      {
        tier: 3,
        title: 'Direct Solution',
        description: 'Assign the string literal "open" to the variable password.',
        codeSnippet: {
          python: 'password = "open"',
          typescript: 'const password = "open";',
        },
      },
    ],
    testCases: [
      {
        id: 'tc-1',
        name: 'Open the gate and reach (4, 0)',
        expected: true,
        description: 'Setting password to "open" allows the hero to advance 4 steps',
      },
    ],
    prepareCode: (userCode, language) => {
      if (language === 'python') {
        return `${userCode}\nif 'password' in locals() and password == "open":\n    for _ in range(4):\n        step()\n`
      }
      return `${userCode}\nif (typeof password !== 'undefined' && password === "open") {\n  for (let i = 0; i < 4; i++) {\n    step();\n  }\n}\n`
    },
  },
  {
    id: 'level-3-the-danger-tile',
    worldId: 'world-1-basics',
    number: 3,
    title: 'The Danger Tile',
    subtitle: 'Conditionals & Branching',
    concept: 'Conditionals',
    badge: 'Lava Vaulter',
    xp: 150,
    objective: 'Inspect the tile ahead. If it is "lava", use jump() to clear the trap; otherwise use step().',
    instructions: [
      'Conditionals let your code make decisions using if and else statements.',
      'A hazardous lava fissure sits at tile (1, 0). Stepping directly on it will fail the quest.',
      'The variable tile is provided as "lava". Check if tile == "lava" and call jump() to leap 2 spaces straight to the chest!',
    ],
    gridConfig: {
      width: 3,
      height: 1,
      heroStart: { x: 0, y: 0 },
      heroDirection: 'east',
      goal: { x: 2, y: 0 },
      tiles: [['path', 'lava', 'chest']],
      entities: [{ id: 'chest-1', x: 2, y: 0, type: 'chest' }],
    },
    visualizerConfig: {
      type: 'grid',
    },
    starterCode: {
      python: '# The sensor detects what tile lies ahead:\n# tile is set to "lava".\n# If tile is "lava", call jump() to leap 2 spaces forward.\n# Otherwise, call step() to move 1 space.\n\nif tile == "lava":\n    # Leap over the molten lava\n    pass\nelse:\n    step()\n',
      typescript: '// The sensor detects what tile lies ahead:\n// tile is set to "lava".\n// If tile is "lava", call jump() to leap 2 spaces forward.\n// Otherwise, call step() to move 1 space.\n\nif (tile === "lava") {\n  // Leap over the molten lava\n} else {\n  step();\n}\n',
    },
    solutionCode: {
      python: 'if tile == "lava":\n    jump()\nelse:\n    step()\n',
      typescript: 'if (tile === "lava") {\n  jump();\n} else {\n  step();\n}\n',
    },
    hints: [
      {
        tier: 1,
        title: 'Conditional Statements',
        description: 'Use an if statement to test whether the variable tile equals "lava".',
      },
      {
        tier: 2,
        title: 'The Jump Action',
        description: 'When tile is "lava", replace pass or the empty block with jump().',
        codeSnippet: {
          python: 'if tile == "lava":\n    jump()',
          typescript: 'if (tile === "lava") {\n  jump();\n}',
        },
      },
      {
        tier: 3,
        title: 'Complete Branching',
        description: 'Complete the if-else block with jump() in the true branch and step() in the false branch.',
        codeSnippet: {
          python: 'if tile == "lava":\n    jump()\nelse:\n    step()',
          typescript: 'if (tile === "lava") {\n  jump();\n} else {\n  step();\n}',
        },
      },
    ],
    testCases: [
      {
        id: 'tc-1',
        name: 'Jump over the lava to (2, 0)',
        expected: true,
        description: 'Hero must jump over the lava tile at (1, 0) and land on (2, 0)',
      },
    ],
    prepareCode: (userCode, language) => {
      if (language === 'python') {
        return `tile = "lava"\n${userCode}\n`
      }
      return `const tile = "lava";\n${userCode}\n`
    },
  },
]
