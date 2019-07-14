module.exports = class Service {
    constructor(ctx) {
        this.request = ctx.request
        this.response = ctx.response
        Object.assign(this, { ctx })
    }

    packege(data, success=true, message, code) {
        let result = {
            data,
            success: true,
            message: '成功',
            code: 1
        }

        if(!success) {
            result = Object.assign(result, {
                success: false,
                code: code || 0,
                message: message || '失败',
            })
        }

        return result
    }
}