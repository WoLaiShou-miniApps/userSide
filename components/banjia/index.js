module.exports={
    makePhoneCall:function(){
        wx.makePhoneCall({
          phoneNumber: '0451-82638864',
          success: function(res) {
            // success
          }
        })
    }
}