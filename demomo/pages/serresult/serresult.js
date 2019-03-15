// pages/serresult/serresult.js
const app = getApp()

Page({
  data: {
    text:'搜索结果为',
    bookList: [],
  },
  onLoad: function () {
    
  },

  onShow: function () {
    var that = this
    var userid = app.globalData.userId
    var value = wx.getStorageSync('toSearchResult')
    //搜索
    wx.request({
      url: 'https://www.parallel1996.xyz/AndroidServer/sortBooks', //
      data: {
        'name': value,
      },
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': 'userId=' + userid
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        var booklist = []
        if(res.length==0){
          that.setData({
            text:'暂无搜索结果'
          })
        }else{
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
        }
        that.setData({
          bookList: booklist
        })
      }
      }
    })
  },
  suo: function (e) {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  scan: function (e) {
    console.log(e);
  },
  toDetail: function (e) {
    console.log(e);
    var index = e.currentTarget.dataset.index;
    var bookid = this.data.bookList[index].bookid;
    wx.setStorageSync('toDetail', bookid)
    wx.navigateTo({
      url: '/pages/detail/detail?'
    })
  },
  onCollectionTap: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var bookid = this.data.bookList[index].bookid;
    var selected = this.data.bookList[index].selected;
    var bookList = this.data.bookList;
    var userid = app.globalData.userId;
    bookList[index].selected = !selected
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
          console.log(res)
          if (res.data == 200) {
            that.setData({
              bookList: bookList
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
              bookList: bookList
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
    }
    console.log(this.data.bookList[index].selected)
  }
})
