// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    display_morning:"display:none",
    display_afternoon:"display:none",
    display_evening:"display:none",
    title_text:"",
    //测试项
    test_hours:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    
    this.data.test_hours = parseInt(options.time)  //此处不能用setData。详情见生命周期
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    //判断时间
    var date = new Date()
    var hours = date.getHours()
    //var hours = this.data.test_hours;
    console.log("hours",hours,typeof hours);
    if( hours > 5 && hours<=12){
      console.log('morning');
      this.setData({
        display_morning:"display:block"
      })
    }
    else if( hours > 12 && hours <19){
      console.log('noon');
      this.setData({
        display_afternoon:"display:block"
      })
      var counter = 0
      var text = "Developed By Team 3SM"
      setTimeout(()=>{
        var interval = setInterval(()=>{
          if (counter == text.length ) clearInterval(interval)
          this.setData({
            title_text : text.slice(0,counter)
          })
          counter++
        },100)
      },4000)

    }
    else {
      this.setData({
        display_evening:"display:block"
      })
      console.log('evening');
      var counter = 0
      var text = "Developed By Team 3SM"
      setTimeout(()=>{
        var interval = setInterval(()=>{
          if (counter == text.length ) clearInterval(interval)
          this.setData({
            title_text : text.slice(0,counter)
          })
          counter++
        },100)
      },4000)
    }



    //canvas画布-morning
    var context = wx.createCanvasContext('title-text')
    var text = "Developed By Team 3SM"
    var counter = 0
    context.setTextAlign = "center"
    setTimeout(() => {
      var interval = setInterval(() => {
        if (counter == text.length - 1) clearInterval(interval)
        counter++
        context.clearRect(0, 0, 300, 20)
        context.setFontSize(10)
        context.font = "bold 10px Microsoft YaHei"
        context.fillText(text.slice(0, counter), 100, 10)
        context.draw()
      }, 100)
    }, 4000)





  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  start: function (e) {
    var config = require("../../config.js")
    wx.showLoading({
      title: '登陆中...',
    })
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.request({
            url: `${config.service.host}/weapp/login`,
            header: {
              'Content-Type': 'application/json'
            },
            data: {
              code: res.code
            },
            success: function (res) {
              console.log(res);
              //res.data.isSuccess = false
              //
              //todo:将identity存入缓存，而不是一直传参
              //
              if (res.data.isSuccess) {
                wx.setStorage({
                  key: 'token',
                  //data: "oWh6P4rJzItfs3ImcinTZ8NcBxX1",
                  data: res.data.token,
                  success: () => {
                    wx.hideLoading()
                    wx.showModal({
                      title: '登录成功',
                      content: '登录成功',
                      showCancel: false,
                      success: () => {
                        if (res.data.identity == '老师') {
                          wx.redirectTo({
                            url: '../stu_index/stu_index?identity=tea'
                          })
                        }
                        else {
                          wx.redirectTo({
                            url: '../stu_index/stu_index?identity=stu'
                          })
                        }
                      }
                    })
                  }
                })
              }
              else {
                wx.hideLoading()

                wx.showModal({
                  title: '登录失败,您还未注册，您可以先体验小程序，但是无法进行签到等操作',
                  //content: res.data.msg,
                  showCancel: false,
                  success:()=>{
                    wx.redirectTo({
                      url:'../regis/regis'
                    })
                  }
                })
    
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