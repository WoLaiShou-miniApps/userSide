// pages/myaddress/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: [
      {
        "id": 1,
        "addressName": "哈工大",
        "addressDetail": "哈尔滨市南岗区西大直街92号",
        "latitude": 45.746519,
        "longitude": 126.631020
      }, {
        "id": 2,
        "addressName": "哈站",
        "addressDetail": "哈尔滨市南岗区铁路街1号",
        "latitude": 45.759420,
        "longitude": 126.632167
      }
    ],
    ifadd: 0,
    addMarker: [
      {
        iconPath: "../../static/image/location.png",
        id: 0,
        latitude: 23.099994,
        longitude: 113.324520,
        width: 50,
        height: 50
      }
    ],
    longitude:0,
    latitude:0,
    controls:[{
      id: 1,
      iconPath: '../../static/image/location.png',
      position: {
        left: 135,
        top: 70,
        width: 30,
        height: 30
      },
    }],
    newAddress:{
      latitude:0,
      longitude:0,
      name:"",
      detail:""
    }
  },
  /**
   * 提交新地址
   */
  commitAddress:function(){
    var that = this;
    wx.request({
      url: 'https://irecycle.gxxnr.cn/api/user/addaddress',
      data: that.data.newAddress,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  /**
   * 获取新地址详情
   */
  getAddressDetail:function(e){
    this.data.newAddress.detail = e.detail.value;
    this.setData({
      newAddress:this.data.newAddress
    })
  },
  /**
   * 获取新地址名
   */
  getAddressName:function(e){
    this.data.newAddress.name = e.detail.value;
    this.setData({
      newAddress:this.data.newAddress
    })
  },
  /**
   * 获取地图中央坐标
   */
  getlocation:function(e){
    console.log(e)
    var that = this;
    var map = wx.createMapContext('addMap');
    map.getCenterLocation({
      complete:function(res){
        console.log(res)
        that.data.newAddress.latitude = res.latitude;
        that.data.newAddress.longitude = res.longitude;
        that.setData({
          newAddress:that.data.newAddress
        })
      }
    })
  },
  /**
   * 添加地址
   */
  addAddress: function () {
    var that = this;
    
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        that.data.addMarker[0].latitude = latitude;
        that.data.addMarker[0].longitude = longitude
        that.setData({
          addMarker:that.data.addMarker,
          ifadd:1,
          longitude:longitude,
          latitude:latitude
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
})