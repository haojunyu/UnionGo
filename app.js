//app.js
var util = require('./utils/util.js')
var interval  // 定时器
var duration = 200  // 提前或迟到时间（分）
var distance = 100000  // 距离签到点距离（米）

App({
  data: {
    tags:[],
    userId: 1,
    //raisedActivities: {},
    //attendedActivities: {},
    //moreActivities: {},
  },
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var that = this
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())

    // 获取标签tags
    wx.request({
      url: 'http://172.18.51.8:8080/acp/tags',
      success: function(res){
        console.log(res.data)
        wx.setStorageSync("tags", res.data)
      }
    })

    wx.setStorageSync("raise", this.data.raisedActivity)

    // 获取三类活动到缓存中
    wx.request({
      url: 'http://172.18.51.8:8080/acp/acts?userId='+this.data.userId,
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




    interval = setInterval(function() {
      // 加载参加的活动
      var attActs = wx.getStorageSync('attended')
      console.log(attActs)
      //console.log(attActs)
      for(let key in attActs){
        // 判断每一个参加的活动是否符合签到：未签+时间+位置
        console.log('signed:'+attActs[key].signed)
        if(attActs[key].signed != 1){

          //第一个条件：未签
          //console.log(attActs[key].date + " " + attActs[key].time)
          //console.log(Date.now())
          //console.log(Date.parse('2016/11/25 11:11'))
          //console.log(attActs[key].date.replace(/-/g,"/") + " " + attActs[key].time + ':00')
          var dur = (Date.now()-Date.parse(attActs[key].date.replace(/-/g,"/") + " " + attActs[key].time))/60000


          if(Math.abs(dur) < duration) {
            //第二个条件：时间在duration分钟内
            var latitude = null
            var longitude = null
            var accuracy = null
            wx.getLocation({
              type: 'gcj02',
              success: function(res){
                console.log(res)
                latitude = res.latitude
                longitude = res.longitude

                console.log('lat1:'+latitude+';lon1:'+longitude)
                console.log('lat2:'+attActs[key].location.latitude+';lon2:'+attActs[key].location.longitude)
                var dist = util.getDisance(latitude, longitude, attActs[key].location.latitude, attActs[key].location.longitude)
                console.log(dist)

                if(dist < distance){
                  //第三个条件：距离在distance内
                  // 自动签到
                  var activityId = attActs[key].id
                  var userId = that.data.userId
                  console.log('zz'+userId+' '+ activityId)
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
                        title: attActs[key].title + ' 已自动签到！' ,
                        icon: 'success',
                        duration: 1000
                      })
                    }
                  })

                  // 更新缓存
                  attActs[key].signed=1
                  wx.setStorageSync('attended',attActs)
                }
              }
            })
          }
        }
      }
    }, 5000)
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
