import { expect, it } from 'vitest'

import { regexMatch } from './regex'

it('simple string', () => {
  expect(regexMatch('a', 'a')).toBe(true)
})
