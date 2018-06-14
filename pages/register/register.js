// pages/info/info.js
var app = getApp()
Page({

  data: {
    info: {},
    passwd: { confirm: 1, passwd: "", passwdR: "" },
    tip: { content: "两次密码不一致" }
  },

  onLoad: function (options) {
    //获取个人信息
    /*var that = this
    wx.request({
      url: '',
      data: {
        openid:app.globalData.openid
      },
      method: 'GET',
      success: function (res) {
        that.setData({
          info:res.info
        })    
      }
    })*/
  },
  passwd: function (res) {
   /* var sub = this.data.passwd
    if (res.target.dataset.index == 1)
      sub.passwd = res.detail.value
    else
      sub.passwdR = res.detail.value
    if (sub.passwdR == sub.passwd)
      sub.confirm = 1
    else
      sub.confirm = -1

    this.setData({
      passwd: sub
    })*/
  },
  formSubmit: function (res) {
    console.log(res.detail.value.phone)
    if (res.detail.value.nickName && res.detail.value.phone){
    wx.request({
      url: 'https://irecycle.gxxnr.cn/api/user/register.do',
      data: {
        openid: app.globalData.openid,
        username: res.detail.value.nickName,
        phone: res.detail.value.phone,
        //password: res.detail.value.passwd
        password: '88888888'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      method:'POST',
      success: function (res) {
        //console.log(res)
        if (res.data.status =='incorrect password'){
          wx.showToast({
            title: '您的手机号已经在PC端注册，请输入PC端注册时输入的密码',
            image:'../../static/image/tip.png',
            duration:2000
          })
        }
        else{
          app.globalData.userid = res.data.userid
          app.globalData.origin = 1
          wx.navigateBack({
            delta: 1
          })
        }
      }
    })
    }
    else
    {
      wx.showToast({
        title: '请完善信息',
        image: '../../static/image/tip.png',
        duration: 2000
      })
    }
  },
  onReady: function () {

  },

  onShow: function () {

  },

  onHide: function () {

  },


  onUnload: function () {

  },


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