const axios = require('axios')

module.exports = async (ctx, next) => {
    ctx.render = (name) => {
        return new Promise((resolve, reject) => {
            axios({
                baseURL: 'http://localhost:7001',
                url: `${name}.html`,
                method: 'get',
                timeout: 30000,
                headers: null,
            }).then((res) => {
                ctx.body = res.data
                resolve(res.data)
            }).catch((err) => {
                ctx.body = err
                reject(err)
            })
        })
    }

    await next()
}