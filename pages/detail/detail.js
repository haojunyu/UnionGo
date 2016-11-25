var app = getApp()

Page ({
  data: {
    // id: '1',
    // title: '来操场打球',
    // desc: '',
    // date: '2016-10-18',
    // time: '11:11',
    // _type: 0,
    // markers: [{
    //   latitude: 23.099994,
    //   longitude: 113.324520,
    //   name: '集合点'
    // }]
  },


  onLoad: function(option){
    console.log(option.id)
    var id = option.id;
    var category = option.category
    var that = this;
    var sets = wx.getStorageSync(category)
    var activity = sets[id]

    // 根据activityId获取tags
    wx.request({
      url: 'http://172.18.51.8:8080/acp/actTags?actId='+id,
      header: {
        'content-type': 'application/json'
      },
      success: function(res){
        console.log(res.data)
        that.setData({
            id: activity.id,
            title: activity.title,
            desc: activity.desc,
            date: activity.date,
            time: activity.time,
            type: activity.type,
            markers: [{
                latitude: activity.location.latitude,
                longitude: activity.location.longitude,
                name: '集合点'
            }],
            signed: activity.signed,
            tag: res.data
        })
      }
    })


  },

  doSign: function(e) {
      // 更新数据库
      var activityId = this.data.id
      var userId = app.data.userId
      console.log('kk'+userId+' '+ activityId)
      wx.request({
        url: 'http://172.18.51.8:8080/acp/signAct',
        data: {
          userId: userId,
          actId: activityId
        },
        header: {
          'content-type': 'application/json'
        },
        success: function(res){
          wx.showToast({
            title: '签到成功' ,
            icon: 'success',
            duration: 1000
          })
        }
      })

      // 更新缓存
      var category = e.target.dataset.category
      var set = wx.getStorageSync(category)

      var activity = {
        id: this.data.id,
        title: this.data.title,
        desc: this.data.desc,
        date: this.data.date,
        time: this.data.time,
        type: this.data.type,
        location: {
            latitude: this.data.markers[0].latitude,
            longitude: this.data.markers[0].longitude
        },
        signed: 1,
        tag: this.data.tag
      }
      console.log('00'+activity)
      set[this.data.id] = activity
      wx.setStorageSync(category, set)

      wx.navigateBack({
        delta: 2, // 回退前 delta(默认为1) 页面
        success: function(res){
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
  },

  doAttend: function(e) {
      var activityId = e.target.dataset.id
      var userId = app.data.userId
      console.log('xx'+activityId+' '+ userId)
      // 更新数据库
      wx.request({
        url: 'http://172.18.51.8:8080/acp/attendAct',
        data: {
          userId: userId,
          actId: activityId
        },
        header: {
          'content-type': 'application/json'
        },
        success: function(res){
          // 刷新缓存
        }
      })

      console.log('更新缓存')
      var more = wx.getStorageSync('more')
      delete more[this.data.id]
      wx.setStorageSync('more', more)
      console.log(more)

      var attended = wx.getStorageSync('attended')
      var activity = {
        id: this.data.id,
        title: this.data.title,
        desc: this.data.desc,
        date: this.data.date,
        time: this.data.time,
        type: this.data.type,
        location: {
            latitude: this.data.markers[0].latitude,
            longitude: this.data.markers[0].longitude
        },
        signed: this.data.signed,
        tag: this.data.tag
      }
      attended[this.data.id] = activity
      wx.setStorageSync('attended', attended)

      wx.navigateBack({
        delta: 2, // 回退前 delta(默认为1) 页面
      })
  }

})
