const Router = require('../../libs/Router')

const router = new Router()

router
    .get('/index(.*)', 'page/Index@index')

module.exports = router