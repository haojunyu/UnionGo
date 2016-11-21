//app.js
App({
  data: {
    raisedActivities: [{
      id: '1',
      title: '来操场打球',
      desc: '',
      date: '2016-10-18',
      time: '11:11',
      location: {
        latitude: 23.099994,
        longitude: 113.324520
      },
      _type: 0
    }, {
      id: '2',
      title: '去客服楼开会',
      desc: '',
      date: '2016-10-18',
      time: '11:11',
      location: {
        latitude: 23.099994,
        longitude: 113.324520
      },
      _type: 0
    }],
    attendedActivites: [{
      id: '1',
      title: '参加新员工培训啦',
      desc: '',
      date: '2016-10-18',
      time: '11:11',
      location: {
        latitude: 23.099994,
        longitude: 113.324520
      },
      _type: 1
    }, {
      id: '2',
      title: '集体去要饭呢',
      desc: '',
      date: '2016-10-18',
      time: '11:11',
      location: {
        latitude: 23.099994,
        longitude: 113.324520
      },
      _type: 1
    }],

    moreActivities: [{
      id: '1',
      title: '参观上海博物馆',
      desc: '',
      date: '2016-10-18',
      time: '11:11',
      location: {
        latitude: 23.099994,
        longitude: 113.324520
      },
      _type: 2
    }, {
      id: '2',
      title: '请到客服楼集合，领取年终奖啦',
      desc: '',
      date: '2016-10-18',
      time: '11:11',
      location: {
        latitude: 23.099994,
        longitude: 113.324520
      },
      _type: 1
    }]
  },

  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  }
})