const { appId: appId, appSecret: appSecret, mysql: config } = require('../config.js')

var knex = require('knex')({
    client: 'mysql',
    debug: true,
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
var axios = require('axios')


module.exports =  async function get_weather(params) {
    var res = await axios.get("https://free-api.heweather.com/s6/weather/forecast",{
        params: {
            location: '双流',
            key: '36723e2161ab4241b6ee8a136e31eb06'
        }
    })
    
    var high = res.data.HeWeather6[0].daily_forecast[0].tmp_max
    var low = res.data.HeWeather6[0].daily_forecast[0].tmp_min
    var type = res.data.HeWeather6[0].daily_forecast[0].cond_txt_d
    var time = new Date()
    var year = time.getFullYear(),month = time.getMonth()+1 ,date = time.getDate(),hour= time.getHours(),minute = time.getMinutes(),second = time.getSeconds()
    try{
        await knex('weather').update({
            high: high,
            low: low,
            type: type,
            last_update: `${year}-${month}-${date} ${hour}-${minute}-${second}`
        })
        console.log("插入完成！");
        
    }catch(e){
        console.log(e);
        
    }


}
