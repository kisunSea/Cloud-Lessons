// pages/lessonindex/lessonindex.js
const app=getApp();
const utils=require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    lesson_data: { "cls_code": "daw42ewqdewe798q42hjdaw", "name": "计算机科学与技术2", "head_img": "http://134.175.27.71/images/lesson_type_computer.jpg", "cls_img": "", "stu_num": 34, "is_finish": false },
    type: 0,
    lesson_code: '',
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
        'oper_name': '发布任务',
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

    // 听课操作
    l_oper_list: [
      {
        'oper_name': '签到',
        'icon_class': 'icon-signed',
      },
      {
        'oper_name': '课堂资源',
        'icon_class': 'icon-source',
      },
      {
        'oper_name': '我的表现',
        'icon_class': 'icon-score',
      },
      {
        'oper_name': '答疑区',
        'icon_class': 'icon-help',
      },
      {
        'oper_name': '退出班课',
        'icon_class': 'icon-lesson-out',
      },
    ],

    resource_num: 0,
    questions_num: '0/0',
    notice_num: 0,
    stu_num: 0,

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

    // 班课信息定时请求
    lessoninfo_timer: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let that = this

    this.setData({
      lesson_code: options.lesson_code,
      type: parseInt(options.type),
    });

    // todo http获取全部跟踪项目

    this.setData({
      display_track_list: this.data.track_all_list,
    })


    wx.request({
      url: utils.http_urls.lesson_index,
      method: "GET",
      data: {
        token: wx.getStorageSync('jwt_token'),
        lesson_code: that.data.lesson_code,
        type: that.data.type,
      },
      success: function (r) {
        console.log(r.data)
        if (r.data.r == 0) {
          that.setData({
            lesson_data: r.data.data.lesson_data,
            resource_num: r.data.data.resource_num,
            questions_num: r.data.data.questions_num,
            notice_num: r.data.data.notice_num,
            stu_num: r.data.data.stu_num,
            track_all_list: r.data.data.teach_schedulers.track_all_list,
            track_active_list: r.data.data.teach_schedulers.track_active_list,
            track_deactive_list: r.data.data.teach_schedulers.track_deactive_list,
            track_toactive_list: r.data.data.teach_schedulers.track_toactive_list,
          })
        } else {
          // 请求班课数据失败
          console.log('请求班课数据失败：\t', response.errmsg);
        }
      }
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
    let that = this
    //定时获取我教/听的课
    that.data.lessoninfo_timer = setInterval(
      function () {
        wx.request({
          url: utils.http_urls.lesson_index,
          method: "GET",
          data: {
            token: wx.getStorageSync('jwt_token'),
            lesson_code: that.data.lesson_code,
            type: that.data.type,
          },
          success: function (r) {
            console.log(r.data)
            if (r.data.r == 0) {
              that.setData({
                lesson_data: r.data.data.lesson_data,
                resource_num: r.data.data.resource_num,
                questions_num: r.data.data.questions_num,
                notice_num: r.data.data.notice_num,
                stu_num: r.data.data.stu_num,
                track_all_list: r.data.data.teach_schedulers.track_all_list,
                track_active_list: r.data.data.teach_schedulers.track_active_list,
                track_deactive_list: r.data.data.teach_schedulers.track_deactive_list,
                track_toactive_list: r.data.data.teach_schedulers.track_toactive_list,
              })
            } else {
              // 请求班课数据失败
              console.log('请求班课数据失败：\t', response.errmsg);
            }
          }
        })
      }
      , 3000);
  },

  // 清除定时器
  onHide: function () {
    let that = this;
    clearInterval(that.data.lessoninfo_timer)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    let that = this;
    clearInterval(that.data.lessoninfo_timer)
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