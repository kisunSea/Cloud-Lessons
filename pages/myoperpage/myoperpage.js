var app = getApp();
const utils = require('../../utils/util.js')
Page({
  data: {
    src: "",
    fengmian: "",
    videoSrc: "",
    who: "",
    openid: "",
    token: "",
    windowWidth: 0,
    trackshow: "一键录入",
    canvasshow: true,
    access_token: '',

    face_imgs:[],  // 人脸快照图片存放路径列表
  },

  onLoad() {
    var that = this
    wx.showLoading({
      title: '努力加载中',
      mask: true
    })
    //屏幕宽度
    var sysInfo = wx.getSystemInfoSync()
    that.setData({
      windowWidth: sysInfo.windowWidth,
    })
    that.ctx = wx.createCameraContext()

    // 每次更新access_token
    wx.request({
      url: "https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=" + app.globalData.baiduapikey + "&client_secret=" + app.globalData.baidusecretkey,
      method: 'POST',
      dataType: "json",
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // console.log(res.data.access_token);
        // app.globalData.access_token = res.data.access_token;
        that.setData({
          access_token: res.data.access_token
        });
      }
    })
    wx.hideLoading()

  },

  onReady: function () {
  },

  track(e) {
    var that = this
    if (e.target.dataset.trackshow == "一键录入") {
      that.setData({
        trackshow: "结束",
        canvasshow: true
      })
      that.takePhoto()
      that.interval = setInterval(this.takePhoto, 500)
    } else {
      clearInterval(that.interval)
      that.setData({
        trackshow: "一键录入",
        canvasshow: false
      })
    }
  },

  takePhoto() {
    var that = this
    var takephonewidth
    var takephoneheight
    var tmpfile
    that.ctx.takePhoto({
      quality: 'low',
      success: (res) => {
        // console.log(res.tempImagePath),
        // 获取图片真实宽高
        wx.getImageInfo({
          src: res.tempImagePath,
          success: function (res) {
            takephonewidth = res.width,
              takephoneheight = res.height
          }
        })

        // console.log(takephonewidth, takephoneheight)
        wx.getFileSystemManager().readFile({
          filePath: res.tempImagePath, //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            // console.log('data:image/png;base64,' + res.data),

            tmpfile = res.data;  // 暂存临时文件路径

            wx.request({
              url: "https://aip.baidubce.com/rest/2.0/face/v3/detect?access_token=" + that.data.access_token,
              data: {
                image: res.data,
                image_type: "BASE64",
                max_face_num: 1,
                face_field: 'quality',
              },
              method: 'POST',
              dataType: "json",
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {
                
                
                console.log(res.data);
                // console.log('rate:\t', utils.feature_rate(res.data))

                // 若合格的人像数据样本数量达到阈值 10 时，查找最优的人像文件
                let tempfile_list = that.data.face_imgs;
                if (that.data.face_imgs.length >= 10){
                  var feature_num = 1000;
                  var _base64_data;
                  for (let i=0; i <tempfile_list.length; i++){
                      var _data = tempfile_list[i].split('@@@@@')
                      var tmp_num = parseFloat(_data[0]);
                      var tmp_data = _data[1]
                      if (feature_num > tmp_num){
                        feature_num = tmp_num;
                        _base64_data = tmp_data;
                      }
                  }

                  console.log('最优人像数据得分:\t', feature_num);
                  console.log(wx.getStorageSync('jwt_token'))
                  wx.request({
                    url: utils.http_urls.face_record, //仅为示例，非真实的接口地址
                    method: "POST",
                    data: {
                      token: wx.getStorageSync('jwt_token'),
                      base64_face: _base64_data,
                      face_token: res.data.result.face_list[0].face_token,
                    },
                    success(res) {
                      //do something
                      console.log(res)
                      let icon = 'none'
                      if (res.data.r == 0){
                          icon = 'success'
                      }

                      // 清理人像缓存
                      that.setData({
                        face_imgs: [],
                      })

                      wx.showToast({
                        title: res.data.errmsg,
                        icon: icon,
                        duration: 1500,
                      })

                      if (icon == 'success'){
                        clearInterval(that.interval)
                        wx.navigateBack({
                          delta: 1,
                        })
                        
                      }
                    }
                  })

                  clearInterval(that.interval)
                  that.setData({
                    trackshow: "一键录入",
                    canvasshow: false,
                  })
                  return

                }


                // 获取人脸质量，这里需要连续采集50张高质量人像图
                let _score = utils.feature_rate(res.data)
                if (_score < 30){
                  let cache_item = _score + '@@@@@' + tmpfile
                  // console.log(cache_item, '\t人像数据合格...', );
                  that.data.face_imgs.push(cache_item);
                }


                if (res.data.error_code === 0) {
                  var ctx = wx.createContext()
                  ctx.setStrokeStyle('#0052d9')
                  ctx.lineWidth = 3
                  for (let j = 0; j < res.data.result.face_num; j++) {
                    var cavansl = res.data.result.face_list[j].location.left / takephonewidth * that.data.windowWidth
                    var cavanst = res.data.result.face_list[j].location.top / takephoneheight * that.data.windowWidth
                    var cavansw = res.data.result.face_list[j].location.width / takephonewidth * that.data.windowWidth
                    var cavansh = res.data.result.face_list[j].location.height / takephoneheight * that.data.windowWidth
                    ctx.strokeRect(cavansl, cavanst, cavansw, cavansh)
                  }
                  wx.drawCanvas({
                    canvasId: 'canvas',
                    actions: ctx.getActions()
                  })
                } else {
                  var ctx = wx.createContext()
                  ctx.setStrokeStyle('#0052d9')
                  ctx.lineWidth = 3
                  wx.drawCanvas({
                    canvasId: 'canvas',
                    actions: ctx.getActions()
                  })
                }
              },
            })

          }
        })
      }
    })
  },



  onUnload: function () {
    var that = this
    clearInterval(that.interval)
  },

  error(e) {
    console.log(e.detail)
  },


})
