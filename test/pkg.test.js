const assert = require('chai').assert
const config = require('../src/config')
const pkg = require('../src/pkg')

describe('pkg', () => {
  before(() => {
    config.testpkgCreate()
    config.load()
  })

  after(() => {
    config.testpkgDelete()
  })

  it('exists', () => {
    assert.ok(pkg)
    assert.isFunction(pkg.install)
    assert.isFunction(pkg.uninstall)
    assert.isFunction(pkg.update)
  })

  it('should have a valid testpkg', () => {
    testpkg = config.packages.testpkg
    assert.isOk(testpkg)
    assert.isOk(testpkg.id)
    assert.equal(testpkg.id, 'testpkg')
    assert.isOk(testpkg.home)
    assert.match(testpkg.home, /common\/testpkg/)
    assert.isOk(testpkg.pkgfile)
    assert.match(testpkg.pkgfile, /json$/)
    assert.isOk(testpkg.pkgjson)
  })

  it('should update with no enabled packages')

  //it('should install one package', () => {

  //})
})


