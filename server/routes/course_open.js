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

    //开启签到
    try{
        if(ctx.query.way == "open"){
            await knex('course').update('c_sign','1').where('c_id',ctx.query.c_id)
            await knex('sign_frequency').insert({'c_id': ctx.query.c_id})           
            ctx.body = {
                msg: '开启成功！'
            }
        }
        else{
            await knex('course').update('c_sign','0').where('c_id',ctx.query.c_id)
            ctx.body = {
                msg: '关闭成功！'
            }
        }
    }catch(e){
        console.log(e)
        ctx.body = {
            msg: "操作失败！"
        }
    }finally{
        knex.destroy()
    }

}