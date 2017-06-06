// pages/mygoods/mygoods.js
var app = getApp()
Page({
  data: {
    mygoods:{},
    tip: { show:1,content:"已售二手物品将在两个工作日内打到您的账户上！"}
  },

  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://irecycle.gxxnr.cn/api/user/register.do',
      data: {
        addressid: app.globalData.openid,
        userid: res.detail.value.nickName,
        phone: res.detail.value.phone,
        password: res.detail.value.passwd
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
      },
    })
  },

  tiptap:function(){
    var sub=this.data.tip
    sub.show=0
    this.setData({
      tip:sub
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

  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})