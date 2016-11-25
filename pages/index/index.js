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
    // 模拟加载推送的unionGo活动
    var pushed = app.data.pushedActivities
    var currentMore = wx.getStorageSync('more');
    if (pushed != null) {
      for (let key in pushed) {
          currentMore[key] = pushed[key]
      }  
      this.setData({
        moreActivities: currentMore
      })
      wx.setStorageSync('more', currentMore)
      wx.showToast({
        title: '更新推送成功',
        icon: 'success',
        duration: 500
      })
    }  
  }

})
