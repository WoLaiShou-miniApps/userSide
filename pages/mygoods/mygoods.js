// pages/mygoods/mygoods.js
var app = getApp()
Page({
  data: {
    mygoods: { selling: { num: 0, content: [] }, sold: { num: 0 , content: []}},
    tip: { show:0,content:""},
    page:0,
    select_order:-1,
    order_list:[],
    ordernum:-1,
    call_to_cancel:false
  },
  tiptap:function(){
    this.data.tip.show = 0
    this.setData({
      tip:this.data.tip
    })
  },
  changepape:function(e){
    this.setData({
      page:e.currentTarget.dataset.index,
      select_order: -1,
    })
  },
  selectorder: function (e) {
    this.setData({
      select_order: e.currentTarget.dataset.index == this.data.select_order ? -1 : e.currentTarget.dataset.index
    })
  },
  gotoEvaluate:function(){
    var that = this
    wx.setStorage({
      key: 'secondorderdetail',
      data: that.data.order_list[that.data.select_order],
      success: function () {
        wx.navigateTo({
          url: '../evaluateSecond/evaluateSecond',
        })
      }
    })
  },
  orderCancel:function(e){
    var that = this
    wx.request({
      url: 'https://irecycle.gxxnr.cn/api/user/secondOrderCancel.do',
      data: {
        secondorderid: that.data.order_list[e.currentTarget.dataset.index].id,
      },
      method: 'GET',
      success: function (res) {
        //console.log('二手订单取消：',res)
        
        //重新加载二手订单列表
        wx.request({
          url: 'https://irecycle.gxxnr.cn/api/user/getsecondHand.do',
          data: {
            userid: app.globalData.userid,
          },
          method: 'GET',
          success: function (res) {
            that.setData({
              order_list: res.data,
              ordernum: res.data.length,
              select_order: -1
            })
          }
        })
        
      }
    })
  },
  call_to_cancel:function (e) {
    //console.log("call_to_cancel:", e.currentTarget.dataset.index)
    //console.log("call_to_cancel:", this.data.order_list[e.currentTarget.dataset.index])
    this.setData({
      call_to_cancel:true,
      theorderid: this.data.order_list[e.currentTarget.dataset.index].id
    })
  },
  close_callcancel:function(){
    var that = this
    that.setData({ select_order: -1 })
    wx.request({
      url: 'https://irecycle.gxxnr.cn/api/user/getsecondHand.do',
      data: {
        userid: app.globalData.userid,
      },
      method: 'GET',
      success: function (res) {
        //console.log('二手订单',res)
        that.setData({
          order_list: res.data,
          ordernum: res.data.length
        })
        //console.log('订单数量', res.data.length)
      }
    })
    this.setData({
      call_to_cancel: false
    })
  },
  hotline_call1: function () {
    wx.makePhoneCall({
      phoneNumber: '0451－82930699',
    })
  },
  hotline_call2: function () {
    wx.makePhoneCall({
      phoneNumber: '0451－57815011',
    })
  },
  cleanorder: function () {
    var that = this
    //console.log('清理订单', that.data.order_list[that.data.select_order].id)
    wx.request({
      url: "https://irecycle.gxxnr.cn/api/user/deletesecondorder.do",
      data: {
        orderid: that.data.order_list[that.data.select_order].id
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function (res) {
        //console.log('返回结果', res)

        wx.request({
          url: 'https://irecycle.gxxnr.cn/api/user/getsecondHand.do',
          data: {
            userid: app.globalData.userid,
          },
          method: 'GET',
          success: function (res) {
            //console.log('二手订单', res)
            that.setData({
              order_list: res.data,
              select_order: -1,
              ordernum: res.data.length
            })
          }
        })

      }
    })
  },
  cleangoods:function(e){
    var that = this
    //console.log('清除物品',e.currentTarget.dataset.index)
    wx.request({
      url: 'https://irecycle.gxxnr.cn/api/user/deletesecondgoods.do',
      data: {
        id: e.currentTarget.dataset.index
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function (res) {
        //console.log('删除物品',res)
        wx.request({
          url: 'https://irecycle.gxxnr.cn/api/user/getsecondgoods.do',
          data: {
            userid: app.globalData.userid,
          },
          method: 'GET',
          success: function (res) {
            //console.log(res)
            var sub = { selling: { num: 0, content: [] }, sold: { num: 0, content: [] } }
            for (var i = 0; i < res.data.length; i++) {
              if (res.data[i].state == "在库" || res.data[i].state == "在售中") {
                sub.selling.content.push(res.data[i])
                sub.selling.num = sub.selling.num + 1
              }
              else {
                sub.sold.content.push(res.data[i])
                sub.sold.num = sub.sold.num + 1
              }
            }
            that.setData({
              mygoods: sub
            })
          },
        })
      }
    })
  },
  gotoDetail: function () {
    wx.setStorage({
      key: 'orderdetail',
      data: this.data.order_list[this.data.select_order],
      success: function () {
        wx.navigateTo({
          url: '../order_detail/order_detail',
        })
      }
    })
  },
  onLoad: function (options) {
    var that = this;
    
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
    //console.log(res)
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
    var that = this
    that.setData({select_order: -1})
    wx.request({
      url: 'https://irecycle.gxxnr.cn/api/user/getsecondHand.do',
      data: {
        userid: app.globalData.userid,
      },
      method: 'GET',
      success: function (res) {
        //console.log('二手订单',res)
        that.setData({
          order_list: res.data,
          ordernum: res.data.length
        })
        //console.log('订单数量', res.data.length)
      }
    })
    wx.request({
      url: 'https://irecycle.gxxnr.cn/api/user/getinfo.do',
      data: {
      },
      method: 'GET',
      success: function (res) {
        that.data.tip.content = res.data
        that.data.tip.show = 1
        that.setData({
          tip: that.data.tip,
          select_order: -1
        })
      }
    })
    wx.request({
      url: 'https://irecycle.gxxnr.cn/api/user/getsecondgoods.do',
      data: {
        userid: app.globalData.userid,
      },
      method: 'GET',
      success: function (res) {
        //console.log(res)
        var sub = that.data.mygoods
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].state == "在库" || res.data[i].state == "在售中") {
            sub.selling.content.push(res.data[i])
            sub.selling.num = sub.selling.num + 1
          }
          else {
            sub.sold.content.push(res.data[i])
            sub.sold.num = sub.sold.num + 1

          }
        }
        that.setData({
          mygoods: sub
        })
        var imageStates = []
        var imageSrcs = []
        for (var i = 0; i < that.data.mygoods.selling.content.length; i++) {
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