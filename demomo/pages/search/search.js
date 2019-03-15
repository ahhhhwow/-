var app = getApp();
var WxSearch = require('../../wxSearchView/wxSearchView.js');

Page({
  data: {},
  onLoad: function () {

    // 搜索栏初始化
    var that = this;
    WxSearch.init(
      that,  // 本页面一个引用
      ['谢谢你迟到', '新100个基本', "最漫长的下午茶"], // 热点搜索推荐，[]表示不使用
      ['谢谢你迟到', '新100个基本', "最漫长的下午茶"],// 搜索匹配，[]表示不使用
      that.mySearchFunction, // 提供一个搜索回调函数
      that.myGobackFunction //提供一个返回回调函数
    )

  },
  wxSearchInput: WxSearch.wxSearchInput,  // 输入变化时的操作
  wxSearchKeyTap: WxSearch.wxSearchKeyTap,  // 点击提示或者关键字、历史记录时的操作
  wxSearchDeleteAll: WxSearch.wxSearchDeleteAll, // 删除所有的历史记录
  wxSearchConfirm: WxSearch.wxSearchConfirm,  // 搜索函数
  wxSearchClear: WxSearch.wxSearchClear,  // 清空函数

  // 搜索回调函数  
  mySearchFunction: function (value) {
    // do your job here
    var va = this.data.wxSearchData.value
    wx.setStorageSync('toSearchResult', va)
    //console.log(this.data.wxSearchData.value)
    wx.redirectTo({
      url: '../serresult/serresult' 
    })
  },

  // 5 返回回调函数
  myGobackFunction: function () {
    // do your job here
    // 示例：返回
    wx.redirectTo({
      url: '../search/search'
    })
  }

})