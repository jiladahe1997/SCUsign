const { appId: appId, appSecret: appSecret, mysql:config } = require('../config.js')

module.exports = async function (ctx) {
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

    //签到
    //todo: 用transactions 事务来实现
    //todo: 禁止重复签到
    var c_id = ctx.query.c_id
    var token = ctx.query.token
    try{
        var stu_info = await knex('stu_info').where('stu_token','=',token)
        var c_sign = await knex('course').where('c_id','=',c_id)
        if(c_sign[0].c_sign){
            var f_id = await knex('sign_frequency').where('c_id','=',c_id).orderBy('f_id','desc')
            //检查是否已经签过到了，禁止重复签到
            var check = await knex('stu_sign').where({
                'stu_openid': stu_info[0].stu_openid,
                'f_id': f_id[0].f_id
            })
            if(check) throw "签到失败！已经签过到了"

            await knex('stu_sign').insert({
                stu_openid: stu_info[0].stu_openid,
                c_id:c_sign[0].c_id,
                f_id: f_id[0].f_id
            })
            ctx.body = {
                msg: '签到成功'
            }
        }
        else{
            throw '签到未开启！'
        }
    }catch(e){
        ctx.body = {
            msg : '签到失败，原因如下',
            error : e
        }
    }

    
}