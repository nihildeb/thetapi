const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const favicon = require('serve-favicon')
const serveStatic = require('serve-static')

const PORT = 8080
const app = express()

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
  secret: 'AMLaijdasdAma',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))
app.use(serveStatic(path.join(__dirname, 'public')))

app.get('/', (req, res) => res.send('hello'))
app.listen(PORT, () => console.log(`ThetaPi Listening on port: ${PORT}`))

const livereload = require('livereload')
const lr = livereload.createServer({ delay: 2000 })
lr.on('connect', () => { console.log('connect') })
lr.watch(__dirname)

/// ////////////////////////////////////////////////
//
//

// https://github.com/benweet/stackedit.js
// rather: https://codemirror.net/
// https://github.com/MithrilJS/mithril-node-render

// #!/usr/bin/env node
// const argv = require('minimist')(process.argv.slice(2), {
// boolean: ['v', 'd', 'q', 'n']
// })

// const logger = require('./src/log')
// if (argv.q) logger.level = 'error'
// if (argv.v) logger.level = 'verbose'
// if (argv.d) logger.level = 'debug'
// if (global.it) logger.level = 'warn'

// logger.log('verbose', 'ThetaPi Init')

// const config = require('./src/config')
// config.dryrun = argv.n || false
/// / logger.log('debug', 'ThetaPi %s', inspect(config, { colors: true }))

/// / const { inspect } = require('util')
/// / console.log('ThetaPi %s', inspect(config, { colors: true }))

// const runner = require('./src/runner')
// logger.log('verbose', 'ThetaPi Run...')
// runner.run(config)
// logger.log('verbose', 'ThetaPi Run Complete')
