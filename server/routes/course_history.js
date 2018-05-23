//课程主页面获取课程信息

const { appId: appId, appSecret: appSecret, mysql:config } = require('../config.js')

module.exports = async (ctx)=>{
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
    try{
        var sign_info = await knex('stu_sign').innerJoin('stu_info','stu_info.stu_openid','=','stu_sign.stu_openid').innerJoin('course','course.c_id','=','stu_sign.c_id').where({
            'stu_token': ctx.query.stu_token,
            'stu_sign.c_id': ctx.query.c_id
        })
        ctx.body = {
            msg : "成功！",
            sign_info: sign_info
        }
    }catch(e){
        ctx.body = {
            msg: "查询失败！"
        }
    }

}