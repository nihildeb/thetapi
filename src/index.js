const config = require('./config')
const logger = config.logger

logger.log('debug', 'argv: %j', argv)
logger.log('debug', 'OS: %j', argv.s)

const install = () => {
  logger.log('debug', 'install: %j', args)
}

const uninstall = (args) => {
  logger.log('debug', 'uninstall: %j', args)
}

if (argv._[0]) {
  switch (argv._[0]) {
    case 'add':
    case 'enable':
    case 'install':
      install(argv._.slice(1))
      break
    case 'ls':
    case 'list':
      list()
      break
    case 'remove':
    case 'del':
    case 'delete':
    case 'uninstall':
      uninstall(argv._.slice(1))
      break
    case 'update':
      logger.info('update')
      break
    default:
      logger.log('warn', 'No task specified')
      console.log(config.help)
      break
  }
} else {
  logger.log('warn', 'No task specified')
  console.log(config.help)
}

logger.log('debug', 'jobs done')

