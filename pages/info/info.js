// pages/info/info.js
var app = getApp()
Page({

  data: {
    info:{},
    passwd:{confirm:1,passwd:"",passwdR:""},
    tip:{content:"两次密码不一致"},
    confirm:1
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
  passwd: function(res){
    
  },
  passwdConfirm: function (res) {
    console.log(res.detail.value.passwd)
    /*wx.request({
      url: 'https://irecycle.gxxnr.cn/api/user/.do',
      data: {
        userid: app.globalData.userid,
        password: res.detail.value.passwd
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        this.setDAta({
          confirm:1
        })
      }
    })*/
  },
 /* formSubmit:function(res){
    console.log(res.detail.value.phone)
    wx.request({
      url: 'https://irecycle.gxxnr.cn/api/user/.do',
      data: {
        openid:app.globalData.openid,
        username:res.detail.value.nickName,
        phone:res.detail.value.phone,
        password:res.detail.value.passwd
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
        app.globalData.userid =res.data.userid
        console.log(app.globalData.openid)
        app.globalData.origin = 1
        wx.navigateBack({
          delta:1
        })
      }
      
    })
    
  },*/
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