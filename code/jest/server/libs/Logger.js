const winston = require('winston');
const path = require('path')
const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
    if(typeof message !== 'string') {
        message = JSON.stringify(message)
    }
    return `${timestamp} [${level}]: ${message}}`;
})

class Logger {
    constructor(config) {
        this._levels = ['error', 'warn', 'info', 'debug']

        this._levels.forEach((level) => {
            this[`${level}Logger`] = winston.createLogger({
                format: combine(
                    timestamp(),
                    myFormat
                ),
                transports: [
                    new winston.transports.Console(),
                    new winston.transports.File({ filename: path.resolve(__dirname, '../logs', `${level}.log`) })
                ]
            })

            this[level] = (contant) => {
                this[`${level}Logger`][level](contant)
            }
        }) 
    }
}

module.exports = Logger