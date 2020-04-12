const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 'https://www.kisunning.cn',
// 'http://134.175.27.71:8008'
// 'http://localhost:8000'
const http_domain = 'http://134.175.27.71:8008'

const http_urls = {

  // 登录或注册
  register: http_domain + '/api/v1/wx_client/',

  // 上传人脸数据
  face_record: http_domain + '/api/v1/wx_client/face_feature/record',

  // 创建班课 - 获取课程分类数据
  subject_classifies: http_domain + '/api/v1/wx_client/lesson/subjects-classifies',

  // 班课/创建/加入
  create_lesson: http_domain + '/api/v1/wx_client/lesson/',

  // 班课首页
  lesson_index: http_domain + '/api/v1/wx_client/lesson-index/overview/',

  // saying
  saying: http_domain + '/api/v1/wx_client/saying/',

  // 文件上传下载
  file_controller: http_domain + '/api/v1/wx_client/file/',

}

function login(res_code, user_info){

  // 出现加载条
  wx.showToast({
    title: '正在登录...',
    icon: 'loading',
    mask: true,
    duration: 4000,
  })

  // 登录
  wx.login({
    success: res => {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      // console.log('JWToken:\t',res)
      wx.request({
        url: http_urls.register,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          code: res.code,
          user_info: user_info,
        },
        success: function (ret) {
          console.log('jwtoken:\t', ret)

          if (ret.data.r == 0){
            let token = ret.data.data;   // 服务端派发的jwtoken
            wx.setStorage({
              key: 'jwt_token',
              data: token,
            })

            wx.hideToast();
            wx.showToast({
              title: '登陆成功',
              icon: 'success',
              duration: 1000,
            })

            return true

          }

        }
      })

    }
  })
}


function feature_rate(detect_ret) {
  /* 人脸质量值
  返回值结构
  {
    "error_code":0,
    "error_msg":"SUCCESS",
    "log_id":7520115555589,
    "timestamp":1585142864,
    "cached":0,
    "result":{
      "face_num":1,
      "face_list":[
        {
          "face_token":"b1c9f5ffb287fdaebffd54a0efe3100c",
          "location":{
            "left":-3.16,
            "top":172.57,
            "width":153,
            "height":153,
            "rotation":-8
          },
          "face_probability":1,
          "angle":{
            "yaw":32.67,
            "pitch":15.31,
            "roll":-13.76
          },
          "quality":{
            "occlusion":{
              "left_eye":0.03,
              "right_eye":0,
              "nose":0,
              "mouth":0,
              "left_cheek":0.07,
              "right_cheek":0,
              "chin_contour":0
            },
            "blur":0.9,
            "illumination":80,
            "completeness":0
          }
        }
      ]
    }
  }

  人脸质量计算逻辑
    * 遮挡范围occlusion：   小于0.3
    * 木弧度范围blur:       小于0.2
    * 光照范围illumination：小于40
    * completeness：       取1（人像完整）
  **/

  let feature_result = detect_ret.result
  if (feature_result == null) {
    return 1000
  }

  let quality_list = feature_result.face_list[0].quality
  let occlusion = [
    quality_list.occlusion.left_eye,
    quality_list.occlusion.right_eye,
    quality_list.occlusion.nose,
    quality_list.occlusion.mouth,
    quality_list.occlusion.left_cheek,
    quality_list.occlusion.right_cheek,
    quality_list.occlusion.chin_contour,
  ]

  let occlusion_res = 0 * 0.5
  let blur = quality_list.blur * 0.2
  let completion = quality_list.completeness
  let illumination = quality_list.illumination * 0.3

  for (let i = 0; i < occlusion.length; i++) {
    if (occlusion[i] < occlusion) {
      return 1000
    }
    occlusion_res += occlusion[i];
  }

  if (completion != 1) {
    return 1000
  }

  return occlusion_res + blur + illumination

}


// 获取我创建/听的班课
function fetch_lessons(){
  wx.request({
    url: http_urls.create_lesson,
    method: "GET",
    data: {
      token: wx.getStorageSync('jwt_token'),
    },
    success: function(response){
      // console.info('查询的班课信息:\t',response.data)
      return response.data
    }
  })
}

function image_preview(images){
  wx.previewImage({
    current: 0,
    urls: images,
  })
}


//上传方法
function upload_file_server(url, that, upload_picture_list, j) {
  console.log('上传至\t', url)
  //上传返回值
  const upload_task = wx.uploadFile({
    // 模拟https
    url: url, //需要用HTTPS，同时在微信公众平台后台添加服务器地址  
    filePath: upload_picture_list[j]['path'], //上传的文件本地地址    
    name: upload_picture_list[j]['path'],
    formData: {
      'mode': false,
      'token': wx.getStorageSync('jwt_token'),
    },
    //附近数据，这里为路径     
    success: function (res) {

      var data = JSON.parse(res.data);
      // //字符串转化为JSON  
      if (data.Success == true) {

        var filename = data.file //存储地址 显示

        upload_picture_list[j]['path_server'] = filename
      } else {
        upload_picture_list[j]['path_server'] = filename
      }
      that.setData({
        upload_picture_list: upload_picture_list
      });

      wx.setStorageSync('imgs', upload_picture_list);
    }
  })
  //上传 进度方法
  upload_task.onProgressUpdate((res) => {
    upload_picture_list[j]['upload_percent'] = res.progress
    that.setData({
      upload_picture_list: upload_picture_list
    });
  });
}

module.exports = {
  http_urls: http_urls,
  formatTime: formatTime,
  login: login,
  feature_rate: feature_rate,
  fetch_lessons: fetch_lessons,
  image_preview: image_preview,
  upload_file_server: upload_file_server,
}
