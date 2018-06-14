// pages/myaddress/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentAddress:{},
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
    getlongitude: 45.8,
    getlatitude: 126.53,
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
      latitude: 126.53,
      longitude: 45.8,
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
    delete_addressid:-1,
    show:0
  },
  /**
   * 提交修改后的地址
   */
  edit_commitAddress: function () {
    var that = this;
    //console.log(that.data.currentAddress)
    if (that.data.currentAddress.consignee && that.data.currentAddress.district.id && that.data.currentAddress.addressDetail && that.data.currentAddress.tel)
    {
      if (that.data.currentAddress.addressDetail.length > 10)
      {
        var addressname = that.data.currentAddress.district.districtName + "-" + that.data.currentAddress.addressDetail.substring(0, 10) + "···  " + that.data.currentAddress.consignee;
      }
      else
      {
        var addressname = that.data.currentAddress.district.districtName + "-" + that.data.currentAddress.addressDetail + " " + that.data.currentAddress.consignee;
      }


      var data = {
        userid: app.globalData.userid,
        addressid: that.data.currentAddress.id,
        name: that.data.currentAddress.consignee,
        latitude: that.data.currentAddress.latitude,
        longitude: that.data.currentAddress.longitude,
        district: that.data.currentAddress.district.id,
        address: addressname,
        detailAddress: that.data.currentAddress.addressDetail,
        phone: that.data.currentAddress.tel
      }
      //console.log(data)
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
              //console.log(res)
              that.setData({ addressList: res.data })
            }
          })
        },
        complete: function () {
          // complete
          that.setData({ ifadd: 0 })
        }
      })
    }
    else {
      wx.showToast({
        title: '请完善地址信息',
        image: '../../static/image/tip.png',
        duration: 1000,
      })
    }

  },
  /**
   * 获取区域
   */
  edit_getDistrict: function (e) {
    //console.log(e.detail)
    this.data.currentAddress.district.id = e.detail.value - 1 + 2;
    this.data.currentAddress.district.districtName = this.data.districtList[e.detail.value]
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
   * 获取地图中央坐标
   */
  edit_getlocation: function (e) {
    
    var that = this;
    //console.log(that.data.currentAddress)
    var map = wx.createMapContext('addMap');
    map.getCenterLocation({
      complete: function (res) {
        //console.log(res)
        that.data.currentAddress.latitude = res.latitude;
        that.data.currentAddress.longitude = res.longitude;
        that.setData({currentAddress: that.data.currentAddress})
      }
    })
  },
  /**
   * 地图重定位
   */
  relocation: function () {
    var that = this;
    wx.showLoading({ title: '定位中...', mask: true })
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.hideLoading()
        var thecurrentAddress = that.data.currentAddress
        thecurrentAddress.latitude = latitude;
        thecurrentAddress.longitude = longitude;
        that.setData({
          currentAddress: thecurrentAddress,
          getlatitude : latitude,
          getlongitude : longitude
        })
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
      that.data.addMarker[0].latitude = that.data.addressList[index].latitude;
      that.data.addMarker[0].longitude = that.data.addressList[index].longitude;
      that.setData({
        addMarker: that.data.addMarker, 
        ifEdit: 1, 
        getlongitude : that.data.addressList[index].longitude,
        getlatitude: that.data.addressList[index].latitude
      })
      that.setData({
        oldList:that.data.addressList
      })
      var newList = []
      newList.push(that.data.addressList[index])
      //console.log(newList)
      that.setData({
        addressList:newList,
        currentAddress: newList[0]
      })
    }
    else{
      that.setData({
        ifEdit: 0,
        addressList:that.data.oldList,
        currentAddress: that.data.oldList[0]
      })
    }
  },
  /**
   * 删除地址
   */

  judgedelete:function(e){          //弹出确认删除窗口
    this.setData({
      delete_addressid: this.data.addressList[e.currentTarget.dataset.index].id
    })
    wx.vibrateShort()
  },
  notdelete: function (e) {         //取消删除操作
    this.setData({
      delete_addressid: -1
    })
  },
  deleteAddress:function(e){         //确认删除
    var that =this
    //console.log(that.data.addressList[e.currentTarget.dataset.index])
    wx.request({
      url: 'https://irecycle.gxxnr.cn/api/user/deleteaddress.do',
      data: {
        addressid: that.data.delete_addressid,
        userid: app.globalData.userid
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function (res) {
        //console.log('删除订单',res)
        that.setData({ delete_addressid: -1, ifEdit:0 })
        wx.request({
          url: 'https://irecycle.gxxnr.cn/api/user/getuseraddress.do',
          data: {
            userid: app.globalData.userid
          },
          method: 'GET',
          success: function (res) {
            //console.log(res)
            that.setData({ addressList: res.data })
          }
        })
        setTimeout(function () {
          wx.hideLoading()
          setTimeout(function () {
            wx.showToast({
              title: '删除完毕',
              mask:'true',
            })
          }, 500)
        }, 500)

      },
      complete: function (res) {
        wx.showLoading({
          title: '正在删除该地址信息',
          mark:true
        })
      }
    })

  },
  /**
   * 提交新地址
   */
  commitAddress: function () {
    var that = this;
    //console.log(that.data.newAddress)
    if (that.data.newAddress.personname && that.data.newAddress.latitude && that.data.newAddress.longitude && that.data.newAddress.district && that.data.newAddress.detail && that.data.newAddress.phone){
      if (that.data.newAddress.detail.length>10)
      {
        var addressname = that.data.districtList[that.data.newAddress.district - 1] + "-" + that.data.newAddress.detail.substring(0, 10) + "···  " + that.data.newAddress.personname;
      }
      else
      {
        var addressname = that.data.districtList[that.data.newAddress.district - 1] + "-" + that.data.newAddress.detail + " " + that.data.newAddress.personname;
      }

      
      wx.request({
        url: 'https://irecycle.gxxnr.cn/api/user/addaddress.do',
        data: {
          userid: app.globalData.userid,
          name: that.data.newAddress.personname,
          latitude: that.data.newAddress.latitude,
          longitude: that.data.newAddress.longitude,
          district: that.data.newAddress.district,
          address: addressname,
          detailAddress: that.data.newAddress.detail,
          phone: that.data.newAddress.phone
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        method: 'POST',
        success: function (res) {
          //console.log(res)
          that.setData({ pick_value: -1 })
          wx.request({
            url: 'https://irecycle.gxxnr.cn/api/user/getuseraddress.do',
            data: {
              userid: app.globalData.userid
            },
            method: 'GET',
            success: function (res) {
              //console.log('ass', res)
              that.setData({ addressList: res.data })
            }
          })
        },
        complete: function () {
          // complete
          that.setData({ ifadd: 0 })
        }
      })
    }
    else{
      wx.showToast({
        title: '请完善地址信息',
      image:'../../static/image/tip.png',
      duration:1000,
      })
    }
    
  },
  /**
   * 获取区域
   */
  getDistrict: function (e) {
    //console.log(e.detail)
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
   * 获取地图中央坐标
   */
  getlocation: function (e) {
    //console.log(e)
    var that = this;
    var map = wx.createMapContext('addMap');
    map.getCenterLocation({
      complete: function (res) {
        //console.log(res)
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
        var thenewaddress = { latitude: latitude, longitude: longitude,name: "",detail: ""}
        that.setData({
          newAddress: thenewaddress
        })
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
        //console.log(app.globalData.userid,res)
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