const { appId: appId, appSecret: appSecret, mysql:config } = require('../config.js')
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

module.exports = async function reset_database(ctx) {
    try{
        await knex('stu_info').delete()
        await knex('tea_info').delete()
        ctx.body = {
            msg: "成功"
        }
    }catch(e){
        console.log(e);
        ctx.body = {
            msg: '失败！'
        }
    }
}