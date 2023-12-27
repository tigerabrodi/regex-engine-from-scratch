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
  MATCH_BEGINNING: '^',
} as const

export function regexMatch(regex: string, input: string) {
  const isWildCard = regex.startsWith(SIGNS.WILDCARD)
  if (isWildCard) return true

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
