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
{ reponame: "alpine" }
> parse("quay.io/signalfuse/zookeeper")
{ hostname: "quay.io", username: "signalfuse", reponame: "zookeeper" }
> parse("internal.mycorp.com:5000/revealjs")
{ hostname: 'internal.mycorp.com', port: '5000', reponame: 'revealjs' }
> parse([ "alpine", "ubuntu" ])
[ { reponame: 'alpine' }, { reponame: 'ubuntu' } ]
```

> Note: this module uses simple parsing mechanisms that guarentee a result will
> always be returned even if you provide an invalid image name. We do no
> validation ourselves.
