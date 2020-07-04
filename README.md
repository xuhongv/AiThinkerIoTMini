
<p align="center">
    <img class="QR-img" src="https://docs.ai-thinker.com/_media/esp8266/docs/gh_b486321d51a4_860.jpg">
</p>

<div align="center"> <span class="logo" > 安信可IoT小程序 </span> </div>

<div class="row" />
<div align="center">
  <span class="desc" >微信小程序一站式smartconfig配网/绑定/控制设备</span> 
</div>


## 维护日志，版本修订；

|版本|修改时间|更新日志|
|----|----|----|
|V2.0|2020.7.4|初次发布|



# 目录

- [一、简介](#Introduction)  
- [1.目的](#aim)  
- [2.硬件准备](#hardwareprepare)  
- [3.阿里云平台准备](#aliyunprepare)  
- [4.环境搭建](#compileprepare)  
- [5.SDK 准备](#sdkprepare)  
- [6.编译&烧写&运行](#makeflash)  

# <span id = "Introduction">一、简介</span>


安信可IoT小程序是基于**腾讯物联开发平台**实现端到端的用户配网/绑定/控制ESP8266的微信小程序开源仓库，致力开源国内互联网。


[深圳安信可科技](https://www.ai-thinker.com/home)是国内优秀的模组商+方案商，设计高性价比智能联网模块，提供友好的SDK 二次开发接口；提供高性能、高可靠性、高可扩展性的物联网云，可快速接入第三方智能云平台;

[腾讯云物联网开发平台（IoT Explorer）](https://cloud.tencent.com/product/iotexplorer)为各行业的设备制造商、方案商及应用开发商提供一站式设备智能化服务。平台提供海量设备连接与管理能力及小程序应用开发能力，并打通腾讯云基础产品及 AI 能力，提升传统行业设备智能化的效率，降低用户的开发运维成本，助力用户业务发展。

安信可与腾讯物联合作打造基于安信可Wi-Fi ESP8266模块的全套方案，包括从跨平台的微信小程序配网/绑定/控制/分享设备，以及设备端ESP8266 SDK开发开源；


## 二、开发指导

### 2.1 腾讯物联开发平台配置

- 1.首先登录腾讯物联开发平台 ```https://cloud.tencent.com/product/iotexplorer``` 注册认证账号，新建一个产品，然后在自定义属性时候，导入我们提供的产品属性：[esp8266-rgb-light.json](resoures/esp8266-rgb-light.json)
- 2.再新建一个微信小程序应用以表示自主品牌小程序控制此设备，新建成功之后，拿到 **APP Key**和 **APP Secret** ，最后一步：务必关联当前产品，否则无法正常使用自主品牌小程序实现配网设备！
- 3.最后一步在**产品开发**-->**设备调试**，新建一个设备，拿到此设备的 **DeviceName/DeviceScrect/ProductID** ，这三个参数，类似阿里云三元组！

![newMini](resoures\newMini.png)

### 2.2  微信小程序导入步骤

微信小程序的二次开发，需要有一定的微信小程序开发基础，建议先入门微信小程序开发，在B站/CSDN学院/腾讯课堂学习都是不错的free入门选择之路！

1. 登录微信公众平台注册一个微信小程序： [https://mp.weixin.qq.com/cgi-bin/loginpage](https://mp.weixin.qq.com/cgi-bin/loginpage) ，根据自己的平台下载开发工具：[开发者下载页面](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
2. 此外，本仓库还涉及到小程序云开发，已为您写好云函数，只需要把云函数 **Clouds\login** 全部部署到小程序云即可轻松调用！

此外，还需要修改一些配置信息，请在 app.js 修换为您的！

```javascript
const MiniConfig = {
  //调试模式，打开之后显示底层log
  isDebug: false,
  //产品ID`
  roductId: '',
  // 物联网开发平台 - 应用开发中申请的微信小程序的AppKey及AppSecret`
  appKey: '',`
  appSecret: '',
}
```

小程序源码重要目录说明：

```

├─Clouds 小程序云函数根目录
│ ├─login  云函数login
├─custom-tab-bar 自定义底部 tarbar
├─pages 页面
│ ├─about 关于
│ ├─add 添加设备
│ │ ├─index 设备选择
│ │ ├─ready 设备确认
│ │ ├─smartconfig 配网
│ ├─basics 基础控件
│ │ ├─avatar 
│ │ └─ ... 更多UI控件目录
│ ├─devices 设备控制界面
│ │ ├─light 灯具控制界面
│ ├─index 程序入口界面，也是设备列表界面
│ ├─me 我的
├─resoures 资源静态文件夹
├─third 第三方SDK
│ ├─colorui 七彩控制UI库
│ ├─common 一些算法库
│ └─lib 安信可&&腾讯云SDK
```
## 三、安信可开源团队-- 开源微信物联网控制 一览表

|开源项目|地址|开源时间|
|----|----|----|
|微信小程序连接mqtt服务器，控制esp8266智能硬件|https://github.com/xuhongv/WeChatMiniEsp8266|2018.11|
|微信公众号airkiss配网以及近场发现在esp8266 rtos3.1 的实现|https://github.com/xuhongv/xLibEsp8266Rtos3.1AirKiss|2019.3|
|微信公众号airkiss配网以及近场发现在esp32 esp-idf 的实现|https://github.com/xuhongv/xLibEsp32IdfAirKiss|2019.9|
|微信小程序控制esp8266实现七彩效果项目源码| https://github.com/xuhongv/WCMiniColorSetForEsp8266|2019.9|
|微信小程序蓝牙配网blufi实现在esp32源码| https://github.com/xuhongv/BlufiEsp32WeChat|2019.11|
|微信小程序蓝牙ble控制esp32七彩灯效果| https://blog.csdn.net/xh870189248/article/details/101849759|2019.10|
|可商用的事件分发的微信小程序mqtt断线重连框架|https://blog.csdn.net/xh870189248/article/details/88718302|2019.2|
|微信小程序以 websocket 连接阿里云IOT物联网平台mqtt服务器|https://blog.csdn.net/xh870189248/article/details/91490697|2019.6|
|微信公众号网页实现连接mqtt服务器|https://blog.csdn.net/xh870189248/article/details/100738444|2019.9|

