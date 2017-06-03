//app.js
App({
  globalData:{
    userInfo:null,
    wxcode:null,
    encryptedData:null,
    iv:null,
    openid:'',
    userid:0,
    origin:0 //0初次登陆，1已有用户
  },
  info:{},
  goods_list:[],
  onLaunch: function() { 
    var that = this
    wx.login({
      success: function (res) {
        console.log("已获取到登陆态")
        console.log(res.code)
        wx.getUserInfo({
          success: function (res) {
            console.log("已获取到微信账户个人信息")
            that.info = res.userInfo
          }
        })
       wx.request({
         url: 'https://irecycle.gxxnr.cn/api/user/login.do',
          data: {
            code: res.code
          },
          method: 'GET',
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res)
            if (res.data.errCode==0)
            {
              that.globalData.userid=res.data.data.id
              that.globalData.origin = 1
              console.log("获取userid:"+that.globalData.userid)
            }
            else
            {
              that.globalData.origin = 0
              that.globalData.openid=res.data.data.openid
              /*wx.reLaunch({
                url: 'pages/info/info',
              })*/
            }
          }
        })

      }
    })
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