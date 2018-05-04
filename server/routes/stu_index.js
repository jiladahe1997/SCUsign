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
        var result_stuInfo = await knex('stu_info').where({
            'stu_token': ctx.query.token
            })
        //学生选课表
        var result_stu_course = await knex('stu_course').where({
            'stu_openid': result_stuInfo[0].stu_openid
            })
        //课程信息表
        var result_course = []
        //教师信息表
        var result_teaInfo = []
        for(let i=0;i<result_stu_course.length;i++){

            
            result_course.push((await knex('course').where({
                'c_id': result_stu_course[i].c_id
            }))[0])
            result_teaInfo.push((await knex('tea_info').where({
                'tea_openid': result_course[i].c_tea
            }))[0])
        }
        ctx.body = {
            stu_name: result_stuInfo,
            course: result_course,
            teaInfo: result_teaInfo
        }
    }catch(e){
        console.log(e);
        ctx.body = {
            msg: "查询失败，请联系管理员"
        }
    }
}