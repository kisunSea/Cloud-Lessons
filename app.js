//app.js

const utils = require('/utils/util.js')

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 获取系统相关信息
    try{
      var res = wx.getSystemInfoSync();
      var info = {
        statusHeight: res.statusBarHeight,
        screenWidth: res.screenWidth,
        screenHeight: res.screenHeight
      }
      this.globalData.sysinfo = info
      // this.globalData.statusHeight = res.statusBarHeight
      // this.globalData.screenWidth = res.screenWidth
      // this.globalData = res.screenHeight
      // console.log(res)
    }catch(e){
      console.log("get system info error!")
    }


    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {

              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log(res.userInfo)
              utils.login(res.code, res.userInfo)

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
    
    userInfo: null,

    nav_default_height: 44,

    baiduapikey: 'FbnvhKhocQAZ2qjL7z3C3vHF',

    baidusecretkey: '7GG8RO5PmE3GGGAAXjAPCRnDp5x6zM6q'

  },
})