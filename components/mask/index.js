module.exports = {
 maskClick:function(){
  wx.showToast({
    title: '请注册',
    icon:'loading',
    duration:1000
  })
  wx.navigateTo({
    url: "../register/register",
  })
 }
}