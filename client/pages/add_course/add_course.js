// pages/add_course/add_course.js
var config = require("../../config.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    identity: null
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      identity: options.identity
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
  
  },
  join_course(e){
    wx.getStorage({
      key: 'token',
      success: (token)=>{
        wx.request({
          url: `${config.service.host}/weapp/join_course`,
          header: {
            'Content-Type': 'application/json'
          },
          data: {
            'c_number': e.detail.value.c_number,
            'c_order': e.detail.value.c_order,
            'stu_token': token.data
          },
          success: function(res) {
            console.log(res);
            
            if(res.data.msg == '添加成功！'){
              wx.showModal({
                title: '添加成功',
                content: '已经成功添加了课程哟，回到首页即可看到',
                showCancel: false,
              })
            }
            else{
              wx.showModal({
                title: '添加失败',
                content: '添加失败，请仔细检查课程号课序号有木有输错哦',
                showCancel: false,
              })
            }
          }
        })
      }
    })
  },
  add_course(e){
    wx.getStorage({
      key: 'token',
      success: (token)=>{
        wx.request({
          url: `${config.service.host}/weapp/add_course`,
          header: {
            'Content-Type': 'application/json'
          },
          data: {
            'c_number': e.detail.value.c_number,
            'c_order': e.detail.value.c_order,
            'c_name': e.detail.value.c_name,
            'tea_token': token.data
          },
          success: function(res) {
            if(res.data.msg == '添加成功！'){
              wx.showModal({
                title: '添加成功',
                content: '已经成功添加了课程哟，回到首页即可看到',
                showCancel: false,
              })
            }
            else{
              wx.showModal({
                title: '添加失败',
                content: '添加失败，请仔细检查课程号课序号有木有输错哦',
                showCancel: false,
              })
            }
          }
        })
      }
    })
  },

   backToIndex() {
    wx.redirectTo({
      url: `../stu_index/stu_index?identity=${this.data.identity}`
    })
  },
})