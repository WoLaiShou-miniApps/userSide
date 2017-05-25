// pages/order_detail/order_detail.js
var app = getApp()
Page({
  data: {
    order_list: [],
    orderid:0,
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
      alpha:0.7,
      width:20,
      height:20
    }],
    longitude:126.639458,
    latitude:45.751602
  },
  URL: 'http://easy-mock.com/mock/59070ef87a878d73716e3aa7/wx-irecycle/',

  onLoad: function (options) {
    console.log(options.index)
    this.setData({
      orderid: options.index
    })
  },

  onReady: function () {

  },

  onShow: function () {
    var that = this;
    wx.request({
      url: that.URL + 'myorderlist',
      data: {},
      method: 'GET',
      // header: {}, // 设置请求的 header
      success: function (res) {
        //console.log(res.data);
        that.setData({
          order_list: res.data.resdata.order_list
        })
        console.log(that.data.order_list)
      },
    })
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