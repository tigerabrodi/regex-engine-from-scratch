// Building Regex Engine from scratch

export const SIGNS = {
  WILDCARD: '.',
} as const

export function regexMatch(regex: string, input: string) {
  if (regex === SIGNS.WILDCARD) return true

  return regex === input
}
