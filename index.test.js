const test = require('ava')
const index = require('./index.js')

const tests = {
  inputs: [
    'alpine', // name
    'alpine@sha256:aaaaf56b44807c64d294e6c8059b479f35350b454492398225034174808d1726', // name@digest
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
    { path: 'alpine' },
    { path: 'alpine', digest: 'sha256:aaaaf56b44807c64d294e6c8059b479f35350b454492398225034174808d1726' },
    { path: 'registry', tag: '2' },
    { path: 'jpetazzo/pxe' },
    { path: 'jpetazzo/pxe', tag: 'latest' },
    { domain: 'quay.io', path: 'signalfuse/zookeeper' },
    { domain: 'index.docker.io', path: 'library/ubuntu', tag: 'latest' },
    { domain: 'internal.mycorp.com:5000', path: 'revealjs' },
    { domain: 'internal.mycorp.com:5000', path: 'revealjs', tag: '3.4.5-3' },
    { domain: 'localhost:5000', path: 'mart/mass', tag: 'latest' },
    { domain: 'localhost:5000', path: 'mass' }
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
