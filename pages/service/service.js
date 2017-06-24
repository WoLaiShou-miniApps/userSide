// pages/service/service.js

var get_function = require('../../components/test/test1.js')
var secondHand = require('../../components/secondHand/index.js')
var banjia = require('../../components/banjia/index.js')
const qiniuUploader = require("../../utils/qiniu_sdk/qiniuUploader.js");
var mask = require('../../components/mask/index.js')
var app = getApp()
Page({
  data: {
    service: 0,
    goods_type: [],
    goods: [],
    price_range: ["0~10斤", "10~50斤", "50~100斤"],
    selected_type: 0,
    selected_goods: -1,
    image: "",
    Y_Dvalue:0,
    time_waste:'08:00',
    time_secondHand:'08:00',
    date_waste:'2017-05-01',
    date_secondHand:'2017-05-01',
    banjia_key:0,
    address_waste:-1,
    address_secondHand:-1,
    pick_value:[-1,-1,-1],
    proList:{},
    proconfirm:false,
    origin:0,
    read_key:0,
    animationData0:{},
    userGuid:0
  },
  URL:'http://easy-mock.com/mock/59070ef87a878d73716e3aa7/wx-irecycle/',
  closeGuid:function(){
    var that = this;
    that.setData({
      animationData0:{},
      userGuid:0
    })
  },
  maskClick: mask.maskClick,
  readPro:secondHand.readPro,
  bindDateChange:secondHand.bindDateChange,
  bindTimepicker:secondHand.bindTimepicker,
  banjia_formSubmit: banjia.formSubmit,
  banjia_makePhoneCall:banjia.makePhoneCall,
  secondHand_textareaBlured:secondHand.textareaBlured,
  secondHand_textareaFocused:secondHand.textareaFocused,
  secondHand_addPhoto:secondHand.addPhoto,
  getAddress:function(e){
    //console.log(e)
    var value = e.detail.value;
    if(this.data.service==0){
      this.setData({
        address_waste:this.data.addressList[e.detail.value].id
      })
    }
    if(this.data.service==1){
      this.setData({
        address_secondHand:this.data.addressList[e.detail.value].id
      })
    }
    this.data.pick_value[this.data.service] = value
    this.setData({
      pick_value:this.data.pick_value
    })
  },
  switchtab: function (e) {
    var that = this;
    this.setData({
      selected_type: e.target.dataset.index,
      selected_goods: -1
    })
    //animationData_left_polish animation.height(60+'rpx').step()
    
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease',
    })
    animation.height(10+'rpx').top(35+ e.target.dataset.index*80+'rpx').step({ duration: 200 })
    //console.log(animation)
    that.setData({
      animationData_left_polish: animation.export()
    })
    setTimeout(function(){
      animation.height(60+'rpx').step()
    that.setData({
      animationData_left_polish: animation.export()
    })
    },200)
  },
  selectgoods: function (e) {
    var sub = e.currentTarget.dataset.index
    if (sub == this.data.selected_goods)
      sub = -1
    this.setData({
      selected_goods: sub
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



  orderSubmit:function(){
    if (this.data.service == 1 && this.data.proconfirm==0)
    {
      wx.showToast({
        title: '请勾选同意协议',
        image:'../../static/image/tip.png',
        duration:1000
      })
    }
    else
    {
    var that = this
    var url = that.data.service == 0 ?"https://irecycle.gxxnr.cn/api/user/postorder.do" :"https://irecycle.gxxnr.cn/api/user/postsecond.do"
    var filePath = that.data.service == 0 ? that.data.secondHand_imgUrl:that.data.secondHand_myphoto
    var addressid = that.data.service == 0 ? that.data.address_waste : that.data.address_secondHand
    var date = that.data.service == 0 ? that.data.date_waste : that.data.date_secondHand
    var time = that.data.service == 0 ? that.data.time_waste : that.data.time_secondHand
    var msg = that.data.service == 0 ? that.data.note_waste : that.data.note_secondHand
    if(!filePath || !addressid || !date || !time || !msg){
      wx.showToast({
        title:'请认真填写~',
        image:'../../static/image/tip.png',
        duration:2000
      })
    }
    else{
      wx.uploadFile({
          url: url,
          filePath: filePath,
          name:"file",
          formData:{
            userid: app.globalData.userid,
            addressid:addressid,
            date: date,
            time: time,
            msg: msg
          },
        success:function(res){
          if (res.data)
            setTimeout(function () {
              wx.hideLoading()
              wx.showToast({
                title: '上传成功',
                duration: 1000,
                icon:"success"
              })
              that.setData({
                date_waste:"2017-05-01",
                date_secondHand:"2017-05-01",
                time_waste:"08:00",
                time_secondHand:"08:00",
                note_waste:"",
                note_secondHand:"",
                secondHand_myphoto:"",
                secondHand_imgUrl:"",
                proconfirm: false
              })
            }, 500)
        },
        complete:function(){
          wx.showLoading({
            title: '上传中',
            mask:true
          })
        }     
        })
    }
    
    //console.log("已发送")
    }

  },


  agreepro: function (res) {
    if (res.detail.value.length>0)
      this.setData({
        proconfirm:true
      })
    else
      this.setData({
        proconfirm: false
      })
  },
  onLoad:function(){
    var that = this
    var date = new Date();
    console.log(date)
    var today = date.getFullYear() + '-' + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
    that.setData({
      today:today,
      date_waste: today,
      date_secondHand: today
    })
    console.log(today)
    wx.login({
      success: function (res) {
        //console.log("已获取到登陆态")
        //console.log(res.code)
        wx.getUserInfo({
          success: function (res) {
            //console.log("已获取到微信账户个人信息")
            app.info = res.userInfo
          }
        })
        wx.request({
          url: 'https://irecycle.gxxnr.cn/api/user/login.do',
          data: {
            code: res.code
          },
          method: 'GET',
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res)
            if (res.data.errCode == 0) {
              app.globalData.userid = res.data.data.id
              //用户积分
              app.globalData.credit = res.data.data.credit 
              console.log(res.data.data.credit)
              app.globalData.origin = 1
              //console.log("获取userid:" + app.globalData.userid)
              that.setData({
                origin: app.globalData.origin
              })
              wx.request({
                url: 'https://irecycle.gxxnr.cn/api/user/getuseraddress.do',
                data: {
                  userid: res.data.data.id
                },
                method: 'GET',
                success: function (res) {
                  //console.log(res)
                  var myAddressList = []
                  for (var i = 0; i < res.data.length; i++) {
                    myAddressList.push(res.data[i].name)
                  }
                  that.setData({ addressList: res.data, myAddressList: myAddressList })
                  app.globalData.addressList = res.data
                }
              })
            }
            else {
              app.globalData.origin = 0
              app.globalData.openid = res.data.data.openid
              /*wx.reLaunch({
                url: 'pages/info/info',
              })*/
            }
          }
        })

      }
    })
    wx.request({
      url: 'https://irecycle.gxxnr.cn/rules/getsecondpro.do',
      data: {
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        //console.log('协议')
        //console.log(res)
        that.setData({
          proList: res.data.proList
        })
      }
    })
    wx.request({
      url: 'https://irecycle.gxxnr.cn/rules/getTel.do',
      method:'GET',
      data:{},
      success:function(res){
        console.log(res)
        if (res.data.proRules){
          app.globalData.tel = res.data.proRules.data;
          that.setData({
            tel: app.globalData.tel
          })
        }
      }
    })
  },



  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    this.setData({
      proconfirm: false
    })
    var that = this;
    if (app.globalData.userid!=-1)
      wx.request({
            url: 'https://irecycle.gxxnr.cn/api/user/getuseraddress.do',
            data: {
              userid: app.globalData.userid
            },
            method: 'GET',
            success: function (res) {
              //console.log(res)
              var myAddressList=[]
              for(var i = 0;i<res.data.length;i++){
                myAddressList.push(res.data[i].name)
              }
              that.setData({addressList: res.data,myAddressList:myAddressList})
              app.globalData.addressList = res.data
            }
          })
  },
  onHide: function () {
    // 页面隐藏
    this.setData({
      banjia_key:0
    })
  },
  onUnload: function () {
    // 页面关闭
  },
  onPullDownRefresh:function(){
     var that = this;
     var animation = wx.createAnimation({
      duration: 300,
        timingFunction: 'ease',
    })

    this.animation = animation

    animation.opacity(0).step()

    this.setData({
      animationData0:animation.export()
    })
    setTimeout(function(){
      that.setData({
      userGuid:1
    })
    wx.stopPullDownRefresh()
    },300)
    

  }
})


