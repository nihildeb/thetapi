const path = require('path')
const { execSync } = require('child_process')
const validate = require('./validate')
const logger = require('./log')

const shShell = '/bin/sh'
const dryShell = path.resolve(path.join(__dirname, '../bin/dryrun.sh'))
const cmdOpts = {
  stdio: 'inherit',
  timeout: 200, // ms
  shell: dryShell, // dryrun with fake shell is the default
}

const runAction = (cmd, opts) => {
  const actionOpts = Object.assign({}, cmdOpts, opts)
  execSync(cmd, actionOpts)
}

const actions = {}
actions.sh = (cmd, opts) => { runAction(cmd, opts) }
actions.log = (level, message, args) => logger.log(level, message, args)
actions.aptupdate = () => { console.log('aptupdate') }
actions.aptinstall = (aptPkgList) => { console.log('aptinstall') }
actions.stow = (pkg, withSudo = false) => {}

const exec = (config) => {
  // console.log(config.dryrun)
  if (!config.dryrun) cmdOpts.shell = shShell
  Object.keys(config.pkg).forEach((pkgid) => {
    config.pkg[pkgid].pfn(actions, config)
  })
}

const req = (config) => {
  // TODO: mutation is bad
  Object.keys(config.pkg).forEach((pkgid) => {
    const pdir = config.pkg[pkgid].stowdir + '/' + pkgid
    const pfile = pdir + '/' + config.paths.PKGFILE
    logger.verbose('requiring: %s', pfile)
    try {
      const fn = require(pfile)
      if (typeof (fn) === 'function') {
        config.pkg[pkgid].pfn = fn
      } else {
        logger.warn('replacing bad package file: %s', pfile)
        config.pkg[pkgid].pfn = () => { throw pfile }
      }
    } catch (e) {
      logger.error('requiring %s: %j', pkgid, e)
      throw e
    }
  })
  return config
}

const run = (config) => {
  if (!config) throw new Error('no config')
  const validated = validate(config)
  if (!validated.isValid) throw new Error('errors in configuration')
  const executable = req(validated)
  exec(executable)
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
