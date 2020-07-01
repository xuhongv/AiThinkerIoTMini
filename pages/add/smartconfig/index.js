const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ssid: null,
    bssid: null,
    password: '',
    passwordType: 'password',
    defaultType: true,
    disableButton: true,
  },
  callBackQCloudsMsgEvent(params) {
    switch (params.type) {
      case this.sdk.QCloudType.EVENT_CONFIG_FAIL:
        wx.hideLoading({
          complete: (res) => {
            // 提示框
            wx.showModal({
              title: '配网失败',
              content: '检查密码是否正确',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  wx.switchTab({
                    url: '../../index/index',
                  })
                }
              }
            })
          },
        })


        break;
      case this.sdk.QCloudType.EVENT_CONFIG_START:
        wx.hideLoading({
          complete: (res) => {
            wx.showLoading({
              title: '配网开始',
              mask: true
            })
          },
        })
        break;
      case this.sdk.QCloudType.EVENT_CONFIG_OK:
        wx.hideLoading({
          complete: (res) => {
            wx.showLoading({
              title: '正在绑定',
              mask: true
            })
          },
        })
        break;
      case this.sdk.QCloudType.EVENT_CONFIG_ADD_OK:
        console.log("EVENT_CONFIG_ADD_OK")
        wx.hideLoading({
          complete: (res) => {
            // 提示框
            wx.showModal({
              title: '恭喜',
              content: '绑定设备成功',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  wx.switchTab({
                    url: '../../index/index',
                  })
                }
              }
            })
          },
        })
        break;

      default:
        break;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.onWifiConnected((res) => {
    //   console.log("res:", JSON.stringify(res))
    // })
    this.sdk = app.globalData.sdk;
    this.sdk.listenQCloudsMsgEvent(true, this.callBackQCloudsMsgEvent)

  },
  bindKeyInput: function (e) {
    this.setData({
      password: e.detail.value
    })
    //判断ssid是否有效
    if (this.data.ssid && this.data.password) {
      this.setData({
        disableButton: false
      })
    } else {
      this.setData({
        disableButton: true
      })
    }
  },
  onShow() {
    let that = this
    wx.startWifi({
      success(res) {
        console.log(res.errMsg, 'wifi初始化成功')
        that.getWifiInfo();
      },
      fail: function (res) {
        wx.showToast({
          title: '请连接路由器!',
          duration: 2000,
          icon: 'none'
        })
      }
    })
    this.getWifiInfo()
  },
  getWifiInfo() {
    let that = this
    wx.getConnectedWifi({
      success(res) {
        console.log("getConnectedWifi ok:", JSON.stringify(res))
        if ('getConnectedWifi:ok' === res.errMsg) {
          that.setData({
            ssid: res.wifi.SSID,
            bssid: res.wifi.BSSID
          })
        } else {
          wx.showToast({
            title: '请连接路由器',
            duration: 2000,
            icon: 'none'
          })
        }
      }, fail(res) {
        wx.showToast({
          title: '请连接路由器',
          duration: 2000,
          icon: 'none'
        })
      }
    })
  },
  OnClikStart() {
    // console.log("ssid:", this.data.ssid)
    // console.log("password:", this.data.password)
    // console.log("bssid:", this.data.bssid)
    let that = this
    this.sdk.notifyStartSmartConfig({
      type: "smartconfig",
      ssid: that.data.ssid,
      password: that.data.password,
      bssid: that.data.bssid,
    })
    wx.showLoading({
      title: '启动配网中',
      mask: true
    })
  },
  switch_pwd() {
    this.data.defaultType = !this.data.defaultType
    this.data.passwordType = !this.data.passwordType
    this.setData({
      defaultType: this.data.defaultType,
      passwordType: this.data.passwordType
    })
  },
})