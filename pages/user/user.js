// pages/user/user.js
var mask = require('../../components/mask/index.js')
var app =getApp() 
Page({
  data:{
    info:{},
    thepanel:false,
    credit:-1,
    origin: 0, //0初次登陆，1已有用户
    complain:false
  },
  maskClick: mask.maskClick,
  onLoad:function(options){
    var that = this
    that.setData({
      info:app.info,
      origin: app.globalData.origin,
      credit: app.globalData.credit
    })
  },
  open_complain:function(){
    this.setData({
      complain:true
    })
  },
  close_complain: function () {
    this.setData({
      complain: false
    })
  },
  complain_call1:function(){
    wx.makePhoneCall({
      phoneNumber: '13354502967',
    })
  },
  complain_call2: function () {
    wx.makePhoneCall({
      phoneNumber: '0451－57815011',
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  nomotion:function(){
  
  },
  gotosupport:function(){
    this.setData({
      thepanel:true
    })
  },
  backtouser:function(){
    this.setData({
      thepanel: false
    })
  },
  scanimg:function(){
    wx.previewImage({
      urls: ['https://vxlabdb.gxxnr.cn/common/ourqr.jpg']
    })
  },
  makecall:function(){
    wx.makePhoneCall({
      phoneNumber: '13945103823' 
    })
  }, 
  setclip:function(){
    wx.setClipboardData({
      data: 'xuzhimings',
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.vibrateShort()
            wx.showToast({
              title: '已添加到剪切板',
              icon: 'success',
              duration: 1000
            })
          },
          fail:function(){
            wx.vibrateShort()
            wx.showToast({
              title: '添加剪切板失败',
              icon: '../../static/image/tip.png',
              duration: 1000
            })
          }
        })
      }
    })
  },
  onShow:function(){
    var that = this
    wx.request({
      url: 'https://irecycle.gxxnr.cn/api/user/getusercredit.do',
      data:{
        userid: app.globalData.userid
      },
      success:function(res){
        that.setData({
          credit:res.data
        })
      }
    })
    that.setData({
      info: app.info,
      thepanel: false,
      origin: app.globalData.origin,
      credit: app.globalData.credit
    })
  },
  onHide:function(){
    // 页面隐藏
  },
  onShareAppMessage: function () {
    return {
      title: '我来收', // 分享标题
      path: '/pages/service/service',
      success: function () {
        wx.showToast({
          title: '转发成功',
          mask: true,
        })
      },
      fail: function () {
      }
    }
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