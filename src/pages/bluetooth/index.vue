<template>
  <div class="bluetooth">
    <div class="status">
      <text class="status-text">蓝牙设配状态：</text>
      <div class="status-text1">{{msg}}</div>
    </div>
    <div class="status">
      <text class="status-text">开启蓝牙设备搜索：</text>
      <switch :checked=searchDevice @change="switchChange" class="switch" color='#096DD9'></switch>
    </div>
    <div class="devices">
      <div class="device-list">
        <div class="weui-cells__title" style="font-size: 13px">附近蓝牙设备</div>
        <div class="weui-cells weui-cells_after-title" v-for="device in deviceList">
          <div class="weui-cell" @click="chooseDevice(device)">
            <div class="weui-cell__bd" style="font-size: 13px">设备名称：{{device.name}}</div>
            <div class="weui-cell__ft" style="font-size: 13px">设备ID: {{device.deviceId}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="devices" v-if="nowDevice">
      <div class="device-list">
        <div class="weui-cells__title" style="font-size: 13px">蓝牙设备详细信息</div>
        <div class="weui-cell" style="font-size: 13px;background-color:white">设备名称：{{currentDevice.name}}</div>
        <div class="weui-cell" style="font-size: 13px;background-color:white">设备ID：{{currentDevice.deviceId}}</div>
        <div class="weui-cell" style="font-size: 13px;background-color:white">信号强度：{{currentDevice.RSSI}}</div>
        <!--<div class="weui-cell" style="font-size: 13px;background-color:white">广播数据：{{currentDevice.advertisData}}</div>-->
        <!--<div class="weui-cell" style="font-size: 13px;background-color:white">广播数据ServiceUUIDs：{{currentDevice.advertisServiceUUIDs}}</div>-->
        <!--<div class="weui-cell" style="font-size: 13px;background-color:white">广播数据localName：{{currentDevice.localName}}</div>-->
        <!--<div class="weui-cell" style="font-size: 13px;background-color:white">广播数据serviceData：{{currentDevice.ServiceData}}</div>-->
        <button class="weui-btn" type="default" style="font-size: 13px;margin-top: 0px;border-radius: 0 0 15px 15px;" @click="confirmConnect(currentDevice.deviceId)">连接蓝牙设备</button>
      </div>
    </div>
    <div class="devices" v-if="nowService">
      <div class="device-list">
        <div class="weui-cells__title" style="font-size: 13px">成功连接的蓝牙设备信息</div>
        <div class="weui-cell" style="font-size: 13px;background-color:white">设备名称：{{currentDevice.name}}</div>
        <div class="weui-cell" style="font-size: 13px;background-color:white">设备ID：{{currentDevice.deviceId}}</div>
        <div class="weui-cell" style="font-size: 13px;background-color:white">信号强度：{{currentDevice.RSSI}}</div>
        <!--<div class="weui-cell" style="font-size: 13px;background-color:white">广播数据：{{currentDevice.advertisData}}</div>-->
        <!--<div class="weui-cell" style="font-size: 13px;background-color:white">广播数据ServiceUUIDs：{{currentDevice.advertisServiceUUIDs}}</div>-->
        <!--<div class="weui-cell" style="font-size: 13px;background-color:white">广播数据localName：{{currentDevice.localName}}</div>-->
        <!--<div class="weui-cell" style="font-size: 13px;background-color:white">广播数据serviceData：{{currentDevice.ServiceData}}</div>-->
        <view class="weui-cells weui-cells_after-title">
          <view class="weui-cell weui-cell_input">
            <view class="weui-cell__bd">
              <input class="weui-input" @input='bindMessageInput' placeholder="请输入16进制数据" v-model="sendData" style="font-size: 15px"/>
              <!--<div v-for="service in deviceService">-->
              <!--<div class="weui-cell" style="font-size: 13px;background-color:white">服务uuid：{{service.uuid}}</div>-->
              <!--<div class="weui-cell" style="font-size: 13px;background-color:white">服务是否为主服务：{{service.isPrimary}}</div>-->
              <!--</div>-->
            </view>
          </view>
        </view>
        <button class="weui-btn" type="default" style="font-size: 13px;margin-top: 0px;border-radius: 0 0 15px 15px;" @click="sendMessage">发送数据</button>
        <!--<div class="weui-cells__title" style="font-size: 13px">返回的数据</div>-->
        <!--<div v-for="data in dataResult">-->
        <!--<div class="weui-cell" style="font-size: 13px;background-color:white">0x: {{data}}</div>-->
        <!--</div>-->
        <button class="weui-btn" type="default" style="font-size: 13px;margin-top: 0px;border-radius: 0 0 15px 15px;" @click="receiveMessage">接收数据</button>
        <div class="weui-cells__title" style="font-size: 13px">接收到的数据</div>
        <div v-for="data in reMessage">
          <div class="weui-cell" style="font-size: 13px;background-color:white">0x: {{data}}</div>
        </div>
        <button class="weui-btn" type="default" style="font-size: 13px;margin-top: 0px;border-radius: 0 0 15px 15px;" @click="disconnect">断开蓝牙连接</button>
      </div>
    </div>
  </div>
</template>


<script>
  import 'weui-wxss'
  export default {
    data () {
      return {
        msg: '蓝牙正在适配...',
        text: 'Test',
        deviceList: [],
        currentDevice: {},
        nowDevice: false,
        searchDevice: false,
        windowHeight: 0,
        deviceService: {},
        nowService: false,
        sendData: '',
        dataResult: {},
        writeDatas: '',
        reMessage: []
      }
    },
    onLoad () {
      this.getSystemInfo()
      this.openBluetooth()
    },
    onShow () {
      var that = this
      wx.onBluetoothAdapterStateChange(function (res) {
        console.log(`蓝牙设备状态更改`, res.available)
        that.openBluetooth()
      })
    },
    methods: {
      getSystemInfo: function () {
        var that = this
        wx.getSystemInfo({
          success: function (res) {
            that.windowHeight = res.windowHeight
          }
        })
      },
      switchChange: function () {
        var that = this
        if (!that.searchDevice) {
          that.searchDevice = !that.searchDevice
          console.log('打开蓝牙设备搜索')
          wx.getBluetoothAdapterState({
            success: function (res) {
              console.log('getBluetoothAdapterState')
              console.log(res)
            }
          })
          wx.onBluetoothAdapterStateChange(function (res) {
            console.log('onBluetoothAdapterStateChange')
            console.log(res.available)
          })
          wx.startBluetoothDevicesDiscovery({
            success: function (res) {
              console.log('startBluetoothDevicesDiscovery')
              console.log(res)
            }
          })
          wx.onBluetoothDeviceFound(function (devices) {
            console.log('onBluetoothDeviceFound')
            that.deviceList.push(devices.devices[0])
            console.log(that.deviceList)
          })
          wx.getBluetoothDevices({
            success: function (res) {
              console.log('getBluetoothDevices')
              console.log(res)
            }
          })
        } else {
          // that.deviceList = []
          // that.currentDevice = {}
          wx.stopBluetoothDevicesDiscovery({
            success: function (res) {
              that.searchDevice = !that.searchDevice
              console.log('关闭蓝牙设备搜索')
            }
          })
        }
      },
      openBluetooth: function () {
        var that = this
        wx.openBluetoothAdapter({
          success: function (res) {
            console.log('初始化蓝牙适配器成功' + JSON.stringify(res))
            that.msg = '初始化蓝牙适配器成功'
            wx.showModal({
              title: '蓝牙适配情况',
              content: '初始化蓝牙适配器成功'
            })
          },
          fail: function () {
            that.msg = '初始化蓝牙适配器失败'
            wx.showModal({
              title: '蓝牙适配情况',
              content: '蓝牙适配失败，请检查手机蓝牙和定位功能是否打开'
            })
          },
          complete: function () {
            console.log('初始化蓝牙适配器完成')
          }
        })
      },
      chooseDevice: function (device) {
        var that = this
        that.currentDevice = device
        that.nowDevice = true
        wx.pageScrollTo({
          scrollTop: that.windowHeight,
          duration: 100
        })
      },
      confirmConnect: function (deviceId) {
        var that = this
        wx.showModal({
          title: '连接当前蓝牙设备',
          success: function (res) {
            if (res.confirm) {
              that.connectTo(deviceId)
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      },
      connectTo: function (deviceId) {
        var that = this
        console.log('连接蓝牙设备搜索', deviceId)
        wx.stopBluetoothDevicesDiscovery({
          success: function (res) {
            that.searchDevice = !that.searchDevice
            console.log('关闭蓝牙设备搜索')
          }
        })
        wx.showLoading({
          title: '连接蓝牙设备中...'
        })
        wx.createBLEConnection({
          deviceId: deviceId,
          success: function (res) {
            console.log('蓝牙设备连接成功')
            wx.hideLoading()
            wx.getBLEDeviceServices({
              deviceId: deviceId,
              success: function (res) {
                that.deviceService = res.services
                for (var t = 0; t < that.deviceService.length; t++) {
                  var service = that.deviceService[t]
                  var serviceId = service.uuid.substring(4, 8)
                  if (serviceId === 'FFE0') {
                    that.serviceId = service.uuid
                  }
                }
                that.nowDevice = !that.nowDevice
                that.nowService = !that.nowService
                console.log('获取蓝牙设备Service' + res.errMsg)
              },
              fail: function (res) {
                wx.showModal({
                  title: '设备Service信息',
                  content: '蓝牙设备连接成功' + '\n' + '设备信息获取错误' + res.errMsg
                })
              }
            })
          },
          fail: function (res) {
            console.log('蓝牙设备连接失败，请稍后重试')
            wx.hideLoading()
            wx.showModal({
              title: '提示',
              content: '蓝牙设备连接失败，请稍后重试',
              duration: 2000
            })
          },
          complete: function () {
            console.log('蓝牙设备连接完成')
            wx.hideLoading()
          }
        })
      },
      sendMessage: function () {
        let that = this
        console.log(that.sendData)
        let data = that.sendData.split(',')
        let dataBuffer = new ArrayBuffer(data.length)
        let dataView = new DataView(dataBuffer)
        for (let j = 0; j < data.length; j++) {
          dataView.setUint8(j, '0x' + data[j])
        }
        that.deviceId = this.currentDevice.deviceId
        wx.getBLEDeviceCharacteristics({
          deviceId: that.deviceId,
          serviceId: that.serviceId,
          success: function (res) {
            console.log(res.characteristics)
            that.deviceCharacteristics = res.characteristics
            for (var i = 0; i < that.deviceCharacteristics.length; i++) {
              that.characteristic = that.deviceCharacteristics[i]
              that.characteristicProperties = that.characteristic.properties
              if (that.characteristicProperties.notify === true) {
                that.characteristicId = that.characteristic.uuid
                wx.notifyBLECharacteristicValueChange({
                  state: true, // 启用 notify 功能
                  deviceId: that.deviceId,
                  serviceId: that.serviceId,
                  characteristicId: that.characteristicId,
                  success: function (res) {
                    console.log('开启notify成功' + that.characteristic.uuid)
                    for (let i = 0; i < dataView.byteLength; i++) {
                      var writeData = '0x' + dataView.getUint8(i).toString(16)
                      that.writeDatas = that.writeDatas + '\n' + writeData
                    }
                    wx.writeBLECharacteristicValue({
                      deviceId: that.deviceId,
                      serviceId: that.serviceId,
                      characteristicId: that.characteristicId,
                      value: dataBuffer,
                      success: function (res) {
                        console.log('发送的数据：' + that.writeDatas)
                        console.log('message发送成功')
                        wx.showModal({
                          title: '数据发送成功',
                          content: that.writeDatas
                        })
                        wx.readBLECharacteristicValue({
                          deviceId: that.deviceId,
                          serviceId: that.serviceId,
                          characteristicId: that.characteristicId,
                          success: function (res) {
                            console.log('读取数据成功')
                          }
                        })
                      },
                      fail: function (res) {
                        // fail
                        console.log('message发送失败' + that.characteristicIdw)
                        wx.showToast({
                          title: '数据发送失败，请稍后重试',
                          icon: 'none'
                        })
                      },
                      complete: function (res) {
                        // fail
                        console.log('message发送完成')
                      }
                    })
                  },
                  fail: function () {
                    console.log('开启notify失败' + that.characteristicId)
                  }
                })
                // that.writeMessage(that.deviceId, that.serviceId, that.characteristicIdw, that.characteristicIdr, that.characteristicIdn)
              }
            }
          },
          fail: function () {
            console.log('获取characteristic失败')
          }
        })
        that.writeDatas = []
      },
      receiveMessage: function () {
        let that = this
        that.deviceId = this.currentDevice.deviceId
        that.serviceId = that.serviceId
        wx.getBLEDeviceCharacteristics({
          deviceId: that.deviceId,
          serviceId: that.serviceId,
          success: function (res) {
            console.log(res.characteristics)
            that.deviceCharacteristics = res.characteristics
            for (var i = 0; i < that.deviceCharacteristics.length; i++) {
              that.characteristic = that.deviceCharacteristics[i]
              that.characteristicProperties = that.characteristic.properties
              if (that.characteristicProperties.notify === true) {
                that.characteristicId = that.characteristic.uuid
                wx.notifyBLECharacteristicValueChange({
                  state: true, // 启用 notify 功能
                  deviceId: that.deviceId,
                  serviceId: that.serviceId,
                  characteristicId: that.characteristicId,
                  success: function (res) {
                    console.log('开启notify成功' + that.characteristic.uuid)
                    console.log(that.characteristicProperties.write)
                    console.log(that.characteristicProperties.read)
                    wx.readBLECharacteristicValue({
                      deviceId: that.deviceId,
                      serviceId: that.serviceId,
                      characteristicId: that.characteristicId,
                      success: function (res) {
                        console.log('接收数据成功')
                      }
                    })
                    wx.onBLECharacteristicValueChange(function (res) {
                      console.log('接收数据:', that.ab2hex(res.value))
                      var recMessage = that.ab2hex(res.value)
                      that.reMessage.push(recMessage)
                    })
                  },
                  fail: function () {
                    console.log('开启notify失败' + that.characteristicId)
                    console.log(that.characteristicProperties.write)
                    console.log(that.characteristicProperties.read)
                  },
                  complete: function () {
                    console.log('开启完成')
                  }
                })
              }
            }
          },
          fail: function () {
            console.log('获取characteristic失败')
          }
        })
      },
      bindMessageInput: function (e) {
        var that = this
        that.inputValue = e.mp.detail.value
      },
      disconnect: function () {
        var that = this
        that.deviceId = this.currentDevice.deviceId
        wx.closeBLEConnection({
          deviceId: that.deviceId,
          success: function (res) {
            wx.showModal({
              title: '设备连接情况',
              content: '蓝牙设备已经断开'
            })
            that.nowDevice = false
            that.currentDevice = {}
            that.nowService = false
            that.deviceService = {}
          }
        })
      },
      ab2hex: function (buffer) {
        var hexArr = Array.prototype.map.call(
          new Uint8Array(buffer), function (bit) {
            return ('00' + bit.toString(16)).slice(-2)
          }
        )
        return hexArr.join('')
      }
    }
  }
</script>

<style scoped>

  .status {
    background-color: white;
    height: 50px;
    display: flex;
    align-items: center;
    flex-direction: row;
    border-bottom: 2px solid #e8e8e8;
  }
  .status-text {
    margin-left:10px;
    font-size: 15px;
    width:40%
  }

  .status-text1 {
    height:30px;
    background-color:#e8e8e8;
    margin-left:10px;
    font-size: 13px;
    border-radius: 15px;
    margin-top: 5px;
    width: 50%;
    text-align: center;
    line-height: 30px;
    color: black;
  }

  .switch {
    margin-left:10px;
    width: 50%;
    text-align: center;
  }

  .devices {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .device-list {
    margin-top: 15px;
    font-size: 3px;
    border: 3px solid #e8e8e8;
    border-radius: 15px;
    width: 94%;
  }

  .inputMessage {
    text-align: center;
    font-size: 13px;
  }
</style>

