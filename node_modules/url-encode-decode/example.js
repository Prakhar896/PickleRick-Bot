const { encode, decode } = require('./')

encode('foo bar baz') // 'foo+bar+baz'
encode(`Hi! How? & you person/\\`) // 'Hi%21+How%3F+%26+you+person%2F%5C'

decode('foo+bar+baz') // 'foo bar baz'
decode('Hi%21+How%3F+%26+you+person%2F%5C') // `Hi! How? & you person/\\`
