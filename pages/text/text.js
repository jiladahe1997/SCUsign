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

const app=getApp()

Page({
  data:{
    userInfo:{},
    teacherFoucs:"",
    studentFoucs:""
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    console.log("1");
    
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
    console.log("2");
    wx.getUserInfo({
      success: (res)=>{
        console.log(res.userInfo);
        
        this.setData({
          userInfo : res.userInfo,
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  onShow:function(){
    console.log("3");
    // 生命周期函数--监听页面显示

   
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
   
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
   
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
    
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
  
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  },
  touch:function(e){
    if(e.currentTarget.dataset.ts == "teacher" ){
      this.setData({
        teacherFoucs:"teacherLogin-foucs",
        studentFoucs:"studentLogin-unfoucs",
        teacherTap:"tap",
        studentTap:""
      })
    }
    else{
      this.setData({
        teacherFoucs:"teacherLogin-unfoucs",
        studentFoucs:"studentLogin-foucs",
        teacherTap:"",
        studentTap:"tap"
      })
    }
  },
  tap:function(e){
    if(e.currentTarget.dataset.ts == "teacher" ){
      wx.showToast({
        title:"教师功能开发中...",
        inco:"success",
        duration:2000
      })
    }
    else{
      wx.showToast({
        title:"学生功能开发中...",
        inco:"success",
        duration:2000
      })
    }
  }
})
