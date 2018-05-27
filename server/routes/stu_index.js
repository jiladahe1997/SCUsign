const { appId: appId, appSecret: appSecret, mysql:config } = require('../config.js')

module.exports = async function stu_index(ctx){
    
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
        //优化：连接查询，
        var stu_info = await knex("stu_info").where('stu_token',ctx.query.token)
        var course_info = await knex('stu_info').innerJoin('stu_course','stu_info.stu_openid','=','stu_course.stu_openid').innerJoin('course','course.c_id','=','stu_course.c_id').innerJoin('tea_info','tea_info.tea_openid','=','course.c_tea').where({
            'stu_token': ctx.query.token
        })
        var week = await knex('week')
        var weather = await knex('weather')
        var sign = []
        var sign_temp = await knex('stu_info').innerJoin('stu_course','stu_info.stu_openid','=','stu_course.stu_openid').innerJoin('stu_sign','stu_sign.stu_openid','=','stu_info.stu_openid')

        //todo: 显示已经签到过了
        //排除半天以前的签到结果
        try{
            for(let i=0,len=sign_temp.length;i<len;i++){
                if(new Date(sign_temp[i].sign_date) > new Date() - 1000 * 3600 * 12){
                    sign.push(sign_temp[i])
                }
            }
        }catch(e){
            //没有任何签到信息
            sign = []
        }

        ctx.body = {
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