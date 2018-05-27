const { appId: appId, appSecret: appSecret, mysql:config } = require('../config.js')

module.exports = async function stuIndex(ctx){
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
        var stu_info = await knex('tea_info').where('tea_token',ctx.query.token)
        var course_info = await knex('tea_info').innerJoin('course','course.c_tea','=','tea_info.tea_openid').where({
            'tea_token': ctx.query.token
        })
        var week = await knex('week')
        var weather = await knex('weather')
        var sign = []
        var sign_temp = await knex('stu_info').innerJoin('stu_course','stu_info.stu_openid','=','stu_course.stu_openid').innerJoin('stu_sign','stu_sign.stu_openid','=','stu_info.stu_openid')


        ctx.body = {
            //兼容学生主页代码
            //tea_info: result,
            stu_info: stu_info,
            course_info: course_info,
            week_info: week,
            weather: weather,
            sign: sign
        }
    }catch(e){
        console.log(e);
        ctx.body = {
            msg: "查询失败，请联系管理员"
        }
    }finally{
        knex.destroy()
    }
}