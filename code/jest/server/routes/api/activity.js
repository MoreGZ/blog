const Router = require('../../libs/Router')
const checkAuthMiddleware = require('../../middlewares/checkAuth')
const router = new Router()

router
    .get('/list', 'api/Index@list')
    .post('/delete', 'api/Index@delete')
    .get('/query', 'api/Index@query')
    .post('/add', 'api/Index@add')
    .post('/update', 'api/Index@update')
    .post('/uploadImg', 'api/Index@uploadImg')

module.exports = (new Router()).group(router, [checkAuthMiddleware])