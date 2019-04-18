const pjson = require('../../package.json')
const os = require('./os')
const paths = require('./paths')
const pkg = require('./pkg')

const initConf = {
  version: pjson.version
}
const osConf = Object.assign({}, os(initConf))
const pathsConf = Object.assign({}, paths(osConf))
const finalConf = Object.assign({}, pkg(pathsConf))
module.exports = Object.assign({}, finalConf)

/// / order here is important. target specific packages overwrite common
/// / TODO: maybe expand with username and hostname specific package dirs
// const help = (helpTest) => {
//  if (global.it) return
//  console.log(`ThetaPi v${tpVersion()}
// Usage: thetapi <command> [args]
// flags:
//  -d  debug
//  -q  quiet / silent
//  -v  verbose
// commands:
//  list - list all available packages
//  enable - set a package for installation and update
//  disable - set a package for removal and update
//  update - install and uninstall packages
// examples:
//  thetapi list
//  thetapi enable vim
//  thetapi disable privoxy
//  thetapi update
// `)
// }

// const writeJSON = (filename, json) => {
//  logger.log('debug', 'writing pkg file: %s', filename)
//  fs.writeFileSync(filename, json, (err) => {
//    if (err) throw new Error(err)
//    config.logger.log('debug', 'json=%j', json)
//    config.logger.log('debug', 'written to:', filename)
//  })
// }
