import { expect, it } from 'vitest'

import { regexMatch } from './regex'

it('matches a letter', () => {
  expect(regexMatch('a', 'a')).toBe(true)
})

it('does not match a letter', () => {
  expect(regexMatch('a', 'b')).toBe(false)
})
