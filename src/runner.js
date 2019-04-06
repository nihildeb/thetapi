const validate = require('./validate')

const actions = {}
actions.sh = (cmd, opts) => { console.log(cmd) }

// https://stackoverflow.com/questions/14782232/how-to-avoid-cannot-read-property-of-undefined-errors
// const safeGet = (fn, val) => {
//  try {
//    return fn()
//  } catch (e) {
//    return val
//  }
// }

const exec = (config) => {
  const dryrun = config.dryrun
  Object.keys(config.pkg).forEach((pkgid) => {
    const fn = config.pkg[pkgid].fn
    config.logger.verbose('call package function: %s', pkgid)
    if (!dryrun) fn(actions, config, config.logger)
  })
}

const req = (config) => {
  Object.keys(config.pkg).forEach((pkgid) => {
    const pfile = config.pkg[pkgid].paths.pkgfile
    config.logger.log('verbose', 'requiring: %s', pfile)
    try {
      const fn = require(pfile)
      if (typeof (fn) === 'function') {
        config.pkg[pkgid].fn = fn
      } else {
        config.logger.warn('replacing bad package file: %s', pfile)
        config.pkg[pkgid].fn = () => {}
      }
    } catch (e) {
      config.logger.log('error', 'requiring %s: %j', pkgid, e)
      throw e
    }
  })
}

const run = (config) => {
  if (!config) throw new Error('no config')
  if (!validate(config)) throw new Error('errors in configuration')
  req(config)
  exec(config)
}

module.exports.run = run
module.exports.req = req

// const path = require('path')
// const { execSync } = require('child_process')
// const config = require('./config')
// const logger = config.logger

// const execCmd = (cmd, timeout = 200) => {
//  const stdio = 'inherit'
//  if (!global.it) {
//    logger.log('verbose', cmd)
//    execSync(cmd, {stdio, timeout})
//  } else {
//    console.log(cmd)
//  }
// }

// const execScript = (pkg, afterBefore) => {
//  const timeout = safeGet(() => pkg.pkgjson.timeout, null)
//  const useSudo = safeGet(() => pkg.pkgjson.useSudo, false)
//  const sudo = (useSudo) ? 'sudo ' : ''
//  if (safeGet(() => pkg.pkgjson.install[afterBefore], false)) {
//  }
//  safeGet(() => pkg.pkgjson.install[afterBefore], []).forEach((cmd) => {
//    execCmd(`${sudo}${cmd}`, timeout)
//  })
// }

// const execStow = (pkg) => {
//  const target = safeGet(() => pkg.pkgjson.install.stow.target, null)
//  if (!target) {
//    logger.log('verbose', 'nothing to stow for %s', pkg.id)
//    return
//  }
//  const targetDir = (target === '~') ? process.env.HOME : target

//  const stowDir = path.resolve(path.join(pkg.home, '..'))
//  const stow = "stow --ignore pkg.json"

//  const timeout = safeGet(() => pkg.pkgjson.timeout, null)
//  const useSudo = safeGet(() => pkg.pkgjson.useSudo, false)
//  const sudo = (useSudo) ? 'sudo ' : ''

//  execCmd(
//    `${sudo}${stow} -d ${stowDir} -t ${targetDir} ${pkg.id}`,
//    timeout)
// }

// const updatePackage = (pkg) => {
//  if (pkg.pkgjson.disabled) {
//    // need to get stow adopt working for rollbacks to support uninstall
//    // see also: chkstow for validation
//    logger.log('verbose', 'pkg skipped: %s', pkg.id)
//  } else {
//    logger.log('verbose', 'pkg update: %s', pkg.id)
//    execScript(pkg, 'before')
//    execStow(pkg)
//    execScript(pkg, 'after')
//    logger.log('info', 'pkg updated: %s', pkg.id)
//  }
// }

// const update = () => {
//  Object.keys(config.packages)
//    //.filter(key => !config.packages[key].pkgjson.disabled)
//    .forEach((p) => { updatePackage(config.packages[p]) })
// }

// const actionSwitch = () => {
//  switch (config.action) {
//    case 'ls':
//    case 'list':
//      Object.keys(config.packages).forEach((p) => {
//        if (!global.it) console.log(p)
//      })
//      break
//    case 'update':
//      update()
//      break
//    default:
//      config.help()
//      logger.log('warn', 'unknown command')
//      break
//  }
// }

// const runner = (argv) => {
//  logger.log('debug', 'preload config: %j', config)
//  config.load(argv)
//  actionSwitch()
// }

// module.exports = runner
