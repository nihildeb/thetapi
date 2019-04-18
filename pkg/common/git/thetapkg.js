module.exports = (actions, config, log) => {
  actions.sh('git config --global push.default simple')
  actions.sh('git config --global user.email "thetapi@thetanil.com"')
  actions.sh('git config --global user.name "thetapi"')
}
