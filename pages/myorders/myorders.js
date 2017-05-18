// pages/myorders/myorders.js
Page({
  data: {
    order_state:0,
    select_order:-1,
    myorder_list: {}
  },
  URL: 'http://easy-mock.com/mock/59070ef87a878d73716e3aa7/wx-irecycle/',
  changepape: function (e) {
    this.setData({
      order_state: e.target.dataset.index,
      select_order: -1
    })
  },
  selectorder: function (e) {
    this.setData({
      select_order: e.currentTarget.dataset.index == this.data.select_order ? -1 : e.currentTarget.dataset.index
    })
  },
  onLoad: function (options) {
    
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
        var myorder = { untaken: { num: 0, content: [] }, finished: { num: 0, content: [] } }
        for (var i = 0; i < res.data.data.order_list.length;i++)
        {
          switch (res.data.data.order_list[i].state)
          {
            case 2:
              myorder.finished.content.push(res.data.data.order_list[i])
              myorder.finished.num++
              break
            default:
              myorder.untaken.content.push(res.data.data.order_list[i])
              myorder.untaken.num++
          }
        }
        that.setData({
          myorder_list: myorder
        })
        console.log(that.data.myorder_list)
      },
    })
  },

  onHide: function () {
  
  },

  onUnload: function () {
  
  },

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