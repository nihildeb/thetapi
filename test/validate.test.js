const assert = require('chai').assert
const config = require('../src/config')
const validate = require('../src/validate')

describe('validate', () => {
  it('should exist', () => {
    assert.isOk(validate)
    assert.isFunction(validate)
  })

  it('should error with no config', () => {
    assert.throws(validate)
  })

  it('should validate the generated config', () => {
    const validated = validate({ ...config, testprop: true })
    assert.isOk(validated.testprop)
    assert.equal(validated.pkg.bash.id, 'bash')
    assert.equal(validated.pkg.xinit.id, 'xinit')
  })

  it('should handle missing packages', () => {
    const os = config.os
    const paths = config.paths
    const missingPkg = Object.assign({}, { os, paths })
    const validated = validate(missingPkg)
    assert.isNotOk(validated.isValid)
  })

  it('should handle bad paths', () => {
    const brokenConfig = Object.assign({}, config)
    assert.isOk(validate(brokenConfig).isValid)
    brokenConfig.paths.pkgroot = 'notarealpath'
    assert.isNotOk(validate(brokenConfig).isValid)
  })

  it('should handle missing pkgfiles')

//  it('should validate the paths', () => {
//    const c2 = Object.assign({}, config)
//    assert.isOk(validate(c2))
//    assert.isOk(c2.pkg.bash.paths.pkgfile = 'asd')
//    assert.isNotOk(validate(c2))
//  })
//  // it('should validate pkg api')
})
