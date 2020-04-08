// pages/joinlesson/joinlesson.js


const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    oper_type: 1,   // 1 表示创建班课， 2表示手动加入班课(班课码)

    subjects_classifies: [  // 课程大类分类集合
      {
        'code': '01',
        'desc': '哲学类'
      },
      {
        'code': '02',
        'desc': '经济学类'
      },
      {
        'code': '03',
        'desc': '法学类'
      },
      {
        'code': '04',
        'desc': '教育学类'
      },
      {
        'code': '05',
        'desc': '文学类'
      },
    ],

    // 学期
    terms: [1, 2],
    year: '2020',
    // ----------------------------------
    // 选中的课程大类， 默认为`其他`
    choosed_lesson_cls: {'code': '00', 'desc': '其他学科类'}, 
    choose_term: 0,
    lesson_name: "",
    lesson_desc: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let title = ''
    let that = this
    if (that.data.oper_type == 1){
      title = '创建班课'
    }else{
      title = '加入班课'
    }
    wx.setNavigationBarTitle({
      title: title,
    })
    
    // 获取课程分类数据
    wx.request({
      url: util.http_urls.subject_classifies,
      success: function(res){
        console.log('课程大类集合:\t', res.data.data)
        if (res.data.r == 0) {
          that.setData({
            subjects_classifies: res.data.data
          })
        }
      }
    })

    // 获取当前年份
    var myDate = new Date();
    var tYear = myDate.getFullYear();
    that.setData({
      year: tYear,
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

  // 课程分类选择
  subject_classify_choose: function(e) {
    let that = this;
    that.setData({
      choosed_lesson_cls: that.data.subjects_classifies[parseInt(e.detail.value)],
    })
    console.log('专业大类选择结果:\t', that.data.choosed_lesson_cls);
  },

  // 选中的学期
  term_choose: function(e){
    let that = this;
    that.setData({
      choose_term: that.data.terms[parseInt(e.detail.value)],
    })
    console.log('学期选择结果:\t', that.data.choosed_lesson_cls);
  },

  // 课程名称
  lesson_name: function(e){
    let that = this;
    that.setData({
      lesson_name: e.detail.value,
    })
  },

  // 课程介绍
  lesson_desc: function(e){
    let that = this;
    that.setData({
      lesson_desc: e.detail.value,
    })
  },

  // 创建班课button
  create_lesson: function(res){
    // choosed_lesson_cls: { 'code': -1, 'desc': '请选择课程分类' },
    // choose_term: 0,
    // lesson_name: "",
    // lesson_desc: "",
    let that = this
    var errmsg = ''
    console.log('##################################')
    console.log('lesson classify:\t', that.data.choosed_lesson_cls.code)
    console.log('lesson term:\t', that.data.choose_term)
    console.log('lesson name:\t', that.data.lesson_name)
    console.log('lesson desc:\t', that.data.lesson_desc)
    console.log('lesson year:\t', that.data.year)
    console.log('##################################')

    if (that.data.lesson_name){
      errmsg = '请输入课程名称'
    }
    else if (that.data.choose_term){
      errmsg = '请选择学期'
    }

    if (errmsg == ''){
      return
    }

    wx.request({
      url: util.http_urls.create_lesson,
      method: 'POST',
      data: {
        lesson_cls: that.data.choosed_lesson_cls.code,
        academic_year: that.data.year,
        lesson_name: that.data.lesson_name,
        term: that.data.choose_term,
        desc: that.data.lesson_desc,
        token: wx.getStorageSync('jwt_token'),
      },
      success: function(response){
        console.log(response)
      }
    })
  }
})