// pages/service/service.js
var get_function = require('../../components/test/test1.js')

Page({
  data:{
    service:0,
    goods_type:["易拉罐","废报纸","旧书","油桶","酒瓶"],
    goods:[{"name":"易拉罐(铝材)","price":"20元/斤","select":-1},{"name":"易拉罐(马口铁)","price":"10元/斤","select":-1}],
    price_range:["0~10斤","10~50斤","50~100斤"],
    selected_type:0,
    selected_goods:-1,
    image:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493741975494&di=e38c400d3995f57f4c2e3a3c76aea308&imgtype=0&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F17%2F83%2F68%2F559afa7d99b41_1024.jpg"
  },
  switchtab:function(e){
    this.setData({
        selected_type: e.target.dataset.index 
    })
  },
  selectgoods:function(e){
    var sub = e.currentTarget.dataset.index
    if (sub==this.data.selected_goods)
       sub=-1
    this.setData({
        selected_goods: sub 
    })
  },
  selectweight:function(e){
    var copy = get_function.selectweight(e,this.data.goods)
    this.setData({
        goods: copy 
    })
  },
  change_service:function(e){
    this.setData({
        service: e.target.dataset.index 
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})