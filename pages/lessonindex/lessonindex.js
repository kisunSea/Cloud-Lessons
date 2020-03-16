// pages/lessonindex/lessonindex.js
const app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    lesson_data: { "cls_code": "daw42ewqdewe798q42hjdaw", "name": "计算机科学与技术2", "head_img": "http://134.175.27.71/images/lesson_type_computer.jpg", "cls_img": "", "stu_num": 34, "is_finish": false },
    type: 0,
    // 状态栏高度
    statusBarHeight: app.globalData.sysinfo.statusHeight,
    // 顶部默认导航高度
    navigationBarHeight: (app.globalData.sysinfo.statusHeight + app.globalData.nav_default_height),

    // 授课操作
    t_oper_list:[
      {
        'oper_name': '发起签到',
        'icon_class': 'icon-signed',
      },
      {
        'oper_name': '随机点名',
        'icon_class': 'icon-lesson-active',
      },
      {
        'oper_name': '班课码',
        'icon_class': 'icon-qr-code',
      },
      {
        'oper_name': '资源',
        'icon_class': 'icon-source',
      },
      {
        'oper_name': '学生表现',
        'icon_class': 'icon-score',
      },
      {
        'oper_name': '答疑区',
        'icon_class': 'icon-help',
      },
      {
        'oper_name': '讨论区',
        'icon_class': '.icon-debat',
      },
      {
        'oper_name': '发布通知',
        'icon_class': 'icon-pub-msg',
      },
      {
        'oper_name': '课堂测试',
        'icon_class': 'icon-order',
      },
      {
        'oper_name': '结课归档',
        'icon_class': 'icon-lesson-out',
      },
    ],

    // 教学跟踪默认展示全部
    display_track_idx: 0,

    // 教学跟踪分类-教师端
    t_track_list: ['全部', '进行中', '已结束', '待开始'],

    // 教学跟踪分类-学生
    s_track_list: ['全部', '进行中', '已结束'],

    // 跟踪项信息 - 全部
    track_all_list: [
      {
        'start_time': '2013-01-23 23:00:23',
        'end_time': '23:20:23',
        'detail': '测试一下',
        'status': 0,  // 0-已结束，1-进行中，2-待开始
        'code': '899b20c069d846e3b3980989dc3925b5',
      },
      {
        'start_time': '2013-01-23 23:00:23',
        'end_time': '',
        'detail': '测试一下',
        'status': 1,  // 0-已结束，1-进行中，2-待开始
        'code': '899b20c069d846e3b3980989dc3925b5',
      },
      {
        'start_time': '2013-01-23 23:00:23',
        'end_time': '23:20:23',
        'detail': '测试一下',
        'status': 0,  // 0-已结束，1-进行中，2-待开始
        'code': '899b20c069d846e3b3980989dc3925b5',
      },
      {
        'start_time': '2013-01-23 23:00:23',
        'end_time': '23:20:23',
        'detail': '测试一下',
        'status': 2,  // 0-已结束，1-进行中，2-待开始
        'code': '899b20c069d846e3b3980989dc3925b5',
      },
      {
        'start_time': '2013-01-23 23:00:23',
        'end_time': '23:00:23',
        'detail': '测试一下',
        'status': 2,  // 0-已结束，1-进行中，2-待开始
        'code': '899b20c069d846e3b3980989dc3925b5',
      },
    ],

    // 教学跟踪类目-进行中
    track_active_list: [
      {
        'start_time': '2013-01-23 23:00:23',
        'end_time': '',
        'detail': '测试一下',
        'status': 1,  // 0-已结束，1-进行中，2-待开始
        'code': '899b20c069d846e3b3980989dc3925b5',
      },
    ],

    // 教学跟踪类目- 已结束
    track_deactive_list: [
      {
        'start_time': '2013-01-23 23:00:23',
        'end_time': '23:20:23',
        'detail': '测试一下',
        'status': 0,  // 0-已结束，1-进行中，2-待开始
        'code': '899b20c069d846e3b3980989dc3925b5',
      }, 
      {
        'start_time': '2013-01-23 23:00:23',
        'end_time': '23:20:23',
        'detail': '测试一下',
        'status': 0,  // 0-已结束，1-进行中，2-待开始
        'code': '899b20c069d846e3b3980989dc3925b5',
      },
    ],

    // 教学跟踪类目- 待开始
    track_toactive_list: [
      {
        'start_time': '2013-01-23 23:00:23',
        'end_time': '23:20:23',
        'detail': '测试一下',
        'status': 2,  // 0-已结束，1-进行中，2-待开始
        'code': '899b20c069d846e3b3980989dc3925b5',
      },
      {
        'start_time': '2013-01-23 23:00:23',
        'end_time': '23:00:23',
        'detail': '测试一下',
        'status': 2,  // 0-已结束，1-进行中，2-待开始
        'code': '899b20c069d846e3b3980989dc3925b5',
      },
    ],

    // 当前展示
    display_track_list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      lesson_data: JSON.parse(options.lesson_data),
      type: parseInt(options.type),
    });

    // todo http获取全部跟踪项目

    this.setData({
      'display_track_list': this.data.track_all_list,
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

  /**
   * 返回首页
   */
  _ret_home: function(){
    wx.navigateBack({
      url: '/pages/index/index',
    })
  },

  // 教学跟踪点击事件
  ch_track: function(res){
    // console.log(res)
    let that = this;
    let display_track_idx = res.currentTarget.dataset.index;
    let idx_mapping = {
      0: that.data.track_all_list,
      1: that.data.track_active_list,
      2: that.data.track_deactive_list,
      3: that.data.track_toactive_list,
    }
    that.setData({
      display_track_idx: display_track_idx,
      display_track_list: idx_mapping[display_track_idx]
    })
  }
})