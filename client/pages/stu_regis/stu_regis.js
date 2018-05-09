
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
        console.log("学生注册开始",e);
        
        var config = require("../../config.js")
        var value = e.detail.value
        
        wx.login({
            success: function(res) {
                if(res.code) {
                    wx.request({
                        url: `${config.service.host}/weapp/stu_regis`,
                        method:'POST',
                        header: {
                            'Content-Type': 'application/json'
                        },
                        data:{
                            code: res.code,
                            name: value.name,
                            id: value.id,
                            college: value.college
                        },
                        success: function(res) {
                            console.log("学生注册结果",res);
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
    },
    backIndex(){
        wx.navigateTo({
            url: '../text_index/text_index'
        })
    }

})