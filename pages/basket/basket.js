// pages/basket/basket.js
var app = getApp()
Page({
  data:{
    order_list:[],
    goods: [],
    weight_range: ["0~10斤", "10~50斤", "50~100斤"],
  },
  URL:'http://easy-mock.com/mock/59070ef87a878d73716e3aa7/wx-irecycle/',
  onLoad:function(options){
    var that = this;
    wx.request({
      url: that.URL+'getgoods',
      data: {},
      method: 'GET',    
      success: function(res){
        // success
        that.setData({
          goods:res.data.data.goods
        })
      },
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    this.setData({
      order_list:[{"type_id":0,"goods_id":0,"weight_id":0},{"type_id":0,"goods_id":2,"weight_id":1},{"type_id":2,"goods_id":2,"weight_id":0}]
    })
    console.log(this.data.order_list);
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})