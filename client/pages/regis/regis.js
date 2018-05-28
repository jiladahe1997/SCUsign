// pages/regis/regis.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '老师界面',
    name: "",
    array: ['选择学院', '材料科学与工程学院', '电气信息学院', '电子信息学院', '法学院', '高分子科学与工程学院', '公共管理学院', '华西公共卫生学院', '华西口腔医学院', '华西临床医学院', '华西药学院', '化学学院', '化学工程学院', '华西基础医学与法医学院', '计算机学院', '建筑与环境学院', '经济学院', '匹兹堡学院', '历史文化学院（旅游学院）', '轻纺与食品学院', '软件学院', '商学院', '生命科学学院', '数学学院', '水利水电学院', '外国语学院', '文学与新闻学院', '物理科学与技术学院','艺术学院','制造科学与工程学院'],
    index: 0
  },
  backToIndex() {
    wx.redirectTo({
      url: `../index/index?identity=${this.data.identity}`
    })
  },

  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
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
                wx.showModal({
                  title: '注册成功',
                  content: '注册成功',
                  showCancel: false,
                  success: () => {
                    wx.redirectTo({
                      url: '../index/index'
                    })
                  }
                })
              }
              else {
                console.log("注册失败")
                wx.showModal({
                  title: '注册失败',
                  content: '注册失败,请联系管理员',
                  showCancel: false,
                  success: () => {
                    wx.redirectTo({
                      url: '../index/index'
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
  },

stu_regis(e) {
  console.log("学生注册开始", e);

  var config = require("../../config.js")
  var value = e.detail.value

  wx.login({
    success: (res) => {
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
            college: this.data.array[value.college]
            },
          success: function (res) {
            console.log("学生注册结果", res);
            if (res.data.isSuccess) {
              console.log("注册成功")
              wx.showModal({
                title: '注册成功',
                content: '注册成功',
                showCancel: false,
                success: () => {
                  wx.redirectTo({
                    url: '../index/index'
                  })
                }
              })
            }
            else {
              console.log("注册失败")
              wx.showModal({
                title: '注册失败',
                content: '注册失败,请联系管理员',
                showCancel: false,
                success: () => {
                  wx.redirectTo({
                    url: '../index/index'
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
},

backIndex() {
  wx.navigateTo({
    url: '../text_index/text_index'
  })
}

})

