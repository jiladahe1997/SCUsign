
const { appId: appId, appSecret: appSecret, mysql:config } = require('../config.js')
var https = require('https')

module.exports = async function tea_regis(ctx) {
    console.log(ctx);
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
    var httpsOption = {
        host: 'api.weixin.qq.com',
        path: `/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${ctx.request.body.code}&grant_type=authorization_code`
    }
    await new Promise((resolve,reject) => {
        var req = https.request(httpsOption, (res) => {
            res.on('data', async (data) => {
                var openid = JSON.parse(data.toString()).openid
                var sskey = JSON.parse(data.toString()).session_key
                console.log(JSON.parse(data.toString()));
                
                try{
                    var result = await knex('stu_info').insert({
                        stu_openid:openid,
                        stu_name:ctx.request.body.name,
                        stu_stuid: ctx.request.body.id,
                        stu_college: ctx.request.body.college,
                        stu_token:sskey
                    })
                    ctx.body = {
                        isSuccess:true,
                        msg:"注册成功！"
                    }
                    resolve()
                }
                catch(e){
                    ctx.body = {
                        isSuccess:false,
                        msg:"注册失败，数据库错误，请联系管理员解决"
                    }
                    reject(e)
                }finally{
                    knex.destroy()
                }

            })
        })
        req.end()
    }).catch((e)=>{console.log(e)})
}