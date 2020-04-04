//index.js
//获取应用实例
const app = getApp()
var base64 = require("../../components/images/base64");
const utils = require('../../utils/util.js')

Page({
  data: {

    // 拖拽参数
    writePosition: [80, 90], //默认定位参数
    writesize: [0, 0],// X Y 定位
    window: [0, 0], //屏幕尺寸
    write: [0, 0], //定位参数
    scrolltop: 0,//据顶部距离

    add_sure: false,
    hasSearchWidget: false,
    title: "移动教学助手",
    // motto: 'Hello World',
    haslogin: false,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    currentTab: 0,
    nav_items_topheight: null,
    nav_default_height: app.globalData.nav_default_height + app.globalData.sysinfo.statusHeight,
    nav_items_fixed_height: 0,
    center_line_width: 0,
    my_teach_banner_fixed_height: 0,
    my_teach_topheight: 0,
    items: [
      {
        "iconPath": "/static/imgs/index_unselected.png",
        "selectedIconPath": "/static/imgs/index_selected.png",
        "text": "首页",
        "title": "移动教学助手",
        "hasSearchWidget": false
      },
      {
        "iconPath": "/static/imgs/blog_unselected.jpg",
        "selectedIconPath": "/static/imgs/blog_selected.jpg",
        "text": "博客",
        "title": "",
        "hasSearchWidget": true
      },
      {
        "iconPath": "/static/imgs/my_unselected.png",
        "selectedIconPath": "/static/imgs/my_selected.png",
        "text": "我的",
        "title": "我的",
        "hasSearchWidget": false
      }
    ],

    // 轮播图效果 
    swiper_styles: {
      backgroundUrls: [
       {
          'dis_url': 'http://134.175.27.71/images/index_banner_1.png',
          'loca_url': '/pages/swiper/banner1',
       },
       {
          'dis_url': 'http://134.175.27.71/images/index_banner_2.png',
          'loca_url': '/pages/swiper/banner2',
       },
        {
          'dis_url': 'http://134.175.27.71/images/my_info_back.png',
          'loca_url': '/pages/swiper/banner3',
       },
      ],
      indicatorDots: true,
      vertical: false,
      autoplay: true,
      interval: 5000,
      duration: 500,
      circular: true,
    },

    // 中部nav
    navs: [
      {
        'nav_name': '图书角',
        'nav_img': '/static/imgs/nav_files.png',
        'url': '/pages/msgs/msgs',
      },
      {
        'nav_name': '每日一句',
        'nav_img': '/static/imgs/nav_word2.png',
        'url': '/pages/dayword/dayword',
      },
      {
        'nav_name': '消息通知',
        'nav_img': '/static/imgs/nav_msg.png',
        'url': '/pages/msgs/msgs',
      },
      {
        'nav_name': '收藏',
        'nav_img': '/static/imgs/nav_favor.png',
        'url': '/pages/msgs/msgs',
      }
    ],

    teach_cls_open: false, //是否点击了展开我的授课
    listen_cls_open: true, //是否展开了我听的课

    // 我教的课
    teach_cls_list: [
      {
        'cls_type': '计算机',
        'cls_code': 'daw42ewqdewe798q42hjdaw', 
        'name': '计算机科学与技术',  // 班课名
        'head_img': 'http://134.175.27.71/images/lesson_type_teach.jpg',
        'cls_img': '',  // 班课头像
        'stu_num': 34,  // 学生人数
        'is_finish': false,  // 是否结课
      },
      {
        'cls_type': '计算机',
        'cls_code': 'daw42ewqdewe798q4hjdaw', 
        'name': '物联网工程',  // 班课名
        'head_img': 'http://134.175.27.71/images/lesson_type_teach.jpg',
        'cls_img': '',  // 班课头像
        'stu_num': 67,  // 学生人数
        'is_finish': false,  // 是否结课
      },
      {
        'cls_type': '计算机',
        'cls_code': 'daw42ewqdewe79q42hjdaw', 
        'name': '软件工程',  // 班课名
        'head_img': 'http://134.175.27.71/images/lesson_type_teach.jpg',
        'cls_img': '',  // 班课头像
        'stu_num': 45,  // 学生人数
        'is_finish': false,  // 是否结课
      },
      {
        'cls_type': '计算机',
        'cls_code': 'daw42ewqdwe798q42hjdaw',
        'name': '环境工程',  // 班课名
        'head_img': 'http://134.175.27.71/images/lesson_type_teach.jpg',
        'cls_img': '',  // 班课头像
        'stu_num': 14,  // 学生人数
        'is_finish': false,  // 是否结课
      },
      {
        'cls_type': '计算机',
        'cls_code': 'daw42ewdewe798q42hjdaw',
        'name': '数字媒体技术',  // 班课名
        'head_img': 'http://134.175.27.71/images/lesson_type_teach.jpg',
        'cls_img': '',  // 班课头像
        'stu_num': 32,  // 学生人数
        'is_finish': false,  // 是否结课
      },
    ],


    // 我听的课
    Listen_cls_list: [
      {
        'cls_code': 'daw42ewqdewe798q42hjdaw',
        'name': '计算机科学与技术2',  // 班课名
        'head_img': 'http://134.175.27.71/images/lesson_type_computer.jpg',
        'cls_img': '',  // 班课头像
        'stu_num': 34,  // 学生人数
        'is_finish': false,  // 是否结课
      },
      {
        'cls_code': 'daw42ewqdewe798q4hjdaw',
        'name': '物联网工程2',  // 班课名
        'head_img': 'http://134.175.27.71/images/lesson_type_computer.jpg',
        'cls_img': '',  // 班课头像
        'stu_num': 67,  // 学生人数
        'is_finish': false,  // 是否结课
      },
      {
        'cls_code': 'daw42ewqdewe79q42hjdaw',
        'name': '软件工程2',  // 班课名
        'head_img': 'http://134.175.27.71/images/lesson_type_computer.jpg',
        'cls_img': '',  // 班课头像
        'stu_num': 45,  // 学生人数
        'is_finish': false,  // 是否结课
      },
      {
        'cls_code': 'daw42ewqdwe798q42hjdaw',
        'name': '环境工程2',  // 班课名
        'head_img': 'http://134.175.27.71/images/lesson_type_computer.jpg',
        'cls_img': '',  // 班课头像
        'stu_num': 14,  // 学生人数
        'is_finish': false,  // 是否结课
      },
      {
        'cls_code': 'daw42ewdewe798q42hjdaw',
        'name': '数字媒体技术2',  // 班课名
        'head_img': 'http://134.175.27.71/images/lesson_type_computer.jpg',
        'cls_img': '',  // 班课头像
        'stu_num': 32,  // 学生人数
        'is_finish': false,  // 是否结课
      },
    ],

    // 说说卡片
    content_items: [
      {
        'content_author': 'kisun',
        'avatar_img': "https://wx.qlogo.cn/mmopen/vi_32/7nULdT9goEs9b1voicSIfpF8kJNMsmNGJTlicv59dtZ6BkjMQawnjY1Cn37eicbEIbvTOqcYYH5MnibYsvbdico4y1g/132",
        'pub_time': '2019-10-21 18:03',
        'content_detail': '校园移动教学助手真的好好用，校园移动教学助手真的好好用，校园移动教学助手真的好好用，校园移动教学助手真的好好用',
        'content_imgs': [
          'http://134.175.27.71/images/lesson_type_teach.jpg',
          'http://134.175.27.71/images/lesson_type_teach.jpg',
        ],
        'favor_num': 100,
        'contments_num': 200,
        'take_send_num': 300,
      },
      {
        'content_author': 'kisun',
        'avatar_img': "https://wx.qlogo.cn/mmopen/vi_32/7nULdT9goEs9b1voicSIfpF8kJNMsmNGJTlicv59dtZ6BkjMQawnjY1Cn37eicbEIbvTOqcYYH5MnibYsvbdico4y1g/132",
        'pub_time': '2019-10-21 18:03',
        'content_detail': '校园移动教学助手真的好好用，校园移动教学助手真的好好用，校园移动教学助手真的好好用，校园移动教学助手真的好好用',
        'content_imgs': [
          'http://134.175.27.71/images/lesson_type_computer.jpg',
          'http://134.175.27.71/images/lesson_type_teach.jpg',
          'http://134.175.27.71/images/lesson_type_computer.jpg',
          'http://134.175.27.71/images/lesson_type_teach.jpg',
        ],
        'favor_num': 100,
        'contments_num': 200,
        'take_send_num': 300,
      },
      {
        'content_author': 'kisun',
        'avatar_img': "https://wx.qlogo.cn/mmopen/vi_32/7nULdT9goEs9b1voicSIfpF8kJNMsmNGJTlicv59dtZ6BkjMQawnjY1Cn37eicbEIbvTOqcYYH5MnibYsvbdico4y1g/132",
        'pub_time': '2019-10-21 18:03',
        'content_detail': '校园移动教学助手真的好好用，校园移动教学助手真的好好用，校园移动教学助手真的好好用，校园移动教学助手真的好好用',
        'content_imgs': [
          'http://134.175.27.71/images/lesson_type_computer.jpg',
          'http://134.175.27.71/images/lesson_type_computer.jpg',
          'http://134.175.27.71/images/lesson_type_teach.jpg',
          'http://134.175.27.71/images/lesson_type_computer.jpg',
          'http://134.175.27.71/images/lesson_type_computer.jpg',
          'http://134.175.27.71/images/lesson_type_teach.jpg',
        ],
        'favor_num': 100,
        'contments_num': 200,
        'take_send_num': 300,
      },
      {
        'content_author': 'kisun',
        'avatar_img': "https://wx.qlogo.cn/mmopen/vi_32/7nULdT9goEs9b1voicSIfpF8kJNMsmNGJTlicv59dtZ6BkjMQawnjY1Cn37eicbEIbvTOqcYYH5MnibYsvbdico4y1g/132",
        'pub_time': '2019-10-21 18:03',
        'content_detail': '校园移动教学助手真的好好用，校园移动教学助手真的好好用，校园移动教学助手真的好好用，校园移动教学助手真的好好用',
        'content_imgs': [
          'http://134.175.27.71/images/lesson_type_teach.jpg',
        ],
        'favor_num': 100,
        'contments_num': 200,
        'take_send_num': 300,
      },
      {
        'content_author': 'kisun',
        'avatar_img': "https://wx.qlogo.cn/mmopen/vi_32/7nULdT9goEs9b1voicSIfpF8kJNMsmNGJTlicv59dtZ6BkjMQawnjY1Cn37eicbEIbvTOqcYYH5MnibYsvbdico4y1g/132",
        'pub_time': '2019-10-21 18:03',
        'content_detail': '校园移动教学助手真的好好用，校园移动教学助手真的好好用，校园移动教学助手真的好好用，校园移动教学助手真的好好用',
        'favor_num': 100,
        'content_imgs': [
          'http://134.175.27.71/images/lesson_type_teach.jpg',
          'http://134.175.27.71/images/lesson_type_teach.jpg',
          'http://134.175.27.71/images/lesson_type_teach.jpg',
          'http://134.175.27.71/images/lesson_type_teach.jpg',
        ],
        'contments_num': 200,
        'take_send_num': 300,
      },
      {
        'content_author': 'kisun',
        'avatar_img': "https://wx.qlogo.cn/mmopen/vi_32/7nULdT9goEs9b1voicSIfpF8kJNMsmNGJTlicv59dtZ6BkjMQawnjY1Cn37eicbEIbvTOqcYYH5MnibYsvbdico4y1g/132",
        'pub_time': '2019-10-21 18:03',
        'content_detail': '校园移动教学助手真的好好用，校园移动教学助手真的好好用，校园移动教学助手真的好好用，校园移动教学助手真的好好用',
        'content_imgs': [
          'http://134.175.27.71/images/lesson_type_computer.jpg',
          'http://134.175.27.71/images/lesson_type_teach.jpg',
          'http://134.175.27.71/images/lesson_type_computer.jpg',
        ],
        'favor_num': 100,
        'contments_num': 200,
        'take_send_num': 300,
      },

    ],

    my_oper_list:[
      {
        'oper_name': '身份认证',
        'oper_brief': '更好地认识你',
        'link_to_addr': '/page/myoperpage?type=0',
      },
      {
        'oper_name': '消息订阅',
        'oper_brief': '及时接收重要消息',
        'link_to_addr': '/page/myoperpage?type=1',
      },
      {
        'oper_name': '帮助中心',
        'oper_brief': '',
        'link_to_addr': '/page/myoperpage?type=2',
      },
      // {
      //   'oper_name': '分享小程序',
      //   'oper_brief': '',
      //   'link_to_addr': '',
      // },
      {
        'oper_name': '清除缓存',
        'oper_brief': '',
        'link_to_addr': '/page/myoperpage?type=3',
      },
      {
        'oper_name': '联系我们',
        'oper_brief': '',
        'link_to_addr': '/page/myoperpage?type=4',
      },
    ],

    // 是否展开我教的课
    is_teach_open: false,

    // 是否展开我听的课
    is_listen_open: false,

  },

  // 点击我教的课
  openCloseClsListTeachToggle: function (e) {
    let that = this
    that.setData({
      teach_cls_open: !that.data.teach_cls_open,
    })
  },

  // 点击我教的课
  openCloseClsListListenToggle: function (e) {
    let that = this
    that.setData({
      listen_cls_open: !that.data.listen_cls_open,
    })
  },


  swichNav: function (e) {
    let that = this;
    // console.log(e)
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
        hasSearchWidget: e.target.dataset.hassearchwidget,
        title: e.target.dataset.title
      })
    }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onReady: function(e){

    // 加载首页 中部蓝色线条动画(长度缩短)
    // this.center_line_animation = wx.createAnimation({
    //   duration: 1500,
    //   timingFunction: 'ease',
    // });
    // this.center_line_animation.width('100vw').step();
    // this.center_line_animation.opacity("0").step();
    // this.setData({ center_line_animation: this.center_line_animation.export() });

  },

  onPageScroll: function(e){
    // console.log(e.scrollTop);
    let that = this;
    let screen_height = wx.getSystemInfoSync().screenHeight;

    that.setData({
      nav_items_fixed_height: e.scrollTop + that.data.nav_default_height,
      center_line_width: e.scrollTop,
    });
    // console.log(screen_height);
    // console.log('高度' + that.data.nav_items_fixed_height+'\t'+that.data.nav_items_topheight);
  },

  onLoad: function () {
    let that = this;
    // 用户已经授权登录
    if (app.globalData.userInfo) {
      that.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        that.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      // 获取用户信息
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          
          that.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    // 添加滑动删除
    that.setData({
      icon: base64.icon20,
      slideButtons: [
        // {
        //   text: '普通',
        //   src: '/page/weui/cell/icon_love.svg', // icon的路径
        // },
        {
          text: '置顶',
          extClass: 'test',
          src: '/page/weui/cell/icon_star.svg', // icon的路径
        }, 
        {
          type: 'warn',
          text: '归档',
          extClass: 'test',
          src: '/page/weui/cell/icon_del.svg', // icon的路径
        }
      ],
    });

    let selectorQueryObj = wx.createSelectorQuery();

    // 首页效果：导航分类 滑动到某一个位置固定
    selectorQueryObj.selectAll('.fix_item').boundingClientRect(function (rect) {
      console.log(rect);
      that.setData({
        nav_items_topheight: rect[0].top,
      })
    }).exec();

    // 首页效果：班课分类>我教的课 滑动到顶部固定
    // wx.createSelectorQuery().selectAll('#my_cls_title_1').boundingClientRect(function (rect) {
    //   console.log(rect)
    //   that.setData({
    //     nav_items_topheight: rect[0].top
    //   })
    // }).exec();

  },


  // 身份信息获取已经在onLoad中执行
  getUserInfo: function(e) {
    let info = e.detail.userInfo
    if (info){
      app.globalData.userInfo = info
      this.setData({
        userInfo: info,
        hasUserInfo: true,
      })

      // 若成功授权且有合法的userInfo则登录到服务器
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                utils.login(res.code, e.detail.userInfo)
              }
            })
          }
        }    
      })

    }
  },

  // 添加班课或加入班课时，触发actionsheet
  openAddActionDialog: function(e) {
    var that = this;
    that.setData({
      add_sure: true,
    })
  },

  // 关闭添加班课actionsheet
  closeAddActionDialog: function(e) {
    var that = this;
    that.setData({
      add_sure: false,
    })
  },

  // 打开班课
  lessonopen: function(res){
    // console.log(res.currentTarget.dataset);
    this.setData(res.currentTarget.dataset);
  },

  // 点击首页课程跳转至lessonindex页面
  navigateToLessonIndex:function(res){
    // type:
    // 1 表示 我创建的课
    // 0 表示 我加入的课
    let cur_data = res.currentTarget.dataset;
    wx.navigateTo({
      url: '/pages/lessonindex/lessonindex?lesson_data=' + JSON.stringify(cur_data.lessondata) + '&type=' + cur_data.type,
    })
  },

  // 扫描二维码  todo 扫码加入班课
  scanf_qr_code: function(){
    wx.scanCode({
      onlyFromCamera: false,
      scanType: ['qrCode',],
      success(res) {
        console.log(res)
      }
    })
  }

})
