const fs = require('fs')
const path = require('path')

module.exports = async (ctx, next) => {
    let services = {}
    const serviceNames = fs.readdirSync(path.resolve(__dirname, '../services')).map((name) => name.split('.')[0])
    serviceNames.forEach((serviceName) => {
        const Service = require(path.resolve(__dirname, `../services/${serviceName}`))

        const service = new Service(ctx)
        services[serviceName] = service
    })

    ctx.service = services
    await next()
}