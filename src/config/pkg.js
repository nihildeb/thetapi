const { readdirSync } = require('fs')

// need to use a object here. system pkgs should override common
const getPackages = (stowdir) => {
  const ret = readdirSync(stowdir).reduce((obj, id) => {
    obj[id] = {
      id,
      stowdir,
      pkgdir: `${stowdir}/${id}`,
    }
    return obj
  }, {})
  return ret
}

module.exports = (config) => {
  return Object.assign({}, {
    ...config,
    pkg: Object.assign({},
      getPackages(config.paths.common),
      getPackages(config.paths.system)
    )
  })
}
