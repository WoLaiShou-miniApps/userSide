// pages/myaddress/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: [],
    ifadd: 0,
    ifEdit:0,
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
    longitude: 0,
    latitude: 0,
    controls: [
      {
        id: 1,
        iconPath: '../../static/image/location.png',
        position: {
          left: 135,
          top: 70,
          width: 30,
          height: 30
        }
      }
    ],
    newAddress: {
      latitude: 0,
      longitude: 0,
      name: "",
      detail: ""
    },
    districtList: [
      '道里区',
      '南岗区',
      '道外区',
      '平房区',
      '松北区',
      '香坊区',
      '呼兰区',
      '阿城区',
      '双城区',
      '依兰县',
      '方正县',
      '宾县',
      '巴彦县',
      '木兰县',
      '通河县',
      '延寿县'
    ],
    show:0
  },
  /**
   * 提交新地址
   */
  edit_commitAddress: function () {
    var that = this;
    console.log(that.data.currentAddress)
    var data = {
        userid: app.globalData.userid,
        addressid: that.data.currentAddress.id,
        name: that.data.currentAddress.consignee,
        latitude: that.data.currentAddress.latitude,
        longitude: that.data.currentAddress.longitude,
        district: that.data.currentAddress.district.id,
        address: that.data.currentAddress.name,
        detailAddress: that.data.currentAddress.addressDetail,
        phone: that.data.currentAddress.tel
      }
      console.log(data)
      //先提交，然后再拉一次addressList刷新
   wx.request({
      url: 'https://irecycle.gxxnr.cn/api/user/modifyaddress.do',
      data: data,
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      method: 'POST',
      success: function (res) {
        
        if (res.statusCode == 200)
          that.setData({
            ifEdit: 0
          })
        wx.request({
          url: 'https://irecycle.gxxnr.cn/api/user/getuseraddress.do',
          data: {
            userid: app.globalData.userid
          },
          method: 'GET',
          success: function (res) {
            console.log(res)
            that.setData({addressList: res.data})
          }
        })
      },
      complete: function () {
        // complete
        that.setData({ifadd: 0})
      }
    })
  },
  /**
   * 获取区域
   */
  edit_getDistrict: function (e) {
    console.log(e.detail)
    this.data.currentAddress.district.id = e.detail.value - 1 + 2;
    this.setData({
      currentAddress: this.data.currentAddress,
    })
  },
  /**
   * 获取联系人姓名  district
   */
  edit_getName: function (e) {
    this.data.currentAddress.consignee = e.detail.value;
    this.setData({currentAddress: this.data.currentAddress})
  },
  /**
   * 获取；联系人电话
   */
  edit_getPhone: function (e) {
    this.data.currentAddress.tel = e.detail.value;
    this.setData({currentAddress: this.data.currentAddress})
  },
  /**
   * 获取新地址详情
   */
  edit_getAddressDetail: function (e) {
    this.data.currentAddress.addressDetail = e.detail.value;
    this.setData({currentAddress: this.data.currentAddress})
  },
  /**
   * 获取新地址名
   */
  edit_getAddressName: function (e) {
    this.data.currentAddress.name = e.detail.value;
    this.setData({currentAddress: this.data.currentAddress})
  },
  /**
   * 获取地图中央坐标
   */
  edit_getlocation: function (e) {
    console.log(e)
    var that = this;
    var map = wx.createMapContext('addMap');
    map.getCenterLocation({
      complete: function (res) {
        console.log(res)
        that.data.currentAddress.latitude = res.latitude;
        that.data.currentAddress.longitude = res.longitude;
        that.setData({currentAddress: that.data.currentAddress})
      }
    })
  },



  /**
   * 修改地址
   */
  editAddress:function(e){
    var that = this;
    var index = e.currentTarget.dataset.index
    if(that.data.ifEdit==0){
      that.setData({
        oldList:that.data.addressList
      })
      var newList = []
      newList.push(that.data.addressList[index])
      that.setData({
        addressList:newList
      })
    }
    else{
      that.setData({
        addressList:that.data.oldList
      })
    }
    that.setData({
      ifEdit:that.data.ifEdit==1?0:1
    })
    
    
    
    
    that.setData({
      currentAddress:that.data.addressList[index],
      
    })
  },
  /**
   * 提交新地址
   */
  commitAddress: function () {
    var that = this;
    console.log(that.data.newAddress)
    wx.request({
      url: 'https://irecycle.gxxnr.cn/api/user/addaddress.do',
      data: {
        userid: app.globalData.userid,
        name: that.data.newAddress.personname,
        latitude: that.data.newAddress.latitude,
        longitude: that.data.newAddress.longitude,
        district: that.data.newAddress.district,
        address: that.data.newAddress.name,
        detailAddress: that.data.newAddress.detail,
        phone: that.data.newAddress.phone
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
        wx.request({
          url: 'https://irecycle.gxxnr.cn/api/user/getuseraddress.do',
          data: {
            userid: app.globalData.userid
          },
          method: 'GET',
          success: function (res) {
            console.log(res)
            that.setData({addressList: res.data})
          }
        })
      },
      complete: function () {
        // complete
        that.setData({ifadd: 0})
      }
    })
  },
  /**
   * 获取区域
   */
  getDistrict: function (e) {
    console.log(e.detail)
    this.data.newAddress.district = e.detail.value - 1 + 2;
    this.setData({
      newAddress: this.data.newAddress,
      pick_value: e.detail.value - 1 + 1
    })
  },
  /**
   * 获取联系人姓名  district
   */
  getName: function (e) {
    this.data.newAddress.personname = e.detail.value;
    this.setData({newAddress: this.data.newAddress})
  },
  /**
   * 获取；联系人电话
   */
  getPhone: function (e) {
    this.data.newAddress.phone = e.detail.value;
    this.setData({newAddress: this.data.newAddress})
  },
  /**
   * 获取新地址详情
   */
  getAddressDetail: function (e) {
    this.data.newAddress.detail = e.detail.value;
    this.setData({newAddress: this.data.newAddress})
  },
  /**
   * 获取新地址名
   */
  getAddressName: function (e) {
    this.data.newAddress.name = e.detail.value;
    this.setData({newAddress: this.data.newAddress})
  },
  /**
   * 获取地图中央坐标
   */
  getlocation: function (e) {
    console.log(e)
    var that = this;
    var map = wx.createMapContext('addMap');
    map.getCenterLocation({
      complete: function (res) {
        console.log(res)
        that.data.newAddress.latitude = res.latitude;
        that.data.newAddress.longitude = res.longitude;
        that.setData({newAddress: that.data.newAddress})
      }
    })
  },
  /**
   * 添加地址
   */
  addAddress: function () {
    var that = this;
    wx.showLoading({title: '定位中...', mask: true})
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        that.data.addMarker[0].latitude = latitude;
        that.data.addMarker[0].longitude = longitude
        that.setData({addMarker: that.data.addMarker, ifadd: 1, longitude: longitude, latitude: latitude})
        wx.hideLoading()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showLoading({title: '加载中...', mask: true})
    wx.request({
      url: 'https://irecycle.gxxnr.cn/api/user/getuseraddress.do',
      data: {
        userid: app.globalData.userid
      },
      method: 'GET',
      success: function (res) {
        wx.hideLoading()
        console.log(res)
        that.setData({addressList: res.data,show:1})
      },
      complete:function(){
        
      }
    })

  },

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