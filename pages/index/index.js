//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    userInfo: {},
    raisedActivities: {},
    attendedActivities: {},
    moreActivities: {}
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
          attendedActivities:res.data
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
      },
      fail: function() {
        // fail
      },
      complete: function() {
      }
    })
  },

  onPullDownRefresh: function() {
    // 模拟加载推送的unionGo活动
    var pushed = app.data.pushedActivities
    var currentMore = wx.getStorageSync('more');
    if (pushed != null) {
      for (let key in pushed) {
          currentMore[key] = pushed[key]
      }  
      wx.setStorageSync('more', currentMore)
      wx.showToast({
        title: '更新推送成功',
        icon: 'success',
        duration: 1000
      })
    } 

    var raised = wx.getStorageSync('raised')
    var attended = wx.getStorageSync('attended')
    this.setData({
      raisedActivities: raised,
      attendedActivities: attended,
      moreActivities: currentMore
    }) 
  }

})
