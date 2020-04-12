// pages/joinlesson/joinlesson.js


const util = require('../../utils/util.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    oper_type: 2,   // 1 表示创建班课， 2表示手动加入班课(班课码)

    lesson_clses: [
      {
        'key': '01',
        'value': '哲学类',
      },
      {
        'key': '02',
        'value': '经济学类',
      },
      {
        'key': '03',
        'value': '法学类',
      },
      {
        'key': '04',
        'value': '教育学类',
      },
      {
        'key': '05',
        'value': '文学类',
      },
      {
        'key': '06',
        'value': '历史学类',
      },
      {
        'key': '07',
        'value': '理学类',
      },
      {
        'key': '08',
        'value': '工学类',
      },
      {
        'key': '09',
        'value': '农学类',
      },
      {
        'key': '10',
        'value': '医学类',
      },
      {
        'key': '12',
        'value': '管理学类',
      },
      {
        'key': '13',
        'value': '艺术学类',
      },
      {
        'key': '00',
        'value': '哲学类',
      },
    ],

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

    errmsg: '',

    // 学期
    terms: [1, 2],
    year: '2020',
    // ----------------------------------
    // 选中的课程大类， 默认为`其他`
    choosed_lesson_cls: {'code': '00', 'desc': '其他学科类'}, 
    choose_term: 0,
    lesson_name: "",
    lesson_desc: "",



    // 手动加入班课
    value: '',
    showClearBtn: false,
    isWaring: false,
    join_lesson_info: null,
    research: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let that = this
    let join_lesson_info = options.lessoninfo;
    if (options.lessoninfo){
      that.setData({
        join_lesson_info: JSON.parse(options.lessoninfo),
        research: false,
        value: JSON.parse(options.lessoninfo).lesson_code,
      })
    }

    let title = ''
    let oper_type = parseInt(options.oper_type);
    console.log('oper_type:', oper_type)
    if (oper_type == 1){
      title = '创建班课'
      // 获取课程分类数据
      wx.request({
        url: util.http_urls.subject_classifies,
        success: function (res) {
          console.log('课程大类集合:\t', res.data.data)
          if (res.data.data.r == 0) {
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
    }else{
      title = '加入班课'
    }
    wx.setNavigationBarTitle({
      title: title,
    })

    that.setData({
      oper_type: oper_type,
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
    app.sliderightshow(this, 'slide_show', -300, 1)
    setTimeout(function () {
      app.sliderightshow(this, 'slide_show', 0, 1)
    }.bind(this), 300);
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

    if (that.data.lesson_name == ''){
      errmsg = '请输入课程名称'
    }
    else if (that.data.choose_term == 0){
      errmsg = '请选择学期'
    }

    that.setData({
      errmsg: errmsg
    })

    if (errmsg != ''){
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
        
        // 创建成功就跳转页面
        if (response.data.r == 0){
          wx.navigateTo({
            url: '/pages/successtip/successtip' + '?type=create_lesson&data=' + JSON.stringify(response.data.data),
          })
        }
      }
    })
  },


  // 关闭
  close: function(res){
    this.setData({
      errmsg: '',
    })
  },


  // 手动加入班课
  onInput(evt) {
    const { value } = evt.detail;
    this.setData({
      value,
      showClearBtn: !!value.length,
      isWaring: false,
    });
  },
  onClear() {
    this.setData({
      value: '',
      showClearBtn: false,
      isWaring: false,
    });
  },

  onConfirm() {
    
    let that = this
    
    if (!RegExp('^[A-Z0-9]{7}$').test(that.data.value) ) {
      that.setData({
        isWaring: true,
        join_lesson_info: null,
      });
      return;
    }

    wx.request({
      url: util.http_urls.lesson_index,
      method: "GET",
      data: {
        token: wx.getStorageSync('jwt_token'),
        lesson_code: this.data.value,
      },
      success: function(res){
        if (res.data.r == 0){
          console.log('班课信息：', res.data.data.lesson_data);
          that.setData({
            join_lesson_info: res.data.data.lesson_data,
          })
          return
        }
      }
    })
  },

  // 确认加入班课
  confirm_join_lesson: function(res){
    let that  = this
    if (!RegExp('^[A-Z0-9]{7}$').test(that.data.value)){
      return
    }
    else{
      wx.request({
        url: util.http_urls.create_lesson,
        method: 'PUT',
        data: {
          token: wx.getStorageSync('jwt_token'),
          lesson_code: that.data.value,
        },
        success: function(res){
          if (res.statusCode != 200){
            wx.showToast({
              title: '加入失败，角色类型错误！',
              icon: 'none',
              duration: 2000,
            })

            setTimeout(function(){
              wx.hideToast();
            }, 2000)

          }else{
            wx.showToast({
              title: '加入班课成功',
              duration: 2000,
              success: function(res){
                wx.redirectTo({
                  url: '../index/index',
                })
              }
            })
          }
        }
      })
    }
  },

  research: function(res){
    this.setData({
     join_lesson_info: null 
    })
  },
})