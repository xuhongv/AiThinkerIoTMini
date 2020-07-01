const app = getApp()
let colorPickerCtx = {};
let sliderCtx = {};
let _this = null
const util = require('../../../third/common/color')
let base64 = require('../../../third/common/base64.js');
/***
**  每个产品的属性都是唯一的，可从腾讯物联开发平台后台获取
**  电灯开关 power_switch 布尔型:[0,1]
**  颜色 color 枚举型	[ 0 - Red , 1 - Green, 2 - Blue]
**  亮度 brightness  [ 0 ，100 ]
**  色温 ColorTemperature  [ 0 ，100 ]
**/

Page({
  data: {
    device: null,
    pickColor: null,
    raduis: 550,
    valueWidthOrHerght: 0,
    ValuePower: false,
    ValueLuminance: '0',
    ValueColorTemperature: '0',
  },

  callBackQCloudsMsgEvent(params) {
    switch (params.type) {
      case this.sdk.QCloudType.EVENT_GET_DEVICE_STATE:
        if (params.data)
          this.parseDeviceShadow(params.data)
        break;
      case this.sdk.QCloudType.EVENT_DEVICE_UPDATE:
        //判断是否当前页面设备的回复
        if (this.data.device.DeviceId === params.data.params.DeviceId) {
          let Payload = JSON.parse(base64.decode(params.data.params.Payload))
          if (Payload.params) this.parseDeviceStatus(Payload.params)
          
        }
        break;
      default:
        break;
    }

  },
  onLoad: function (options) {
    //把字符串转为json对象
    options.device = JSON.parse(options.device)
    this.setData({
      device: options.device
    })
    console.log("OnClickInto options:", JSON.stringify(options))
    this.sdk = app.globalData.sdk;
    this.sdk.listenQCloudsMsgEvent(true, this.callBackQCloudsMsgEvent)
    this.sdk.notifyGetThisDeviceLastStatus([this.data.device.DeviceId])
    //ui
    _this = this
    colorPickerCtx = wx.createCanvasContext('colorPicker');
    colorPickerCtx.fillStyle = 'rgb(255, 255, 255)';
    sliderCtx = wx.createCanvasContext('colorPickerSlider');
    let isInit = true;
    wx.createSelectorQuery().select('#colorPicker').boundingClientRect(function (rect) {
      _this.setData({
        valueWidthOrHerght: rect.width,
      })
      if (isInit) {
        colorPickerCtx.fillRect(0, 0, rect.width, rect.height);
        util.drawRing(colorPickerCtx, rect.width, rect.height);
        // 设置默认位置
        util.drawSlider(sliderCtx, rect.width, rect.height, 1.0);
        isInit = false;
      }
      _this.setData({
        pickColor: JSON.stringify({
          red: 255,
          green: 0,
          blue: 0
        })
      })
    }).exec();
  },
  parseDeviceShadow(params) {
    let data = params[this.data.device.DeviceId];
    let h = util.rgb2hsl(data.Red.Value, data.Green.Value, data.Blue.Value);
    util.drawSlider(sliderCtx, _this.data.valueWidthOrHerght, _this.data.valueWidthOrHerght, h[0]);
    this.setData({
      ValuePower: data.power_switch.Value,
      ValueLuminance: data.brightness.Value,
      ValueColorTemperature: data.ColorTemperature.Value,
      pickColor: JSON.stringify({
        red: data.Red.Value,
        green: data.Green.Value,
        blue: data.Blue.Value,
      })
    })
  },
  parseDeviceStatus(data) {
    console.log('设备实时状态推送:', JSON.stringify(data))
    if (data.power_switch!==undefined) {
      this.setData({
        ValuePower: data.power_switch,
      })
    }

    if (data.ColorTemperature!==undefined) {
      this.setData({
        ValueColorTemperature: data.ColorTemperature,
      })
    }

    if (data.brightness!==undefined) {
      this.setData({
        ValueLuminance: data.brightness,
      })
    }

    if (data.Red!==undefined && data.Blue!==undefined && data.Green!==undefined) {
      let h = util.rgb2hsl(data.Red, data.Green, data.Blue);
      util.drawSlider(sliderCtx, _this.data.valueWidthOrHerght, _this.data.valueWidthOrHerght, h[0]);
      this.setData({
        pickColor: JSON.stringify({
          red: data.Red,
          green: data.Green,
          blue: data.Blue,
        })
      })
    }

  },
  onUnload() {
    this.sdk.listenQCloudsMsgEvent(false, this.callBackQCloudsMsgEvent)
  },
  onSlide: function (e) {
    let that = this;
    if (e.touches && (e.type === 'touchend')) {
      console.log("ok");
      let x = e.changedTouches[0].x;
      let y = e.changedTouches[0].y;
      if (e.type !== 'touchend') {
        x = e.touches[0].x;
        y = e.touches[0].y;
      }
      //复制画布上指定矩形的像素数据
      wx.canvasGetImageData({
        canvasId: "colorPicker",
        x: x,
        y: y,
        width: 1,
        height: 1,
        success(res) {
          // 转换成hsl格式，获取旋转角度
          let h = util.rgb2hsl(res.data[0], res.data[1], res.data[2]);
          that.setData({
            pickColor: JSON.stringify({
              red: res.data[0],
              green: res.data[1],
              blue: res.data[2]
            })
          })
          that.controlCommon({
            Red: res.data[0],
            Green: res.data[1],
            Blue: res.data[2],
          })
          // 判断是否在圈内
          if (h[1] !== 1.0) {
            return;
          }
          util.drawSlider(sliderCtx, _this.data.valueWidthOrHerght, _this.data.valueWidthOrHerght, h[0]);
          // 设置设备
          if (e.type !== 'touchEnd') {
            // 触摸结束才设置设备属性
            return;
          }
        }
      });
    }
  },
  SetPower(e) {
    this.controlCommon({ "power_switch": e.detail.value ? 1 : 0 })
  },
  SetLuminance(e) {
    //console.log(e.detail.value)
    this.controlCommon({ "brightness": e.detail.value })
  }
  ,
  SetColorTemperature(e) {
    this.controlCommon({ "ColorTemperature": e.detail.value })
  },
  controlCommon(payload) {
    // { ProductId, DeviceName, payload }
    this.sdk.notifyControlThisDevice({
      ProductId: this.data.device.ProductId, DeviceName: this.data.device.DeviceName, payload
    })
  }
})