// pages/mygoods/mygoods.js
Page({
  data: {
    mygoods:{},
    tip: { show:1,content:"已售二手物品将在两个工作日内打到您的账户上！"}
  },
  URL: 'http://easy-mock.com/mock/59070ef87a878d73716e3aa7/wx-irecycle/',
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: that.URL + 'mygoods',
      data: {},
      method: 'GET',
      // header: {}, // 设置请求的 header
      success: function (res) {
        that.setData({
          mygoods: res.data
        })
        console.log(that.data.mygoods)
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