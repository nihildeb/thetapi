// const assert = require('chai').assert
// const config = require('../src/config')
// const validate = require('../src/validate')

// describe('validate', () => {
//  it('should exist', () => {
//    assert.isOk(validate)
//    assert.isFunction(validate)
//  })

//  it('should error with no config', () => {
//    assert.throws(validate)
//    assert.isOk(validate(config))
//  })

//  it('should assign', () => {
//    const a = { a: { a: 1 } }
//    const b = Object.assign(a, {})
//    assert.deepEqual(a, b)
//    const c = Object.assign({}, a)
//    assert.deepEqual(a, c)
//    const d = Object.assign({ d: 1 }, a)
//    assert.deepEqual(d, { a: { a: 1 }, d: 1 })
//  })

//  it('should validate config', () => {
//    assert.isOk(validate(config))
//    assert.isOk(validate(
//      Object.assign({}, config, { extraprop: {} })
//    ))
//    assert.isNotOk(validate(
//      Object.assign({}, config, { user: {} })
//    ))
//    assert.isNotOk(validate(
//      Object.assign({}, config, { pkg: {} })
//    ))
//    assert.isOk(validate(config))
//  })

//  it('should validate the paths', () => {
//    const c2 = Object.assign({}, config)
//    assert.isOk(validate(c2))
//    assert.isOk(c2.pkg.bash.paths.pkgfile = 'asd')
//    assert.isNotOk(validate(c2))
//  })
//  // it('should validate pkg api')
// })
