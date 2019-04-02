
//const list = (config) => {
//  //config.logger.log('info', JSON.stringify(config.packages, null, 2))
//  Object.keys(config.packages).forEach((pkg) => {
//    if ( pkg.disabled ) {
//      console.log(pkg + ' disabled')
//    } else {
//      console.log(pkg + ' enabled')
//    }
//  })
//}

const validate = () => {
  Object.keys(config.packages).forEach((pkg) => {
  })
}

const install = () => { }

const uninstall = () => {}

const update = () => {}

module.exports = {
  validate,
  install,
  uninstall,
  update,
}
