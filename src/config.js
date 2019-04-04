const fs = require('fs')
const pjson = require('../package.json')
const logger = require('./log.js')

const tpHome = () => {
  if (!process.env.THETAPI_HOME) {
    logger.log('error', `THETAPI_HOME not defined`)
    throw new Error('THETAPI_HOME INVALID')
  }
  logger.log('debug', 'THETAPI_HOME=%j', process.env.THETAPI_HOME)
  return process.env.THETAPI_HOME
}

const TPHOME = tpHome()
const PKGJSON = 'pkg.json'

const tpVersion = () => {
  logger.log('debug', 'ThetaPi v%s', pjson.version)
  return pjson.version
}

const tpPkgRoot = () => {
  const pkgroot = tpHome() + '/pkg'
  logger.log('debug', 'pkg root: %s', pkgroot)
  return pkgroot
}

const packagePath = (system) => {
  logger.log('debug', 'pkg path for system: %s', system)
  const pkgPath = tpPkgRoot() + '/' + system
  if (! fs.existsSync(pkgPath)) {
    logger.log('error', 'pkgPath not found:%s', pkgPath)
    throw new Error('pkgPath=' + pkgPath)
  }
  logger.log('debug', 'stow package base: %s', pkgPath)
  return pkgPath
}

const help = (helpTest) => {
  if (global.it) return
  console.log(`ThetaPi v${tpVersion()}
Usage: thetapi <command> [args]
flags:
  -d  debug
  -q  quiet / silent
  -v  verbose
commands:
  list - list all available packages
  enable - set a package for installation and update
  disable - set a package for removal and update
  update - install and uninstall packages
examples:
  thetapi list
  thetapi enable vim
  thetapi disable privoxy
  thetapi update
`)
}

const setLogLevel = (argv) => {
  // log levels
  if (argv.q) logger.level = 'error'
  // warn
  // info
  if (argv.v) logger.level = 'verbose'
  if (argv.d) logger.level = 'debug'
  // silly
}

const writeJSON = (filename, json) => {
  logger.log('debug', 'writing pkg file: %s', filename)
  fs.writeFileSync(filename, json, (err) => {
    if (err) throw new Error(err)
    config.logger.log('debug', 'json=%j', json)
    config.logger.log('debug', 'written to:', filename)
  })
}

const getJsonOrDefault = (pkgfile) => {
  try {
    return JSON.parse(fs.readFileSync(pkgfile))
  } catch (e) {
    logger.log('verbose', 'using default package in place of  %s', pkgfile)
    return JSON.parse(JSON.stringify({defaultpkg: true}))
  }
}

const parsePackage = (baseDir, pkgId) => {
  const id = pkgId
  const home = baseDir + '/' + id
  const pkgfile = home + '/' + PKGJSON
  const pkgjson = getJsonOrDefault(pkgfile)
  const package = { id, home, pkgfile, pkgjson }
  logger.log('debug', 'parsed package: %j', package)
  return package
}

const tpPackages = (paths) => {
  const packages = {}

  fs.readdirSync(paths.common).forEach((pkgId) => {
    packages[pkgId] = parsePackage(paths.common, pkgId)
  })

  fs.readdirSync(paths.system).forEach((pkgId) => {
    packages[pkgId] = parsePackage(paths.system, pkgId)
  })

  logger.log('verbose', 'packages: ' + JSON.stringify(packages, null, 2))
  return packages
}

const TESTPKGDIR = `${TPHOME}/pkg/common/testpkg`
const TESTPKGFILE = `${TESTPKGDIR}/${PKGJSON}`

const testpkgCreate = () => {
  if ( fs.existsSync(TESTPKGDIR) ) {
    require('rimraf').sync(TESTPKGDIR)
  }

  fs.mkdirSync(TESTPKGDIR, { recursive: true })
  writeJSON(TESTPKGFILE, JSON.stringify({
    testpkg: true
  }))
}

const testpkgDelete = () => {
  require('rimraf').sync(TESTPKGDIR)
}

const config = {
  paths: {
    TPHOME,
    PKGJSON,
    pkg: {}
  },
  version: tpVersion(),
  help,
  logger,
  writeJSON,
  testpkgCreate,
  testpkgDelete
}

const load = ( argv = { _ : ['default'], s: 'debian'} ) => {
  if (!argv || !argv._ || !argv._.length || argv._.length < 1) {
    argv._ = []
    argv._.push('default')
  }
  if (!argv.s) argv.s = 'debian'
  logger.log('verbose', 'config refreshed with load(%j)', argv)
  config.argv = argv
  config.action = argv._[0]
  setLogLevel(config.argv)
  config.paths.pkg.system = packagePath(config.argv.s)
  config.paths.pkg.common = packagePath('common')
  config.packages = tpPackages(config.paths.pkg)
}
config.load = load

module.exports = config
