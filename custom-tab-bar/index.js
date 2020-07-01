
Component({
  data: {
    selected:0,
    isShow:true,
    "color": "#a9b7b7",
    "selectedColor": "#000000",
    "borderStyle": "white",
    "list": [
      {
        "selectedIconPath": "/resoures/png/homeY.png",
        "iconPath": "/resoures/png/homeN.png",
        "pagePath": "/pages/index/index",
        "text": "首页"
      },
      {
        "heigher":true,
        "selectedIconPath": "/resoures/png/addY.jpg",
        "iconPath": "/resoures/png/addN.jpg",
        "pagePath": "/pages/add/index/index",
        "text": "添加"
      },
      {
        "selectedIconPath": "/resoures/png/myY.png",
        "iconPath": "/resoures/png/myN.png",
        "pagePath": "/pages/me/me",
        "text": "我的"
      }
    ]
    
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      this.setData({
        selected:data.index
      })
      wx.switchTab({url})
    },
    hideTabBar(){
      this.setData({
        isShow:false
      })
    }
  }
})