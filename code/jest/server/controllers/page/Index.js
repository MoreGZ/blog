const BaseController = require('../../libs/BaseController')

module.exports = class extends BaseController {
    async index() {
        await this.ctx.render('index')
    }
}