module.exports = {
  formSubmit: function (e) {
    var app = getApp()
    var that = this;
    console.log(e.detail.value);
    var phone = e.detail.value.phone
    if (!phone) {
      wx.showToast({title: '请输入手机号码', image: '../../static/image/tip.png', duration: 1000})
    } else {
      /**
         * 发起一次请求
         */
      wx.request({
        url: 'https://irecycle.gxxnr.cn/api/user/appointMove.do',
        data: {
          userid: app.globalData.userid,
          phone: phone
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        header: {
           'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        success: function (res) {
          // success
          if(res.data=="success"){
            that.setData({banjia_key: 1})
          }
          
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })

    }
  },
  makePhoneCall: function () {
    wx.makePhoneCall({phoneNumber: '0451-82638864', success: function (res) {
        // success
      }})
  }
}