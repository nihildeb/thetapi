const pjson = require('../package.json')
const logger = require('./log.js')
const argv = require('minimist')(process.argv.slice(2))

// log levels
if (argv.s) logger.level = 'error'
// warn
// info
if (argv.v) logger.level = 'verbose'
if (argv.d) logger.level = 'debug'
// silly

logger.log('info', 'ThetaPi v%s', pjson.version)
logger.log('debug', 'argv: %j', argv)
logger.log('debug', 'OS: %j', argv.s)

const help=`ThetaPi v${pjson.version}
Usage: thetapi <command> [args]
  -d  debug
  -s  silent
  -v  verbose

Examples:
thetapi list
thetapi install vim
thetapi uninstall privoxy
`

if (!process.env.THETAPI_HOME) {
  logger.log('error', `THETAPI_HOME=%j`, process.env.THETAPI_HOME)
  throw new Error('THETAPI_HOME INVALID')
}
logger.log('debug', 'THETAPI_HOME=%j', process.env.THETAPI_HOME)

if (argv._[0]) {
  switch (argv._[0]) {
    case 'install':
      logger.info('install')
      break
    case 'list':
      logger.info('list')
      break
    case 'uninstall':
      logger.info('uninstall')
      break
    case 'update':
      logger.info('update')
      break
    default:
      logger.log('warn', 'No task specified')
      console.log(help)
      break
  }
} else {
  logger.log('warn', 'No task specified')
  console.log(help)
}

logger.info('jobs done')

