import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['pages/index/main', 'pages/bluetooth/main', 'pages/logs/main', '^pages/picture/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      // selectedColor: '#1296db',
      selectedColor: '#096DD9',
      borderStyle: 'black',
      list: [{
        pagePath: 'pages/index/main',
        text: '二维码',
        iconPath: 'static/images/qr-code.png',
        selectedIconPath: 'static/images/qr-code-blue.png'
      }, {
        pagePath: 'pages/picture/main',
        text: '图片收集',
        iconPath: 'static/images/image.png',
        selectedIconPath: 'static/images/image-blue.png'
      }, {
        pagePath: 'pages/bluetooth/main',
        text: '蓝牙',
        iconPath: 'static/images/bluetooth.png',
        selectedIconPath: 'static/images/bluetooth-blue.png'
      }, {
        pagePath: 'pages/index/main',
        text: '广播信息',
        iconPath: 'static/images/broadcast.png',
        selectedIconPath: 'static/images/broadcast-blue.png'
      }, {
        pagePath: 'pages/index/main',
        text: '智能硬件',
        iconPath: 'static/images/hardware.png',
        selectedIconPath: 'static/images/hardware-blue.png'
      }]
    }
  }
}
