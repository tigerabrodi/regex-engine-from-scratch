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

it('matches any character with a wildcard', () => {
  expect(regexMatch('.', 'a')).toBe(true)
})

it('matches a character from a set', () => {
  expect(regexMatch('[abc]', 'a')).toBe(true)
  expect(regexMatch('[abc]', 'b')).toBe(true)
  expect(regexMatch('[abc]', 'c')).toBe(true)
})

it('does not match a character outside of a set', () => {
  expect(regexMatch('[abc]', 'd')).toBe(false)
})

it('matches zero or one occurrence of a character', () => {
  expect(regexMatch('a?', '')).toBe(true)
  expect(regexMatch('a?', 'a')).toBe(true)
})

it('matches one or more occurrences of a character', () => {
  expect(regexMatch('a+', 'a')).toBe(true)
  expect(regexMatch('a+', 'aa')).toBe(true)
  expect(regexMatch('a+', 'aaa')).toBe(true)
})

it('does not match when a character is not repeated for a plus sign', () => {
  expect(regexMatch('a+', '')).toBe(false)
})

it('matches zero or more occurrences of a character', () => {
  expect(regexMatch('a*', '')).toBe(true)
  expect(regexMatch('a*', 'a')).toBe(true)
  expect(regexMatch('a*', 'aa')).toBe(true)
  expect(regexMatch('a*', 'aaa')).toBe(true)
})

it('does not match incorrect characters with star operator', () => {
  expect(regexMatch('a*', 'b')).toBe(false)
})

it('matches a specific number of repetitions', () => {
  expect(regexMatch('a{3}', 'aaa')).toBe(true)
})

it.skip('matches with alternation', () => {
  expect(regexMatch('a|b', 'a')).toBe(true)
  expect(regexMatch('a|b', 'b')).toBe(true)
})
