const fs = require('fs')
const _ = require('lodash')

const valfs = (config, path) => {
  const isOk = fs.existsSync(path)
  if (isOk) {
    config.logger.log('debug', 'found file: %s', path)
  } else {
    config.logger.log('error', 'file not found: %s', path)
  }
  return isOk
}

const valprop = (config, prop) => {
  let isOk = _.get(config, prop, false)
  if (isOk) {
    config.logger.log('debug', 'valid prop: %s %j', prop, isOk)
    isOk = (/paths/.test(prop)) ? valfs(config, isOk) : isOk
  } else {
    config.logger.log('error', 'missing config property: %s', prop)
  }
  return isOk
}

const validate = (config) => {
  if (!config.logger) return false
  let isOk = true
  isOk = valprop(config, 'user.username') && isOk
  isOk = valprop(config, 'user.homedir') && isOk
  isOk = valprop(config, 'paths.root') && isOk
  isOk = valprop(config, 'paths.pkg.root') && isOk
  isOk = valprop(config, 'paths.pkg.common') && isOk
  isOk = valprop(config, 'paths.pkg.target') && isOk
  isOk = valprop(config, 'pkg.bash') && isOk
  isOk = valprop(config, 'os.target') && isOk

  Object.keys(config.pkg).forEach((pkgid) => {
    config.logger.log('debug', 'validating package: %s', pkgid)
    isOk = valprop(config, `pkg.${pkgid}.paths.pkgroot`) && isOk
    isOk = valprop(config, `pkg.${pkgid}.paths.pkgdir`) && isOk
    isOk = valprop(config, `pkg.${pkgid}.paths.pkgfile`) && isOk
  })
  return isOk
}

module.exports = validate
