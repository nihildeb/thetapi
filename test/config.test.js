const assert = require('chai').assert
const config = require('../src/config')

describe('config', () => {
  it('exists', () => {
    assert.isOk(config)
    assert.isObject(config)
  })

  it('knows its os properties', () => {
    assert.isString(config.os.platform)
    assert.isString(config.os.arch)
    assert.isString(config.os.target)
    assert.isString(config.os.username)
    assert.isString(config.os.homedir)
  })

  it('knows its paths and they exist', () => {
    assert.isString(config.paths.PKGFILE)
    assert.isString(config.paths.thetapi)
    assert.isString(config.paths.pkgroot)
    assert.isString(config.paths.common)
    assert.isString(config.paths.system)
    assert.isString(config.paths.homedir)
  })

  it('knows its version', () => {
    assert.isOk(config.version)
    assert.isString(config.version)
  })

  it('has a list of packages', () => {
    assert.isOk(config.pkg)
    assert.isObject(config.pkg)
    assert.isAtLeast(Object.keys(config.pkg).length, 2)
  })

  it('fills out a package config', () => {
    assert.equal(config.pkg.bash.id, 'bash')
    assert.match(config.pkg.bash.stowdir, /pkg/)
    assert.match(config.pkg.bash.pkgdir, /bash$/)
  })
})
