// pages/service/service.js
var get_function = require('../../components/test/test1.js')

Page({
  data: {
    service: 0,
    goods_type: ["易拉罐", "废报纸", "旧书", "油桶", "酒瓶"],
    goods: [{ "name": "易拉罐(铝材)", "price": "20元/斤", "select": -1 }, { "name": "易拉罐(马口铁)", "price": "10元/斤", "select": -1 }],
    price_range: ["0~10斤", "10~50斤", "50~100斤"],
    selected_type: 0,
    selected_goods: -1,
    image: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493741975494&di=e38c400d3995f57f4c2e3a3c76aea308&imgtype=0&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F17%2F83%2F68%2F559afa7d99b41_1024.jpg"
  },
  URL:'http://easy-mock.com/mock/59070ef87a878d73716e3aa7/wx-irecycle/',
  switchtab: function (e) {
    this.setData({
      selected_type: e.target.dataset.index
    })
  },
  selectgoods: function (e) {
    var sub = e.currentTarget.dataset.index
    if (sub == this.data.selected_goods)
      sub = -1
    this.setData({
      selected_goods: sub
    })
  },
  tap: function (e) {
    console.log(e.touches[0].pageX + " 和 " + e.touches[0].pageY)
  },
  selectweight: function (e) {

    console.log(e.touches[0].pageX + " 和 " + e.touches[0].pageY)

    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear',
    })

    this.animation = animation
    if (this.data.goods[e.target.dataset.index].select == -1) {
      animation.translate(-168, 30 + 45 + e.target.dataset.index * 87 - 380).step({ duration: 20 })
      animation.scale(3, 3).step({ duration: 20 })
      animation.scale(1, 1).translate(0, 0).step({ duration: 460 })
    }
    else if (this.data.goods[e.target.dataset.index].select == e.target.dataset.weight_index) {
      animation.scale(2, 2).translateY(-40).step({ duration: 200 })
      animation.translateY(-45).translateX(50).rotate(90).step({ duration: 200 })
      animation.scale(1, 1).translateY(0).rotate(0).translateX(0).step({ duration: 0 })
    }
    else {
      animation.scale(2, 2).translateY(-40).step({ duration: 200 })
      animation.scale(1, 1).translateY(0).step({ duration: 300 })
    }
    this.setData({
      animationData_goods: animation.export(),
    })


    var copy = get_function.selectweight(e, this.data.goods)
    this.setData({
      goods: copy
    })


  },
  change_service: function (e) {
    this.setData({
      service: e.target.dataset.index
    }) //animationData_progress  translateX(107*e.target.dataset.index)
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease-out',
    })
    this.animation = animation
    animation.width(50 + 'rpx').left(e.target.dataset.index * 250 + 'rpx').step({ duration: 500 })
    animation.width(250 + 'rpx').step({ duration: 200 })
    this.setData({
      animationData_progress: animation.export()
    })
  },
  onLoad:function(){
    var that = this;
    wx.request({
      url: that.URL+'getgoods',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res.data);
        that.setData({
          goods_type:res.data.data.goodsType,
          goods:res.data.data.goods
        })
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})