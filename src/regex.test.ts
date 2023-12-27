import { expect, it } from 'vitest'

import { SIGNS, regexMatch } from './regex'

it('matches a letter', () => {
  expect(regexMatch('a', 'a')).toBe(true)
})

it('does not match a letter', () => {
  expect(regexMatch('a', 'b')).toBe(false)
})

it('matches a string', () => {
  expect(regexMatch('ab', 'ab')).toBe(true)
})

it('does not match a string', () => {
  expect(regexMatch('ab', 'ac')).toBe(false)
})

it('matches any character with a wildcard', () => {
  expect(regexMatch(SIGNS.WILDCARD, 'a')).toBe(true)
})

it('matches a character from a set', () => {
  expect(regexMatch('[abc]', 'a')).toBe(true)
  expect(regexMatch('[abc]', 'b')).toBe(true)
  expect(regexMatch('[abc]', 'c')).toBe(true)
})
