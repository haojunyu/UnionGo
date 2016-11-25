var util = require('../../utils/util.js')

Page({
  data: {
    title: '',
    desc: '',
    date: '',
    time: '',
    _type: 0,
    markers: [{
      latitude: 31.230416,
      longitude: 121.473701,
      name: '集合点'
    }],
    tag: {
      'UnionGo': 'UnionGo',
      'meeting': 'meeting',
      'fun' : 'fun'
    }
  },

  onShow: function() {
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

  onHide: function() {
    this.setData({
      title: '',
      desc: '',
      date: '',
      time: '',
      _type: 0,
      markers: [{
        latitude: 31.230416,
        longitude: 121.473701,
        name: '集合点'
      }]
    })
  },

  bindTitleChange: function(e) {
    this.setData({
      title: e.detail.value
    })
  },

  bindDescChange: function(e) {
    this.setData({
      desc: e.detail.value
    })
    console.log(this.data.desc)
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
    console.log("store new unionGo")
    
    var nextId = util.nextId();

    var newUnionGo = {
      id: nextId,
      title: this.data.title,
      desc: this.data.desc,
      date: this.data.date,
      time: this.data.time,
      location: {
        latitude: this.data.markers[0].latitude,
        longitude: this.data.markers[0].longitude
      },
      _type: 0
    }

    wx.getStorage({
      key: 'raised',
      success: function(res){
        var raised = res.data
        raised[nextId] = newUnionGo
        wx.setStorageSync('raised', raised)
        wx.showToast({
          title: '创建成功',
          icon: 'success',
          duration: 2000, 
          complete: function() {
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
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },

  // 取消新建UnionGo, 并回退到主页
  cancelNew: function() {
    console.log(getCurrentPages())
    wx.navigateBack({
      delta: 0, // 回退前 delta(默认为1) 页面
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