// pages/FAQs/FAQs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    problems: [
      '无法创建课程',
      '找不到我听课(/授课)课程',
      '如何在班课中签到？',
      '修改个人资料不能修改头像图片',
      '班课讨论区中无法发送语音/上传图片/点赞',
      '小程序黑屏',
      '状态一直停留，未刷新怎么办？',
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  searQuesInfo: function(e){
    let index = e.currentTarget.dataset.index
    let content = e.currentTarget.dataset.content
    console.log(index, content)
    wx.navigateTo({
      url: '../FAQ/FAQ?index='+index+'&content='+content,
    })
  }
})