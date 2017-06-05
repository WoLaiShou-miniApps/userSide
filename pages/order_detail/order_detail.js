// pages/order_detail/order_detail.js
var app = getApp()
Page({
  data: {
    order:{},
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

  onLoad: function (options) {
    var that=this
    
    console.log(1,app.globalData.addressList)
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
        that.setData({
          order:res.data
        })
        console.log(that.data.addressList)
        that.data.Mapmarkers[1].longitude = that.data.addressList[res.data.addressid.toString()].longitude
        that.data.Mapmarkers[1].latitude = that.data.addressList[res.data.addressid.toString()].latitude
        that.setData({
          Mapmarkers:that.data.Mapmarkers
        })
        //获取回收车位置
        setInterval(function(){
          wx.request({
            url: "https://irecycle.gxxnr.cn/api/user/getdriverlocation.do",
            data: {
              orderid: that.data.order.id
            },
            method: 'GET',
            success: function (res) {
              console.log(res.data)
              that.data.Mapmarkers[0].latitude = res.data.latitude
              that.data.Mapmarkers[0].longitude = res.data.longitude
              that.setData({
                Mapmarkers: that.data.Mapmarkers
              })
            }
          })
        },15000)
      },
      fail: function(res) {},
      complete: function(res) {},
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
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
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