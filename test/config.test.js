const assert = require('chai').assert
const config = require('../src/config')

describe('config', () => {
  it('exists', () => {
    assert.isOk(config)
    assert.isObject(config)
  })

  it('has a logger', () => {
    assert.isObject(config.logger)
    assert.isFunction(config.logger.log)
  })

  it('knows its os properties', () => {
    assert.isString(config.os.platform)
    assert.isString(config.os.arch)
    assert.isString(config.os.target)
    assert.isString(config.os.username)
    assert.isString(config.os.homedir)
  })

  it('knows its paths and they exist', () => {
    assert.isString(config.paths.thetapi)
    assert.isString(config.paths.pkgroot)
    assert.isString(config.paths.common)
    assert.isString(config.paths.system)
    assert.isString(config.paths.userhome)
  })

  it('knows its package props', () => {
    assert.isOk(config.version)
    assert.isString(config.version)
  })

  it('has a list of packages', () => {
    console.dir(config.pkg)
    assert.isOk(config.pkg)
    assert.isObject(config.pkg)
    assert.isAtLeast(Object.keys(config.pkg).length, 2)
  })
})
//  before(() => {
//    config.testpkgCreate()
//    config.load()
//  })
//  after(() => {
//    config.testpkgDelete()
//  })
//  it('exists', () => {
//    assert.ok(config)
//  })
//  it('should return a config object', () => {
//    assert.isObject(config)
//    assert.isObject(config.paths)
//    assert.isString(config.paths.TPHOME)
//    assert.isString(config.paths.PKGJSON)
//    assert.isString(config.version)
//  })
//  it('should have a home', () => {
//    assert.isString(config.paths.TPHOME)
//    assert.match(config.paths.TPHOME, /^\//)
//    assert.match(config.paths.TPHOME, /thetapi/)
//  })
//  it('should have a version', () => {
//    assert.isString(config.version)
//    assert.match(config.version, /^\d+\.\d+\.\d+/)
//  })
//  it('should have help', () => {
//    assert.isFunction(config.help)
//  })
//  it('should have a logger', () => {
//    assert.isOk(config.logger)
//    assert.isFunction(config.logger.log)
//  })
//  it('should have a system package path', () => {
//    assert.isOk(config.paths.pkg.system)
//    assert.match(config.paths.pkg.system, /^\//)
//    assert.match(config.paths.pkg.system, /debian/)
//  })
//  it('should have a common package path', () => {
//    assert.isOk(config.paths.pkg.common)
//    assert.match(config.paths.pkg.common, /^\//)
//    assert.match(config.paths.pkg.common, /common/)
//  })
//  it('should have packages', () => {
//    assert.isOk(config.packages)
//    //assert.match(config.paths.common, /^\//)
//    //assert.match(config.paths.common, /common/)
//  })
// })
