const { encode, decode } = require('./')

test('if it encodes and decodes a string', () => {
  expect(encode('foo bar baz')).toBe('foo+bar+baz')
  expect(encode(`Hi! How? & you person/\\`)).toBe('Hi%21+How%3F+%26+you+person%2F%5C')

  expect(decode('foo+bar+baz')).toBe('foo bar baz')
  expect(decode('Hi%21+How%3F+%26+you+person%2F%5C')).toBe(`Hi! How? & you person/\\`)
})
