import { expect, it } from 'vitest'

import { regexMatch } from './regex'

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
