// pages/info/info.js
Page({

  data: {
    info:{},
    passwd:{confirm:0,passwd:"",passwdR:""},
    tip:{content:"两次密码不一致"}
  },

  onLoad: function (options) {
    var sub={}
    var that = this
    sub.nickName = options.name
    that.setData({
        info: sub
    })
  },
  passwd: function(res){
    var sub = this.data.passwd
    if (res.target.dataset.index==1)
      sub.passwd = res.detail.value
    else
      sub.passwdR = res.detail.value
    if (sub.passwdR=="")
      sub.confirm=0
    else if (sub.passwdR == sub.passwd)
      sub.confirm = 1
    else
      sub.confirm = -1
    
    this.setData({
      passwd:sub
    })
  },
  formSubmit:function(res){
    console.log(res)
  },
  onReady: function () {
  
  },

  onShow: function () {
  
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
  
  }
})