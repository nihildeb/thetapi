const argv = require('minimist')(process.argv.slice(2))
const runner = require('./runner')
runner(argv)

