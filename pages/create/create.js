Page({
  data: {
    date: "",
    time: "",

    markers: [{
      latitude: 23.099994,
      longitude: 113.324520,
      name: '集合点'
    }],
    covers: [{
      latitude: 23.099794,
      longitude: 113.324520,
      // iconPath: '../images/car.png',
      rotate: 10
    }, {
      latitude: 23.099298,
      longitude: 113.324129,
      // iconPath: '../images/car.png',
      rotate: 90
    }]
  },

  onLoad: function() {
    var that = this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        // wx.openLocation({
        //   latitude: latitude,
        //   longitude: longitude,
        //   scale: 28
        // })
        that.setData({
          markers: [{
            latitude: res.latitude,
            longitude: res.longitude,
            name: '集合点'
          }]
        })
      }
    })
  },


  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },


  bindTimeChange: function(e) {
    this.setData({
      time: e.detail.value
    })
  },


  // 存储新建的UnionGo
  storeNew: function() {
    
  },

  // 取消新建UnionGo, 并回退到主页
  cancelNew: function() {
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
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
  }


})