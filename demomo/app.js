//app.js
App({
  onLaunch: function () {
    // 登录
    wx.clearStorageSync()
    wx.login({
      success: res => {
        console.log(res.code)
        var code=res.code
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: 'https://www.parallel1996.xyz/AndroidServer/login', //
          data: code,
          // "data":res.code
          header: {
            'content-type': 'application/json'
          },
          method:'POST',
          success: res => {
          console.log(res.data)
          this.globalData.code = res.data.code
          this.globalData.userId=res.data.userId
          var userid = this.globalData.userId
          console.log(userid)
          }
        })
      }
    });
      
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.avatarUrl = res.userInfo.avatarUrl
              this.globalData.nickName = res.userInfo.nickName
              console.log(this.globalData)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }  
    })
    
  },
  globalData: {
      avatarUrl: '',
      nickName: '',
      grade:'',
      college:'',
      userId:'',
      phoneNumber:'',
      code:''
  }
})