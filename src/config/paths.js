const path = require('path')
const thetapi = path.resolve(path.join(__dirname, '../..'))
const pkgroot = path.resolve(path.join(thetapi, 'pkg'))
const common = path.resolve(path.join(pkgroot, 'common'))

module.exports = (config) => {
  return Object.assign({}, {
    ...config,
    paths: {
      PKGFILE: 'thetapkg.js',
      thetapi,
      pkgroot,
      common,
      system: path.resolve(path.join(pkgroot, config.os.target)),
      homedir: config.os.homedir
    }
  })
}
