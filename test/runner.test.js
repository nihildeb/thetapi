const assert = require('chai').assert
const runner = require('../src/runner')
const config = require('../src/config')

describe('runner', () => {
  it('should run', () => {
    assert.isOk(runner)
    assert.isFunction(runner.run)
  })

  it('should error with no config', () => {
    assert.throws(runner.run)
  })

  it('should assign', () => {
    // doesn't test runner, just making sure
    // assign works the way I am using it
    const a = { a: { a: 1 } }
    const b = Object.assign(a, {})
    assert.deepEqual(a, b)
    const c = Object.assign({}, a)
    assert.deepEqual(a, c)
    const d = Object.assign({ d: 1 }, a)
    assert.deepEqual(d, { a: { a: 1 }, d: 1 })
  })

  it('should require each pkg.js', () => {
    assert.isNotOk(config.pkg.bash.js)
    runner.req(config)
    assert.isOk(config.pkg.bash.js)
  })

  it('should have a dry run option', () => {
    const testConfig = Object.assign({}, config, { dryrun: true })
    const testfn = () => { runner.run(testConfig) }
    assert.doesNotThrow(testfn)
  })

  it('should skip packages with no pkg.js')
  it('should not do anything if success not assured')
  it('should deal with bad pkg.js')
})
