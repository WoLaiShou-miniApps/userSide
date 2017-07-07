// pages/index/index.js
var test = require('../../components/test/test1.js')

Page({
  data:{
    ifload:0,
    time:3
  },
  imageLoaded:function(){
    var that = this
    this.setData({
      ifload:1
    })
    wx.hideLoading()
    var inter = setInterval(function(){
      if(that.data.time==1){
        wx.switchTab({
          url: "../service/service",
          success:function(){
            //console.log('ss')
            clearInterval(inter)
          }
        })
      }else{
        that.setData({
          time: that.data.time - 1
        })
      }
      
    },1000)
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    wx.showLoading({
      title: '正在拼命加载...',
    })
    /*wx.request({
      url: 'https://irecycle.gxxnr.cn/picture/getXcxfy.do',
      method:'GET',
      success:function(res){
        console.log(res)
      },
    })*/
  },
  showmap:function(){
      test.showmap()
  },
  onReady:function(){
    // 页面渲染完成
    test.showmap()
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