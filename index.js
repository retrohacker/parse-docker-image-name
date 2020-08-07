var reference = require('./main.js')

var hasPort = /:[0-9]+/
var hasDot = /\./
var isLocalhost = /^localhost(:[0-9]+)?$/

module.exports = function parse (image) {
  if (Array.isArray(image)) return image.map(p)
  return p(image)
}

function p (image) {
  var parsed = reference.Parse(image)
  // Error object returned
  if (!parsed[0].$val) {
    return {}
  }
  var components = (function getKeys (input, result) {
    Object.keys(input).forEach(function (v) {
      if ((typeof input[v]) === 'object' && input[v].visited !== true) {
        input[v].visited = true
        getKeys(input[v], result)
      }
      result[v] = input[v]
    })
    return result
  })(parsed[0], {})

  Object.keys(components).forEach(function (v) {
    if ((typeof components[v]) !== 'string') {
      delete components[v]
    }
    if (components[v] === '') {
      delete components[v]
    }
  })

  var domain = components.domain
  if (domain && !hasPort.test(domain) && !hasDot.test(domain) && !isLocalhost.test(domain)) {
    components.path = domain + '/' + components.path
    delete components.domain
  }

  return components
}
