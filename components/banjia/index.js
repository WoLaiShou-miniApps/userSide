module.exports={
    formSubmit:function(e){
      var that = this;
      console.log(e.detail.value);
      var phone = e.detail.value.phone
      if(!phone){
        wx.showToast({
          title: '请输入手机号码',
          image:'../../static/image/tip.png',
          duration:1000
        })
      }
      else{
        /**
         * 发起一次请求
         */
         that.setData({
           banjia_key:1
         })
      }
    },
    makePhoneCall:function(){
        wx.makePhoneCall({
          phoneNumber: '0451-82638864',
          success: function(res) {
            // success
          }
        })
    }
}