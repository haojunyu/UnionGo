var util = require('../../utils/util.js')

var app = getApp()


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
    tags: [
      
    ]
  },

  onShow: function() {
    
    this.setData({
      tags : wx.getStorageSync('tags')
    })

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

  checkboxChange: function(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    this.setData({
      tag: e.detail.value
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

    var tagsStr = this.data.tag.join("#");
    // console.log(tagsStr)

    var newUnionGo = {
      title: this.data.title,
      desc: this.data.desc,
      date: this.data.date,
      time: this.data.time,
      latitude: this.data.point.latitude,
      longitude: this.data.point.longitude,
      position: this.data.addrName,
      tags: tagsStr
    }

    console.log(newUnionGo)

    wx.request({
      url: 'http://172.18.51.8:8080/acp/addAct',
      data: {
        userId: app.data.userId,
        title: this.data.title,
        desc: this.data.desc,
        date: this.data.date,
        time: this.data.time,
        latitude: this.data.point.latitude,
        longitude: this.data.point.longitude,
        position: this.data.addrName,
        tags: tagsStr
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {"content-type": "application/x-www-form-urlencoded"}, // 设置请求的 header
      success: function(res){
        wx.request({
          url: 'http://172.18.51.8:8080/acp/acts?userId='+app.data.userId,
          header: {
            'content-type': 'application/json'
          },
          success: function(res){
            console.log(res.data)
            wx.setStorageSync("raised", res.data.raisedActivities)
            wx.setStorageSync("attended", res.data.attendedActivities)
            wx.setStorageSync("more", res.data.moreActivities)
          }
        })

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
