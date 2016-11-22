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
    var activity
    for (let i=0; i<sets.length; ++i) {
      if (sets[i].id == id) {
        activity = sets[i]
        break
      }
    }

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
  }
})