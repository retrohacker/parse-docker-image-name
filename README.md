# Parse Docker Image Name

Aptly named module: parses the name for a docker image into its components using the same implementation used by Docker.

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
{ path: 'alpine' }
> parse("quay.io/signalfuse/zookeeper")
{ domain: 'quay.io', path: 'signalfuse/zookeeper' }
> parse("internal.mycorp.com:5000/revealjs:3.4.5-3")
{ domain: 'internal.mycorp.com:5000', path: 'revealjs', tag: '3.4.5-3' }
> parse([ "alpine", "ubuntu" ])
[{ path: 'alpine' }, { path: 'ubuntu' }]
> parse("alpine@sha256:00000000000000000000000000000000")
{ path: 'alpine', digest: 'sha256:aaaaf56b44807c64d294e6c8059b479f35350b454492398225034174808d1726' }
```

# How it works

We compiled `main.go` with `gopherjs`, removed the closure around the generated code, and added `module.exports = registry["github.com/docker/distribution/reference"]` to the final line.

The we import that into `index.js` and transform the output of the function into a native JavaScript object.
