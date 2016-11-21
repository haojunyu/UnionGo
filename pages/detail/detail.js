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
    var that = this;
    wx.getStorage({
        key: id,
        success: function(res) {
            var activity = res.data
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
  }



})