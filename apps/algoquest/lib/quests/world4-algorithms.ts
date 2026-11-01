import { Level, World } from './types'

export const WORLD_4: World = {
  id: 'world-4-algorithms',
  number: 4,
  title: 'Arcane Sanctum',
  subtitle: 'O(1) Hash Maps & O(log n) Binary Search',
  description:
    'Synthesize elemental rune dictionaries in O(1) constant time and execute multi-step O(log n) binary search to unlock the deepest sanctum vaults.',
  badge: 'Arcane Architect',
  themeColor: 'purple',
  levelIds: ['level-9-the-ancient-tome', 'level-10-the-crystal-archives'],
}

export const WORLD_4_LEVELS: Level[] = [
  {
    id: 'level-9-the-ancient-tome',
    worldId: 'world-4-algorithms',
    number: 9,
    title: 'The Ancient Tome',
    subtitle: 'Hash Map Insertion & O(1) Rune Synthesis',
    concept: 'Hash Maps',
    badge: 'Rune Lexicographer',
    xp: 350,
    optimalSteps: 4,
    objective:
      'Inscribe runes["fire"] = 3 into the tome dictionary and compute power = runes["fire"] + runes["ice"] (5) to unseal the sanctum door.',
    instructions: [
      'A Hash Map (or dictionary) stores key-value pairs for instant O(1) constant-time insertion and lookup.',
      'The ancient tome begins with runes = {"wind": 1, "ice": 2}.',
      'First, inscribe the key "fire" with value 3 into runes. Then combine runes["fire"] + runes["ice"] into power (3 + 2 = 5) to open the sanctum door!',
    ],
    availableActions: [
      {
        name: 'runes[key]',
        signature: 'runes["fire"] = 3 / runes.insert("fire", 3)',
        description: 'Inserts or looks up a rune power in O(1) constant time',
      },
    ],
    gridConfig: {
      width: 4,
      height: 1,
      heroStart: { x: 0, y: 0 },
      heroDirection: 'east',
      goal: { x: 3, y: 0 },
      tiles: [['path', 'stone', 'door', 'chest']],
      entities: [
        { id: 'door-9', x: 2, y: 0, type: 'door' },
        { id: 'chest-9', x: 3, y: 0, type: 'chest' },
      ],
    },
    visualizerConfig: {
      type: 'hashmap',
      initialMap: { wind: 1, ice: 2 },
      targetMap: { wind: 1, ice: 2, fire: 3 },
    },
    starterCode: {
      python:
        '# runes = {"wind": 1, "ice": 2} is inscribed in the tome.\n# 1. Add the key "fire" with value 3 to runes\n# 2. Set power = runes["fire"] + runes["ice"] (5)\n\nrunes["fire"] = 0\npower = 0\n',
      javascript:
        '// runes = { wind: 1, ice: 2 } is inscribed in the tome.\n// 1. Add the key "fire" with value 3 to runes\n// 2. Set power = runes["fire"] + runes["ice"] (5)\n\nrunes["fire"] = 0;\nlet power = 0;\n',
      typescript:
        '// runes = { wind: 1, ice: 2 } is inscribed in the tome.\n// 1. Add the key "fire" with value 3 to runes\n// 2. Set power = runes["fire"] + runes["ice"] (5)\n\nrunes["fire"] = 0;\nconst power: number = 0;\n',
      ruby:
        '# runes = { "wind" => 1, "ice" => 2 } is inscribed in the tome.\n# 1. Add the key "fire" with value 3 to runes\n# 2. Set power = runes["fire"] + runes["ice"] (5)\n\nrunes["fire"] = 0\npower = 0\n',
      lua:
        '-- runes = { wind = 1, ice = 2 } is inscribed in the tome.\n-- 1. Add the key "fire" with value 3 to runes\n-- 2. Set power = runes["fire"] + runes["ice"] (5)\n\nrunes["fire"] = 0\npower = 0\n',
      rust:
        '// runes = HashMap::from([("wind", 1), ("ice", 2)]) is inscribed in the tome.\n// 1. Insert the key "fire" with value 3 into runes\n// 2. Set power = runes["fire"] + runes["ice"] (5)\n\nrunes.insert("fire", 0);\nlet power = 0;\n',
    },
    solutionCode: {
      python: 'runes["fire"] = 3\npower = runes["fire"] + runes["ice"]\n',
      javascript: 'runes["fire"] = 3;\nlet power = runes["fire"] + runes["ice"];\n',
      typescript: 'runes["fire"] = 3;\nconst power: number = runes["fire"] + runes["ice"];\n',
      ruby: 'runes["fire"] = 3\npower = runes["fire"] + runes["ice"]\n',
      lua: 'runes["fire"] = 3\npower = runes["fire"] + runes["ice"]\n',
      rust: 'runes.insert("fire", 3);\nlet power = runes["fire"] + runes["ice"];\n',
    },
    hints: [
      {
        tier: 1,
        title: 'Key-Value Synthesis',
        description:
          'First insert "fire" with value 3, then add runes["fire"] (3) and runes["ice"] (2) together.',
      },
      {
        tier: 2,
        title: 'Inserting & Summing Keys',
        description:
          'Set runes["fire"] = 3 and assign runes["fire"] + runes["ice"] to power.',
        codeSnippet: {
          python: 'runes["fire"] = 3\npower = runes["fire"] + runes["ice"]',
          javascript: 'runes["fire"] = 3;\nlet power = runes["fire"] + runes["ice"];',
          typescript: 'runes["fire"] = 3;\nconst power: number = runes["fire"] + runes["ice"];',
          ruby: 'runes["fire"] = 3\npower = runes["fire"] + runes["ice"]',
          lua: 'runes["fire"] = 3\npower = runes["fire"] + runes["ice"]',
          rust: 'runes.insert("fire", 3);\nlet power = runes["fire"] + runes["ice"];',
        },
      },
      {
        tier: 3,
        title: 'Direct Solution',
        description:
          'Set runes["fire"] = 3 and power = runes["fire"] + runes["ice"] so power equals 5.',
        codeSnippet: {
          python: 'runes["fire"] = 3\npower = runes["fire"] + runes["ice"]',
          javascript: 'runes["fire"] = 3;\nlet power = runes["fire"] + runes["ice"];',
          typescript: 'runes["fire"] = 3;\nconst power: number = runes["fire"] + runes["ice"];',
          ruby: 'runes["fire"] = 3\npower = runes["fire"] + runes["ice"]',
          lua: 'runes["fire"] = 3\npower = runes["fire"] + runes["ice"]',
          rust: 'runes.insert("fire", 3);\nlet power = runes["fire"] + runes["ice"];',
        },
      },
    ],
    testCases: [
      {
        id: 'tc-1',
        name: 'Inscribe fire=3, synthesize power=5, and reach chest at (3, 0)',
        expected: true,
        description: 'Correct hash map insertion and synthesis opens the sanctum door',
      },
    ],
    prepareCode: (userCode, language) => {
      if (language === 'python') {
        return `runes = {"wind": 1, "ice": 2}\n${userCode}\nif isinstance(runes, dict) and runes.get("fire") == 3 and locals().get("power") == 5:\n    for _ in range(3):\n        step()\n`
      }
      if (language === 'ruby') {
        return `runes = { "wind" => 1, "ice" => 2 }\n${userCode}\nif defined?(power) && runes["fire"] == 3 && power == 5\n  3.times { step }\nend\n`
      }
      if (language === 'lua') {
        return `runes = { wind = 1, ice = 2 }\n${userCode}\nif runes["fire"] == 3 and power == 5 then\n  for i = 1, 3 do step() end\nend\n`
      }
      if (language === 'rust') {
        return `let mut runes = HashMap::from([("wind", 1), ("ice", 2)]);\n${userCode}\nif runes["fire"] == 3 && power == 5 {\n    for _i in 0..3 {\n        step();\n    }\n}\n`
      }
      return `const runes: Record<string, number> = { wind: 1, ice: 2 };\n${userCode}\nif (typeof power !== 'undefined' && runes["fire"] === 3 && power === 5) {\n  for (let i = 0; i < 3; i++) {\n    step();\n  }\n}\n`
    },
  },
  {
    id: 'level-10-the-crystal-archives',
    worldId: 'world-4-algorithms',
    number: 10,
    title: 'The Crystal Archives',
    subtitle: 'Multi-Step O(log n) Binary Search',
    concept: 'Binary Search',
    badge: 'Grand Archivist',
    xp: 400,
    optimalSteps: 6,
    objective:
      'Complete the binary search loop to locate crystal 60 at index 5 in the sorted vault [10, 20, 30, 42, 50, 60, 70].',
    instructions: [
      'Binary Search locates a target in a sorted array in O(log n) time by halving the search interval [low, high] on every step.',
      'The sorted vault is crystals = [10, 20, 30, 42, 50, 60, 70] and target = 60 (located at index 5).',
      '1. Compute mid = (low + high) // 2 (or Math.floor((low + high) / 2) in JS/TS).',
      '2. When crystals[mid] < target (at mid=3, 42 < 60), advance the lower bound: low = mid + 1 so the next iteration checks mid=5 (60)!',
    ],
    availableActions: [
      {
        name: 'mid',
        signature: 'mid = (low + high) // 2',
        description: 'Computes the midpoint of the current search interval [low, high]',
      },
      {
        name: 'low',
        signature: 'low = mid + 1',
        description: 'Discards the left half when crystals[mid] < target',
      },
    ],
    gridConfig: {
      width: 7,
      height: 1,
      heroStart: { x: 0, y: 0 },
      heroDirection: 'east',
      goal: { x: 5, y: 0 },
      tiles: [['stone', 'stone', 'stone', 'stone', 'stone', 'chest', 'stone']],
      entities: [{ id: 'chest-10', x: 5, y: 0, type: 'chest' }],
    },
    visualizerConfig: {
      type: 'binary_search',
      initialArray: ['10', '20', '30', '42', '50', '60', '70'],
      initialPointers: { left: 0, right: 6, mid: 3 },
      searchTarget: 60,
    },
    starterCode: {
      python:
        '# Sorted vault: crystals = [10, 20, 30, 42, 50, 60, 70], target = 60\nlow = 0\nhigh = 6\nfound_index = -1\n\nwhile low <= high:\n    # 1. Calculate midpoint mid using (low + high) // 2\n    mid = 0\n    if crystals[mid] == target:\n        found_index = mid\n        break\n    elif crystals[mid] < target:\n        # 2. Narrow search to the right half (mid + 1)\n        low = high + 1\n    else:\n        high = mid - 1\n',
      javascript:
        '// Sorted vault: crystals = [10, 20, 30, 42, 50, 60, 70], target = 60\nlet low = 0;\nlet high = 6;\nlet found_index = -1;\n\nwhile (low <= high) {\n  // 1. Calculate midpoint mid using Math.floor((low + high) / 2)\n  let mid = 0;\n  if (crystals[mid] === target) {\n    found_index = mid;\n    break;\n  } else if (crystals[mid] < target) {\n    // 2. Narrow search to the right half (mid + 1)\n    low = high + 1;\n  } else {\n    high = mid - 1;\n  }\n}\n',
      typescript:
        '// Sorted vault: crystals = [10, 20, 30, 42, 50, 60, 70], target = 60\nlet low: number = 0;\nlet high: number = 6;\nlet found_index: number = -1;\n\nwhile (low <= high) {\n  // 1. Calculate midpoint mid using Math.floor((low + high) / 2)\n  const mid: number = 0;\n  if (crystals[mid] === target) {\n    found_index = mid;\n    break;\n  } else if (crystals[mid] < target) {\n    // 2. Narrow search to the right half (mid + 1)\n    low = high + 1;\n  } else {\n    high = mid - 1;\n  }\n}\n',
      ruby:
        '# Sorted vault: crystals = [10, 20, 30, 42, 50, 60, 70], target = 60\nlow = 0\nhigh = 6\nfound_index = -1\n\nwhile low <= high\n  # 1. Calculate midpoint mid using (low + high) / 2\n  mid = 0\n  if crystals[mid] == target\n    found_index = mid\n    break\n  elsif crystals[mid] < target\n    # 2. Narrow search to the right half (mid + 1)\n    low = high + 1\n  else\n    high = mid - 1\n  end\nend\n',
      lua:
        '-- Sorted vault: crystals is 0-indexed [0..6], target = 60\nlow = 0\nhigh = 6\nfound_index = -1\n\nwhile low <= high do\n  -- 1. Calculate midpoint mid using math.floor((low + high) / 2)\n  local mid = 0\n  if crystals[mid] == target then\n    found_index = mid\n    break\n  elseif crystals[mid] < target then\n    -- 2. Narrow search to the right half (mid + 1)\n    low = high + 1\n  else\n    high = mid - 1\n  end\nend\n',
      rust:
        '// Sorted vault: crystals = vec![10, 20, 30, 42, 50, 60, 70], target = 60\nlet mut low = 0;\nlet mut high = 6;\nlet mut found_index = -1;\n\nwhile low <= high {\n    // 1. Calculate midpoint mid using integer division: (low + high) / 2\n    let mid = 0;\n    if crystals[mid] == target {\n        found_index = mid;\n        break;\n    } else if crystals[mid] < target {\n        // 2. Narrow search to the right half (mid + 1)\n        low = high + 1;\n    } else {\n        high = mid - 1;\n    }\n}\n',
    },
    solutionCode: {
      python:
        'low = 0\nhigh = 6\nfound_index = -1\n\nwhile low <= high:\n    mid = (low + high) // 2\n    if crystals[mid] == target:\n        found_index = mid\n        break\n    elif crystals[mid] < target:\n        low = mid + 1\n    else:\n        high = mid - 1\n',
      javascript:
        'let low = 0;\nlet high = 6;\nlet found_index = -1;\n\nwhile (low <= high) {\n  let mid = Math.floor((low + high) / 2);\n  if (crystals[mid] === target) {\n    found_index = mid;\n    break;\n  } else if (crystals[mid] < target) {\n    low = mid + 1;\n  } else {\n    high = mid - 1;\n  }\n}\n',
      typescript:
        'let low: number = 0;\nlet high = 6;\nlet found_index: number = -1;\n\nwhile (low <= high) {\n  const mid: number = Math.floor((low + high) / 2);\n  if (crystals[mid] === target) {\n    found_index = mid;\n    break;\n  } else if (crystals[mid] < target) {\n    low = mid + 1;\n  } else {\n    high = mid - 1;\n  }\n}\n',
      ruby:
        'low = 0\nhigh = 6\nfound_index = -1\n\nwhile low <= high\n  mid = (low + high) / 2\n  if crystals[mid] == target\n    found_index = mid\n    break\n  elsif crystals[mid] < target\n    low = mid + 1\n  else\n    high = mid - 1\n  end\nend\n',
      lua:
        'low = 0\nhigh = 6\nfound_index = -1\n\nwhile low <= high do\n  local mid = math.floor((low + high) / 2)\n  if crystals[mid] == target then\n    found_index = mid\n    break\n  elseif crystals[mid] < target then\n    low = mid + 1\n  else\n    high = mid - 1\n  end\nend\n',
      rust:
        'let mut low = 0;\nlet mut high = 6;\nlet mut found_index = -1;\n\nwhile low <= high {\n    let mid = (low + high) / 2;\n    if crystals[mid] == target {\n        found_index = mid;\n        break;\n    } else if crystals[mid] < target {\n        low = mid + 1;\n    } else {\n        high = mid - 1;\n    }\n}\n',
    },
    hints: [
      {
        tier: 1,
        title: 'Midpoint & Right-Half Narrowing',
        description:
          'First compute mid = (low + high) // 2. When crystals[mid] < target (42 < 60), set low = mid + 1 to search the upper half [4..6].',
      },
      {
        tier: 2,
        title: 'Updating mid and low',
        description:
          'Set mid to the average of low and high, and update low = mid + 1 in the elif/else-if branch.',
        codeSnippet: {
          python: 'mid = (low + high) // 2\n# ...\nelif crystals[mid] < target:\n    low = mid + 1',
          javascript: 'let mid = Math.floor((low + high) / 2);\n// ...\n} else if (crystals[mid] < target) {\n  low = mid + 1;',
          typescript: 'const mid: number = Math.floor((low + high) / 2);\n// ...\n} else if (crystals[mid] < target) {\n  low = mid + 1;',
          ruby: 'mid = (low + high) / 2\n# ...\nelsif crystals[mid] < target\n  low = mid + 1',
          lua: 'local mid = math.floor((low + high) / 2)\n-- ...\nelseif crystals[mid] < target then\n  low = mid + 1',
          rust: 'let mid = (low + high) / 2;\n// ...\n} else if crystals[mid] < target {\n    low = mid + 1;',
        },
      },
      {
        tier: 3,
        title: 'Direct Solution',
        description:
          'Compute mid and advance low = mid + 1 when crystals[mid] < target so the search locates 60 at index 5.',
        codeSnippet: {
          python:
            'low = 0\nhigh = 6\nfound_index = -1\nwhile low <= high:\n    mid = (low + high) // 2\n    if crystals[mid] == target:\n        found_index = mid\n        break\n    elif crystals[mid] < target:\n        low = mid + 1\n    else:\n        high = mid - 1',
          javascript:
            'let low = 0;\nlet high = 6;\nlet found_index = -1;\nwhile (low <= high) {\n  let mid = Math.floor((low + high) / 2);\n  if (crystals[mid] === target) {\n    found_index = mid;\n    break;\n  } else if (crystals[mid] < target) {\n    low = mid + 1;\n  } else {\n    high = mid - 1;\n  }\n}',
          typescript:
            'let low: number = 0;\nlet high: number = 6;\nlet found_index: number = -1;\nwhile (low <= high) {\n  const mid: number = Math.floor((low + high) / 2);\n  if (crystals[mid] === target) {\n    found_index = mid;\n    break;\n  } else if (crystals[mid] < target) {\n    low = mid + 1;\n  } else {\n    high = mid - 1;\n  }\n}',
          ruby:
            'low = 0\nhigh = 6\nfound_index = -1\nwhile low <= high\n  mid = (low + high) / 2\n  if crystals[mid] == target\n    found_index = mid\n    break\n  elsif crystals[mid] < target\n    low = mid + 1\n  else\n    high = mid - 1\n  end\nend',
          lua:
            'low = 0\nhigh = 6\nfound_index = -1\nwhile low <= high do\n  local mid = math.floor((low + high) / 2)\n  if crystals[mid] == target then\n    found_index = mid\n    break\n  elseif crystals[mid] < target then\n    low = mid + 1\n  else\n    high = mid - 1\n  end\nend',
          rust:
            'let mut low = 0;\nlet mut high = 6;\nlet mut found_index = -1;\nwhile low <= high {\n    let mid = (low + high) / 2;\n    if crystals[mid] == target {\n        found_index = mid;\n        break;\n    } else if crystals[mid] < target {\n        low = mid + 1;\n    } else {\n        high = mid - 1;\n    }\n}',
        },
      },
    ],
    testCases: [
      {
        id: 'tc-1',
        name: 'Locate crystal 60 at index 5 using O(log n) Binary Search',
        expected: true,
        description: 'found_index must equal 5 after halving the search space',
      },
    ],
    prepareCode: (userCode, language) => {
      if (language === 'python') {
        return `crystals = [10, 20, 30, 42, 50, 60, 70]\ntarget = 60\n${userCode}\nif locals().get('found_index') == 5:\n    for _ in range(5):\n        step()\n`
      }
      if (language === 'ruby') {
        return `crystals = [10, 20, 30, 42, 50, 60, 70]\ntarget = 60\n${userCode}\nif defined?(found_index) && found_index == 5\n  5.times { step }\nend\n`
      }
      if (language === 'lua') {
        return `crystals = { [0] = 10, [1] = 20, [2] = 30, [3] = 42, [4] = 50, [5] = 60, [6] = 70 }\ntarget = 60\n${userCode}\nif found_index == 5 then\n  for i = 1, 5 do step() end\nend\n`
      }
      if (language === 'rust') {
        return `let crystals = vec![10, 20, 30, 42, 50, 60, 70];\nlet target = 60;\n${userCode}\nif found_index == 5 {\n    for _i in 0..5 {\n        step();\n    }\n}\n`
      }
      return `const crystals = [10, 20, 30, 42, 50, 60, 70];\nconst target = 60;\n${userCode}\nif (typeof found_index !== 'undefined' && found_index === 5) {\n  for (let i = 0; i < 5; i++) {\n    step();\n  }\n}\n`
    },
  },
]
