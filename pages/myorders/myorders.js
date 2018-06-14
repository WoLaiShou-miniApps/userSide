// pages/myorders/myorders.js
var app = getApp()
Page({
  data: {
    order_state:0,
    select_order:-1,
    myorder_list: {}
    
  },

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


  cleanorder:function(){
    var that = this
    //console.log('清理订单', that.data.myorder_list.finished.content[that.data.select_order].id)
    wx.request({
      url: "https://irecycle.gxxnr.cn/api/user/deleteorder.do",
      data: {
        orderid: that.data.myorder_list.finished.content[that.data.select_order].id
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function (res) {
        //console.log('返回结果',res)

        wx.request({
          url: "https://irecycle.gxxnr.cn/api/user/getmyorderlist.do",
          data: {
            userid: app.globalData.userid
          },
          method: 'GET',
          // header: {}, // 设置请求的 header
          success: function (res) {
            ////console.log(res.resdata);
            var myorder = { untaken: { num: 0, content: [] }, finished: { num: 0, content: [] } }
            for (var i = 0; i < res.data.length; i++) {
              if (res.data[i].state == 6 || res.data[i].state <= 1) {
                myorder.finished.content.push(res.data[i])
                myorder.finished.num++
              }
              else {
                myorder.untaken.content.push(res.data[i])
                myorder.untaken.num++
              }

            }
            that.setData({
              myorder_list: myorder,
              select_order: -1
            })
          },
        })



      }
    })
  },


  orderDelete:function(){
    var that=this
    wx.request({
      url: "https://irecycle.gxxnr.cn/api/user/orderCancel.do",
      data: {
        id:this.data.myorder_list.untaken.content[this.data.select_order].id
      },
      method: 'GET',
      success: function (res) {
        //console.log("删除结果：",res)
        wx.request({
          url: "https://irecycle.gxxnr.cn/api/user/getmyorderlist.do",
          data: {
            userid: app.globalData.userid
          },
          method: 'GET',
          // header: {}, // 设置请求的 header
          success: function (res) {
            ////console.log(res.resdata);
            var myorder = { untaken: { num: 0, content: [] }, finished: { num: 0, content: [] } }
            for (var i = 0; i < res.data.length; i++) {
              if (res.data[i].state == 6 || res.data[i].state <= 1) {
                  myorder.finished.content.push(res.data[i])
                  myorder.finished.num++
                  } 
                else{
                  myorder.untaken.content.push(res.data[i])
                  myorder.untaken.num++
              }

            }
            that.setData({
              myorder_list: myorder,
              select_order: -1
            })
          },
        })
      },
    })
  },
  gotoDetail:function(){
    wx.setStorage({
      key: 'orderdetail',
      data: this.data.order_state == 0 ? this.data.myorder_list.untaken.content[this.data.select_order] : this.data.myorder_list.finished.content[this.data.select_order],
      success:function(){
        wx.navigateTo({
          url: '../order_detail/order_detail',
        })
      }
    })
  },

  gotoEvaluate: function () {
    wx.setStorage({
      key: 'orderdetail',
      data: this.data.order_state == 0 ? this.data.myorder_list.untaken.content[this.data.select_order] : this.data.myorder_list.finished.content[this.data.select_order],
      success: function () {
        wx.navigateTo({
          url: '../evaluate/evaluate',
        })
      }
    })
  },


  onLoad: function (options) {
    
  },

  onReady: function () {
  
  },

  onShow: function () {
    var that = this;
    wx.request({
      url: "https://irecycle.gxxnr.cn/api/user/getmyorderlist.do",
      data: {
        userid: app.globalData.userid
      },
      method: 'GET',
      // header: {}, // 设置请求的 header
      success: function (res) {
        //console.log('订单',res);
        var myorder = { untaken: { num: 0, content: [] }, finished: { num: 0, content: []}}
        
        for (var i = 0; i < res.data.length;i++)
        {
          if (res.data[i].state == 6 || res.data[i].state <=1)
          {
              myorder.finished.content.push(res.data[i])
              myorder.finished.num++
          }
          else{
              myorder.untaken.content.push(res.data[i])
              myorder.untaken.num++
          }
        }
        that.setData({
          myorder_list: myorder,
          select_order: -1
        })
        //console.log(that.data.myorder_list)
      },
      fail: function (res) {
        wx.showToast({
          title: '数据错误，请联系管理员修复用户数据',
          image: '../../static/image/tip.png'
        })
      }
    })
  },

  onHide: function () {
  
  },

  onUnload: function () {
  
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
    //console.log("PullDown")
    var that = this;
    wx.request({
      url: "https://irecycle.gxxnr.cn/api/user/getmyorderlist.do",
      data: {
        userid: app.globalData.userid
      },
      method: 'GET',
      // header: {}, // 设置请求的 header
      success: function (res) {
        ////console.log(res.resdata);
        var myorder = { untaken: { num: 0, content: [] }, finished: { num: 0, content: [] } }
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].state == 6 || res.data[i].state <= 1) {
            
              myorder.finished.content.push(res.data[i])
              myorder.finished.num++
              }
            else{
              myorder.untaken.content.push(res.data[i])
              myorder.untaken.num++
          }
        }
        that.setData({
          myorder_list: myorder
        })
        wx.stopPullDownRefresh()
      },
    })
  },
})