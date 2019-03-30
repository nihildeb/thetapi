var pjson = require('../package.json')
const logger = require('./log.js')
const argv = require('minimist')(process.argv.slice(2))

logger.log('info', 'ThetaPi v%s', pjson.version)

// -s silent
// -d debug
// -v verbose
// --version -V version

logger.log('debug', 'argv: %j', argv)




logger.info('jobs done')
