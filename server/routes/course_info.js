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
        var course_info = await knex('course').innerJoin('tea_info','course.c_tea','=','tea_info.tea_openid').where('c_id',ctx.query.c_id)
        ctx.body = {
            msg : "成功！",
            course_info: course_info
        }
    }catch(e){

    }finally{
        knex.destroy()
    }
}