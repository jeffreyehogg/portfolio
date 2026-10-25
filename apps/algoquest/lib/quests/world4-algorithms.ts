import { Level, World } from './types'

export const WORLD_4: World = {
  id: 'world-4-algorithms',
  number: 4,
  title: 'Arcane Sanctum',
  subtitle: 'Hash Maps & Binary Search',
  description:
    'Master O(1) dictionary lookups and O(log n) binary search algorithms to unlock the deepest vaults of the sanctum.',
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
    subtitle: 'Hash Maps & O(1) Key-Value Lookup',
    concept: 'Hash Maps',
    badge: 'Rune Lexicographer',
    xp: 350,
    optimalSteps: 3,
    objective:
      'Set runes["fire"] = 3 in the tome dictionary and look up runes["ice"] into power to unlock the sanctum door.',
    instructions: [
      'A Hash Map (or dictionary) stores key-value pairs for instant O(1) lookup by key.',
      'The ancient tome begins with runes = {"wind": 1, "ice": 2}.',
      'Inscribe a new key "fire" with value 3 into runes, and assign the value of runes["ice"] to the variable power.',
      'When both runes are aligned, the sanctum door opens and the hero advances to (3, 0)!',
    ],
    availableActions: [
      {
        name: 'runes[key]',
        signature: 'runes["fire"] = 3',
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
        '# runes = {"wind": 1, "ice": 2} is inscribed in the tome.\n# 1. Add the key "fire" with value 3 to runes\n# 2. Look up the value of "ice" from runes and store it in power\n\nrunes["fire"] = 0  # Set "fire" to 3\npower = 0          # Look up runes["ice"]\n',
      javascript:
        '// runes = { wind: 1, ice: 2 } is inscribed in the tome.\n// 1. Add the key "fire" with value 3 to runes\n// 2. Look up the value of "ice" from runes and store it in power\n\nrunes["fire"] = 0; // Set "fire" to 3\nlet power = 0;     // Look up runes["ice"]\n',
      typescript:
        '// runes = { wind: 1, ice: 2 } is inscribed in the tome.\n// 1. Add the key "fire" with value 3 to runes\n// 2. Look up the value of "ice" from runes and store it in power\n\nrunes["fire"] = 0;        // Set "fire" to 3\nconst power: number = 0;  // Look up runes["ice"]\n',
      ruby:
        '# runes = { "wind" => 1, "ice" => 2 } is inscribed in the tome.\n# 1. Add the key "fire" with value 3 to runes\n# 2. Look up the value of "ice" from runes and store it in power\n\nrunes["fire"] = 0  # Set "fire" to 3\npower = 0          # Look up runes["ice"]\n',
      lua:
        '-- runes = { wind = 1, ice = 2 } is inscribed in the tome.\n-- 1. Add the key "fire" with value 3 to runes\n-- 2. Look up the value of "ice" from runes and store it in power\n\nrunes["fire"] = 0  -- Set "fire" to 3\npower = 0          -- Look up runes["ice"]\n',
    },
    solutionCode: {
      python: 'runes["fire"] = 3\npower = runes["ice"]\n',
      javascript: 'runes["fire"] = 3;\nlet power = runes["ice"];\n',
      typescript: 'runes["fire"] = 3;\nconst power: number = runes["ice"];\n',
      ruby: 'runes["fire"] = 3\npower = runes["ice"]\n',
      lua: 'runes["fire"] = 3\npower = runes["ice"]\n',
    },
    hints: [
      {
        tier: 1,
        title: 'Key-Value Access',
        description:
          'Hash Maps (dictionaries) let you read and write values directly using square brackets and the key string, like runes["fire"].',
      },
      {
        tier: 2,
        title: 'Updating & Reading Keys',
        description:
          'Assign 3 to runes["fire"], then read runes["ice"] (which equals 2) into the variable power.',
        codeSnippet: {
          python: 'runes["fire"] = 3\npower = runes["ice"]',
          javascript: 'runes["fire"] = 3;\nlet power = runes["ice"];',
          typescript: 'runes["fire"] = 3;\nconst power: number = runes["ice"];',
          ruby: 'runes["fire"] = 3\npower = runes["ice"]',
          lua: 'runes["fire"] = 3\npower = runes["ice"]',
        },
      },
      {
        tier: 3,
        title: 'Direct Solution',
        description:
          'Set runes["fire"] = 3 and power = runes["ice"] so the sanctum seal opens.',
        codeSnippet: {
          python: 'runes["fire"] = 3\npower = runes["ice"]',
          javascript: 'runes["fire"] = 3;\nlet power = runes["ice"];',
          typescript: 'runes["fire"] = 3;\nconst power: number = runes["ice"];',
          ruby: 'runes["fire"] = 3\npower = runes["ice"]',
          lua: 'runes["fire"] = 3\npower = runes["ice"]',
        },
      },
    ],
    testCases: [
      {
        id: 'tc-1',
        name: 'Inscribe fire=3, read ice=2, and reach sanctum chest at (3, 0)',
        expected: true,
        description: 'Correct hash map insertion and lookup opens the sanctum door',
      },
    ],
    prepareCode: (userCode, language) => {
      if (language === 'python') {
        return `runes = {"wind": 1, "ice": 2}\n${userCode}\nif isinstance(runes, dict) and runes.get("fire") == 3 and locals().get("power") == 2:\n    for _ in range(3):\n        step()\n`
      }
      if (language === 'ruby') {
        return `runes = { "wind" => 1, "ice" => 2 }\n${userCode}\nif defined?(power) && runes["fire"] == 3 && power == 2\n  3.times { step }\nend\n`
      }
      if (language === 'lua') {
        return `runes = { wind = 1, ice = 2 }\n${userCode}\nif runes["fire"] == 3 and power == 2 then\n  for i = 1, 3 do step() end\nend\n`
      }
      return `const runes: Record<string, number> = { wind: 1, ice: 2 };\n${userCode}\nif (typeof power !== 'undefined' && runes["fire"] === 3 && power === 2) {\n  for (let i = 0; i < 3; i++) {\n    step();\n  }\n}\n`
    },
  },
  {
    id: 'level-10-the-crystal-archives',
    worldId: 'world-4-algorithms',
    number: 10,
    title: 'The Crystal Archives',
    subtitle: 'Logarithmic Search in Sorted Vaults',
    concept: 'Binary Search',
    badge: 'Grand Archivist',
    xp: 400,
    optimalSteps: 4,
    objective:
      'Complete the binary search loop to locate crystal 42 at index 3 in the sorted vault [10, 20, 30, 42, 50, 60, 70].',
    instructions: [
      'Binary Search finds a target in a sorted array in O(log n) time by halving the search interval each step.',
      'The sorted vault is crystals = [10, 20, 30, 42, 50, 60, 70] and target = 42.',
      'Inside the loop, calculate the middle index mid = (low + high) // 2 (or Math.floor((low + high) / 2) in JS/TS).',
      'When crystals[mid] matches target (42 at index 3), record found_index = mid and walk 3 steps to the archive chest!',
    ],
    availableActions: [
      {
        name: 'mid',
        signature: 'mid = (low + high) // 2',
        description: 'Computes the midpoint of the current search interval [low, high]',
      },
    ],
    gridConfig: {
      width: 7,
      height: 1,
      heroStart: { x: 0, y: 0 },
      heroDirection: 'east',
      goal: { x: 3, y: 0 },
      tiles: [['stone', 'stone', 'stone', 'chest', 'stone', 'stone', 'stone']],
      entities: [{ id: 'chest-10', x: 3, y: 0, type: 'chest' }],
    },
    visualizerConfig: {
      type: 'binary_search',
      initialArray: ['10', '20', '30', '42', '50', '60', '70'],
      initialPointers: { left: 0, right: 6, mid: 3 },
      searchTarget: 42,
    },
    starterCode: {
      python:
        '# Sorted vault: crystals = [10, 20, 30, 42, 50, 60, 70], target = 42\nlow = 0\nhigh = 6\nfound_index = -1\n\nwhile low <= high:\n    # Calculate midpoint index mid using (low + high) // 2\n    mid = 0\n    if crystals[mid] == target:\n        found_index = mid\n        break\n    elif crystals[mid] < target:\n        low = mid + 1\n    else:\n        high = mid - 1\n',
      javascript:
        '// Sorted vault: crystals = [10, 20, 30, 42, 50, 60, 70], target = 42\nlet low = 0;\nlet high = 6;\nlet found_index = -1;\n\nwhile (low <= high) {\n  // Calculate midpoint index mid using Math.floor((low + high) / 2)\n  let mid = 0;\n  if (crystals[mid] === target) {\n    found_index = mid;\n    break;\n  } else if (crystals[mid] < target) {\n    low = mid + 1;\n  } else {\n    high = mid - 1;\n  }\n}\n',
      typescript:
        '// Sorted vault: crystals = [10, 20, 30, 42, 50, 60, 70], target = 42\nlet low: number = 0;\nlet high: number = 6;\nlet found_index: number = -1;\n\nwhile (low <= high) {\n  // Calculate midpoint index mid using Math.floor((low + high) / 2)\n  const mid: number = 0;\n  if (crystals[mid] === target) {\n    found_index = mid;\n    break;\n  } else if (crystals[mid] < target) {\n    low = mid + 1;\n  } else {\n    high = mid - 1;\n  }\n}\n',
      ruby:
        '# Sorted vault: crystals = [10, 20, 30, 42, 50, 60, 70], target = 42\nlow = 0\nhigh = 6\nfound_index = -1\n\nwhile low <= high\n  # Calculate midpoint index mid using (low + high) / 2\n  mid = 0\n  if crystals[mid] == target\n    found_index = mid\n    break\n  elsif crystals[mid] < target\n    low = mid + 1\n  else\n    high = mid - 1\n  end\nend\n',
      lua:
        '-- Sorted vault: crystals is 0-indexed [0..6], target = 42\nlow = 0\nhigh = 6\nfound_index = -1\n\nwhile low <= high do\n  -- Calculate midpoint index mid using math.floor((low + high) / 2)\n  local mid = 0\n  if crystals[mid] == target then\n    found_index = mid\n    break\n  elseif crystals[mid] < target then\n    low = mid + 1\n  else\n    high = mid - 1\n  end\nend\n',
    },
    solutionCode: {
      python:
        'low = 0\nhigh = 6\nfound_index = -1\n\nwhile low <= high:\n    mid = (low + high) // 2\n    if crystals[mid] == target:\n        found_index = mid\n        break\n    elif crystals[mid] < target:\n        low = mid + 1\n    else:\n        high = mid - 1\n',
      javascript:
        'let low = 0;\nlet high = 6;\nlet found_index = -1;\n\nwhile (low <= high) {\n  let mid = Math.floor((low + high) / 2);\n  if (crystals[mid] === target) {\n    found_index = mid;\n    break;\n  } else if (crystals[mid] < target) {\n    low = mid + 1;\n  } else {\n    high = mid - 1;\n  }\n}\n',
      typescript:
        'let low: number = 0;\nlet high: number = 6;\nlet found_index: number = -1;\n\nwhile (low <= high) {\n  const mid: number = Math.floor((low + high) / 2);\n  if (crystals[mid] === target) {\n    found_index = mid;\n    break;\n  } else if (crystals[mid] < target) {\n    low = mid + 1;\n  } else {\n    high = mid - 1;\n  }\n}\n',
      ruby:
        'low = 0\nhigh = 6\nfound_index = -1\n\nwhile low <= high\n  mid = (low + high) / 2\n  if crystals[mid] == target\n    found_index = mid\n    break\n  elsif crystals[mid] < target\n    low = mid + 1\n  else\n    high = mid - 1\n  end\nend\n',
      lua:
        'low = 0\nhigh = 6\nfound_index = -1\n\nwhile low <= high do\n  local mid = math.floor((low + high) / 2)\n  if crystals[mid] == target then\n    found_index = mid\n    break\n  elseif crystals[mid] < target then\n    low = mid + 1\n  else\n    high = mid - 1\n  end\nend\n',
    },
    hints: [
      {
        tier: 1,
        title: 'Halving the Search Space',
        description:
          'In binary search, the midpoint is the average of low and high rounded down to the nearest integer.',
      },
      {
        tier: 2,
        title: 'Midpoint Formula',
        description:
          'Replace mid = 0 with integer division: (low + high) // 2 in Python, or Math.floor((low + high) / 2) in JS/TS.',
        codeSnippet: {
          python: 'mid = (low + high) // 2',
          javascript: 'let mid = Math.floor((low + high) / 2);',
          typescript: 'const mid: number = Math.floor((low + high) / 2);',
          ruby: 'mid = (low + high) / 2',
          lua: 'local mid = math.floor((low + high) / 2)',
        },
      },
      {
        tier: 3,
        title: 'Direct Solution',
        description:
          'Compute mid at the start of the while loop so the search immediately locates 42 at index 3.',
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
        },
      },
    ],
    testCases: [
      {
        id: 'tc-1',
        name: 'Locate crystal 42 at index 3 using Binary Search',
        expected: true,
        description: 'found_index must equal 3 to advance the hero to the archive chest',
      },
    ],
    prepareCode: (userCode, language) => {
      if (language === 'python') {
        return `crystals = [10, 20, 30, 42, 50, 60, 70]\ntarget = 42\n${userCode}\nif locals().get('found_index') == 3:\n    for _ in range(3):\n        step()\n`
      }
      if (language === 'ruby') {
        return `crystals = [10, 20, 30, 42, 50, 60, 70]\ntarget = 42\n${userCode}\nif defined?(found_index) && found_index == 3\n  3.times { step }\nend\n`
      }
      if (language === 'lua') {
        return `crystals = { [0] = 10, [1] = 20, [2] = 30, [3] = 42, [4] = 50, [5] = 60, [6] = 70 }\ntarget = 42\n${userCode}\nif found_index == 3 then\n  for i = 1, 3 do step() end\nend\n`
      }
      return `const crystals = [10, 20, 30, 42, 50, 60, 70];\nconst target = 42;\n${userCode}\nif (typeof found_index !== 'undefined' && found_index === 3) {\n  for (let i = 0; i < 3; i++) {\n    step();\n  }\n}\n`
    },
  },
]
