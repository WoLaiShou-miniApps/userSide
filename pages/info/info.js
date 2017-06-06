// pages/info/info.js
var app = getApp()
Page({

  data: {
    info:{},
    passwd:{confirm:0,passwd:"",passwdR:""},
    tip:{content:""},
    oldpwd:"",
    confirm:0
  },

  onLoad: function (options) {
    //获取个人信息
    var that = this
    wx.request({
      url: 'https://irecycle.gxxnr.cn/api/user/getuserinfo.do',
      data: {
        userid:app.globalData.userid
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        that.setData({
          info:res.data
        }) 
      }
    })
  },
  passwd: function(res){
    var sub = this.data.passwd
    if (res.target.dataset.index == 1)
      sub.passwd = res.detail.value
    else
      sub.passwdR = res.detail.value
    if (sub.passwdR == sub.passwd && sub.passwdR!='')
      sub.confirm = 1
    else if (sub.passwdR == '')
      sub.confirm = 0
    else
      sub.confirm = -1
    this.data.tip.content="两次密码不一致"
    this.setData({
      passwd: sub,
      tip:this.data.tip
    })
  },
  passwdConfirm: function (res) {
    this.setData({
      oldpwd: res.detail.value.passwd
    })
    console.log(res.detail.value.passwd)
    var that =this
    wx.request({
      url: 'https://irecycle.gxxnr.cn/api/user/confirmpassword.do',
      data: {
        userid: app.globalData.userid,
        password: res.detail.value.passwd
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
        if (res.data=="success")
          that.setData({
            confirm:1
          })
        else{
          that.data.tip.content="错误密码"
          that.setData({
            confirm:-1,
            tip:that.data.tip
          })
        }
      }
    })
  },


  formSubmit:function(res){
    console.log(res.detail.value.phone)
    wx.request({
      url: 'https://irecycle.gxxnr.cn/api/user/modifyuserinfo.do',
      data: {
        userid:app.globalData.userid,
        username:res.detail.value.nickName,
        phone:res.detail.value.phone,
        oldpwd:this.data.oldpwd,
        newpwd:res.detail.value.passwd
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      method: 'POST',
      success: function (res) {
        wx.showToast({
            title: '修改成功',
            duration: 2000,
            icon: "success"
        })
        console.log(res)
        wx.navigateBack({
          delta:1
        })
      }
    })
    
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