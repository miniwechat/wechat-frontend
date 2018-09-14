<template>
  <div>
    <div class="tag-out">
      二维码
      <div class="tag-inside"></div>
    </div>
    <!--<div class="userinfo" @click="bindViewTap">-->
      <!--<img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />-->
      <!--<div class="userinfo-nickname">-->
        <!--<card :text="userInfo.nickName"></card>-->
      <!--</div>-->
    <!--</div>-->

    <!--<div class="usermotto">-->
      <!--<div class="user-motto">-->
        <!--<card :text="motto"></card>-->
      <!--</div>-->
    <!--</div>-->

    <div>
      <button style="margin-left: 20px;margin-top: 5px"@click="click" type="default" size="mini">扫描二维码</button>
      <div class="scanMessage-list" style="margin: 10px" v-if="show">
        <div class="weui-flex">
          <div class="weui-flex__item"><div class="placeholder">经度</div></div>
          <div class="weui-flex__item"><div class="placeholder">维度</div></div>
          <div class="weui-flex__item"><div class="placeholder">时间</div></div>
        </div>
        <div class="weui-flex">
          <div class="weui-flex__item"><div class="placeholder">{{lot}}</div></div>
          <div class="weui-flex__item"><div class="placeholder">{{lat}}</div></div>
          <div class="weui-flex__item"><div class="placeholder">{{timestamp}}</div></div>
        </div>
      </div>
      <div>{{show}}</div>
      <button style="margin-left: 20px;margin-top: 5px" class="weui-btn mini-btn" type="default" size="mini" @click="updateScanMessage()">上传二维码信息</button>
    </div>

    <div class="split"></div>

    <div class="tag-out">
      信息
      <div class="tag-inside"></div>
    </div>

    <div style="margin-top: 10px;margin-left: 20px">
      <div class="picker_show">
        <picker @change="bindTimePickerChange" :value="timeIndex" :range="timeArray" class="choose_button">
          <button type="default" size="mini">
            选择信息时间段
          </button>
        </picker>
        <div class="choose_show"> 当前选择：{{timeArray[timeIndex]}}</div>
      </div>

      <div class="picker_show">
        <picker @change="bindCatePickerChange" :value="cateIndex" :range="cateArray" class="choose_button">
          <button type="default" size="mini">
            获取信息的类型
          </button>
        </picker>
        <div class="choose_show"> 当前选择：{{cateArray[cateIndex]}}</div>
      </div>
    </div>
    <button class="weui-btn mini-btn" style="margin-top: 5px;margin-left: 35%" type="default" size="mini" @click="queryScanMessage()">获取信息</button>

    <div class="scanMessage-list" style="margin: 5px;">
      <div class="weui-flex">
        <div class="weui-flex__item"><div class="placeholder">id</div></div>
        <div class="weui-flex__item"><div class="placeholder">经度</div></div>
        <div class="weui-flex__item"><div class="placeholder">维度</div></div>
      </div>
      <div class="weui-flex">
        <div class="weui-flex__item"><div class="placeholder">weui</div></div>
        <div class="weui-flex__item"><div class="placeholder">weui</div></div>
        <div class="weui-flex__item"><div class="placeholder">weui</div></div>
        <div class="weui-flex__item"><div class="placeholder">weui</div></div>
      </div>
    </div>

    <!--<button class="weui-btn mini-btn" type="default" size="mini" @click="queryRdSession()">获取登录信息</button>-->
    <!--<button class="weui-btn mini-btn" type="default" size="mini" v-if= "scanMessage" @click="updateScanMessage()">上传扫描信息</button>-->
    <!--<button class="weui-btn mini-btn" type="default" size="mini" @click="secret()">加解密按键</button>-->
  </div>

</template>

<script>
  import card from '@/components/card'
  // import CryptoJS from 'crypto-js/crypto-js'

  export default {
    data () {
      return {
        scanMessage: false,
        show: '',
        hasLocation: false,
        motto: 'Test-main',
        userInfo: {},
        rdSession: '',
        errMsg: '',
        timestamp: '2018-08-23',
        lat: '31.030629',
        lot: '121.449314',
        appId: '',
        timeArray: ['一个月', '一年'],
        cateArray: ['典型信息', '全部信息'],
        timeIndex: 0,
        cateIndex: 0,
        queryMessage: false,
        qtCode: false,
        qtCodeMessage: [],
        qtCodeDeMessage: [],
        decryptedData: ''
      }
    },

    components: {
      card
    },

    methods: {
      bindViewTap () {
        const url = '../logs/main'
        wx.navigateTo({ url })
      },
      click () {
        var that = this
        wx.scanCode({
          success: (res) => {
            wx.getLocation({
              success: (res) => {
                console.log(res)
                that.scanMessage = true
                that.lat = res.latitude
                that.lot = res.longitude
                var timestamp = Date.parse(new Date())
                var date = new Date(timestamp)
                var year = date.getFullYear()
                var month = date.getMonth() + 1
                var day = date.getDate()
                var hour = date.getHours()
                var minute = date.getMinutes()
                var second = date.getSeconds()
                that.show = '经度：' + that.lat + '纬度：' + that.lot + '时间：' + year + month + day + hour + minute + second
                that.timestamp = year + month + day + hour + minute + second
              }
            })
            console.log(this.lat)
            console.log(that.lat)
            this.setData({
              show: this.show
            })
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 2000
            })
          },
          fail: (res) => {
            wx.showToast({
              title: '失败',
              icon: 'success',
              duration: 2000
            })
          },
          complete: (res) => {
            console.log(res)
          }
        })
      },
      queryRdSession: function () {
        let that = this
        var config = require('../../../project.config')
        that.appId = config.appid
        wx.login({
          success: function (res) {
            wx.getSetting({
              success: (res) => {
                console.log(res)
              },
              fail: () => {
                console.log('setting fail')
              }
            })
            wx.request({
              url: 'http://192.168.19.164:3000/secret/frontcode/create/1?',
              data: {
                jsCode: res.code,
                appId: that.appId
              },
              success: function (res) {
                console.log(res)
                let sessionDate = res.data
                that.sessionStatus(sessionDate)
              },
              fail: function () {
                wx.showModal({
                  content: '发送会话请求失败'
                })
              }
            })
          },
          fail: function () {
            wx.showModal({
              content: '登录失败,请重试'
            })
          }
        })
      },
      sessionStatus: function (data) {
        let that = this
        if (data.status === 'error') {
          let errorCode = data.error_detail.errcode
          if (errorCode === 40029) {
            that.errMsg = '登录凭证获取失败'
          } else if (errorCode === 40013) {
            that.errMsg = '小程序AppId无效'
          } else if (errorCode === 40125) {
            that.errMsg = '小程序AppSecret无效'
          } else {
            that.errMsg = '请求数据失败，请重试'
          }
          wx.showModal({
            title: '获取会话密钥失败信息',
            content: this.errMsg
          })
        } else if (data.status === 'success') {
          wx.showModal({
            title: '获取会话密钥成功'
          })
          wx.setStorage({
            key: 'rdSession',
            data: data.watermark.rdSession
          })
        } else {
          wx.showModal({
            title: '请求密钥失败'
          })
        }
      },
      updateScanMessage: function () {
        let that = this
        wx.getSetting({
          success: (res) => {
            if (res.authSetting['scope.userInfo']) {
              wx.getUserInfo({
                success: function (res) {
                  console.log(res)
                  that.userInfo = res
                  let rdSession = wx.getStorageSync('rdSession')
                  console.log('rdSession' + rdSession)
                  if (rdSession.length === 0) {
                    // wx.showModal({
                    //   title: '用户授权信息',
                    //   content: '未成功获取会话密钥'
                    // })
                    that.queryRdSession()
                  } else {
                    wx.request({
                      url: 'http://192.168.19.164:3000/secret/frontcode/sign?',
                      data: {
                        rawData: that.userInfo.rawData,
                        signature: that.userInfo.signature,
                        rdSession: rdSession
                      },
                      success: function (res) {
                        console.log(res.data)
                        console.log('rdSession' + rdSession)
                        console.log('rdSession_key:' + res.data.watermark.rdSession_key)
                        console.log('rdSession_iv:' + res.data.watermark.rdSession_iv)
                        if (res.data.watermark.rdSession === rdSession) {
                          wx.setStorage({
                            key: 'rdSession_iv',
                            data: res.data.watermark.rdSession_iv
                          })
                          wx.setStorage({
                            key: 'rdSession_key',
                            data: res.data.watermark.rdSession_key
                          })
                        }
                        if (that.lot.length === 0 || that.lat.length === 0 || that.timestamp.length === 0) {
                          wx.showModal({
                            title: '二维码信息',
                            content: '二维码信息不完整，请重新扫描'
                          })
                        } else {
                          wx.request({
                            url: 'http://192.168.19.164:3000/secret/frontcode/scan?',
                            data: {
                              rdSession: rdSession,
                              rawData: that.userInfo.rawData,
                              signature: that.userInfo.signature,
                              lng: that.lot,
                              lat: '578',
                              timestamp: that.timestamp
                            },
                            success: function (res) {
                              console.log(res)
                              console.log(res.data)
                              if (res.data.status === 'successs') {
                                wx.showModal({
                                  title: '加密存储',
                                  content: res.data.msg
                                })
                              } else {
                                wx.showModal({
                                  title: '加密存储',
                                  content: res.data.msg
                                })
                              }
                            }
                          })
                        }
                      }
                    })
                  }
                }
              })
            } else {
              wx.showModal({
                content: '获取用户信息失败，请打开授权'
              })
            }
          },
          fail: () => {
            wx.showModal({
              content: '获取授权信息失败'
            })
          }
        })
      },
      queryScanMessage: function () {
        let that = this
        let rdSession = wx.getStorageSync('rdSession')
        let key = wx.getStorageSync('rdSession_key')
        let iv = wx.getStorageSync('rdSession_iv')
        if (rdSession.length === 0 || key.length === 0 || iv.length === 0) {
          // wx.showModal({
          //   content: '会话密钥不存在'
          // })
          that.queryRdSession()
        } else {
          wx.request({
            url: 'http://192.168.19.164:3000/api/scan/index?',
            data: {
              rdSession: rdSession,
              time: that.timeIndex,
              cate: that.cateIndex
            },
            success: function (res) {
              // console.log(res.data.result)
              if (res.data.status === 'success' && res.data.result.length > 0) {
                that.qtCode = true
                that.qtCodeMessage = res.data.result
                that.qtCodeDeMessage = that.qtCodeMessage
                console.log(that.qtCodeMessage)
                for (let i = 0; i < that.qtCodeMessage.length; i++) {
                  that.decode(that.qtCodeDeMessage[i].lng, rdSession, key, iv)
                  console.log(that.decode(that.decryptedData))
                  // that.qtCodeDeMessage[i].lng = 'test'
                  // that.qtCodeDeMessage[i].lat = that.decode(that.qtCodeDeMessage[i].lat, rdSession, key, iv)
                }
                // for (let index in that.qtCodeMessage) {
                //   that.qtCodeDeMessage[index].id = that.qtCodeDeMessage[index].id
                //   that.qtCodeDeMessage[index].lng = that.decode(that.qtCodeDeMessage[index].lng, rdSession, key, iv)
                //   that.qtCodeDeMessage[index].lat = that.decode(that.qtCodeDeMessage[index].lat, rdSession, key, iv)
                // }
              }
              console.log(that.qtCodeDeMessage)
              // console.log(res.data.result[0].lng)
              // let result = that.decode(res.data.result[0].lng, rdSession, key, iv)
              // console.log(result)
            },
            fail: function () {
              console.log('fail')
            }
          })
        }
      },
      decode: function (encryptedData, rdSession, key, iv) {
        let that = this
        let decryptedData = ''
        if (encryptedData.length > 0) {
          wx.request({
            url: 'http://192.168.19.164:3000/api/scan/decode?',
            data: {
              rdSession: rdSession,
              encryptedData: encryptedData,
              key: key,
              iv: iv
            },
            success: function (res) {
              console.log(res.data.result)
              that.decryptedData = res.data.result
              return that.decryptedData
            },
            fail: function () {
              // return false
            }
          })
        }
      },
      bindTimePickerChange: function (e) {
        let that = this
        that.timeIndex = e.mp.detail.value
      },
      bindCatePickerChange: function (e) {
        let that = this
        that.cateIndex = e.mp.detail.value
      }
    },

    created () {
      // 调用应用实例的方法获取全局数据
      // this.getUserInfo()
    },
    onLaunch () {
      console.log('onLauch')
    },
    onLoad () {
      let that = this
      let rdSession = wx.getStorageSync('rdSession')
      if (rdSession) {
        // that.queryRdSession()
        console.log('test')
      } else {
        that.queryRdSession()
      }
    }
  }
</script>

<style scoped>
  .userinfo {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .userinfo-avatar {
    width: 128rpx;
    height: 128rpx;
    margin: 20rpx;
    border-radius: 50%;
  }

  .userinfo-nickname {
    color: #aaa;
  }

  .usermotto {
    margin-top: 150px;
  }

  .form-control {
    display: block;
    padding: 0 12px;
    margin-bottom: 5px;
    border: 1px solid #ccc;
  }

  .counter {
    display: inline-block;
    margin: 10px auto;
    padding: 5px 10px;
    color: blue;
    border: 1px solid blue;
  }

  .picker_show {
    display: flex;
  }

  .choose_button {
    float: left;
  }

  .choose_show {
    float: left;
    margin-left: 3px;
    font-size: 17px;
  }

  .placeholder{
    margin: 5px;
    padding: 0 10px;
    text-align: center;
    background-color: #EBEBEB;
    height: 1.7em;
    line-height: 1.7em;
    color: dimgray;
  }

  .weui-flex {
    font-size: 13px;
    display: flex;
  }

  .weui-flex__item{
    flex: 1;
  }

  .scanMessage-list {
    border:3px dotted dodgerblue;
    border-radius:5px;
  }

  .split {
    background-color: #C7C7C7;
    height: 2px;
    width: 98%;
  }

  .tag-out {
    margin-top: 5px;
    width: 60px;
    height: 30px;
    background: lightgray;
    position: relative;
    font-size: 16px;
  }
  .tag-inside {
    /*margin-left: 30px;*/
    background-color: transparent;
    content:"test";
    position: absolute;
    left: 100%;
    top: 0px;
    width: 70px;
    /*height: 0;*/
    border-top: 15px solid transparent;
    border-left: 30px solid lightgray;
    border-bottom: 15px solid transparent;
  }

</style>
