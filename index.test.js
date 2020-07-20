const test = require('ava')
const index = require('./index.js')

const tests = {
  inputs: [
    'alpine', // reponame
    'registry:2', // reponame:tag
    'jpetazzo/pxe', // username/reponame
    'jpetazzo/pxe:latest', // username/reponame:tag
    'quay.io/signalfuse/zookeeper', // hostname/username/reponame
    'index.docker.io/library/ubuntu:latest', // hostname/username/reponame:tag
    'internal.mycorp.com:5000/revealjs', // hostname:port/reponame
    'internal.mycorp.com:5000/revealjs:3.4.5-3', // hostname:port/reponame:tag
    'localhost:5000/mart/mass:latest' // hostname:port/username/reponame:tag
  ],
  outputs: [
    { reponame: 'alpine' },
    { reponame: 'registry', tag: '2' },
    { username: 'jpetazzo', reponame: 'pxe' },
    { username: 'jpetazzo', reponame: 'pxe', tag: 'latest' },
    { hostname: 'quay.io', username: 'signalfuse', reponame: 'zookeeper' },
    { hostname: 'index.docker.io', username: 'library', reponame: 'ubuntu', tag: 'latest' },
    { hostname: 'internal.mycorp.com', port: '5000', reponame: 'revealjs' },
    { hostname: 'internal.mycorp.com', port: '5000', reponame: 'revealjs', tag: '3.4.5-3' },
    { hostname: 'localhost', port: '5000', username: 'mart', reponame: 'mass', tag: 'latest' }
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
