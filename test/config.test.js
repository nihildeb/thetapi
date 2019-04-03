const fs = require('fs')
const assert = require('chai').assert
const config = require('../src/config')

describe('config', () => {
  before(() => {
    config.testpkgCreate()
    config.load()
  })
  after(() => {
    config.testpkgDelete()
  })
  it('exists', () => {
    assert.ok(config)
  })
  it('should return a config object', () => {
    assert.isObject(config)
    assert.isObject(config.paths)
    assert.isString(config.paths.TPHOME)
    assert.isString(config.paths.PKGJSON)
    assert.isString(config.version)
  })
  it('should have a home', () => {
    assert.isString(config.paths.TPHOME)
    assert.match(config.paths.TPHOME, /^\//)
    assert.match(config.paths.TPHOME, /thetapi/)
  })
  it('should have a version', () => {
    assert.isString(config.version)
    assert.match(config.version, /^\d+\.\d+\.\d+/)
  })
  it('should have help', () => {
    assert.isFunction(config.help)
  })
  it('should have a logger', () => {
    assert.isOk(config.logger)
    assert.isFunction(config.logger.log)
  })
  it('should have a system package path', () => {
    assert.isOk(config.paths.pkg.system)
    assert.match(config.paths.pkg.system, /^\//)
    assert.match(config.paths.pkg.system, /debian/)
  })
  it('should have a common package path', () => {
    assert.isOk(config.paths.pkg.common)
    assert.match(config.paths.pkg.common, /^\//)
    assert.match(config.paths.pkg.common, /common/)
  })
  it('should have packages', () => {
    assert.isOk(config.packages)
    //assert.match(config.paths.common, /^\//)
    //assert.match(config.paths.common, /common/)
  })
})


