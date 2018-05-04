//index.js
//获取应用实例
/*const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})*/
var qloud = require("../../vendor/wafer2-client-sdk/index")
var config = require("../../config.js")
const app = getApp()

Page({
  data: {
    userInfo: {},
    teacherFoucs: "",
    studentFoucs: "",
    teacherTap: "",
    studentTap: "",
    isAuthed: "",       //是否授权
    "canUseopendata": false
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载

  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成
  },
  onShow: function () {

    // 生命周期函数--监听页面显示


  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏

  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载

  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作

  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数

  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  },
  touch: function (e) {

    console.log("touchend");

    if (e.currentTarget.dataset.ts == "teacher") {
      this.setData({
        teacherFoucs: "teacherLogin-foucs",
        studentFoucs: "studentLogin-unfoucs",
      })
    }
    else {
      this.setData({
        teacherFoucs: "teacherLogin-unfoucs",
        studentFoucs: "studentLogin-foucs",
      })
    }
    setTimeout(() => {
      if (e.currentTarget.dataset.ts == "teacher") {
        this.setData({
          teacherTap: "getUserInfo",
          studentTap: ""
        })
      }
      else {
        this.setData({
          teacherTap: "",
          studentTap: "getUserInfo"
        })
      }
    }, 1000
    )
  },
  getUserInfo: function (e) {        //注意，getUserInfo方法在tap触发之后才会触发
                                  //即 touchstart ------touchend---- tap---- getUserInfo 
    console.log(e);               //因此注意，新添加方法必须要触发方法之前，即getUserInfo方法必须在某个方法之前
                                  //才能实现双次点击，否则的话会先触发方法，添加方法 ，再触发添加的方法，变成了单次点击。
    wx.canIUse("open-data") ? this.setData({ "canUseopen-data": true }) : void 0
    wx.getSetting({
      success: (res) => {
        //console.log(res.authSetting);
        var authSetting = res.authSetting
        if ("scope.userInfo" in authSetting) {
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
                    if (res.data.isSuccess) {
                      wx.setStorage({
                        key: 'token',
                        data: "oWh6P4rJzItfs3ImcinTZ8NcBxX1",
                        //data: res.data.token,
                        success: () => {
                          wx.hideLoading()
                          wx.showModal({
                            title: '登录成功',
                            content: '登录成功',
                            showCancel: false,
                            success: () => {
                              if (res.data.identity == '老师') {
                                wx.navigateTo({
                                  url: '../tea_index/tea_index'
                                })
                              }
                              else {
                                wx.navigateTo({
                                  url: '../stu_index/stu_index'
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
                        title: '登录失败,还未注册',
                        content: res.data.msg,
                        showCancel: false
                      })
                      if (res.data.identity == '老师') {
                        wx.navigateTo({
                          url: '../tea_regis/tea_regis'
                        })
                      }
                      else {
                        wx.navigateTo({
                          url: '../stu_regis/stu_regis'
                        })
                      }
                    }
                  }
                })
              } else {
                console.log(res.errMsg)
              }
            }
          })
        }
      },
      fail: function (e) {
        console.log(e);
      }
    })

  }
})
