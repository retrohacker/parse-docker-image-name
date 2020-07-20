const parse = (input) => {
  if (Array.isArray(input)) return input.map(p)
  return p(input)
}

const p = (name) => {
  const components = name.split('/')
  let result = {}
  switch (components.length) {
    case 1:
      result = { reponame: components[0] }
      break
    case 2:
      result = { username: components[0], reponame: components[1] }
      break
    case 3:
      result = { hostname: components[0], username: components[1], reponame: components[2] }
      break
  }
  if (!result.hostname && result.username && result.username.indexOf('.') > 0) {
    result.hostname = result.username
    delete result.username
  }
  if (result.hostname) {
    const pieces = result.hostname.split(':')
    if (pieces.length === 2) {
      result.hostname = pieces[0]
      result.port = pieces[1]
    }
  }
  const pieces = result.reponame.split(':')
  if (pieces.length === 2) {
    result.reponame = pieces[0]
    result.tag = pieces[1]
  }

  return result
}

module.exports = parse
