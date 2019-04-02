const fs = require('fs')
const pjson = require('../package.json')
const logger = require('./log.js')
const argv = require('minimist')(process.argv.slice(2))


const tpHome = () => {
  if (!process.env.THETAPI_HOME) {
    logger.log('error', `THETAPI_HOME not defined`)
    throw new Error('THETAPI_HOME INVALID')
  }
  logger.log('debug', 'THETAPI_HOME=%j', process.env.THETAPI_HOME)
  return process.env.THETAPI_HOME
}

// CONSTANTS req for any functionality
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

const tpHelp = (version) => { return `ThetaPi v${version}
Usage: thetapi <command> [args]
  -d  debug
  -q  quiet / silent
  -v  verbose

Examples:
thetapi list
thetapi install vim
thetapi uninstall privoxy
`
}

const setLogLevel = () => {
  // log levels
  if (argv.q) logger.level = 'error'
  // warn
  // info
  if (argv.v) logger.level = 'verbose'
  if (argv.d) logger.level = 'debug'
  // silly
}

const writeJSON = (filename, json) => {
  fs.writeFile(filename, json, (err) => {
    if (err) throw new Error(err)
    config.logger.log('debug', 'json=%j', json)
    config.logger.log('debug', 'written to:', filename)
  })
}

const getJsonOrDefault = (pkgfile) => {
  try {
    return JSON.parse(fs.readFileSync(pkgfile))
  } catch (e) {
    logger.log('warn', 'using default package in place of  %s', pkgfile)
    logger.log('warn', 'error obj: %j', e)
    const defaultpkg = {
      defaultpkg: true
    }
    return JSON.parse(JSON.stringify(defaultpkg))
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

  try {
    fs.readdirSync(paths.common).forEach((pkgId) => {
      logger.log('warn', 'pkgId: %s', pkgId)
      packages[pkgId] = parsePackage(paths.common, pkgId)
    })
  } catch (e) {
    logger.log('error', 'missing common packages')
    throw new Error('missing common packages')
  }

  if ( paths && paths.system && fs.existsSync(paths.system) ) {
    fs.readdirSync(paths.system).forEach((pkgId) => {
      packages[pkgId] = parsePackage(paths.system, pkgId)
    })
  } else {
    logger.log('error', 'missing system packages')
    throw new Error('missing system packages')
  }

  logger.log('verbose', 'packages:' + JSON.stringify(packages, null, 2))
  return packages
}


const TESTPKGDIR = `${TPHOME}/pkg/common/testpkg`
const TESTPKGFILE = `${TESTPKGDIR}/${PKGJSON}`

const testpkgCreate = () => {
  if (! argv.s) {
    argv.s = 'debian'
  }
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
  help: tpHelp(tpVersion()),
  logger,
  argv,
  writeJSON,
  testpkgCreate,
  testpkgDelete
}


const load = () => {
  logger.log('warn', 'load')
  setLogLevel()
  config.paths.pkg.system = packagePath(config.argv.s)
  config.paths.pkg.common = packagePath('common')
  config.packages = tpPackages(config.paths.pkg)
}
config.load = load

module.exports = config
