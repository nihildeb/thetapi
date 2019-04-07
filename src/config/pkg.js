const { common, system } = require('./paths')
const { readdirSync } = require('fs')

// need to use a object here. system pkgs should override common
const getPackages = (stowdir) => {
  const ret = readdirSync(stowdir).reduce((obj, id) => {
    obj[id] = { stowdir }
    return obj
  }, {})
  console.log('##', ret)
  return ret
}

module.exports = {
  pkg: Object.assign({}, getPackages(common), getPackages(system))
}
