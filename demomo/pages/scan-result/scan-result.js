// pages/scan-result/scan-result.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
        bookid:null,
        title: null,
        logo: null,
        author:null,
        publisher: null,
        isbn: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
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
    var userid = app.globalData.userId
    var isbn = wx.getStorageSync('toGetResult')
    console.log(isbn)
    wx.request({
      url: 'https://www.parallel1996.xyz/AndroidServer/getBookData', //
      data: isbn,
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
        })
        wx.showModal({
          title: '提示',
          content: '确定要捐这本书吗',
          success: function (res) {
            if (res.confirm) {
              //借书
              var bookid = that.data.bookid
              wx.request({
                url: 'https://www.parallel1996.xyz/AndroidServer/donate', //
                data: bookid,
                header: {
                  'content-type': 'application/json', // 默认值
                  'Cookie': 'userId=' + userid
                },
                method: 'POST',
                success: function (res) {
                  console.log(res)
                  if (res.data == 200) {
                    wx.showToast({
                      title: '捐书成功',
                      image: '/image/Smile.png',
                      duration: 2000,
                    })
                  }
                }
              })

            } else if (res.cancel) {
              console.log('用户点击取消')
              wx.navigateTo({
                url: '/pages/donate/donate',
              })
            }
          }
        })
        //捐赠
       
      }
   
        })
      },
      
  another: function () {
    wx.showToast({
      title: '感谢捐赠',
      image: '/image/Smile.png',
      duration: 2000,
      mask: true,
      complete: wx.switchTab({
        url: '/pages/donate/donate'
      })
    })
  },
  nodonate: function () {
    wx.showToast({
      title: '感谢捐赠',
      image: '/image/Smile.png',
      duration: 2000,
      mask: true,
      complete: wx.switchTab({
        url: '/pages/index/index'
      })
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