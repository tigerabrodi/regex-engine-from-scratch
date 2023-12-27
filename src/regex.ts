// Building Regex Engine from scratch

export const SIGNS = {
  WILDCARD: '.',
  SET_START: '[',
  SET_END: ']',
  OPTIONAL: '?',
  PLUS: '+',
  STAR: '*',
  SPECIFIC_REPEAT_START: '{',
  SPECIFIC_REPEAT_END: '}',
  ALTERNATE: '|',
  RANGE: '-',
  MATCH_BEGINNING: '^',
  MATCH_END: '$',
} as const

const ALL_CHARACTERS_IN_ARRAY_SORTED = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
]

function getCharactersFromRange(start: string, end: string) {
  const startIndex = ALL_CHARACTERS_IN_ARRAY_SORTED.indexOf(start)
  const endIndex = ALL_CHARACTERS_IN_ARRAY_SORTED.indexOf(end)

  return ALL_CHARACTERS_IN_ARRAY_SORTED.slice(startIndex, endIndex + 1) // +1 because endIndex is not included, .slice includes up to, but not including endIndex
}

export function regexMatch(regex: string, input: string) {
  const isWildCard = regex.startsWith(SIGNS.WILDCARD)
  if (isWildCard) return true

  const isMatchEnd = regex.endsWith(SIGNS.MATCH_END)

  if (isMatchEnd) {
    // Get the rest of the regex without the match end sign
    const restOfRegex = regex.slice(0, regex.length - 1)
    return input.endsWith(restOfRegex)
  }

  const isMatchBeginning = regex.startsWith(SIGNS.MATCH_BEGINNING)
  if (isMatchBeginning) {
    const restOfRegex = regex.slice(1)
    return input.startsWith(restOfRegex)
  }

  const isAlternate = regex.includes(SIGNS.ALTERNATE)
  if (isAlternate) {
    const [left, right] = regex.split(SIGNS.ALTERNATE)

    return input === left || input === right
  }

  const isSpecificRepeat = regex.endsWith(SIGNS.SPECIFIC_REPEAT_END)
  if (isSpecificRepeat) {
    let characterBeforeRepeat = ''
    let repeatNumber = ''
    let index = 0
    let isLoopingRepeatNumber = false

    while (regex[index] !== SIGNS.SPECIFIC_REPEAT_END) {
      if (regex[index] === SIGNS.SPECIFIC_REPEAT_START) {
        isLoopingRepeatNumber = true
        characterBeforeRepeat = regex[index - 1]
        index++
        continue
      }

      if (isLoopingRepeatNumber) {
        repeatNumber += regex[index]
      }

      index++
    }

    if (input === '') return false
    if (!input.includes(characterBeforeRepeat)) return false

    if (Number(repeatNumber) !== input.length) return false

    return true
  }

  const isPlusOrStar = regex.endsWith(SIGNS.PLUS) || regex.endsWith(SIGNS.STAR)
  if (isPlusOrStar) {
    const firstRegexChar = regex[0]

    if (input === '') return regex.endsWith(SIGNS.STAR) ? true : false

    for (const char of input) {
      if (char !== firstRegexChar) return false
    }

    return true
  }

  const isOptional = regex.endsWith(SIGNS.OPTIONAL)
  if (isOptional) {
    return regex.includes(input) || input === '' ? true : false
  }

  const isCharacterSet = regex.startsWith(SIGNS.SET_START)
  const isRange = isCharacterSet && regex.includes(SIGNS.RANGE)

  if (isRange) {
    const firstCharacter = regex[1]
    const lastCharacter = regex[3]

    const charactersFromRange = getCharactersFromRange(
      firstCharacter,
      lastCharacter
    )
    return charactersFromRange.includes(input)
  }

  if (isCharacterSet) {
    let index = 0
    index++

    const set = new Set<string>()

    while (regex[index] !== SIGNS.SET_END) {
      set.add(regex[index])
      index++
    }

    return set.has(input)
  }

  return regex === input
}
