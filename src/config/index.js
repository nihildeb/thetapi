const pjson = require('../../package.json')
const logger = require('../log')
const os = require('./os')
const paths = require('./paths')
const pkg = require('./pkg')

const combined = {
  os,
  logger,
  paths,
  pkg,
  version: pjson.version
}
logger.error('config: %s', combined)

module.exports = Object.assign({}, combined)
/// / node requires
// const fs = require('fs')
// const path = require('path')
/// / app requires
// const pjson = require('../package.json')
// const logger = require('./log')

// const PKGFILE = 'thetapkg.js'

// const config = {
//  PKGFILE,
//  logger,
//  pjson,
// }

// config.version = pjson.version
// logger.log('verbose', 'version: %s', config.version)

// config.os = require('./os')
// logger.log('debug', 'config.os: %j', config.os)

// logger.log('debug', 'config.user: %s', JSON.stringify(config.user, null, 2))

// config.paths = {}
// const root = path.resolve(path.join(__dirname, '..'))
// config.paths.root = root

// config.paths.pkg = {}
// const pkgroot = path.resolve(path.join(root, '/pkg'))
// config.paths.pkg.root = pkgroot

// config.paths.pkg.common = path.resolve(path.join(pkgroot, 'common'))
// fs.mkdirSync(config.paths.pkg.common, { recursive: true })
// config.paths.pkg.target = path.resolve(path.join(pkgroot, config.os.target))
// fs.mkdirSync(config.paths.pkg.target, { recursive: true })
// logger.log('debug', 'config.paths: %s', JSON.stringify(config.paths, null, 2))

// config.pkg = {}

// const readPackages = (pkgroot) => {
//  fs.readdirSync(pkgroot).forEach((id) => {
//    const pkgdir = path.resolve(path.join(pkgroot, id))
//    const pkgfile = path.resolve(path.join(pkgdir, config.PKGFILE))
//    config.pkg[id] = { id, paths: { pkgroot, pkgdir, pkgfile } }
//  })
// }
/// / order here is important. target specific packages overwrite common
/// / TODO: maybe expand with username and hostname specific package dirs
// readPackages(config.paths.pkg.common)
// readPackages(config.paths.pkg.target)
// logger.log('debug', 'config.pkg: %s', JSON.stringify(config.pkg, null, 2))

// config.actions = {}
// logger.log('debug', 'config.actions: %j', config.actions)

// const help = (helpTest) => {
//  if (global.it) return
//  console.log(`ThetaPi v${tpVersion()}
// Usage: thetapi <command> [args]
// flags:
//  -d  debug
//  -q  quiet / silent
//  -v  verbose
// commands:
//  list - list all available packages
//  enable - set a package for installation and update
//  disable - set a package for removal and update
//  update - install and uninstall packages
// examples:
//  thetapi list
//  thetapi enable vim
//  thetapi disable privoxy
//  thetapi update
// `)
// }

// const setLogLevel = (argv) => {
//  // log levels
//  if (argv.q) logger.level = 'error'
//  // warn
//  // info
//  if (argv.v) logger.level = 'verbose'
//  if (argv.d) logger.level = 'debug'
//  // silly
// }

// const writeJSON = (filename, json) => {
//  logger.log('debug', 'writing pkg file: %s', filename)
//  fs.writeFileSync(filename, json, (err) => {
//    if (err) throw new Error(err)
//    config.logger.log('debug', 'json=%j', json)
//    config.logger.log('debug', 'written to:', filename)
//  })
// }

// const getJsonOrDefault = (pkgfile) => {
//  try {
//    return JSON.parse(fs.readFileSync(pkgfile))
//  } catch (e) {
//    logger.log('verbose', 'using default package in place of  %s', pkgfile)
//    return JSON.parse(JSON.stringify({defaultpkg: true}))
//  }
// }

// const parsePackage = (baseDir, pkgId) => {
//  const id = pkgId
//  const home = baseDir + '/' + id
//  const pkgfile = home + '/' + PKGJSON
//  const pkgjson = getJsonOrDefault(pkgfile)
//  const package = { id, home, pkgfile, pkgjson }
//  logger.log('debug', 'parsed package: %j', package)
//  return package
// }

// const tpPackages = (paths) => {
//  const packages = {}

//  fs.readdirSync(paths.common).forEach((pkgId) => {
//    packages[pkgId] = parsePackage(paths.common, pkgId)
//  })

//  fs.readdirSync(paths.system).forEach((pkgId) => {
//    packages[pkgId] = parsePackage(paths.system, pkgId)
//  })

//  logger.log('verbose', 'packages: ' + JSON.stringify(packages, null, 2))
//  return packages
// }
