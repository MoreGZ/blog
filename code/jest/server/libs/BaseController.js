
class BaseController {
    constructor(ctx, next) {
        this.request = ctx.request
        this.response = ctx.response
        this.service = ctx.service
        Object.assign(this, { ctx, next })
    }
    
    /**
     * 子类实现该方法处理请求
     * @param {string} handlerName 
     * @return {}
     */
    async handle(handlerName) {
        await this[handlerName]()

        this.next()
    }

    /**
     * 静态工厂方法：创建用以响应路由的回调函数
     * @return {Function}
     */
    static creator(handlerName) {
        return async (ctx, next) => {
            await (new this(ctx, next)).handle(handlerName)
        }
    }

    /**
     * 校验用户登录态   
     * 未登录直接响应，返回false
     * 已登录，返回true
     * @return {Boolean}
     * @author yomeeliu
     */
    checkLogin() {
        return _.get(this.req, '$user.isLogined', {})
    }

    send(data, success, message, code) {
        let response = {
            data,
            success: true,
            message: '成功',
            code: 1
        }

        if(!success) {
            response = Object.assign(response, {
                success: false,
                code:  code || 0,
                message: message || '失败',
            })
        }

        this.ctx.body = response
    }

    /**
     * 获取`$user`对象
     * @return {Object}
     * @author yomeeliu
     */
    get $user() {
        return _.get(this.req, '$user', {})
    }
}

module.exports = BaseController