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


        //学生
        if(options.identity == "stu"){
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

              var sign_info = res.data.sign_info
              for(let i=0,len=sign_info.length;i<len;i++){
                var date = new Date(sign_info[i].sign_date)
                sign_info[i].sign_date = `${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}&emsp;&emsp; ${date.getHours().toString().length==1 ? '0'+date.getHours():date.getHours()}:${date.getMinutes().toString().length==1 ? '0'+date.getMinutes():date.getMinutes()}`
              }

              

              this.setData({
                sign_info: sign_info
              })
            }
          })
        }

        //教师
        else{
          wx.request({
            url: `${config.service.host}/weapp/course/history/tea`,
            header: {
              'Content-Type': 'application/json'
            },
            data: {
              c_id: options.c_id
            },
            success: (res)=>{
              //渲染表格


              //处理签到时间
              var sign_time = []
                //取每次签到时间，并去重复
              res.data.sign_info.forEach((value) => {
                if (sign_time.filter((_value) => {
                  return _value.f_id == value.f_id
                }).length == 0) {
                  var date = new Date(value.f_time)
                  value.f_time = `${date.getFullYear()}年${date.getMonth() + 1}月\n${date.getDate()}日 ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
                  sign_time.push({
                    f_id: value.f_id,
                    f_time: value.f_time
                  })
                }
              })

              //处理学生姓名
              var stu_name=[]
              res.data.sign_info.forEach((value)=>{
                if (stu_name.filter((_value) => {
                  return _value == value.stu_name
                }).length == 0) {
                  stu_name.push(value.stu_name)
                }
              })

              //处理签到信息
              var stu_sign={}
              stu_name.forEach((name)=>{
                stu_sign[name] = {}
                sign_time.forEach((value)=>{
                  stu_sign[name][value.f_time] = res.data.sign_info.filter((_value)=>{
                    if(_value.f_id == value.f_id){
                      if(_value.stu_name == name){
                        return true
                      }
                    }
                    return false
                  }).length == 0 ? "cancel" : "success"
                })
              })
              console.log(stu_sign)
              this.setData({
                sign_info:{
                  sign_time: sign_time,
                  stu_name: stu_name,
                  stu_sign: stu_sign
                }
              })

            }
          })
        }
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
  
  },
  backToCourse(){
    wx.redirectTo({
      url:`../stu_course/stu_course?identity=${this.data.identity}&c_id=${this.data.c_id}`
    })
  },
})