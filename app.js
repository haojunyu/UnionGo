//app.js
App({
  data: {
    raisedActivities: [{
      id: '1',
      title: '银联篮球队社团活动',
      desc: '银联操场打球，请有意向的小伙伴准时出席',
      date: '2016-10-18',
      time: '11:11',
      location: {
        latitude: 31.230416,
        longitude: 121.473701
      },
      _type: 0
    }, {
      id: '2',
      title: '个性化团队例会',
      desc: '个性化团队例会地点改为研发北楼1200，请准时参加',
      date: '2016-10-18',
      time: '11:11',
      location: {
        latitude: 31.230416,
        longitude: 121.473701
      },
      _type: 0
    }],

    attendedActivites: [{
      id: '3',
      title: '参加银联扬帆第26期新员工培训',
      desc: '请各位新员工与周末晚6点前到培训中心报道，领取房卡，办理入住手续',
      date: '2016-10-18',
      time: '11:11',
      location: {
        latitude: 31.230416,
        longitude: 121.473701
      },
      _type: 1
    }, {
      id: '4',
      title: '银联消防演练活动',
      desc: '请大家听到铃声之后，按照要求走消防通道，并到研发大楼外指定场地集合',
      date: '2016-10-18',
      time: '11:11',
      location: {
        latitude: 31.230416,
        longitude: 121.473701
      },
      _type: 1
    }],

    moreActivities: [{
      id: '5',
      title: '参观上海博物馆',
      desc: '让你大开眼界的时候到了，参与银联上海博物馆参观活动，来就送iPhone 7',
      date: '2016-10-18',
      time: '11:11',
      location: {
        latitude: 31.230416,
        longitude: 121.473701
      },
      _type: 2
    }, 
    {
      id: '6',
      title: '医疗保险集中咨询',
      desc: '泰康人寿和人保将于下周一进行医保方案集中咨询解答，请关注的同事到指定地点进行问询',
      date: '2016-10-18',
      time: '11:11',
      location: {
        latitude: 31.230416,
        longitude: 121.473701
      },
      _type: 2
    },
    {
      id: '7',
      title: '到综合室领取新年大礼包',
      desc: '礼包金额100万',
      date: '2016-10-18',
      time: '11:11',
      location: {
        latitude: 31.230416,
        longitude: 121.473701
      },
      _type: 2
    },
    {
      id: '8',
      title: '请有兴趣的同事参加银联讲坛活动',
      desc: '银联讲坛活动将于最近开展',
      date: '2016-10-18',
      time: '11:11',
      location: {
        latitude: 31.230416,
        longitude: 121.473701
      },
      _type: 2
    }]
  },

  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())

    wx.setStorageSync("raised", this.data.raisedActivities)
    wx.setStorageSync("attended", this.data.attendedActivites)
    wx.setStorageSync("more", this.data.moreActivities)
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