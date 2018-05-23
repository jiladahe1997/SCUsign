
const { appId: appId, appSecret: appSecret, mysql:config } = require('../config.js')
var https = require('https')
module.exports = async function login(ctx){
    console.log(ctx.query.code)
    var httpsOption = {
        host: 'api.weixin.qq.com',
        path: `/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${ctx.query.code}&grant_type=authorization_code`
    }
    await new Promise((resolve,reject) => {
        var req = https.request(httpsOption, (res) => {
            //console.log(res);
            res.on('data', async (data) => {
                console.log(data.toString());
                var openid = JSON.parse(data.toString()).openid
                var knex = require('knex')({
                    client: 'mysql',
                    connection: {
                        host: config.host,
                        port: config.port,
                        user: config.user,
                        password: config.pass,
                        database: config.db,
                        charset: config.char,
                        multipleStatements: true
                    }
                })

                //查表->用户是否存在 ? 只更新token : 更新openid并更新token  
                var result_stu = await knex('stu_info').where('stu_openid', openid)
                var result_tea = await knex('tea_info').where('tea_openid',openid)
                knex.destroy()
                if (result_stu.length == 0 && result_tea.length == 0) {
                    ctx.status = 200
                    ctx.body = {
                        isSuccess: false,
                        msg: "登录失败！用户不存在，请先注册"
                    }
                    reject("登录失败！用户不存在，请先注册")
                }
                else {
                    ctx.body = {
                        isSuccess: true,
                        identity: (result_stu.length == 0 ? '老师': '学生'),
                        msg: `登录成功！用户身份：${result_stu.length == 0 ? '老师': '学生'}`,
                        token : (result_stu.length == 0 ? result_tea[0].tea_token : result_stu[0].stu_token)
                    }
                    resolve()
                }
            })
        })
        req.end()
    }).catch((e) => {console.log(e)})
    
}