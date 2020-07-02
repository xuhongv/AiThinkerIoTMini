let AiThinkerQCloudSDK = require('./third/lib/Ai-QcloudDevSDK.min');
const QcloudIotModel = require('./third/lib/model.min');

const MiniConfig = {
  isDebug: false,
  ProductId: '', //FRAFS6OMDH
  // 物联网开发平台 - 应用开发中申请的微信小程序的AppKey及AppSecret
  appKey: 'mvdSxKJeAZUDKQerD',// 向军 mrlTtwMOjLbkKpRan ； 徐宏 mvdSxKJeAZUDKQerD  陈聪 mSuiyhEeFuEPdvCRj
	appSecret: 'dzrXdGvDDywKROWsVXmF',// 向军 QeqqoiWqqqqSNhCTQPMJ ； 徐宏 dzrXdGvDDywKROWsVXmF 陈聪 LJmnNiqmExAFAiblPLvw
}
App({
  onLaunch: function () {
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