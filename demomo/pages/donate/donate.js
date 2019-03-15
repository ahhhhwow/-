const app = getApp()
Page({
  data: {
    hasList:true,
    isAllSelected:false,
    totalNum:0,
    carts:[]
  },
    /**
   * 当前商品选中事件
   */
  selectList:function(e) {
      var carts=this.data.carts
      let index = e.currentTarget.dataset.index;
      let selected = carts[index].selected;
      carts[index].selected = !selected;
      console.log(carts[index].selected)
      this.setData({
        carts: carts
      });
      this.getTotalNum();
      //wx.setStorageSync('total', this.data.totalNum)
  },
    /**
  * 删除购物车当前商品
  */
  deleteList: function(e) {
      let index = e.currentTarget.dataset.index;
      let carts = this.data.carts;
      var donateid=this.data.carts[index].donateid
      carts.splice(index, 1);
      this.setData({
        carts: carts
      });
      if (!carts.length) {
        this.setData({
          hasList: false
        });
      } else {
        this.getTotalNum();
      }
      //wx.setStorageSync('total', this.data.totalNum)
      //wx.setStorageSync('carts', carts)
      //删除未捐赠列表
      wx.request({
        url: 'https://www.parallel1996.xyz/AndroidServer/deleteUnconfirmedDonatingList', //
        data: donateId,
        header: {
          'content-type': 'application/json',
          'Cookie': 'userId=' + userid
        },
        method: 'POST',
        success: res => {
          console.log(res)
        }
      })
    },
    /**
   * 购物车全选事件
   */
    selectAll: function(e) {
      var isAllSelected = this.data.isAllSelected
      var isAllSele=!isAllSelected
      //console.log(isAllSele)
      let carts = this.data.carts
      for (let i = 0; i < carts.length; i++) {
        carts[i].selected = isAllSele;
        //console.log(carts[i].selected)
      }
      this.setData({
        isAllSelected: isAllSele,
        carts: carts
      });
      //console.log(this.data.carts)
      //console.log(this.data.isAllSelected)
      this.getTotalNum();
     // wx.setStorageSync('isAllSelected', isAllSelected)
     // wx.setStorageSync('total', this.data.totalNum)
     // wx.setStorageSync('carts', carts)
    },
    /**
   * 绑定加数量事件
   */
    addCount: function(e) {
      let index = e.currentTarget.dataset.index;
      let carts = this.data.carts;
      let num = carts[index].num;
      num = num + 1;
      carts[index].num = num;
      this.setData({
        carts: carts
      });
      this.getTotalNum();
      //wx.setStorageSync('total', this.data.totalNum)
      //wx.setStorageSync('carts', carts)
    },
    /**
  * 绑定减数量事件
  */
    minusCount: function(e) {
      let index = e.currentTarget.dataset.index;
      let carts = this.data.carts;
      let num = carts[index].num;
      if (num <= 1) {
        return false;
      }
      num = num - 1;
      carts[index].num = num;
      this.setData({
        carts: carts
      });
      this.getTotalNum();
      //wx.setStorageSync('total', this.data.totalNum)
     // wx.setStorageSync('carts', carts)
    },
     /**
   * 计算总数
   */
    getTotalNum: function() {
      let carts = this.data.carts                 // 获取购物车列表
      let total =0;
      for (let i = 0; i < carts.length; i++) {         // 循环列表得到每个数据
        if (carts[i].selected) {                     // 判断选中才会计算价格
          total += carts[i].num;   // 所有价格加起来
        }
      }
      this.setData({                                // 最后赋值到data中渲染到页面
        totalNum: total
      });
      //wx.setStorageSync('total',total)
    },


    doCertain: function () {
      var userid = app.globalData.userId
      console.log(11111111)
      var donatedList = []
      var carts = this.data.carts
      var len = carts.length;
      for (i = 0; i < len; i++) {
        if (carts[i].selected) {
          var donated = this.data.carts[i].donateid
          var num = this.data.carts[i].num
          donatedList.push({ 'donateId': donated, 'number': num })
        }
      }
      console.log(donatedList)
      wx.request({
        url: 'https://www.parallel1996.xyz/AndroidServer/confirmDonating', //
        data:
        donatedList,
        header: {
          "content-type": 'application/json',
          "Cookie": 'userId=' + userid,
          //'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: res => {
          wx.showToast({
            title: '捐书成功',
            image: '/image/Smile.png',
            duration: 3000,
          })
        }
      })
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  
  toResult: function () {
    
    wx.scanCode({
      success:(res)=>{
        console.log(res)
        var isbn = res.result
        console.log(isbn)
        wx.setStorageSync('toGetResult', isbn)
        wx.navigateTo({
          url: '/pages/scan-result/scan-result',
        })
      },
      fail: (res) => {
        console.log(res)
        wx.showToast({
          title: '扫码失败',
          image: '/image/cry.png',
          duration: 2000
        })
      }
    })
    /*wx.scanCode({
      success: (res) => {
        console.log(res)
        /*console.log(111)
        console.log(res.result)
        console.log(222)
        var isbn=res.result
          wx.setStorageSync('toGetResult', isbn)
          wx.navigateTo({
            url: '/pages/scan-result/scan-result',
          })
      },
      fail:(res)=>{
        console.log(res)
        wx.showToast({
          title: '扫码匹配失败',
          image: '/image/cry.png',
          duration: 2000
        })
      }
    })*/
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
    console.log("show")
    var that=this
    var userid = app.globalData.userId
    //获取带捐赠名单
    wx.request({
      url: 'https://www.parallel1996.xyz/AndroidServer/unconfirmedDonatingList', //
      header: {
        'content-type': 'application/json',
        'Cookie': 'userId=' + userid
      },
      method: 'GET',
      success: res => {
        console.log(res)
        var booklist = []
        for (var i = 0; i < res.data.length; i++) {
          booklist.push({
            bookid: res.data[i].bookId,
            title: res.data[i].name,
            logo: res.data[i].photo,
            author: res.data[i].author,
            publisher: res.data[i].publisher,
            isbn: res.data[i].isbn,
            donateid: res.data[i].donateId,
            donateTime: res.data[i].donateTime,
            selected: false,
            num:1
          })
        }
        console.log(booklist)
        that.setData({
          carts: booklist
        }) 
        console.log(that.data.carts)
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