const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    list: [],
    load: true
  },
  onLoad() {
   
    // if (typeof this.getTabBar === 'function' && this.getTabBar()) {
    //   this.getTabBar().hideTabBar()
    // }
    wx.showLoading({
      title: '加载中...',
      mask: true
    });

    let list = [
      {
        name: '电工照明', id: 0, devices: [
          { id: 0, name: "窗帘", des: '一键远程开机', url: "http://iotx-paas-admin.oss-cn-shanghai.aliyuncs.com/publish/image/1568613757827.png" }
          , { id: 1, name: "灯", des: '一键远程开机', url: "http://iotx-paas-admin.oss-cn-shanghai.aliyuncs.com/publish/image/1585738057372.png" }
          , { id: 2, name: "插座", des: '一键远程开机', url: "http://iotx-paas-admin.oss-cn-shanghai.aliyuncs.com/publish/image/1585737911180.png" }
          , { id: 3, name: "开关面板", des: '一键远程开机', url: "http://iotx-paas-admin.oss-cn-shanghai.aliyuncs.com/publish/image/1585737869517.png" }
          , { id: 4, name: "灭蚊器", des: '一键远程开机', url: "http://iotx-paas-admin.oss-cn-shanghai.aliyuncs.com/publish/image/1568972293729.png" }]
      }
      , {
        name: '家用电器', id: 1, devices: [{ id: 0, name: "空气净化器", des: '智能，便捷', url: "http://iotx-paas-admin.oss-cn-shanghai.aliyuncs.com/publish/image/1585735911905.png" }
          , { id: 1, name: "断路器", des: '智能，便捷', url: "http://iotx-paas-admin.oss-cn-shanghai.aliyuncs.com/publish/image/1559631642708.png" }
          , { id: 2, name: "电饭煲", des: '智能，便捷', url: "http://iotx-paas-admin.oss-cn-shanghai.aliyuncs.com/publish/image/1585737625713.png" }
          , { id: 3, name: "冰箱", des: '智能，便捷', url: "http://iotx-paas-admin.oss-cn-shanghai.aliyuncs.com/publish/image/1585736782834.png" }
          , { id: 4, name: "油烟机", des: '智能，便捷', url: "http://iotx-paas-admin.oss-cn-shanghai.aliyuncs.com/publish/image/1585737687733.png" }
          , { id: 5, name: "地暖", des: '智能，便捷', url: "http://iotx-paas-admin.oss-cn-shanghai.aliyuncs.com/publish/image/1585735982904.png" }
          , { id: 6, name: "净水器", des: '智能，便捷', url: "http://iotx-paas-admin.oss-cn-shanghai.aliyuncs.com/publish/image/1585735954567.png" }]
      }
      , {
        name: '运动健康', id: 2, devices: [
          { id: 0, name: "跑步机", des: '体验智能生活', url: "http://iotx-paas-admin.oss-cn-shanghai.aliyuncs.com/publish/image/1585735911905.png" }
          , { id: 1, name: "足浴盆", des: '智能，便捷', url: "http://iotx-paas-admin.oss-cn-shanghai.aliyuncs.com/publish/image/1559631642708.png" }]
      }
      , {
        name: '厨房电器', id: 3, devices: [
          { id: 0, name: "加湿器", des: '体验智能生活', url: "http://iotx-paas-admin.oss-cn-shanghai.aliyuncs.com/publish/image/1585736229287.png" }
          , { id: 1, name: "除湿器", des: '智能，便捷', url: "http://iotx-paas-admin.oss-cn-shanghai.aliyuncs.com/publish/image/1585736102768.png" }
          , { id: 1, name: "烤箱", des: '智能，便捷', url: "http://iotx-paas-admin.oss-cn-shanghai.aliyuncs.com/publish/image/1585736871022.png" }
          , { id: 1, name: "新风机", des: '智能，便捷', url: "http://iotx-paas-admin.oss-cn-shanghai.aliyuncs.com/publish/image/1585736041757.png" }]
      }
    ]
    this.setData({
      list: list,
      listCur: list[0]
    })
  },
  onReady() {
    wx.hideLoading()
  },
  onClickBack(){
    wx.switchTab({
      url: '../../index/index',
    })
  },
  onClick(res) {
    wx.navigateTo({
      url: '../ready/index',
    })
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  VerticalMain(e) {
    let that = this;
    let list = this.data.list;
    let tabHeight = 0;
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);
        view.fields({
          size: true
        }, data => {
          list[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          list[i].bottom = tabHeight;
        }).exec();
      }
      that.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        })
        return false
      }
    }
  }
})