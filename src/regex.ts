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
} as const

export function regexMatch(regex: string, input: string) {
  let index = 0

  if (regex[index] === SIGNS.WILDCARD) return true

  if (regex.endsWith(SIGNS.SPECIFIC_REPEAT_END)) {
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

    console.log({ characterBeforeRepeat, repeatNumber })

    if (input === '') return false
    if (!input.includes(characterBeforeRepeat)) return false

    if (Number(repeatNumber) !== input.length) return false

    return true
  }

  if (regex.endsWith(SIGNS.PLUS) || regex.endsWith(SIGNS.STAR)) {
    const firstRegexChar = regex[0]

    if (input === '') return regex.endsWith(SIGNS.STAR) ? true : false

    for (const char of input) {
      if (char !== firstRegexChar) return false
    }

    return true
  }

  if (regex.endsWith(SIGNS.OPTIONAL)) {
    return regex.includes(input) || input === '' ? true : false
  }

  if (regex[index] === SIGNS.SET_START) {
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
