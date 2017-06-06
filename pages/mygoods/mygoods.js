// pages/mygoods/mygoods.js
var app = getApp()
Page({
  data: {
    mygoods: { selling: { num: 0, content: [] }, sold: { num: 0 , content: []}},
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
        var sub = that.data.mygoods
        for (var i = 0; i < res.data.length;i++)
        {
          if (res.data[i].state == "已退回" || res.data[i].state=="已售卖" )       {
            sub.sold.content.push(res.data[i])
            sub.sold.num = sub.sold.num+1
          }
          else
          {
            sub.selling.content.push(res.data[i])
            sub.selling.num = sub.selling.num + 1
          }
        }
        that.setData({
          mygoods:sub
        })
        var imageStates=[]
        var imageSrcs = []
        for (var i = 0; i < that.data.mygoods.selling.content.length;i++){
          imageStates.push(0)
          imageSrcs.push("")
        }
        that.setData({
          imageStates: imageStates,
          imageSrcs: imageSrcs
        })
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
  loadimage: function (res) {
    var that = this;
    console.log(res)
    var imageStates = that.data.imageStates;
    var imageSrcs = that.data.imageSrcs
    var index = res.currentTarget.dataset.index;
    var src = res.currentTarget.dataset.src;
    imageStates[index] = 1;
    imageSrcs[index] = src;
    that.setData({
      imageSrcs: imageSrcs,
      imageStates: imageStates
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