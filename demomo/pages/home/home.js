// pages/home/home.js
const app = getApp(); 
Page({
  /**
   * 页面的初始数据
   */
  data: {
    opacity1:0,
    opacity2:0,
    show: '0',
    array: ['2014', '2015', '2016', '2017'],
    array_c: ['软件学院', '计算机学院', '艺术学院', '法学院'],
    avatarUrl: '',
    nickName: '',
      grade:'你的年级',
      college:'你的学院',
      phoneNum:''
  },
  bindPickerChange: function (e) {
    var value =e.detail.value
    var grade=this.data.array[value]
    var show=this.data.show;
    show=show+1
    this.setData({
      grade: grade,
      show:show
    })
    app.globalData.grade = e.detail.userInfo.grade
  },
  bindPickerChange_c: function (e) {
    var value = e.detail.value
    var college = this.data.array_c[value]
    var show = this.data.show;
    show = show + 1
    this.setData({
      college: college,
      show: show
    })
    app.globalData.college = e.detail.userInfo.college
  },
  /**
   * 监听年级输入
   */
  listenerPhoneInput: function (e) {
    var show = this.data.show;
    show = show + 1
    var phoneNum = e.detail.value;
    this.setData({
      phoneNum: phoneNum,
      show: show
    })
    app.globalData.phoneNum = e.detail.userInfo.phoneNum
  },
  onGotUserInfo: function (e) {
    app.globalData.avatarUrl = e.detail.userInfo.avatarUrl
    app.globalData.nickName = e.detail.userInfo.nickName
  },
  toIndex: function (e) {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  /**
   * 监听提交按钮
   */
  listenerLogin: function (e) {
    var name = app.globalData.nickName;
    var photo = app.globalData.avatarUrl;
   var faculty = this.data.college;
   var grade = this.data.grade;
   var phoneNumber = this.data.phoneNum;
   var userid = app.globalData.userId
   var show=this.data.show
   if(show==3){
    //发送年级学院手机号码
   wx.request({
     url: 'https://www.parallel1996.xyz/AndroidServer/setUserData', 
     data: {
       name:name,
       photo:photo,
       faculty:faculty,
       grade:grade,
       phoneNumber:phoneNumber
     },
     header: {
       'content-type': 'application/json', // 默认值
        'Cookie':'userId='+ userid
     },
     method:'POST',
     success: function (res) {
       console.log(res.data)
     }
   })
    wx.switchTab({
      url: '/pages/index/index',
    })
   }else{
   }
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var z=this
    app.userInfoReadyCallback = function () {
      z.setData({
        avatarUrl: app.globalData.avatarUrl,
        nickName: app.globalData.nickName
      })
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
    if (app.globalData.code==100){
      this.setData({
        opacity1: 0,
        opacity2: 0.8,
      })
      
    }else{
      this.setData({
        opacity1: 0.8,
        opacity2: 0,
        
      })
    }
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