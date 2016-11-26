//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    userInfo: {},
    raisedActivities: [],
    attendedActivites: [],
    moreActivities: []
  },

  onShow: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })

    wx.getStorage({
      key: 'raised',
      success: function(res){
        that.setData({
          raisedActivities:res.data
        })
      }
    })

    wx.getStorage({
      key: 'attended',
      success: function(res){
        that.setData({
          attendedActivites:res.data
        })
      }
    })
    wx.getStorage({
      key: 'more',
      success: function(res){
        that.setData({
          moreActivities:res.data
        })
      }
    })
  },

  viewDetail: function(e) {
    var id = e.target.dataset.id;
    var category = e.target.dataset.category
    wx.navigateTo({
      url: '../../pages/detail/detail?category=' + category + '&id=' + id,
      success: function(res){
        wx.showToast({
          title: '加载中',
          icon: 'loading',
          duration: 3000
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        setTimeout(function(){
          wx.hideToast()
        },1000)
      }
    })
  },

  onPullDownRefresh: function() {
    wx.request({
      url: 'http://172.18.51.8:8080/acp/acts?userId='+app.data.userId,
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

    var raised = wx.getStorageSync('raised')
    var attended = wx.getStorageSync('attended')
    var more = wx.getStorageSync('more')
    this.setData({
      raisedActivities: raised,
      attendedActivities: attended,
      moreActivities: more
    })
    wx.showToast({
      title: '更新推送成功',
      icon: 'success',
      duration: 1000
    })
  }




})
