const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl:'./user-unlogin.png',
    userInfo: '未登录',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     // 获取用户信息
     wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo.nickName
              })
            }
          })
        }
      }
    })
  },
  onShow(){
    if(typeof this.getTabBar==='function' && this.getTabBar()){
      this.getTabBar().setData({
        selected:2
      })
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  },
  getUserInfo: function(detail) {
    if (!(detail && detail.errMsg && detail.errMsg.indexOf('auth deny') > -1)){ 
    app.globalData.sdk.notifyReInitQCloud()
    this.setData({
      avatarUrl:detail.detail.userInfo.avatarUrl,
      userInfo: detail.detail.userInfo.nickName
    })
  }
  },
})