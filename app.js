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
  
})