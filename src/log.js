const { createLogger, format, transports } = require('winston')

// standard RFC5424 levels
//const levels = {
//  error: 0,
//  warn: 1,
//  info: 2,
//  verbose: 3,
//  debug: 4,
//  silly: 5
//}

const logger = createLogger({
  //level: 'debug',
  format: format.combine(format.splat(), format.simple()),
  transports: [
    new transports.Console(),
    //new winston.transports.File({ filename: 'combined.log' })
  ]
})

exports = module.exports = logger
