//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    
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
      id: '3',
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
      id: '4',
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
      id: '5',
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
      id: '6',
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

  storeDemo: function() {
    for (let i = 0; i < this.data.raisedActivities.length; ++i) {
      wx.setStorageSync(this.data.raisedActivities[i].id, this.data.raisedActivities[i])
    }
    for (let i = 0; i < this.data.attendedActivites.length; ++i) {
      wx.setStorageSync(this.data.attendedActivites[i].id, this.data.attendedActivites[i])
    }
    for (let i = 0; i < this.data.moreActivities.length; ++i) {
      wx.setStorageSync(this.data.moreActivities[i].id, this.data.moreActivities[i])
    }
  },


  onShow: function () {
    this.storeDemo()
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },

  viewDetail: function(e) {
    var id = e.target.dataset.id;
    wx.navigateTo({
      url: '../../pages/detail/detail?id=' + id,
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
