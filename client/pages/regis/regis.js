// pages/regis/regis.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '老师界面',
    name: "",
  },
  toggle: function (e) {
    var that = this;
    var type = that.data.type === '老师界面' ? '学生界面' : '老师界面';
    that.setData({
      type: type
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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

regis(e) {
    console.log("教师注册开始", e);

    var config = require("../../config.js")
    var name = e.detail.value.name
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.request({
            url: `${config.service.host}/weapp/tea_regis`,
            method: 'POST',
            header: {
              'Content-Type': 'application/json'
            },
            data: {
              code: res.code,
              name: name
            },
            success: function (res) {
              console.log("教师注册结果", res);
              if (res.data.isSuccess) {
                console.log("注册成功")
              }
              else {
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

stu_regis(e) {
  console.log("学生注册开始", e);

  var config = require("../../config.js")
  var value = e.detail.value

  wx.login({
    success: function (res) {
      if (res.code) {
        wx.request({
          url: `${config.service.host}/weapp/stu_regis`,
          method: 'POST',
          header: {
            'Content-Type': 'application/json'
          },
          data: {
            code: res.code,
            name: value.name,
            id: value.id,
            college: value.college
          },
          success: function (res) {
            console.log("学生注册结果", res);
            if (res.data.isSuccess) {
              console.log("注册成功")
            }
            else {
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
backIndex() {
  wx.navigateTo({
    url: '../text_index/text_index'
  })
}
  
})

