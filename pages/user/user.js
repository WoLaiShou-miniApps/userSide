// pages/user/user.js
var mask = require('../../components/mask/index.js')
var app =getApp() 
Page({
  data:{
    info:{},
    credit:0,
    origin: 0 //0初次登陆，1已有用户
  },
  maskClick: mask.maskClick,
  onLoad:function(options){
    var that = this
    that.setData({
      info:app.info,
      origin: app.globalData.origin
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
  },
  onPullDownRefresh: function () {
    var that = this
    that.setData({
      info: app.info,
      origin: app.globalData.origin
    })
  },
})