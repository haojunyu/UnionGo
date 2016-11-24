Page ({
  data: {
    id: '1',
    title: '来操场打球',
    desc: '',
    date: '2016-10-18',
    time: '11:11',
    _type: 0,
    markers: [{
      latitude: 23.099994,
      longitude: 113.324520,
      name: '集合点'
    }]
  },


  onLoad: function(option){
    console.log(option.id)
    var id = option.id;
    var category = option.category
    var that = this;
    var sets = wx.getStorageSync(category)
    var activity = sets[id]

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
        }]
    })    
  },

  doSign: function() {
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