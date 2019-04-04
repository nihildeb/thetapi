const os = require('os')

console.log('arch' + os.arch)
console.log('platform' + os.platform)
console.log('release' + os.release())
console.log('dirname:' + __dirname)

const parse = require('minimist')
const argv = parse(process.argv.slice(2), {
  boolean: ['v', 'd', 'q']
})

const runner = require('./runner')
//runner(argv)

