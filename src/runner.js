const config = require('./config')
const logger = config.logger

const updatePackage = (pkg) => {
 console.log(pkg)
}

const update = () => {
  Object.keys(config.packages)
    .filter(key => !config.packages[key].pkgjson.disabled)
    .forEach((p) => { updatePackage(config.packages[p]) })
}

const actionSwitch = () => {
  switch (config.action) {
    case 'ls':
    case 'list':
      Object.keys(config.packages).forEach((p) => {
        if (!global.it) console.log(p)
      })
      break
    case 'update':
      update()
      break
    default:
      config.help()
      logger.log('warn', 'unknown command')
      break
  }
}

const runner = (argv) => {
  logger.log('debug', 'preload config: %j', config)
  config.load(argv)
  actionSwitch()
}

module.exports = runner

//const install = () => {
//  logger.log('debug', 'install: %j', args)
//}

//const uninstall = (args) => {
//  logger.log('debug', 'uninstall: %j', args)
//}

//if (argv._[0]) {
//  switch (argv._[0]) {
//    case 'add':
//    case 'enable':
//    case 'install':
//      install(argv._.slice(1))
//      break
//    case 'ls':
//    case 'list':
//      list()
//      break
//    case 'remove':
//    case 'del':
//    case 'delete':
//    case 'uninstall':
//      uninstall(argv._.slice(1))
//      break
//    case 'update':
//      logger.info('update')
//      break
//    default:
//      logger.log('warn', 'No task specified')
//      console.log(config.help)
//      break
//  }
//} else {
//  logger.log('warn', 'No task specified')
//  console.log(config.help)
//}

