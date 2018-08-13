// pages/order_detail/order_detail.js
var innerAudioContext = wx.createInnerAudioContext()
var app = getApp()
Page({
  data: {
    order:{},
    confirm_PopUp:false,
    call_number:-1,
    voicePlaying:false,
    Mapmarkers:[{
      id:0,
      latitude:45.755936,
      longitude:126.633310,
      title:"回收车",
      iconPath:"../../static/image/mapcar.png",
      alpha:0.7,
      width:20,
      height:20
    },{
      id:1,
      longitude:126.639458,
      latitude:45.751602,
      title:"我家",
      iconPath:"../../static/image/home.png",
      alpha:0.9,
      width:20,
      height:20
    }],
    longitude:126.639458,
    latitude:45.751602
  },
  URL: 'http://easy-mock.com/mock/59070ef87a878d73716e3aa7/wx-irecycle/',

  confirm_call:function()
  {
    wx.makePhoneCall({
      phoneNumber: this.data.call_number,

      complete:function(){
      },
      fail:function(){
        wx.showToast({
          image: '../../static/image/tip.png',
          title: '拨号取消',
          duration: 1000 
        })
      }

    })

    this.setData({
      confirm_PopUp: false,
      call_number: -1
    })
  },
  not_call:function(){
    this.setData({
      confirm_PopUp: false,
      call_number: -1
    })
  },
  call_driver:function(e){
    wx.vibrateShort()
    this.setData({
      confirm_PopUp:true,
      call_number: (e.currentTarget.dataset.index).toString()
    })
  },
  voiceOrderStop:function(e){
    this.setData({
      voicePlaying:false
    })
    innerAudioContext.stop()
  },
  voiceOrderPlay: function (e) {
    //console.log(e)
    this.setData({
      voicePlaying: true
    })
    innerAudioContext.src = 'https://irecycle.gxxnr.cn'+e.target.dataset.src
    innerAudioContext.play()
  },
  onLoad: function (options) {
    var that=this
    
    //console.log(1,app.globalData.addressList)
    var address = {}
    for(var i =0;i<app.globalData.addressList.length;i++){
      address[app.globalData.addressList[i].id] = app.globalData.addressList[i]
    }
    that.setData({
      addressList:address
    })
    wx.getStorage({
      key: 'orderdetail',
      success: function(res) {
        //console.log(res)
        that.setData({
          order:res.data
        })
        that.data.Mapmarkers[1].longitude = that.data.addressList[res.data.addressid.toString()].longitude
        that.data.Mapmarkers[1].latitude = that.data.addressList[res.data.addressid.toString()].latitude
        that.setData({
          Mapmarkers:that.data.Mapmarkers
        })
        //获取回收车位置
        wx.request({
          url: "https://irecycle.gxxnr.cn/api/user/getdriverlocation.do",
          data: {
            orderid: that.data.order.id
          },
          method: 'GET',
          success: function (res) {
            //console.log(res)
            that.data.Mapmarkers[0].latitude = res.data.latitude
            that.data.Mapmarkers[0].longitude = res.data.longitude
            that.setData({
              Mapmarkers: that.data.Mapmarkers
            })
          }
        })
        setInterval(function(){
          //console.log("车在哪？")
          wx.request({
            url: "https://irecycle.gxxnr.cn/api/user/getdriverlocation.do",
            data: {
              orderid: that.data.order.id
            },
            method: 'GET',
            success: function (res) {
              //console.log(res.data)
              that.data.Mapmarkers[0].latitude = res.data.latitude
              that.data.Mapmarkers[0].longitude = res.data.longitude
              that.setData({
                Mapmarkers: that.data.Mapmarkers
              })
            }
          })
        },10000)
      },
      fail: function(res) {},
      complete: function(res) {},
    })
    innerAudioContext.onEnded(function () {
      that.setData({
        voicePlaying: false
      })
    })
    innerAudioContext.onError((res) => {
      wx.showToast({ title: '播放结束', mask: 'true', image: '../../static/image/tip.png', duration: 1000 })
    })
  },

  onReady: function () {

  },

  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    innerAudioContext.stop()
    this.setData({
      voicePlaying: false
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    innerAudioContext.destroy()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
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
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  }
})