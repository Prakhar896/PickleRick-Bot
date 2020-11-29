
# url-encode-decode
[![package version](https://img.shields.io/npm/v/url-encode-decode.svg?style=flat-square)](https://npmjs.org/package/url-encode-decode)
[![package downloads](https://img.shields.io/npm/dm/url-encode-decode.svg?style=flat-square)](https://npmjs.org/package/url-encode-decode)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![package license](https://img.shields.io/npm/l/url-encode-decode.svg?style=flat-square)](https://npmjs.org/package/url-encode-decode)
[![make a pull request](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

> URL encoding & decoding

## Table of Contents

- [url-encode-decode](#url-encode-decode)
    - [Table of Contents](#table-of-contents)
    - [About](#about)
    - [Install](#install)
    - [Usage](#usage)
    - [Contribute](#contribute)
    - [License](#license)


## About

Based on [this snippet](https://www.codeproject.com/Articles/1016044/JavaScript-URL-encode-decode-and-escape).

## Install

This project uses [node](https://nodejs.org) and [npm](https://www.npmjs.com). 

```sh
$ npm install url-encode-decode
$ # OR
$ yarn add url-encode-decode
```

## Usage

```js
const { encode, decode } = require('url-encode-decode')

encode('foo bar baz') // 'foo+bar+baz'
encode(`Hi! How? & you person/\\`) // 'Hi%21+How%3F+%26+you+person%2F%5C'

decode('foo+bar+baz') // 'foo bar baz'
decode('Hi%21+How%3F+%26+you+person%2F%5C') // `Hi! How? & you person/\\`

```

## Contribute

1. Fork it and create your feature branch: `git checkout -b my-new-feature`
2. Commit your changes: `git commit -am "Add some feature"`
3. Push to the branch: `git push origin my-new-feature`
4. Submit a pull request

## License

MIT
    