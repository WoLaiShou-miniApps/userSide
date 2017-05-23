//app.js
App({
  globalData:{
    userInfo:null,
    wxcode:null,
    encryptedData:null,
    iv:null,
  },
  goods_list:[],
  onLaunch: function() { 
    wx.login({
      success: function (res) {
        console.log("已获取到登陆态")
       /* wx.request({
            url: '',
            data: {
              code: res.code
            }
          })*/
      }
    }); 
  },
  onShow: function() {
      // Do something when show.
      
  },
  onHide: function() {
      // Do something when hide.
      
      
  },
  onError: function(msg) {
    console.log(msg)
  }
})