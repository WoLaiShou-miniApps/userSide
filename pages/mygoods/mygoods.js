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
      url: 'https://irecycle.gxxnr.cn/api/user/getsecondgoods.do',
      data: {
        userid: app.globalData.userid,
      },
      method: 'GET',
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