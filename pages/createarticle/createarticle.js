// pages/createarticle/createarticle.js
const util = require('../../utils/util.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    upload_picture_list: [],
    address: {},
    has_addr: false,
    upload_length: 0,
    errmsg: '',
    word_count: 0,
    content: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.sliderightshow(this, 'slide_show', -300, 1)
    setTimeout(function () {
      app.sliderightshow(this, 'slide_show', 0, 1)
    }.bind(this), 300);
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
   * 用户点击获取当前位置
   */
  get_address: function(e){
    let that = this
    wx.getLocation({
      type: "wgs84",
      success(res) {
        console.log('当前位置信息', res)
        wx.chooseLocation({
          latitude: res.latitude,
          longitude: res.longitude,
          success: function (data) {
            console.log('选择的地址信息：', data)
            that.setData({
              address: data,
              has_addr: true,
            })
          }
        })
      },

      fail: function(res){
        console.log('获取位置信息失败', res)
        wx.showToast({
          title: '失败: ' + res.errMsg,
          icon: 'none',
          duration: 1500,
        })
      },
    })
  },



  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      }
    })
  },


  previewImage: function (e) {
    let that = this
    let image_list = that.data.upload_picture_list
    var cur_img;
    var view_list = [];

    for (var i in image_list){
      if (image_list[i].path_server != ''){
        view_list.push(image_list[i].path_server);
      }
    }

    wx.previewImage({
      current: e.currentTarget.dataset.image, // 当前显示图片的http链接
      urls: view_list // 需要预览的图片http链接列表
    })
  },


  //选择图片方法
  uploadpic: function (e) {
    var that = this //获取上下文
    var upload_picture_list = that.data.upload_picture_list
    //选择图片
    wx.chooseImage({
      count: parseInt(6 - that.data.upload_length),
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFiles = res.tempFiles
        console.log('res:\t', res)
        //把选择的图片 添加到集合里
        for (var i in tempFiles) {
          tempFiles[i]['upload_percent'] = 0

          var file_item = {
            tmp_file: tempFiles[i].path,
            upload_percent: 0,
            path_server: '',
          }

          upload_picture_list.push(file_item)
          const key = upload_picture_list.length - 1

          if (that.data.upload_length < 6) {
            // 上传至服务器
            const upload_task = wx.uploadFile({
              url: util.http_urls.file_controller, 
              filePath: tempFiles[i].path,    
              name: 'file',
              formData: {
                'mode': 'wx',
                'token': wx.getStorageSync('jwt_token'),
              },

              success: function (succes_ret) {
                console.log(succes_ret)
                var ret = JSON.parse(succes_ret.data);
                console.log('server response:\t', ret)
                if (ret.r == '0') {
                  upload_picture_list[key]['path_server'] = ret.data.url

                  that.setData({
                    upload_picture_list: upload_picture_list,
                    upload_length: that.data.upload_length + 1
                  })

                }
              }
            })

            //上传 进度方法
            upload_task.onProgressUpdate((res) => {
              upload_picture_list[key]['upload_percent'] = res.progress

              that.setData({
                upload_picture_list: upload_picture_list
              })

            });
          }else{
            
            wx.showToast({
              title: '最多上传6张呢',
            })

          }

        }

        // //显示
        // that.setData({
        //   upload_picture_list: upload_picture_list,
        // });

        // 选择几张就上传几张
        // for (var i in )

      }
    })
  },

  //点击上传事件
  uploadimage: function () {
    var page = this
    var upload_picture_list = page.data.upload_picture_list
    //循环把图片上传到服务器 并显示进度       
    for (var j in upload_picture_list) {
      if (upload_picture_list[j]['upload_percent'] == 0) {
        //调用函数
        util.upload_file_server(util.http_urls.file_controller, page, upload_picture_list, j)
      }
    }
  },

  // 删除图片
  deleteImg: function (e) {
    let that = this
    let upload_picture_list = this.data.upload_picture_list;
    let index = parseInt(e.currentTarget.dataset.index);
    upload_picture_list.splice(index, 1);
    this.setData({
      upload_picture_list: upload_picture_list,
      upload_length: that.data.upload_length - 1,
    });
  },

  // 输入说说内容
  article_input: function(res){
   this.setData({
     word_count: res.detail.cursor,
     content: res.detail.value,
   })
  },

  // 发布说说
  pub_article: function(e){
    let that = this
    var images = []
    for(var i in that.data.upload_picture_list){
      if (that.data.upload_picture_list[i].path_server != ''){
        images.push(that.data.upload_picture_list[i].path_server)
      }
    }

    if(that.data.word_count==0 || images.length==0){
      wx.showToast({
        title: '说点什么吧',
        icon: '',
        duration: 2000,
      })
    }

    var address
    if (that.data.address == null){
      address = '{}'
    }else{
      address = JSON.stringify(that.data.address)
    }

    wx.request({
      url: util.http_urls.saying,
      method: "POST",
      data: {
        content: that.data.content,
        related_files: JSON.stringify(images),
        ext_info: address,
        token: wx.getStorageSync('jwt_token')
      },
      success: function(e){
        if (e.data.r == 0){
          wx.showToast({
            title: '发布成功！',
            duration: 2000,
            mask: 'true',
          });

          wx.navigateTo({
            url: '../index/index?currentTab=1', // 回到说说页面
          })
        }
      }
    })

  }

})
