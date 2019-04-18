const fs = require('fs')
const _ = require('lodash')
const logger = require('./log')
const isTest = !!(global.it)

// https://stackoverflow.com/questions/14782232/how-to-avoid-cannot-read-property-of-undefined-errors
// const safeGet = (fn, val) => {
//  try {
//    return fn()
//  } catch (e) {
//    return val
//  }
// }

const valfs = (config, path) => {
  const isOk = fs.existsSync(path)
  if (isOk) {
    logger.debug('found file: %s', path)
  } else {
    if (!isTest) logger.error('file not found: %s', path)
  }
  return isOk
}

const valprop = (config, prop) => {
  let isOk = _.get(config, prop, false)
  if (isOk) {
    if (!isTest) logger.debug('valid prop: %s %j', prop, isOk)
    isOk = (/paths/.test(prop)) ? valfs(config, isOk) : isOk
  } else {
    // logger.error('missing config property: %s', prop)
    if (!isTest) logger.error('missing config property: %s', prop)
  }
  return isOk
}

const validate = (config) => {
  if (!config || config === {}) throw new Error('no config')
  let isOk = true
  isOk = valprop(config, 'os.username') && isOk
  isOk = valprop(config, 'os.homedir') && isOk
  isOk = valprop(config, 'os.target') && isOk
  isOk = valprop(config, 'paths.thetapi') && isOk
  isOk = valprop(config, 'paths.pkgroot') && isOk
  isOk = valprop(config, 'paths.common') && isOk
  isOk = valprop(config, 'paths.system') && isOk
  isOk = valprop(config, 'pkg.bash') && isOk
  isOk = valprop(config, 'pkg.git') && isOk
  isOk = valprop(config, 'pkg.xinit') && isOk

  if (isOk) {
    Object.keys(config.pkg).forEach((pkgid) => {
      logger.debug('validating package: %s', pkgid)
      isOk = valprop(config, `pkg.${pkgid}.id`) && isOk
      isOk = valprop(config, `pkg.${pkgid}.pkgdir`) && isOk
    })
  }
  return Object.assign({}, {
    ...config,
    isValid: isOk
  })
}

module.exports = validate
