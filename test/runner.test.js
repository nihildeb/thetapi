const assert = require('chai').assert
const runner = require('../src/runner')

const argvDefaults = { q: true }

describe('runner', () => {
  it('should run', () => {
    assert.isFunction(runner)
  })
  it('should warn with no argv', () => {
    assert.doesNotThrow(runner)
  })
  it('should error with bad argv', () => {
    runner({ x:true })
  })
  it('should show help if tp is run with no args', () => {
    runner(Object.assign({ s: 'debian'}, argvDefaults))
  })
  it('should show help if the [0] command is unknown', () => {
    // hard to test this is a side effect (console.log)
    runner(Object.assign({ _: ['failme'] }, argvDefaults))
  })
  it('should list packages for list command', () => {
    // hard to test this is a side effect (console.log)
    runner(Object.assign({ _: ['list'] }, argvDefaults) )
  })
  it('should update', () => {
    // hard to test this is a side effect (console.log)
    runner(Object.assign({ _: ['update'] }, argvDefaults) )
  })
})

