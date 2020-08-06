const test = require('ava')
const index = require('./index.js')

const tests = {
  inputs: [
    'alpine', // name
    'alpine@sha256:00000000000000000000000000000000', // name@digest
    'registry:2', // name:tag
    'jpetazzo/pxe', // org/name
    'jpetazzo/pxe:latest', // org/name:tag
    'quay.io/signalfuse/zookeeper', // hostname/org/name
    'index.docker.io/library/ubuntu:latest', // hostname/org/name:tag
    'internal.mycorp.com:5000/revealjs', // hostname:port/name
    'internal.mycorp.com:5000/revealjs:3.4.5-3', // hostname:port/name:tag
    'localhost:5000/mart/mass:latest', // hostname:port/org/name:tag
    'localhost:5000/mass' // hostname:port/name:tag
  ],
  outputs: [
    { name: 'alpine' },
    { name: 'alpine', digest: 'sha256:00000000000000000000000000000000' },
    { name: 'registry', tag: '2' },
    { org: 'jpetazzo', name: 'pxe' },
    { org: 'jpetazzo', name: 'pxe', tag: 'latest' },
    { domain: 'quay.io', hostname: 'quay.io', org: 'signalfuse', name: 'zookeeper' },
    { domain: 'index.docker.io', hostname: 'index.docker.io', org: 'library', name: 'ubuntu', tag: 'latest' },
    { domain: 'internal.mycorp.com:5000', hostname: 'internal.mycorp.com', port: '5000', name: 'revealjs' },
    { domain: 'internal.mycorp.com:5000', hostname: 'internal.mycorp.com', port: '5000', name: 'revealjs', tag: '3.4.5-3' },
    { domain: 'localhost:5000', hostname: 'localhost', port: '5000', org: 'mart', name: 'mass', tag: 'latest' },
    { domain: 'localhost:5000', hostname: 'localhost', port: '5000', name: 'mass' }
  ]
}

for (let i = 0; i < tests.inputs.length; i++) {
  const input = tests.inputs[i]
  const output = tests.outputs[i]
  test(`Parses ${input}`, t => {
    t.deepEqual(index(input), output)
  })
}

test('Parses array', t => {
  t.deepEqual(index(tests.inputs), tests.outputs)
})
