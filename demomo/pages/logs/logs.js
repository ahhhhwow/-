const app = getApp()

Page({
  data: {
      avatarUrl:"",
      nickName:"",
    item: [
      {
        icon: '/image/我的.png',
        text: '个人信息',
        arrow:'/image/右.png',
        toNext:"toInfor"
       // path: '/pages/order/list/index'
      },
      {
        icon: '/image/点赞.png',
        text: '我的捐书',
        arrow: '/image/右.png',
        toNext: "todo"
        //path: '/pages/address/list/index'
      },
      {
        icon: '/image/时钟.png',
        text: '领取记录',
        arrow: '/image/右.png',
        toNext: "toget"
       // path: '18521708248',
      },
      {
        icon: '/image/分享.png',
        text: '邀请好友',
        arrow: '/image/右.png',
        toNext:'toinvite'
        //path: '/pages/help/list/index',
      },
    ]
  },
  onLoad:function(){
    this.setData({
      avatarUrl: app.globalData.avatarUrl,
      nickName: app.globalData.nickName,
    })
    var userid = app.globalData.userId
    //借书记录
   /*wx.request({
      url: 'https://www.parallel1996.xyz/AndroidServer/numberOfDonate',
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': 'userId=' + userid
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
      }
    })*/
    //lingshu书数目
    /*wx.request({
      url: 'https://www.parallel1996.xyz/AndroidServer/numberOfTake',
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': 'userId=' + userid
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
      }
    })*/
    //捐书记录
    /*wx.request({
      url: 'https://www.parallel1996.xyz/AndroidServer/getDonateRecord',
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': 'userId=' + userid
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
      }
    })*/
    
  },
  suo: function (e) {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  toInfor: function (e) {
    wx.navigateTo({
      url: '/pages/infor/infor',
    })
  },
  todo: function (e) {
    wx.navigateTo({
      url: '/pages/do-info/do-info',
    })
  },
  toget: function (e) {
    wx.navigateTo({
      url: '/pages/get-info/get-info',
    })
  },
  toinvite: function (e) {
    wx.navigateTo({
      
    })
  },
})