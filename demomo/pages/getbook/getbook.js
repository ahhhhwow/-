// pages/getbook/getbook.js
const app = getApp()
Page({
  data: {
    bookList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
  },

  toDetail: function (e) {
    var index = e.currentTarget.dataset.index;
    var bookid = this.data.bookList[index].bookid;
    wx.setStorageSync('toGDetail', bookid)
    wx.navigateTo({
      url: '/pages/g-detail/g-detail'
    })
  },
  
  onCollectionTap: function (e) {
    var bookid=this.data.book
    var selected = this.data.selected;
    var userid = app.globalData.userId;
    var sele = !selected;
    this.setData({
      selected: sele
    })
    if (selected) {
      //取消收藏
      //删除心愿单
      wx.request({
        url: 'https://www.parallel1996.xyz/AndroidServer/deleteWishList', //
        data: 1,
        header: {
          'content-type': 'application/json', // 默认值
          'Cookie': 'userId=' + userid
        },
        method: 'POST',
        success: function (res) {
          console.log(res)
        }
      })
    } else {
      //加入收藏
      //加入心愿单
      wx.request({
        url: 'https://www.parallel1996.xyz/AndroidServer/createWishList', //
        data: 1,
        header: {
          'content-type': 'application/json', // 默认值
          'Cookie': 'userId=' + userid
        },
        method: 'POST',
        success: function (res) {
          console.log(res)
        }
      })
    } 
  },
  toScan: function (e) {
    var index = e.currentTarget.dataset.index;
    var bookid=this.data.bookList[index].bookid
    var isbn=this.data.bookList[index].isbn
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
 

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //获取心愿单
    var that=this
    var userid = app.globalData.userId
    wx.request({
      url: 'https://www.parallel1996.xyz/AndroidServer/getWishList', //
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': 'userId=' + userid
      },
      method: 'GET',
      success: function (res) {
        if(res.data.length==0){
          that.setData({
            bookList:''
          })
        }else{
        console.log(res.data)
        var booklist = []
        for (var i = 0; i < res.data.length; i++) {
          booklist.push({
            bookid: res.data[i].bookId,
            title: res.data[i].name,
            logo: res.data[i].photo,
            author: res.data[i].author,
            publisher: res.data[i].publisher,
            isbn: res.data[i].isbn,
            amout: res.data[i].number,
            starnum: res.data[i].followNumber,
            selected: res.data[i].weatherLikeThisBook
          })
            that.setData({
              bookList:booklist
            })
        }
      }
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