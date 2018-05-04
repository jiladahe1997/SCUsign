
Page({
    data: {
        
    },
    onLoad: function(options) {
        //Do some initialize when page load.
        
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
        
    },
    regis(e){
        console.log("教师注册开始",e);
        
        var config = require("../../config.js")
        var name = e.detail.value.name
        wx.login({
            success: function(res) {
                if(res.code) {
                    wx.request({
                        url: `${config.service.host}/weapp/tea_regis`,
                        method:'POST',
                        header: {
                            'Content-Type': 'application/json'
                        },
                        data:{
                            code:res.code,
                            name:name
                        },
                        success: function(res) {
                            console.log("教师注册结果",res);
                            if(res.data.isSuccess){
                                console.log("注册成功")
                            }
                            else{
                                console.log("注册失败")
                            }
                        }
                    })
                } else {
                    console.log(res.errMsg)
                }
            }
        })
    }
})