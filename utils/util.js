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
// 'http://134.175.27.71:8080'
const http_domain = 'http://localhost:8000'

const http_urls = {

  // 登录或注册
  register: http_domain + '/api/v1/wx_client/',

  // 上传人脸数据
  face_record: http_domain + '/api/v1/wx_client/face_feature/record',

  // `首页`

  // `课程圈`

  // `搜索`
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



module.exports = {
  http_urls: http_urls,
  formatTime: formatTime,
  login: login,
  feature_rate: feature_rate,
}
