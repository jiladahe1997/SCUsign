/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/weapp'                  //这一句话很关键，prefix路径
})
// router 是koa官方路由模块
const controllers = require('../controllers')
//这是一个简写的中间件集合
//目录下的index.js默认为目录exports


// 从 sdk 中取出中间件
// 这里展示如何使用 Koa 中间件完成登录态的颁发与验证
//这个是TX的微信小程序中间件：
//包括功能：用户登录与验证
//         信道服务
//         图片上传
//         数据库
//         客服消息
const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')



// --- 登录与授权 Demo --- //
// 登录接口
//router.get('/login', authorizationMiddleware, controllers.login)
var login = require('./login.js')
router.get('/login', login)

// 用户信息接口（可以用来验证登录态）
router.get('/user', validationMiddleware, controllers.user)

// --- 图片上传 Demo --- //
// 图片上传接口，小程序端可以直接将 url 填入 wx.uploadFile 中
router.post('/upload', controllers.upload)

// --- 信道服务接口 Demo --- //
// GET  用来响应请求信道地址的
router.get('/tunnel', controllers.tunnel.get)
// POST 用来处理信道传递过来的消息
router.post('/tunnel', controllers.tunnel.post)

// --- 客服消息接口 Demo --- //
// GET  用来响应小程序后台配置时发送的验证请求
router.get('/message', controllers.message.get)
// POST 用来处理微信转发过来的客服消息
router.post('/message', controllers.message.post)


var stu_regis = require('./stu_regis.js')
router.post('/stu_regis', stu_regis )

var tea_regis = require('./tea_regis.js')
router.post('/tea_regis', tea_regis)

var reset_database = require('./reset_database')
router.get('/reset_database',reset_database)

var stu_index = require('./tea_index')
router.get('/stu_index',stu_index)
var tea_index = require('./tea_index')
router.get('/tea_index',tea_index)

module.exports = router
