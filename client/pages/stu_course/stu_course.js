// pages/stu_course/stu_course.js
var config = require("../../config.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    c_id: null,
    identity: null,
    course_info: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log('options',options)
    this.setData({
      c_id: options.c_id ,                    //2018.5.17更新好像可以用this.setData
      identity: options.identity  
    })
    //this.data.c_id = options.c_id            //此处不能用setData。详情见生命周期,否则会是null
    //this.data.identity = options.identity    //此处的c_id和identity必须先在data中定义，不能直接添加对象属性，否则会是undefined
    wx.request({
      url: `${config.service.host}/weapp/course/info`,
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        c_id: this.data.c_id
      },
      success: (res)=>{
       // console.log(res)
        this.setData({
          course_info: res.data.course_info[0]
        })
       // console.log("data",this.data)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //console.log("data",this.data)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //console.log("data",this.data)
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
  sign(){
    wx.getStorage({
      key: 'token',
      success: (res)=> {
       //console.log("学生签到！",this.data)
        wx.request({
          url: `${config.service.host}/weapp/course/sign`,
          header: {
            'Content-Type': 'application/json'
          },
          data: {
            token: res.data,
            c_id: this.data.c_id
          },
          success: function(res) {
            //console.log(res);
            if(res.data.msg == '签到成功'){
              wx.showToast({
                title: '签到成功！',
                icon: 'success'
              })
            }
            else{
              wx.showToast({
                title: '已经签过到啦',
                icon: 'none'
              })
            }
          }
        })
      }
    })

  },
  open(){
    wx.request({
      url: `${config.service.host}/weapp/course/open`,
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        way: "open",
        c_id: this.data.c_id
      },
      success: (res) =>{
        //console.log(res)
        wx.request({
          url: `${config.service.host}/weapp/course/info`,
          header: {
            'Content-Type': 'application/json'
          },
          data: {
            c_id: this.data.c_id
          },
          success: (res)=>{
           // console.log(res)
            this.setData({
              course_info: res.data.course_info[0]
            })
            //console.log("data",this.data)
          }
        })
      }
    })
  },
  close(){
    wx.request({
      url: `${config.service.host}/weapp/course/open`,
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        way: "close",
        c_id: this.data.c_id
      },
      success: (res)=> {
       // console.log(res)
        wx.request({
          url: `${config.service.host}/weapp/course/info`,
          header: {
            'Content-Type': 'application/json'
          },
          data: {
            c_id: this.data.c_id
          },
          success: (res)=>{
           // console.log(res)
            this.setData({
              course_info: res.data.course_info[0]
            })
            //console.log("data",this.data)
          }
        })
      }
    })
  },
  backToIndex(){
    wx.redirectTo({
      url: `../stu_index/stu_index?identity=${this.data.identity}`
    })
  },
  toCourseAnnounce(){
    wx.redirectTo({
      url: '../course_announce/course_announce'
    })
  },
  toSignHistory(){
    wx.redirectTo({
      url: `../course_signhistory/course_signhistory?identity=${this.data.identity}&c_id=${this.data.c_id}`
    })
  }
})