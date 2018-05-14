const app = getApp()
var config = require("../../config.js")
const week_table = ['一','二','三','四','五','六','日']


Page({
    data: {
        token: null,
        week:{
            date: '获取中...',
            day: '获取中...',
            week: '获取中...'
        },
        weather: {
            high: "获取中",
            low: "获取中",
            type: "晴",
            imgsrc: "./qing.png"
        },
        course: []
    },
    onLoad: function(options) {
        //Do some initialize when page load.
       wx.getStorage({
           key: 'token',
           success: (res)=>{
            this.setData({
                token: res.data
            })
            console.log('token',this.data.token)
            wx.request({
                url: `${config.service.host}/weapp/stu_index`,
                header: {
                    'Content-Type': 'application/json'
                },
                data: {
                    token: this.data.token
                },
                success: (res) => {
                   console.log("渲染主界面",res)

                   //渲染 日期
                    let temp = new Date()
                    var date = `${temp.getFullYear()} 年 ${temp.getMonth()+1} 月 ${temp.getDate()} 日`
                    var day = `星期${week_table[parseInt(temp.getDay())]}`
                    var week = `第 ${require("./helper/week.js")(res.data.week_info[0].start)} 教学周`
                    this.setData({
                        week:{
                            date: date ,
                            day: day,
                            week: week
                        },
                    })


                    //渲染 天气
                    var imgsrc = './yun.png'
                    if(res.data.weather[0].type.indexOf("晴") !== -1 ){
                        imgsrc = './qing.png'
                    }
                    else if(res.data.weather[0].type.indexOf("雨") !== -1 ){
                        imgsrc = './yu.png'
                    }
                    else if(res.data.weather[0].type.indexOf("云") !== -1 ){
                        imgsrc = './yun.png'
                    }
                    this.setData({
                        weather:{
                            high: res.data.weather[0].high,
                            low: res.data.weather[0].low,
                            type: res.data.weather[0].type,
                            imgsrc: imgsrc
                        }
                    })


                    //渲染 课程
                    this.setData({
                        course: res.data.stu_info
                    })
                }
            })
           }
       })
    },
    onReady: function() {
        //Do some when page ready.
        
    },
    onShow: function() {
        //Do some when page show.
        
    },
    onHide: function() {
        //Do some when page hide.
        
    },
    onUnload: function() {
        //Do some when page unload.
        
    },
    onPullDownRefresh: function() {
        //Do some when page pull down.
        
    }
})