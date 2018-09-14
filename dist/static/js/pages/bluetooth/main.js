global.webpackJsonp([5],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(10);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_3c291bb2_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(16);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(11)
}
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-3c291bb2"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_3c291bb2_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/pages/bluetooth/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3c291bb2", Component.options)
  } else {
    hotAPI.reload("data-v-3c291bb2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 11 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_weui_wxss__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_weui_wxss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_weui_wxss__);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
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
    };
  },
  onLoad: function onLoad() {
    this.getSystemInfo();
    this.openBluetooth();
  },
  onShow: function onShow() {
    var that = this;
    wx.onBluetoothAdapterStateChange(function (res) {
      console.log('\u84DD\u7259\u8BBE\u5907\u72B6\u6001\u66F4\u6539', res.available);
      that.openBluetooth();
    });
  },

  methods: {
    getSystemInfo: function getSystemInfo() {
      var that = this;
      wx.getSystemInfo({
        success: function success(res) {
          that.windowHeight = res.windowHeight;
        }
      });
    },
    switchChange: function switchChange() {
      var that = this;
      if (!that.searchDevice) {
        that.searchDevice = !that.searchDevice;
        console.log('打开蓝牙设备搜索');
        wx.getBluetoothAdapterState({
          success: function success(res) {
            console.log('getBluetoothAdapterState');
            console.log(res);
          }
        });
        wx.onBluetoothAdapterStateChange(function (res) {
          console.log('onBluetoothAdapterStateChange');
          console.log(res.available);
        });
        wx.startBluetoothDevicesDiscovery({
          success: function success(res) {
            console.log('startBluetoothDevicesDiscovery');
            console.log(res);
          }
        });
        wx.onBluetoothDeviceFound(function (devices) {
          console.log('onBluetoothDeviceFound');
          that.deviceList.push(devices.devices[0]);
          console.log(that.deviceList);
        });
        wx.getBluetoothDevices({
          success: function success(res) {
            console.log('getBluetoothDevices');
            console.log(res);
          }
        });
      } else {
        // that.deviceList = []
        // that.currentDevice = {}
        wx.stopBluetoothDevicesDiscovery({
          success: function success(res) {
            that.searchDevice = !that.searchDevice;
            console.log('关闭蓝牙设备搜索');
          }
        });
      }
    },
    openBluetooth: function openBluetooth() {
      var that = this;
      wx.openBluetoothAdapter({
        success: function success(res) {
          console.log('初始化蓝牙适配器成功' + __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default()(res));
          that.msg = '初始化蓝牙适配器成功';
          wx.showModal({
            title: '蓝牙适配情况',
            content: '初始化蓝牙适配器成功'
          });
        },
        fail: function fail() {
          that.msg = '初始化蓝牙适配器失败';
          wx.showModal({
            title: '蓝牙适配情况',
            content: '蓝牙适配失败，请检查手机蓝牙和定位功能是否打开'
          });
        },
        complete: function complete() {
          console.log('初始化蓝牙适配器完成');
        }
      });
    },
    chooseDevice: function chooseDevice(device) {
      var that = this;
      that.currentDevice = device;
      that.nowDevice = true;
      wx.pageScrollTo({
        scrollTop: that.windowHeight,
        duration: 100
      });
    },
    confirmConnect: function confirmConnect(deviceId) {
      var that = this;
      wx.showModal({
        title: '连接当前蓝牙设备',
        success: function success(res) {
          if (res.confirm) {
            that.connectTo(deviceId);
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });
    },
    connectTo: function connectTo(deviceId) {
      var that = this;
      console.log('连接蓝牙设备搜索', deviceId);
      wx.stopBluetoothDevicesDiscovery({
        success: function success(res) {
          that.searchDevice = !that.searchDevice;
          console.log('关闭蓝牙设备搜索');
        }
      });
      wx.showLoading({
        title: '连接蓝牙设备中...'
      });
      wx.createBLEConnection({
        deviceId: deviceId,
        success: function success(res) {
          console.log('蓝牙设备连接成功');
          wx.hideLoading();
          wx.getBLEDeviceServices({
            deviceId: deviceId,
            success: function success(res) {
              that.deviceService = res.services;
              for (var t = 0; t < that.deviceService.length; t++) {
                var service = that.deviceService[t];
                var serviceId = service.uuid.substring(4, 8);
                if (serviceId === 'FFE0') {
                  that.serviceId = service.uuid;
                }
              }
              that.nowDevice = !that.nowDevice;
              that.nowService = !that.nowService;
              console.log('获取蓝牙设备Service' + res.errMsg);
            },
            fail: function fail(res) {
              wx.showModal({
                title: '设备Service信息',
                content: '蓝牙设备连接成功' + '\n' + '设备信息获取错误' + res.errMsg
              });
            }
          });
        },
        fail: function fail(res) {
          console.log('蓝牙设备连接失败，请稍后重试');
          wx.hideLoading();
          wx.showModal({
            title: '提示',
            content: '蓝牙设备连接失败，请稍后重试',
            duration: 2000
          });
        },
        complete: function complete() {
          console.log('蓝牙设备连接完成');
          wx.hideLoading();
        }
      });
    },
    sendMessage: function sendMessage() {
      var that = this;
      console.log(that.sendData);
      var data = that.sendData.split(',');
      var dataBuffer = new ArrayBuffer(data.length);
      var dataView = new DataView(dataBuffer);
      for (var j = 0; j < data.length; j++) {
        dataView.setUint8(j, '0x' + data[j]);
      }
      that.deviceId = this.currentDevice.deviceId;
      wx.getBLEDeviceCharacteristics({
        deviceId: that.deviceId,
        serviceId: that.serviceId,
        success: function success(res) {
          console.log(res.characteristics);
          that.deviceCharacteristics = res.characteristics;
          for (var i = 0; i < that.deviceCharacteristics.length; i++) {
            that.characteristic = that.deviceCharacteristics[i];
            that.characteristicProperties = that.characteristic.properties;
            if (that.characteristicProperties.notify === true) {
              that.characteristicId = that.characteristic.uuid;
              wx.notifyBLECharacteristicValueChange({
                state: true, // 启用 notify 功能
                deviceId: that.deviceId,
                serviceId: that.serviceId,
                characteristicId: that.characteristicId,
                success: function success(res) {
                  console.log('开启notify成功' + that.characteristic.uuid);
                  for (var _i = 0; _i < dataView.byteLength; _i++) {
                    var writeData = '0x' + dataView.getUint8(_i).toString(16);
                    that.writeDatas = that.writeDatas + '\n' + writeData;
                  }
                  wx.writeBLECharacteristicValue({
                    deviceId: that.deviceId,
                    serviceId: that.serviceId,
                    characteristicId: that.characteristicId,
                    value: dataBuffer,
                    success: function success(res) {
                      console.log('发送的数据：' + that.writeDatas);
                      console.log('message发送成功');
                      wx.showModal({
                        title: '数据发送成功',
                        content: that.writeDatas
                      });
                      wx.readBLECharacteristicValue({
                        deviceId: that.deviceId,
                        serviceId: that.serviceId,
                        characteristicId: that.characteristicId,
                        success: function success(res) {
                          console.log('读取数据成功');
                        }
                      });
                    },
                    fail: function fail(res) {
                      // fail
                      console.log('message发送失败' + that.characteristicIdw);
                      wx.showToast({
                        title: '数据发送失败，请稍后重试',
                        icon: 'none'
                      });
                    },
                    complete: function complete(res) {
                      // fail
                      console.log('message发送完成');
                    }
                  });
                },
                fail: function fail() {
                  console.log('开启notify失败' + that.characteristicId);
                }
              });
              // that.writeMessage(that.deviceId, that.serviceId, that.characteristicIdw, that.characteristicIdr, that.characteristicIdn)
            }
          }
        },
        fail: function fail() {
          console.log('获取characteristic失败');
        }
      });
      that.writeDatas = [];
    },
    receiveMessage: function receiveMessage() {
      var that = this;
      that.deviceId = this.currentDevice.deviceId;
      that.serviceId = that.serviceId;
      wx.getBLEDeviceCharacteristics({
        deviceId: that.deviceId,
        serviceId: that.serviceId,
        success: function success(res) {
          console.log(res.characteristics);
          that.deviceCharacteristics = res.characteristics;
          for (var i = 0; i < that.deviceCharacteristics.length; i++) {
            that.characteristic = that.deviceCharacteristics[i];
            that.characteristicProperties = that.characteristic.properties;
            if (that.characteristicProperties.notify === true) {
              that.characteristicId = that.characteristic.uuid;
              wx.notifyBLECharacteristicValueChange({
                state: true, // 启用 notify 功能
                deviceId: that.deviceId,
                serviceId: that.serviceId,
                characteristicId: that.characteristicId,
                success: function success(res) {
                  console.log('开启notify成功' + that.characteristic.uuid);
                  console.log(that.characteristicProperties.write);
                  console.log(that.characteristicProperties.read);
                  wx.readBLECharacteristicValue({
                    deviceId: that.deviceId,
                    serviceId: that.serviceId,
                    characteristicId: that.characteristicId,
                    success: function success(res) {
                      console.log('接收数据成功');
                    }
                  });
                  wx.onBLECharacteristicValueChange(function (res) {
                    console.log('接收数据:', that.ab2hex(res.value));
                    var recMessage = that.ab2hex(res.value);
                    that.reMessage.push(recMessage);
                  });
                },
                fail: function fail() {
                  console.log('开启notify失败' + that.characteristicId);
                  console.log(that.characteristicProperties.write);
                  console.log(that.characteristicProperties.read);
                },
                complete: function complete() {
                  console.log('开启完成');
                }
              });
            }
          }
        },
        fail: function fail() {
          console.log('获取characteristic失败');
        }
      });
    },
    bindMessageInput: function bindMessageInput(e) {
      var that = this;
      that.inputValue = e.mp.detail.value;
    },
    disconnect: function disconnect() {
      var that = this;
      that.deviceId = this.currentDevice.deviceId;
      wx.closeBLEConnection({
        deviceId: that.deviceId,
        success: function success(res) {
          wx.showModal({
            title: '设备连接情况',
            content: '蓝牙设备已经断开'
          });
          that.nowDevice = false;
          that.currentDevice = {};
          that.nowService = false;
          that.deviceService = {};
        }
      });
    },
    ab2hex: function ab2hex(buffer) {
      var hexArr = Array.prototype.map.call(new Uint8Array(buffer), function (bit) {
        return ('00' + bit.toString(16)).slice(-2);
      });
      return hexArr.join('');
    }
  }
});

/***/ }),
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "bluetooth"
  }, [_c('div', {
    staticClass: "status"
  }, [_c('text', {
    staticClass: "status-text"
  }, [_vm._v("蓝牙设配状态：")]), _vm._v(" "), _c('div', {
    staticClass: "status-text1"
  }, [_vm._v(_vm._s(_vm.msg))])]), _vm._v(" "), _c('div', {
    staticClass: "status"
  }, [_c('text', {
    staticClass: "status-text"
  }, [_vm._v("开启蓝牙设备搜索：")]), _vm._v(" "), _c('switch', {
    staticClass: "switch",
    attrs: {
      "checked": _vm.searchDevice,
      "color": "#096DD9",
      "eventid": '0'
    },
    on: {
      "change": _vm.switchChange
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "devices"
  }, [_c('div', {
    staticClass: "device-list"
  }, [_c('div', {
    staticClass: "weui-cells__title",
    staticStyle: {
      "font-size": "13px"
    }
  }, [_vm._v("附近蓝牙设备")]), _vm._v(" "), _vm._l((_vm.deviceList), function(device, index) {
    return _c('div', {
      staticClass: "weui-cells weui-cells_after-title"
    }, [_c('div', {
      staticClass: "weui-cell",
      attrs: {
        "eventid": '1-' + index
      },
      on: {
        "click": function($event) {
          _vm.chooseDevice(device)
        }
      }
    }, [_c('div', {
      staticClass: "weui-cell__bd",
      staticStyle: {
        "font-size": "13px"
      }
    }, [_vm._v("设备名称：" + _vm._s(device.name))]), _vm._v(" "), _c('div', {
      staticClass: "weui-cell__ft",
      staticStyle: {
        "font-size": "13px"
      }
    }, [_vm._v("设备ID: " + _vm._s(device.deviceId))])])])
  })], 2)]), _vm._v(" "), (_vm.nowDevice) ? _c('div', {
    staticClass: "devices"
  }, [_c('div', {
    staticClass: "device-list"
  }, [_c('div', {
    staticClass: "weui-cells__title",
    staticStyle: {
      "font-size": "13px"
    }
  }, [_vm._v("蓝牙设备详细信息")]), _vm._v(" "), _c('div', {
    staticClass: "weui-cell",
    staticStyle: {
      "font-size": "13px",
      "background-color": "white"
    }
  }, [_vm._v("设备名称：" + _vm._s(_vm.currentDevice.name))]), _vm._v(" "), _c('div', {
    staticClass: "weui-cell",
    staticStyle: {
      "font-size": "13px",
      "background-color": "white"
    }
  }, [_vm._v("设备ID：" + _vm._s(_vm.currentDevice.deviceId))]), _vm._v(" "), _c('div', {
    staticClass: "weui-cell",
    staticStyle: {
      "font-size": "13px",
      "background-color": "white"
    }
  }, [_vm._v("信号强度：" + _vm._s(_vm.currentDevice.RSSI))]), _vm._v(" "), _c('button', {
    staticClass: "weui-btn",
    staticStyle: {
      "font-size": "13px",
      "margin-top": "0px",
      "border-radius": "0 0 15px 15px"
    },
    attrs: {
      "type": "default",
      "eventid": '2'
    },
    on: {
      "click": function($event) {
        _vm.confirmConnect(_vm.currentDevice.deviceId)
      }
    }
  }, [_vm._v("连接蓝牙设备")])], 1)]) : _vm._e(), _vm._v(" "), (_vm.nowService) ? _c('div', {
    staticClass: "devices"
  }, [_c('div', {
    staticClass: "device-list"
  }, [_c('div', {
    staticClass: "weui-cells__title",
    staticStyle: {
      "font-size": "13px"
    }
  }, [_vm._v("成功连接的蓝牙设备信息")]), _vm._v(" "), _c('div', {
    staticClass: "weui-cell",
    staticStyle: {
      "font-size": "13px",
      "background-color": "white"
    }
  }, [_vm._v("设备名称：" + _vm._s(_vm.currentDevice.name))]), _vm._v(" "), _c('div', {
    staticClass: "weui-cell",
    staticStyle: {
      "font-size": "13px",
      "background-color": "white"
    }
  }, [_vm._v("设备ID：" + _vm._s(_vm.currentDevice.deviceId))]), _vm._v(" "), _c('div', {
    staticClass: "weui-cell",
    staticStyle: {
      "font-size": "13px",
      "background-color": "white"
    }
  }, [_vm._v("信号强度：" + _vm._s(_vm.currentDevice.RSSI))]), _vm._v(" "), _c('view', {
    staticClass: "weui-cells weui-cells_after-title"
  }, [_c('view', {
    staticClass: "weui-cell weui-cell_input"
  }, [_c('view', {
    staticClass: "weui-cell__bd"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.sendData),
      expression: "sendData"
    }],
    staticClass: "weui-input",
    staticStyle: {
      "font-size": "15px"
    },
    attrs: {
      "placeholder": "请输入16进制数据",
      "eventid": '3'
    },
    domProps: {
      "value": (_vm.sendData)
    },
    on: {
      "input": [function($event) {
        if ($event.target.composing) { return; }
        _vm.sendData = $event.target.value
      }, _vm.bindMessageInput]
    }
  })])])]), _vm._v(" "), _c('button', {
    staticClass: "weui-btn",
    staticStyle: {
      "font-size": "13px",
      "margin-top": "0px",
      "border-radius": "0 0 15px 15px"
    },
    attrs: {
      "type": "default",
      "eventid": '4'
    },
    on: {
      "click": _vm.sendMessage
    }
  }, [_vm._v("发送数据")]), _vm._v(" "), _c('button', {
    staticClass: "weui-btn",
    staticStyle: {
      "font-size": "13px",
      "margin-top": "0px",
      "border-radius": "0 0 15px 15px"
    },
    attrs: {
      "type": "default",
      "eventid": '5'
    },
    on: {
      "click": _vm.receiveMessage
    }
  }, [_vm._v("接收数据")]), _vm._v(" "), _c('div', {
    staticClass: "weui-cells__title",
    staticStyle: {
      "font-size": "13px"
    }
  }, [_vm._v("接收到的数据")]), _vm._v(" "), _vm._l((_vm.reMessage), function(data, index) {
    return _c('div', [_c('div', {
      staticClass: "weui-cell",
      staticStyle: {
        "font-size": "13px",
        "background-color": "white"
      }
    }, [_vm._v("0x: " + _vm._s(data))])])
  }), _vm._v(" "), _c('button', {
    staticClass: "weui-btn",
    staticStyle: {
      "font-size": "13px",
      "margin-top": "0px",
      "border-radius": "0 0 15px 15px"
    },
    attrs: {
      "type": "default",
      "eventid": '6'
    },
    on: {
      "click": _vm.disconnect
    }
  }, [_vm._v("断开蓝牙连接")])], 2)]) : _vm._e()])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3c291bb2", esExports)
  }
}

/***/ })
],[9]);
//# sourceMappingURL=main.js.map