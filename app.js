let AiThinkerQCloudSDK = require('./third/lib/Ai-QcloudDevSDK.min');
const QcloudIotModel = require('./third/lib/model.min');

const MiniConfig = {
  isDebug: false,
  appKey: 'mvdSxKJeAZUDKQerD'
}
App({
  onLaunch: function () {
    let that = this
    //隐藏系统tabbar
    // wx.getSystemInfo({
    //   success: e => {
    //     this.globalData.StatusBar = e.statusBarHeight;
    //     let custom = wx.getMenuButtonBoundingClientRect();
    //     this.globalData.Custom = custom;
    //     this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
    //   }
    // })


    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
          this.globalData.Custom = capsule;
          this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
          this.globalData.CustomBar = e.statusBarHeight + 50;
        }
      }
    })

    wx.cloud.init({
      // 选择您云开发环境的环境id
      traceUser: true,
    });
    AiThinkerQCloudSDK.initQCloud(MiniConfig)
  },
  globalData: {
    userInfo: null,
    sdk: AiThinkerQCloudSDK,
  }
})