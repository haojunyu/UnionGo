//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    motto: 'Hello World',
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
    })
  }

})
