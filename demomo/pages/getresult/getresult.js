// pages/getresult/getresult.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
        str:'√您已经成功领取！',
        bookid:null,
        title: null,
        logo: null,
        author: null,
        publisher: null,
        isbn: null,
      },
    
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

  },
  thanks:function(){
    wx.showToast({
      title: '感谢已传达',
      image:'/image/Smile.png',
      duration: 2000,
      mask: true,
      complete: wx.switchTab({
        url: '/pages/getbook/getbook'
      })
    })
  },
  reject: function () {
    wx.switchTab({
      url: '/pages/index/index'
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
    var bookid = wx.getStorageSync('toGetResult')
    console.log(bookid)
    this.setData({
      bookid:bookid
    })
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
        if(res.data.bookId!=-1){
        that.setData({
          bookid: res.data.bookId,
          title: res.data.name,
          logo: res.data.photo,
          author: res.data.author,
          publisher: res.data.publisher,
          isbn: res.data.isbn,
        })
        //借书
        wx.request({
          url: 'https://www.parallel1996.xyz/AndroidServer/takeBook', //
          data: bookid,
          header: {
            'content-type': 'application/json', // 默认值
            'Cookie': 'userId=' + userid
          },
          method: 'POST',
          success: function (res) {
            if (res.data == 200) {
              wx.showToast({
                title: '借书成功',
                image: '/image/Smile.png',
                duration: 2000,
                mask: true,
                complete: wx.switchTab({
                  url: '/pages/getbook/getbook'
                })
              })
            }else if(res.data==-2){
              wx.showToast({
                title: '库存不足',
                image: '/image/cry.png',
                duration: 3000,
                mask: true,
                complete: wx.switchTab({
                  url: '/pages/getbook/getbook'
                })
              })
            }
          }
        })  
      }else{
        that.setData({
          str:'没有查到这本书哦'
        })
        wx.showToast({
          title: '查找失败',
          image: '/image/cry.png',
          duration: 3000
        })
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