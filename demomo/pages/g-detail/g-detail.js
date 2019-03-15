// pages/detail/detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:null,
    title: null,
    logo: null,
    author: null,
    publisher: null,
    isbn: null,
    amout: null,
    starnum: null,
    content: null,
    selected:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
   
  },
  toScan: function (e) {
    var isbn = this.data.isbn;
    var index = this.data.index;
    var bookid=this.data.bookid;
    wx.scanCode({
      success: (res) => {
        console.log(res.result)
        if (res.result == isbn) {
          wx.setStorageSync('toGetResult', bookid) 
          wx.navigateTo({
            url: '/pages/getresult/getresult' 
          })
        } else {
          wx.showToast({
            title: '扫码匹配失败',
            image: '/image/cry.png',
            duration: 2000
          })
        }
      }
    })
  },
  onCollectionTap: function (e) {
    var that = this
    var bookid = this.data.bookid
    var selected = this.data.selected;
    var userid = app.globalData.userId;
    sele = !selected;
    if (selected) {
      //取消收藏
      //删除心愿单
      wx.request({
        url: 'https://www.parallel1996.xyz/AndroidServer/deleteWishList', //
        data: bookid,
        header: {
          'content-type': 'application/json', // 默认值
          'Cookie': 'userId=' + userid
        },
        method: 'POST',
        success: function (res) {
          if (res.data == 200) {
            that.setData({
              selected: sele
            })
          } else {
            wx.showToast({
              title: '取消失败',
              image: '/image/cry.png',
              duration: 2000
            })
          }
        }
      })
    } else {
      //加入收藏
      //加入心愿单
      wx.request({
        url: 'https://www.parallel1996.xyz/AndroidServer/createWishList', //
        data: bookid,
        header: {
          'content-type': 'application/json', // 默认值
          'Cookie': 'userId=' + userid
        },
        method: 'POST',
        success: function (res) {
          console.log(res)
          if (res.data == 200) {
            that.setData({
              selected: sele
            })
          } else {
            wx.showToast({
              title: '收藏失败',
              image: '/image/cry.png',
              duration: 2000
            })
          }
        }
      })
      console.log(this.data.selected)
    }
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
    var that=this
    var bookid=wx.getStorageSync('toGDetail')
    this.setData({
      bookid: bookid
    })
    var bookid = this.data.bookid
    var userid = app.globalData.userId
    var that = this
    //请求书籍详情
    wx.request({
      url: 'https://www.parallel1996.xyz/AndroidServer/getBookDataById', //
      data: bookid,
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': 'userId=' + userid
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        that.setData({
          bookid: res.data.bookId,
          title: res.data.name,
          logo: res.data.photo,
          author: res.data.author,
          publisher: res.data.publisher,
          isbn: res.data.isbn,
          amout: res.data.number,
          starnum: res.data.followNumber,
          selected: res.data.weatherLikeThisBook,
          content: res.data.content
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