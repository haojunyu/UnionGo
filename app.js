//app.js
var util = require('./utils/util.js')
var interval  // 定时器
var duration = 200  // 提前或迟到时间（分）
var distance = 100000  // 距离签到点距离（米）

App({
  data: {
    tags: {
      'uninoGo' : ['1', '2', '3', '4', '9', '6', '7', '8'],
      'sport': ['1', '5'],
      'meeting': ['2'],
      'manager': ['12', '13']
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
        tag: ['unionGo', 'sport']
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
        time: '15:11',
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
        time: '19:00',
        location: {
          latitude: 31.23454,
          longitude: 121.6622
        },
        _type: 1,
        signed: 0,
        tag: ['unionGo']
      }
    },

    moreActivities: {
      5: {
        id: '5',
        title: '观看大师杯网球赛（上海站）',
        desc: '上海站网球赛与下周末举办，中国银联员工免费观看，请有意向的员工直接去集合点集合，集合地点：上海体育馆东区201馆',
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
    },

    pushedActivities: {
      10: {
        id: '10',
        title: '下周一开发中心全体员工到总部集合',
        desc: '不知道干嘛，集合之后再看能干嘛',
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
      11: {
        id: '11',
        title: '到培训中心听取时总裁讲话',
        desc: '时总裁将于明天中午进行讲话，主题是关于银联未来发展的，请感兴趣的员工准时参加学习',
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
      12: {
        id: '12',
        title: '参加网联成立剪彩仪式',
        desc: '请各位高级主管道顾唐路1999号参加网联成立剪彩仪式，时间下周一上午九点',
        date: '2016-10-18',
        time: '09:00',
        location: {
          latitude: 31.230416,
          longitude: 121.473701
        },
        _type: 2,
        signed: 0,
        tag: ['unionGo', 'manager']
      },
      13: {
        id: '13',
        title: '中国人民银行高级主管会议',
        desc: '请分管领导于下周一到银联大厦参加中国人民银行高级主管会议',
        date: '2016-10-18',
        time: '11:11',
        location: {
          latitude: 31.230416,
          longitude: 121.473701
        },
        _type: 2,
        signed: 0,
        tag: ['unionGo', 'manager']
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
                  attActs[key].signed=1
                  wx.showToast({
                    title: attActs[key].title + ' 已自动签到！' ,
                    icon: 'success',
                    duration: 1000
                  })
                  wx.setStorageSync('attended',attActs)
                }
              }
            })
          }
        }
      }
    }, 30000)
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
