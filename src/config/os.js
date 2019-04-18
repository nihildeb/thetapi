const os = require('os')
const platform = os.platform()
const arch = os.arch()
const userInfo = os.userInfo()

const target = `${platform}_${arch}`
const username = userInfo.username
const homedir = userInfo.homedir

module.exports = (config) => {
  return Object.assign({}, {
    ...config,
    os: {
      platform,
      arch,
      target,
      username,
      homedir,
    }
  })
}
