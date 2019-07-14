const koa = require("koa")
const koaStatic = require("koa-static")
const koaViews = require("koa-views")
const koaBody = require('koa-body')
const requestLoggermiddleware = require('./middlewares/requestLogger')
const useSerciceMiddlevare = require('./middlewares/useServices')
const devViewMiddleware = require('./middlewares/devView')
const koaSession = require('koa-session')
const redisStore = require('koa-redis')
const redis = require('redis')
const Database = require('./libs/Database')
const Logger = require('./libs/Logger')
const _ = require('lodash')
const env = process.env

const path = require('path')
const http = require('http')

const config = require("./config")
const router = require("./routes")

const app = new koa();
const redisClient = redis.createClient(config.redis.port, config.redis.host)
const mysqlClient = new Database(config.mysql)
global.logger = new Logger(config)
global.redis = redisClient
global.db = mysqlClient
global._ = global.lodash = _;

app.keys = ['george test key1']
// 配置session中间件
app.use(koaSession({
    ...config.session,
    store: new redisStore({
        client: redisClient,
        db: 1
    })
}, app))

// 配置ctx.request.body解析中间件
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M
    }
}))

// Service中间件
app.use(useSerciceMiddlevare)

// 配置请求日志中间件日志中间件
// app.use(requestLoggermiddleware)

// 配置静态资源加载中间件
app.use(koaStatic(
    path.join(__dirname, 'statics')
))

// 配置服务端模板渲染引擎中间件
if(env.NODE_ENV === 'dev') {
    app.use(devViewMiddleware)
} else {
    app.use(koaViews(path.join(__dirname, "views"), {
        map: {
            html: 'ejs'
        }
    }))
}

// 初始化路由中间件
app.use(router.routes()).use(router.allowedMethods())

// 监听启动端口
app.listen(config.port,()=>{
    console.log(`open server in port ${config.port}`)
})