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
    // console.log(activity.tag)
    that.setData({
        id: activity.id,
        title: activity.title,
        desc: activity.desc,
        date: activity.date,
        time: activity.time,
        _type: activity._type,
        markers: [{
            latitude: activity.location.latitude,
            longitude: activity.location.longitude,
            name: '集合点'
        }],
        signed: activity.signed,
        tag: activity.tag
    })    
  },

  doSign: function(e) {
      this.setData({
        signed: 1
      })
      var category = e.target.dataset.category
      var _set = wx.getStorageSync(category)
    
      var activity = {
        id: this.data.id,
        title: this.data.title,
        desc: this.data.desc,
        date: this.data.date,
        time: this.data.time,
        _type: this.data._type,
        location: {
            latitude: this.data.markers[0].latitude,
            longitude: this.data.markers[0].longitude
        },
        signed: this.data.signed,
        tag: this.data.tag
      }
      _set[this.data.id] = activity
      wx.setStorageSync(category, _set)

      wx.navigateBack({
        delta: 2, // 回退前 delta(默认为1) 页面
        success: function(res){
          wx.showToast({
             title: '签到成功',
              icon: 'success',
              duration: 2000
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

  doAttend: function() {
      this.setData({
        _type: 1
      })
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
        _type: this.data._type,
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