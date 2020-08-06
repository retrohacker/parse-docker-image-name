// This regular expression is generated based on the output of main.go
// for more context refer to the README.md in this repo
const regexp = /^(?:(?<domain>(?<hostname>(?:[a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])(?:(?:\.(?:[a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]))+)?)(?::(?<port>[0-9]+))?)\/)?(?:(?<org>[a-z0-9]+(?:(?:(?:[._]|__|[-]*)[a-z0-9]+)+)?)\/)?(?<name>(?:[a-z0-9]+(?:(?:(?:[._]|__|[-]*)[a-z0-9]+)+)?\/?)+)(?::(?<tag>[\w][\w.-]{0,127}))?(?:@(?<digest>[A-Za-z][A-Za-z0-9]*(?:[-_+.][A-Za-z][A-Za-z0-9]*)*[:][a-zA-Z0-9]{32,}))?/

const parse = (input) => {
  if (Array.isArray(input)) return input.map(p)
  return p(input)
}

const p = (name) => {
  const result = regexp.exec(name)

  if (!result) {
    return {}
  }

  const groups = result.groups

  // If the domain is set but the org is not, and the domain isn't localhost, doesn't include a port, and doesn't include any dots
  // it means the user likely wanted this to be a org. For example, with foo/bar:latest, we want foo to be a org
  if (groups.org === undefined && groups.domain && groups.port === undefined && groups.domain !== 'localhost' && groups.domain.indexOf('.') === -1) {
    groups.org = groups.domain
    groups.domain = undefined
    groups.hostname = undefined
  }

  // Remove any optional keys that are undefined
  if (groups.domain === undefined) {
    delete groups.domain
  }

  if (groups.hostname === undefined) {
    delete groups.hostname
  }

  if (groups.port === undefined) {
    delete groups.port
  }

  if (groups.org === undefined) {
    delete groups.org
  }

  if (groups.tag === undefined) {
    delete groups.tag
  }

  if (groups.digest === undefined) {
    delete groups.digest
  }

  return groups
}

module.exports = parse
