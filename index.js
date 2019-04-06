#!/usr/bin/env node
const { inspect } = require('util')
const argv = require('minimist')(process.argv.slice(2), {
  boolean: ['v', 'd', 'q', 'n']
})

const logger = require('./src/log')
if (argv.q) logger.level = 'error'
if (argv.v) logger.level = 'verbose'
if (argv.d) logger.level = 'debug'
if (global.it) logger.level = 'warn'

logger.log('verbose', 'ThetaPi Init')

const config = require('./src/config')
config.dryrun = argv.n
logger.log('debug', 'ThetaPi %s', inspect(config, { colors: true }))

const runner = require('./src/runner')
logger.log('verbose', 'ThetaPi Run...')
runner.run(config)
logger.log('verbose', 'ThetaPi Run Complete')
