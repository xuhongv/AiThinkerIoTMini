const app = getApp()
Page({
  data: {
    userInfo: null,
    hiddenmodalput: true, //重命名弹窗
    isShowOauth: false, //授权弹窗
    isShowLoading: true, //加载弹窗
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    cloudsDevices: [],
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://aithinker-static.oss-cn-shenzhen.aliyuncs.com/officialwebsite/banner/banner1.jpg'
    }, {
      id: 1,
      type: 'image',
      url: 'https://aithinker-static.oss-cn-shenzhen.aliyuncs.com/officialwebsite/banner/ESP-12K.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://aithinker-static.oss-cn-shenzhen.aliyuncs.com/officialwebsite/banner/banner32.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://aithinker-static.oss-cn-shenzhen.aliyuncs.com/officialwebsite/banner/banner3.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://aithinker-static.oss-cn-shenzhen.aliyuncs.com/officialwebsite/banner/banner4.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://aithinker-static.oss-cn-shenzhen.aliyuncs.com/officialwebsite/banner/banner6.jpg'
    }],
    newName: '',
    currentDevice: {},
  },
  callBackQCloudsMsgEvent(params) {
    let that = this
    //console.log('params:',JSON.stringify(params))
    this.setData({
      isShowLoading: false
    })
    switch (params.type) {
      //初始化失败，一般是未授权
      case this.sdk.QCloudType.EVENT_INIT_FAIL:
        this.setData({
          userInfo: null,
          isShowOauth: true
        })
        break;
      //授权成功，获取到了本用户的基本信息
      case this.sdk.QCloudType.EVENT_GET_USER_INFO:
        this.setData({
          userInfo: params.data,
          isShowOauth: false
        })
        break;
      //初始化成功
      case this.sdk.QCloudType.EVENT_INIT_SUCCESS:
        //请求发送获取设备列表
        this.sdk.notifyGetDeviceListEvent()
        break;
      //设备列表回调
      case this.sdk.QCloudType.EVENT_GET_DEVICE_LIST:
        //console.log('get device list ok = ', JSON.stringify(cloudsDevices:params.data))
        this.setData({ cloudsDevices: params.data })
        break;
      //设备重命名成功
      case this.sdk.QCloudType.EVENT_RENAME_OK:
        wx.showModal({
          title: '温馨提示',
          content: '重命名成功',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              that.onPullDownRefresh()
            }
          }
        })
        break;
      //解绑成功
      case this.sdk.QCloudType.EVENT_DELETE_OK:
        wx.showModal({
          title: '温馨提示',
          content: '解绑成功',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              that.onPullDownRefresh()
            }
          }
        })
        break;
      default:
        break;
    }
  },
  onLoad: function () {
    this.sdk = app.globalData.sdk;
    this.sdk.listenQCloudsMsgEvent(true, this.callBackQCloudsMsgEvent)
  },
  getUserInfo: function (detail) {
    if (!(detail && detail.errMsg && detail.errMsg.indexOf('auth deny') > -1)) {
      app.globalData.sdk.notifyReInitQCloud()
      app.globalData.userInfo = detail.detail.userInfo
      this.setData({
        userInfo: detail.detail.userInfo,
        isShowOauth: false
      })
    }
  },
  //隐藏授权弹窗
  hideModal() {
    this.setData({
      isShowOauth: false
    })
  },
  OnClickReName(e) {
    let device = this.data.cloudsDevices[parseInt(e.currentTarget.dataset.index)];
    //console.log("OnClickReName index:", JSON.stringify(device))
    this.setData({ hiddenmodalput: false, currentDevice: device, newName: '' })
    //console.log("confirm:" + this.data.currentDevice);

    //{ProductId,DeviceName,AliasName}

  },
  //取消按钮  
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  //动态获取重命名的设备名字
  inputNewName: function (e) {
    this.setData({
      newName: e.detail.value
    })
  },
  //重命名确认点击事件回调
  confirm: function () {
    this.setData({
      hiddenmodalput: true
    })
    console.log("confirm:" + this.data.newName);
    //console.log("confirm:" + this.data.currentDevice);
    console.log("OnClickReName index:", JSON.stringify(this.data.currentDevice))
    var that = this
    this.sdk.notifyUpdateDeviceName({
      ProductId: this.data.currentDevice.ProductId
      ,
      DeviceName: this.data.currentDevice.DeviceName
      ,
      AliasName: this.data.newName
    })

    // wx.request({
    //   url: app.globalData.httpQuestServer + '/api/mini/doActionReName',
    //   data: { //发送给后台的数据 
    //     newName: that.data.newName,
    //     mac: that.data.currentDevice.mac,
    //     type: that.data.currentDevice.type,
    //     userId: userID
    //   },
    //   method: "POST", //get为默认方法
    //   success: function(res) {
    //     console.log(res.data); //res.data相当于ajax里面的data,为后台返回的数据
    //     Toast('重命名成功');
    //     that.setData({
    //       cloudsDevices: res.data.data
    //     })
    //   },
    //   fail: function(err) {}, //请求失败
    //   complete: function() {} //请求完成后执行的函数
    // })
  },
  //解绑设备
  OnClickDelete(e) {
    let device = this.data.cloudsDevices[parseInt(e.currentTarget.dataset.index)];
    let that = this
    console.log('get device list ok = ', JSON.stringify(device))
    wx.showModal({
      title: '警告',
      content: '解绑设备后需重新配网绑定哦！',
      confirmColor: '#FF0000',
      confirmText: '解绑',
      success(res) {
        if (res.confirm) {
          that.sdk.notifyDeleteDevice({ DeviceName: device.DeviceName, ProductId: device.ProductId })
        }
      }
    })
  },
  OnClickInto(e) {

    let device = this.data.cloudsDevices[parseInt(e.currentTarget.dataset.target)];
    if (device.Online) {
      wx.navigateTo({
        url: '../devices/light/index?device=' + JSON.stringify(device),
      })
    }
  },

  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },

  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },

  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection == 'left') {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  },
  onUnload() {
    this.sdk.listenQCloudsMsgEvent(false, this.callBackQCloudsMsgEvent)
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },
  onPullDownRefresh: function () {
    wx.showLoading({
      title: '加载中'
    })
    //请求发送获取设备列表
    this.sdk.notifyGetDeviceListEvent()
    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
      wx.hideLoading({
        complete: (res) => { },
      })
    }, 1200);
  },
})
