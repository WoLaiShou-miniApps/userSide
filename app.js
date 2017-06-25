//app.js
App({
  globalData:{
    userInfo:null,
    wxcode:null,
    encryptedData:null,
    iv:null,
    openid:'',
    userid:-1,
    credit:0,
    origin:0 //0初次登陆，1已有用户
  },
  info:{},
  goods_list:[],
  onLaunch: function() { 
    
  },
  onShow: function() {
      // Do something when show.
      
  },
  onHide: function() {
      // Do something when hide.
      
      
  },
  onError: function(msg) {
    //console.log(msg)
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})