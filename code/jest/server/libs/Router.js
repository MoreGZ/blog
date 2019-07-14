const CoreRouter = require('koa-router')
const path = require('path')

class Router {
    constructor() {
        this.coreRouter = new CoreRouter()
    }

    get(routePath, controllerStr) {
        return this.handle('get', routePath, controllerStr)
    }

    post(routePath, controllerStr) {
        return this.handle('post', routePath, controllerStr)
    }

    delete(routePath, controllerStr) {
        return this.handle('delete', routePath, controllerStr)
    }

    put(routePath, controllerStr) {
        return this.handle('put', routePath, controllerStr)
    }

    patch(routePath, controllerStr) {
        return this.handle('patch', routePath, controllerStr)
    }

    del(routePath, controllerStr) {
        return this.handle('del', routePath, controllerStr)
    }

    all(routePath, controllerStr) {
        return this.handle('all', routePath, controllerStr)
    }

    handle(method, routePath, controllerStr) {
        if(typeof controllerStr !== 'string') {
            console.warn('请输入正确的 controllerStr')
            return false
        }
        
        const handlerName = controllerStr.split('@')[1]
        const controllerPath = path.resolve(__dirname, `../controllers/${controllerStr.split('@')[0]}`,)
        console.log(`${controllerPath}@${handlerName}`)
        const controller = require(controllerPath)
        this.coreRouter[method](routePath, controller.creator(handlerName)) 
        return this
    }

    group(routePath, router, middlewares=[]) {

        if(typeof routePath === 'string') {
            this.coreRouter.use(routePath, router.routes(), ...middlewares)
        }else {
            middlewares = router || []
            router = routePath
            this.coreRouter.use(router.routes(), ...middlewares)
        }
        return this
    }

    routes() {
        return this.coreRouter.routes()
    }

    allowedMethods(options) {
        return this.coreRouter.allowedMethods(options)
    }

    getCoreRouter() {
        return this.coreRouter
    }
}

module.exports = Router