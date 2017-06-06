// pages/mymove/mymove.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moveOrderList:[],
    ifshow:0
  },
  /**
   * 完成订单
   */
  confirm:function(e){
    //console.log(e)
    //console.log(e.currentTarget.dataset.order.id)
    wx.request({
      url: 'https://irecycle.gxxnr.cn/api/user/finishcarorder.do',
      data: {
        userid:app.globalData.userid,
        orderid:e.currentTarget.dataset.order.id
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        //console.log(res)
        wx.request({
        url: 'https://irecycle.gxxnr.cn/api/user/getMoveAppointments.do',
        data: {
          userid: app.globalData.userid
        },
        method: 'GET',
        success: function (res) {
          //console.log(res)
          that.setData({
            moveOrderList: res.data,
            ifshow:1
          })
          wx.hideLoading()
        }
      })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
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
    wx.showLoading({
      title: '载入中···',
      mask: true,
    })
    var that = this
    wx.request({
      url: 'https://irecycle.gxxnr.cn/api/user/getMoveAppointments.do',
      data: {
        userid: app.globalData.userid
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        if(res.data!='failed')
        that.setData({
          moveOrderList: res.data,
          ifshow:1
        })
        wx.hideLoading()
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