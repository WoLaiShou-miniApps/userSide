module.exports = {
  readPro:function(){
    console.log("ahaha")
    var that = this;
    that.setData({
      read_key:that.data.read_key==0?1:0
    })
  },
  bindDateChange:function(e){
    var that = this;
    if(that.data.service==0){
      that.setData({
        date_waste:e.detail.value
      })
    }
    else if(that.data.service==1){
      that.setData({
        date_secondHand:e.detail.value
      })
    }
  },
  bindTimepicker:function(e){
    var that = this;
    if(that.data.service==0){
      that.setData({
        time_waste:e.detail.value
      })
    }
    else if(that.data.service==1){
      that.setData({
        time_secondHand:e.detail.value
      })
    }
  },
  addPhoto: function () {
    var that = this;
    console.log("adads")
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: [
        'original', 'compressed'
      ], // original 原图，compressed 压缩图，默认二者都有
      sourceType: [
        'album', 'camera'
      ], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        // success
        console.log(res)
        var tempFilePaths = res.tempFilePaths;
        var filePath = tempFilePaths[0]
        console.log(tempFilePaths)
        if(that.data.service==1){
          that.setData({secondHand_myphoto: tempFilePaths[0]});
        }
        else{
          that.setData({secondHand_imgUrl: tempFilePaths[0]});
        }
        
        /*wx.uploadFile({
          url: "https://www.jsonp.top/fileupload",
          filePath: filePath,
          name:"photo",
          complete: function (res) {
            var data = res.data
            //do something
            that.setData({
              myphoto:"https://www.jsonp.top"+res.data
            })
          }
        })*/

      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  }, //animation_textarea
  textareaFocused: function () {
    console.log("ddss")
    var that = this;
    var animation = wx.createAnimation({duration: 200, timingFunction: 'ease'})
    animation
      .top(-300 + 'rpx')
      .step({duration: 1000})
    console.log(animation)
    that.animation = animation
    setTimeout(function () {
      that.setData({
        animation_textarea: animation.export()
      })
    }, 100)

  },
  textareaBlured: function (res) {
    var that = this;
    if (that.data.service == 0) {
      that.setData({
        note_waste: res.detail.value
      })
    }
    else if (that.data.service == 1) {
      that.setData({
        note_secondHand: res.detail.value
      })
    }
    console.log("ddss")
    var animation = wx.createAnimation({duration: 200, timingFunction: 'ease'})
    animation
      .top(85 + 'rpx')
      .step({duration: 1000})
    console.log(animation)
    that.animation = animation
    setTimeout(function () {
      that.setData({
        animation_textarea: animation.export()
      })
    }, 100)
  }
}