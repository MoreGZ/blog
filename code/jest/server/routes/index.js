const Router = require('../libs/Router')
const apiRouter = require('./api')
const pageRouter = require('./page')
const proxyRouter = require('./other/proxy')

const router = new Router();

router
    .group(apiRouter)
    .group(pageRouter)
    .group(proxyRouter)

module.exports = router.getCoreRouter()