function isStr (str) {
  return typeof str === 'string'
}

module.exports = {
  encode (str = '') {
    if (!isStr(str)) {
      throw new Error('Please provide string to encode.')
    }

    return encodeURIComponent(str).replace(/!/g, '%21')
      .replace(/'/g, '%27')
      .replace(/\(/g, '%28')
      .replace(/\)/g, '%29')
      .replace(/\*/g, '%2A')
      .replace(/%20/g, '+')
  },

  decode (str = '') {
    if (!isStr(str)) {
      throw new Error('Please provide string to decode')
    }

    return decodeURIComponent((str).replace(/\+/g, '%20'))
  }
}
