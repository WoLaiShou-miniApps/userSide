// pages/basket/basket.js
var app = getApp()
Page({
  data:{
    order_list:[],
    goods_type: [],
    goods: [],
    price_range: ["0~10斤", "10~50斤", "50~100斤"],
  },
  onLoad:function(options){
    var that = this;
    wx.request({
      url: that.URL+'getgoods',
      data: {},
      method: 'GET', 
       header: {

       },
      
      success: function(res){
        // success
        console.log(res.data);
        that.setData({
          goods_type:res.data.data.goodsType,
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
      order_list:app.goods_list
    })
    app.goods_list
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})