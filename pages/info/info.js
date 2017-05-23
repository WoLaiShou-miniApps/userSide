// pages/info/info.js
Page({

  data: {
    info:{}
  },

  onLoad: function (options) {
    var that = this
    wx.checkSession({
      success: function () {
        wx.getUserInfo({
          success: function (res) {
            that.setData({
              info: res.userInfo
            })
          }
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