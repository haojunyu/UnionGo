//app.js
var interval  // 定时器
var duration = 200  // 提前或迟到时间（分）
var distance = 100  // 距离签到点距离（米）

App({
  data: {
    tags: {
      'uninoGo' : ['1', '2', '3', '4', '9', '6', '7', '8'],
      'fun': ['1', '5'],
      'meeting': ['2']
    },
    raisedActivities: {
      1: {
        id: '1',
        title: '银联篮球队社团活动',
        desc: '银联操场打球，请有意向的小伙伴准时出席',
        date: '2016-10-18',
        time: '11:11',
        location: {
          latitude: 31.230416,
          longitude: 121.473701
        },
        _type: 0,
        signed: 0,
        tag: ['unionGo', 'fun']
      },
      2: {
        id: '2',
        title: '个性化团队例会',
        desc: '个性化团队例会地点改为研发北楼1200，请准时参加',
        date: '2016-10-18',
        time: '11:11',
        location: {
          latitude: 31.230416,
          longitude: 121.473701
        },
        _type: 0,
        signed: 0,
        tag: ['unionGo', 'meeting']
      }
    },

    attendedActivities: {
      3: {
        id: '3',
        title: '参加银联扬帆第26期新员工培训',
        desc: '请各位新员工与周末晚6点前到培训中心报道，领取房卡，办理入住手续',
        date: '2016-10-18',
        time: '11:11',
        location: {
          latitude: 31.230416,
          longitude: 121.473701
        },
        _type: 1,
        signed: 1,
        tag: ['unionGo']
      },
      4: {
        id: '4',
        title: '银联消防演练活动',
        desc: '请大家听到铃声之后，按照要求走消防通道，并到研发大楼外指定场地集合',
        date: '2016-11-25',
        time: '11:11',
        location: {
          latitude: 31.230416,
          longitude: 121.473701
        },
        _type: 1,
        signed: 0,
        tag: ['unionGo']
      },
      9: {
        id: '9',
        title: '编程马拉松即将开启',
        desc: '发挥你的热情和智慧，参与银联第一期编程马拉松比赛中来吧，Iphone7、无人机、VR眼镜，只要你有才，奖品任你拿',
        date: '2016-11-25',
        time: '15:00',
        location: {
          latitude: 31.230416,
          longitude: 121.473701
        },
        _type: 1,
        signed: 0,
        tag: ['unionGo']
      }
    },

    moreActivities: {
      5: {
        id: '5',
        title: '参观上海博物馆',
        desc: '让你大开眼界的时候到了，参与银联上海博物馆参观活动，来就送iPhone 7',
        date: '2016-10-18',
        time: '11:11',
        location: {
          latitude: 31.230416,
          longitude: 121.473701
        },
        _type: 2,
        signed: 0,
        tag: ['unionGo']
      },
      6: {
        id: '6',
        title: '医疗保险集中咨询',
        desc: '泰康人寿和人保将于下周一进行医保方案集中咨询解答，请关注的同事到指定地点进行问询',
        date: '2016-10-18',
        time: '11:11',
        location: {
          latitude: 31.230416,
          longitude: 121.473701
        },
        _type: 2,
        signed: 0,
        tag: ['unionGo']
      },
      7: {
        id: '7',
        title: '到综合室领取新年大礼包',
        desc: '礼包金额100万',
        date: '2016-10-18',
        time: '11:11',
        location: {
          latitude: 31.230416,
          longitude: 121.473701
        },
        _type: 2,
        signed: 0,
        tag: ['unionGo']
      },
      8: {
        id: '8',
        title: '请有兴趣的同事参加银联讲坛活动',
        desc: '银联讲坛活动将于最近开展',
        date: '2016-10-18',
        time: '11:11',
        location: {
          latitude: 31.230416,
          longitude: 121.473701
        },
        _type: 2,
        signed: 0,
        tag: ['unionGo']
      }
    }
  },

  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())

    wx.setStorageSync("raised", this.data.raisedActivities)
    wx.setStorageSync("attended", this.data.attendedActivities)
    wx.setStorageSync("more", this.data.moreActivities)

    interval = setInterval(function() {
      // 加载参加的活动
      var attActs = wx.getStorageSync('attended')
      //console.log(attActs)
      for(var key in attActs){
        // 判断每一个参加的活动是否符合签到：未签+时间+位置
        if(attActs[key].signed == 0){
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

                //console.log('纬度' + latitude)
                //console.log('经度' + longitude)
              }

            })

/*
            wx.showToast({
              title: '纬度' + latitude,
              icon: 'success',
              duration: 1000
            })
            */
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
