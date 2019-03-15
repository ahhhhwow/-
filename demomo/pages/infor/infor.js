// pages/infor/infor.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      avatarUrl: "",
      nickName: "",
    part2:{
      grade:null,
      college:null,
      phoneNumber:null,
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        avatarUrl: app.globalData.avatarUrl,
        nickName: app.globalData.nickName
      })
    },
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },


  onShow: function () {
    var userid = app.globalData.userId
    var that=this
    //请求用户信息
    wx.request({
      url: 'https://www.parallel1996.xyz/AndroidServer/getUserData', 
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': 'userId=' + userid
      },
      method: 'GET',
      success: function (res) {
        that.setData({
          college:res.data.faculty,
          grade: res.data.grade,
          phoneNumber: res.data.phoneNumber
        })
        that.setData({
          college: app.globalData.college,
          grade: app.globalData.grade,
          phoneNumber: app.globalData.phoneNumber
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})