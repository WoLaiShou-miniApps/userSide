// pages/user/user.js
Page({
  data:{
    info:{}
  },
  onLoad:function(options){
    var that = this
    wx.checkSession({
      success: function () {
        wx.getUserInfo({
          success: function (res) {
            that.setData({
              info:res.userInfo
            })
          }
        })
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})