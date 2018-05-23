// pages/course_signhistory/course_signhistory.js
var config = require("../../config.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sign_info: null,
    c_id: null,
    identity: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    
    this.setData({
      identity: options.identity,
      c_id: options.c_id
    })                                                 
    wx.getStorage({
      key: 'token',
      success: (res) => {

        console.log(this.data);
        
        wx.request({
          url: `${config.service.host}/weapp/course/history/stu`,
          header: {
            'Content-Type': 'application/json'
          },
          data: {
            stu_token: res.data,
            c_id: options.c_id

          },
          success:  (res) => {
            console.log(res);
            var sign_info = res.data.sign_info
            for(let i=0,len=sign_info.length;i<len;i++){
              var date = new Date(sign_info[i].sign_date)
              sign_info[i].sign_date = `${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            }
            console.log(sign_info);
            
            this.setData({
              sign_info: sign_info
            })
          }
        })
      }
    })
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
  
  }
})