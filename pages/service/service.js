// pages/service/service.js
Page({
  data:{
    goods_type:["易拉罐","废报纸","旧书","油桶","酒瓶"],
    goods:[{"name":"易拉罐(铝材)","price":"20元/斤","select":-1},{"name":"易拉罐(马口铁)","price":"10元/斤","select":-1}],
    price_range:["0~10斤","10~50斤","50~100斤"],
    selected_type:0,
    selected_goods:100,
    image:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493741975494&di=e38c400d3995f57f4c2e3a3c76aea308&imgtype=0&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F17%2F83%2F68%2F559afa7d99b41_1024.jpg"
  },
  switchtab:function(e){
    this.setData({
        selected_type: e.target.dataset.index 
    })
  },
  selectgoods:function(e){
    this.setData({
        selected_goods: e.currentTarget.dataset.index 
    })
  },
  selectweight:function(e){
        var copy=this.data.goods
    if (e.target.dataset.weight_index==copy[e.target.dataset.index].select)
      copy[e.target.dataset.index].select=-1
    else
      copy[e.target.dataset.index].select=e.target.dataset.weight_index
    this.setData({
        goods: copy 
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
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