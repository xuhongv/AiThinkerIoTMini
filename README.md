
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


## 二、使用

- 1.首先登录腾讯物联开发平台 ```https://cloud.tencent.com/product/iotexplorer``` 注册认证账号，新建一个产品
- 2.为了方便，直接把 《images》下面的图片复制到自己到工程里面，以及把界面《bleConnect》也复制到自己到工程里面去；
- 3.蓝牙搜索附近设备展示列表，自行处理；最后要传给界面《bleConnect》到参数只有四个：

|参数|含义|
|----|----|
|deviceId|要连接的蓝牙设备的deviceId|
|ssid|要连接的路由器的名字|
|password|要连接的路由器的密码|
|callBackUri|自定义配网回调结果的界面（比如 /pages/index/index ）|

- 4.比如这样：

```
wx.navigateTo({
  url: '/pages/blueConnect/index?deviceId=123456&ssid=TP-xx&password=12345678&callBackUri=/pages/index/index"
  })
```
- 5.其中，当配网不管成功与否，都会带参数跳转到 callBackUri 这个定义的页面；参数名为 ```blufiResult``` 如下：

|参数|含义|
|----|----|
|true|配网成功|
|false|配网失败|

- 6.比如这样处理：

```
    //生命周期函数--监听页面加载 
    onLoad: function (options) {
        var that = this;
        if (options.blufiResult){
          var result = options.blufiResult === 'ok' ? "配网成功" : "配网失败";
          wx.showToast({
            title: result,
            icon: 'none',
            duration: 2000
          });
        }
     }
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

