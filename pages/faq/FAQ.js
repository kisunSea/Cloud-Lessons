// pages/FAQ/FAQ.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    solutions:[
      '点击首页的+号',
      '首先点击首页的听授课列表，由于服务器带宽，等待页面切换，若还是没有效果，网络状况不佳',
      '进入到自己的听课班级界面，点击页面底部中的成员，即可看到签到字样',
      '排除网络原因，应该是所传输的图片太大，等待等待页面刷新即可',
      '班课讨论区中，如果不能发送语言等数据，请考虑刷新当前页面',
      '尝试着，重新进入小程序，并检查小程序的网络状态',
      '服务器请求过多，会造成请求较慢',
    ],
    index: 0,
    content: 'ERROR',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    wx.showToast({
      title: '',
      icon: 'loading',
      duration: 500,
    })
    setTimeout(function(){
      
      _this.setData({
        index: options.index,
        content: options.content
      })
    },500)
    
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