// pages/mymove/mymove.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moveOrderList:[
      {
        orderIndexr:1233212,
        data:'2017-06-01',
        time:'14:30',
        starting:'南岗区花园街110号',
        destination:'南岗区黄河路92号',
        driverPhoneNumber:13115603322,
      },
      {
        orderIndexr: 1233212,
        data: '2017-06-01',
        time: '14:30',
        starting: '南岗区花园街110号',
        destination: '南岗区黄河路92号',
        driverPhoneNumber: 13115603322,
      }
    ]
  },
/**
 * 打客服电话
 */
  move_callForService:function(){
    wx.makePhoneCall({
      phoneNumber: '1340000' 
    })
  },

  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://irecycle.gxxnr.cn/api/user/getMoveAppointments.do',
      data: {
        userid: app.globalData.userid
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        that.setData({
          moveOrderList: res.data
        })
      }
    })
  },

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
  
  }
})