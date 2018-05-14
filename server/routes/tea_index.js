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
        var result = await knex('tea_info').innerJoin('course','course.c_tea','=','tea_info.tea_openid').innerJoin('stu_course','stu_course.c_id','=','course.c_id').where({
            'tea_token': ctx.query.token
        })
        /*var result_teaInfo = await knex('tea_info').where({
            'tea_token': ctx.query.token
            })
        //课程信息表
        var result_course = await knex('course').where({
            'c_tea': result_teaInfo[0].tea_token
        })

        var result_stu_course = []
        for(let i=0;i<result_course.length;i++){
            result_stu_course.push(await knex('stu_course').where({
                'c_id': result_course[i].c_id
            }))
        }*/

        ctx.body = {
            tea_info: result
        }
    }catch(e){
        console.log(e);
        ctx.body = {
            msg: "查询失败，请联系管理员"
        }
    }
}