var util = require('../../utils/util.js')

Page({
  data: {
    title: '',
    desc: '',
    date: '',
    time: '',
    addrName:'选取集结点',
    txtcolor:'#CCCCCC',
    _type: 0,
    point:{
      latitude: '',
      longitude: ''
    },
    covers: [{
      latitude: '',
      longitude: '',
      iconPath: '../../imgs/addr0.png'
    }],
    tag: {
      'UnionGo': 'UnionGo',
      'meeting': 'meeting',
      'fun' : 'fun'
    }
  },

  onShow: function() {
    var that = this;
    wx.getLocation( {
      type: 'gcj02',
      success: function( res ) {
        console.log(res)
        var m_latitude = res.latitude
        var m_longitude = res.longitude

        var m_point={
           latitude: m_latitude,
           longitude: m_longitude
         }
        var m_covers = [{
           latitude: m_latitude,
           longitude: m_longitude,
           iconPath: '../../imgs/addr0.png'
            }];
      that.setData( {covers:m_covers} );
      that.setData( {point: m_point});

    }
  });

},

  onHide: function() {
    this.setData({
      title: '',
      desc: '',
      date: '',
      time: '',
      _type: 0,
      covers: []
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

  chooseaddr: function(e) {
    var that = this;
    wx.chooseLocation({success: function( res ){
      console.log(res)
      var m_latitude = res.latitude
      var m_longitude = res.longitude
      var m_point={
          latitude: m_latitude,
          longitude: m_longitude
      }
      var m_covers = [{
         latitude: m_latitude,
         longitude: m_longitude,
         iconPath: '../../imgs/addr0.png'
          }];
        that.setData( {covers:m_covers} );
        that.setData( {point: m_point});
        var m_addrname = res.name+'('+res.address+')'
        that.setData( {addrName:m_addrname} )
        that.setData( {txtcolor:'#00DDAA'} )

    }

    });
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
        latitude: this.data.point.latitude,
        longitude: this.data.point.longitude,
        addrName: this.data.addrName
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
              delta: 2, // 回退前 delta(默认为1) 页面
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
