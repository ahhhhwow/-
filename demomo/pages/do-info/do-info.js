// pages/do-info/do-info.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: '',
    bookList: []
     
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    var userid = app.globalData.userId
    //借书数目
    wx.request({
      url: 'https://www.parallel1996.xyz/AndroidServer/numberOfDonate',
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': 'userId=' + userid
      },
      method: 'GET',
      success: function (res) {
        that.setData({
          num:res.data
        })
      }
    })
    //借书记录
    wx.request({
      url: 'https://www.parallel1996.xyz/AndroidServer/getDonateRecord',
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': 'userId=' + userid
      },
      method: 'GET',
      success: function (res) {
        //捐书记录
        console.log(res)
        var booklist = []
        for (var i = 0; i < res.data.length; i++) {
          var time = res.data[i].time;
          var date = new Date(time);
          var year = date.getFullYear();
          var month = date.getMonth() + 1;
          var day = date.getDate();
          des = year + '-' + month + '-' + day;
          booklist.push({
            bookid: res.data[i].bookId,
            title: res.data[i].name,
            logo: res.data[i].photo,
            author: res.data[i].author,
            publisher: res.data[i].publisher,
            isbn: res.data[i].isbn,
            date: des
          })
        }
        that.setData({
          bookList: booklist
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