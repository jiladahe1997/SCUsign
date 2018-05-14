const Koa = require('koa')
const app = new Koa()
const debug = require('debug')('koa-weapp-demo')
const response = require('./middlewares/response')
const bodyParser = require('koa-bodyparser')
const config = require('./config')

// 使用响应处理中间件

//这是TX自己写的一个中间件，默认处理所有路径，返回空body
//app.use(response)

// 解析请求体
app.use(bodyParser())

// 引入路由分发
const router = require('./routes')
app.use(router.routes())

//更新天气
const get_weather = require('./routes/weather.js')
setInterval(get_weather,1000*60*5)
    


// 启动程序，监听端口
app.listen(config.port, () => debug(`listening on port ${config.port}`))
