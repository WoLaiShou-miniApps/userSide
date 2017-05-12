// pages/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  openMap: function(){
   var that = this
    wx.chooseLocation({
      success: function (res) {
        var aimLocation=res
        that.setData({
          aimLocation: aimLocation
        });
        wx.getLocation({
          type: 'gcj02', //返回可以用于wx.openLocation的经纬度
          success: function (res) {
            var latitude = res.latitude
            var longitude = res.longitude
            wx.openLocation({
              latitude: aimLocation.latitude,
              longitude: aimLocation.longitude,
              scale: 28,
              name: aimLocation.name,
              address: aimLocation.address
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.mapCtx = wx.createMapContext('map')
   
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
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