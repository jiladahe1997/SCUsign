const { appId: appId, appSecret: appSecret, mysql: config } = require('../config.js')

module.exports = {
    join_course: async (ctx)=>{
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
            var stu_openid = await knex('stu_info').where('stu_token',ctx.query.stu_token)
            var c_id = await knex('course').where({
                'c_number': ctx.query.c_number,
                'c_order': ctx.query.c_order,
            })
            var result = await knex('stu_course').insert({
                'stu_openid': stu_openid[0].stu_openid,
                'c_id': c_id[0].c_id
            })
            ctx.body = {
                msg: "添加成功！"
            }
        }catch(e){
            console.log(e);
            ctx.body = {
                msg: "添加失败！请检查课程号课序号是否正确。"
            }
        }finally{
            knex.destroy()
        }
    },
    add_course:  async(ctx)=>{
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
            var c_tea = await knex('tea_info').where('tea_token',ctx.query.tea_token)
            var result = await knex('course').insert({
                'c_number': ctx.query.c_number,
                'c_order': ctx.query.c_order,
                'c_name': ctx.query.c_name,
                'c_tea': c_tea[0].tea_openid
            })
            ctx.body = {
                msg: "添加成功！"
            }
        }catch(e){
            console.log(e);
            
            ctx.body = {
                msg: "添加失败！"
            }
        }finally{
            knex.destroy()
        }
    }
}