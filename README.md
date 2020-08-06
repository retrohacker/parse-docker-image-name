# Parse Docker Image Name

Aptly named module: parses the name for a docker image into its components.

# Install

```
npm install --save parse-docker-image-name
```

# Usage

```
$ node
> const parse = require("parse-docker-image-name")
undefined
> parse("alpine")
{ name: 'alpine' }
> parse("quay.io/signalfuse/zookeeper")
{ domain: 'quay.io', hostname: 'quay.io', org: 'signalfuse', name: 'zookeeper' }
> parse("internal.mycorp.com:5000/revealjs:3.4.5-3")
{ domain: 'internal.mycorp.com:5000', hostname: 'internal.mycorp.com', port: '5000', name: 'revealjs', tag: '3.4.5-3' }
> parse([ "alpine", "ubuntu" ])
[ { name: 'alpine' }, { name: 'ubuntu' } ]
> parse("alpine@sha256:00000000000000000000000000000000")
{ name: 'alpine', digest: 'sha256:00000000000000000000000000000000' }
```

# How it works

We copied `regexp.go` from the [docker/distribution](https://github.com/docker/distribution/blob/1d0ea8ed7b69a3146eb9182ab0d7eca55c695af3/reference/regexp.go#L68-L70) and hacked it apart to write the generated regular expression to stdout:

```
$ go run main.go
Full: ^((?:(?:[a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])(?:(?:\.(?:[a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]))+)?(?::[0-9]+)?/)?[a-z0-9]+(?:(?:(?:[._]|__|[-]*)[a-z0-9]+)+)?(?:(?:/[a-z0-9]+(?:(?:(?:[._]|__|[-]*)[a-z0-9]+)+)?)+)?)(?::([\w][\w.-]{0,127}))?(?:@([A-Za-z][A-Za-z0-9]*(?:[-_+.][A-Za-z][A-Za-z0-9]*)*[:][[:xdigit:]]{32,}))?$
Domain: (?:[a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])(?:(?:\.(?:[a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]))+)?(?::[0-9]+)?
Name: [a-z0-9]+(?:(?:(?:[._]|__|[-]*)[a-z0-9]+)+)?
Tag: [\w][\w.-]{0,127}
Digest: [A-Za-z][A-Za-z0-9]*(?:[-_+.][A-Za-z][A-Za-z0-9]*)*[:][[:xdigit:]]{32,}
```

The only difference between go's and javascript regular expression syntax for this regular expression is that `[[:xdigit:]]` needs to be translated to `[A-Za-z0-9]`.

Once we had the regular expression in hand, we made every capture group a non-capture group (`(...)` -> `(?:...)`) and then went to work adding the capture groups for this library into the regular expression.

We used regex101.com and the strings from our test suite to validate the regular expression
