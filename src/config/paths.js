const path = require('path')
const os = require('./os')
const thetapi = path.resolve(path.join(__dirname, '../..'))
const pkgroot = path.resolve(path.join(thetapi, 'pkg'))
const common = path.resolve(path.join(pkgroot, 'common'))
const system = path.resolve(path.join(pkgroot, os.target))
const userhome = os.homedir

module.exports = {
  PKGFILE: 'thetapi.js',
  thetapi,
  pkgroot,
  common,
  system,
  userhome
}
