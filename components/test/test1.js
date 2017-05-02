


function showmap(){
    this.mapCtx = wx.createMapContext('myMap')
    this.mapCtx.getCenterLocation({
      success: function(res){
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })
    this.mapCtx.moveToLocation()
    console.log(this.mapCtx)
}

module.exports.showmap = showmap