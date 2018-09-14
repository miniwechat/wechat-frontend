global.webpackJsonp([2],{

/***/ 24:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(25);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 25:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_62291a4b_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(32);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(26)
}
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-62291a4b"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_62291a4b_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/pages/index/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-62291a4b", Component.options)
  } else {
    hotAPI.reload("data-v-62291a4b", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 26:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 27:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_card__ = __webpack_require__(3);
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


// import CryptoJS from 'crypto-js/crypto-js'

/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
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
    };
  },


  components: {
    card: __WEBPACK_IMPORTED_MODULE_0__components_card__["a" /* default */]
  },

  methods: {
    bindViewTap: function bindViewTap() {
      var url = '../logs/main';
      wx.navigateTo({ url: url });
    },
    click: function click() {
      var _this = this;

      var that = this;
      wx.scanCode({
        success: function success(res) {
          wx.getLocation({
            success: function success(res) {
              console.log(res);
              that.scanMessage = true;
              that.lat = res.latitude;
              that.lot = res.longitude;
              var timestamp = Date.parse(new Date());
              var date = new Date(timestamp);
              var year = date.getFullYear();
              var month = date.getMonth() + 1;
              var day = date.getDate();
              var hour = date.getHours();
              var minute = date.getMinutes();
              var second = date.getSeconds();
              that.show = '经度：' + that.lat + '纬度：' + that.lot + '时间：' + year + month + day + hour + minute + second;
              that.timestamp = year + month + day + hour + minute + second;
            }
          });
          console.log(_this.lat);
          console.log(that.lat);
          _this.setData({
            show: _this.show
          });
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          });
        },
        fail: function fail(res) {
          wx.showToast({
            title: '失败',
            icon: 'success',
            duration: 2000
          });
        },
        complete: function complete(res) {
          console.log(res);
        }
      });
    },

    queryRdSession: function queryRdSession() {
      var that = this;
      var config = __webpack_require__(31);
      that.appId = config.appid;
      wx.login({
        success: function success(res) {
          wx.getSetting({
            success: function success(res) {
              console.log(res);
            },
            fail: function fail() {
              console.log('setting fail');
            }
          });
          wx.request({
            url: 'http://192.168.19.164:3000/secret/frontcode/create/1?',
            data: {
              jsCode: res.code,
              appId: that.appId
            },
            success: function success(res) {
              console.log(res);
              var sessionDate = res.data;
              that.sessionStatus(sessionDate);
            },
            fail: function fail() {
              wx.showModal({
                content: '发送会话请求失败'
              });
            }
          });
        },
        fail: function fail() {
          wx.showModal({
            content: '登录失败,请重试'
          });
        }
      });
    },
    sessionStatus: function sessionStatus(data) {
      var that = this;
      if (data.status === 'error') {
        var errorCode = data.error_detail.errcode;
        if (errorCode === 40029) {
          that.errMsg = '登录凭证获取失败';
        } else if (errorCode === 40013) {
          that.errMsg = '小程序AppId无效';
        } else if (errorCode === 40125) {
          that.errMsg = '小程序AppSecret无效';
        } else {
          that.errMsg = '请求数据失败，请重试';
        }
        wx.showModal({
          title: '获取会话密钥失败信息',
          content: this.errMsg
        });
      } else if (data.status === 'success') {
        wx.showModal({
          title: '获取会话密钥成功'
        });
        wx.setStorage({
          key: 'rdSession',
          data: data.watermark.rdSession
        });
      } else {
        wx.showModal({
          title: '请求密钥失败'
        });
      }
    },
    updateScanMessage: function updateScanMessage() {
      var that = this;
      wx.getSetting({
        success: function success(res) {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: function success(res) {
                console.log(res);
                that.userInfo = res;
                var rdSession = wx.getStorageSync('rdSession');
                console.log('rdSession' + rdSession);
                if (rdSession.length === 0) {
                  // wx.showModal({
                  //   title: '用户授权信息',
                  //   content: '未成功获取会话密钥'
                  // })
                  that.queryRdSession();
                } else {
                  wx.request({
                    url: 'http://192.168.19.164:3000/secret/frontcode/sign?',
                    data: {
                      rawData: that.userInfo.rawData,
                      signature: that.userInfo.signature,
                      rdSession: rdSession
                    },
                    success: function success(res) {
                      console.log(res.data);
                      console.log('rdSession' + rdSession);
                      console.log('rdSession_key:' + res.data.watermark.rdSession_key);
                      console.log('rdSession_iv:' + res.data.watermark.rdSession_iv);
                      if (res.data.watermark.rdSession === rdSession) {
                        wx.setStorage({
                          key: 'rdSession_iv',
                          data: res.data.watermark.rdSession_iv
                        });
                        wx.setStorage({
                          key: 'rdSession_key',
                          data: res.data.watermark.rdSession_key
                        });
                      }
                      if (that.lot.length === 0 || that.lat.length === 0 || that.timestamp.length === 0) {
                        wx.showModal({
                          title: '二维码信息',
                          content: '二维码信息不完整，请重新扫描'
                        });
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
                          success: function success(res) {
                            console.log(res);
                            console.log(res.data);
                            if (res.data.status === 'successs') {
                              wx.showModal({
                                title: '加密存储',
                                content: res.data.msg
                              });
                            } else {
                              wx.showModal({
                                title: '加密存储',
                                content: res.data.msg
                              });
                            }
                          }
                        });
                      }
                    }
                  });
                }
              }
            });
          } else {
            wx.showModal({
              content: '获取用户信息失败，请打开授权'
            });
          }
        },
        fail: function fail() {
          wx.showModal({
            content: '获取授权信息失败'
          });
        }
      });
    },
    queryScanMessage: function queryScanMessage() {
      var that = this;
      var rdSession = wx.getStorageSync('rdSession');
      var key = wx.getStorageSync('rdSession_key');
      var iv = wx.getStorageSync('rdSession_iv');
      if (rdSession.length === 0 || key.length === 0 || iv.length === 0) {
        // wx.showModal({
        //   content: '会话密钥不存在'
        // })
        that.queryRdSession();
      } else {
        wx.request({
          url: 'http://192.168.19.164:3000/api/scan/index?',
          data: {
            rdSession: rdSession,
            time: that.timeIndex,
            cate: that.cateIndex
          },
          success: function success(res) {
            // console.log(res.data.result)
            if (res.data.status === 'success' && res.data.result.length > 0) {
              that.qtCode = true;
              that.qtCodeMessage = res.data.result;
              that.qtCodeDeMessage = that.qtCodeMessage;
              console.log(that.qtCodeMessage);
              for (var i = 0; i < that.qtCodeMessage.length; i++) {
                that.decode(that.qtCodeDeMessage[i].lng, rdSession, key, iv);
                console.log(that.decode(that.decryptedData));
                // that.qtCodeDeMessage[i].lng = 'test'
                // that.qtCodeDeMessage[i].lat = that.decode(that.qtCodeDeMessage[i].lat, rdSession, key, iv)
              }
              // for (let index in that.qtCodeMessage) {
              //   that.qtCodeDeMessage[index].id = that.qtCodeDeMessage[index].id
              //   that.qtCodeDeMessage[index].lng = that.decode(that.qtCodeDeMessage[index].lng, rdSession, key, iv)
              //   that.qtCodeDeMessage[index].lat = that.decode(that.qtCodeDeMessage[index].lat, rdSession, key, iv)
              // }
            }
            console.log(that.qtCodeDeMessage);
            // console.log(res.data.result[0].lng)
            // let result = that.decode(res.data.result[0].lng, rdSession, key, iv)
            // console.log(result)
          },
          fail: function fail() {
            console.log('fail');
          }
        });
      }
    },
    decode: function decode(encryptedData, rdSession, key, iv) {
      var that = this;
      var decryptedData = '';
      if (encryptedData.length > 0) {
        wx.request({
          url: 'http://192.168.19.164:3000/api/scan/decode?',
          data: {
            rdSession: rdSession,
            encryptedData: encryptedData,
            key: key,
            iv: iv
          },
          success: function success(res) {
            console.log(res.data.result);
            that.decryptedData = res.data.result;
            return that.decryptedData;
          },
          fail: function fail() {
            // return false
          }
        });
      }
    },
    bindTimePickerChange: function bindTimePickerChange(e) {
      var that = this;
      that.timeIndex = e.mp.detail.value;
    },
    bindCatePickerChange: function bindCatePickerChange(e) {
      var that = this;
      that.cateIndex = e.mp.detail.value;
    }
  },

  created: function created() {
    // 调用应用实例的方法获取全局数据
    // this.getUserInfo()
  },
  onLaunch: function onLaunch() {
    console.log('onLauch');
  },
  onLoad: function onLoad() {
    var that = this;
    var rdSession = wx.getStorageSync('rdSession');
    if (rdSession) {
      // that.queryRdSession()
      console.log('test');
    } else {
      that.queryRdSession();
    }
  }
});

/***/ }),

/***/ 31:
/***/ (function(module, exports) {

module.exports = {"description":"项目配置文件。","setting":{"urlCheck":false,"es6":false,"postcss":true,"minified":true,"newFeature":true},"miniprogramRoot":"./dist/","compileType":"miniprogram","appid":"wx6e1ee86184594b21","projectname":"wechat-frontend","condition":{"search":{"current":-1,"list":[]},"conversation":{"current":-1,"list":[]},"game":{"currentL":-1,"list":[]},"miniprogram":{"current":-1,"list":[]}}}

/***/ }),

/***/ 32:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_vm._m(0), _vm._v(" "), _c('div', [_c('button', {
    staticStyle: {
      "margin-left": "20px",
      "margin-top": "5px"
    },
    attrs: {
      "type": "default",
      "size": "mini",
      "eventid": '0'
    },
    on: {
      "click": _vm.click
    }
  }, [_vm._v("扫描二维码")]), _vm._v(" "), (_vm.show) ? _c('div', {
    staticClass: "scanMessage-list",
    staticStyle: {
      "margin": "10px"
    }
  }, [_vm._m(1), _vm._v(" "), _c('div', {
    staticClass: "weui-flex"
  }, [_c('div', {
    staticClass: "weui-flex__item"
  }, [_c('div', {
    staticClass: "placeholder"
  }, [_vm._v(_vm._s(_vm.lot))])]), _vm._v(" "), _c('div', {
    staticClass: "weui-flex__item"
  }, [_c('div', {
    staticClass: "placeholder"
  }, [_vm._v(_vm._s(_vm.lat))])]), _vm._v(" "), _c('div', {
    staticClass: "weui-flex__item"
  }, [_c('div', {
    staticClass: "placeholder"
  }, [_vm._v(_vm._s(_vm.timestamp))])])])]) : _vm._e(), _vm._v(" "), _c('div', [_vm._v(_vm._s(_vm.show))]), _vm._v(" "), _c('button', {
    staticClass: "weui-btn mini-btn",
    staticStyle: {
      "margin-left": "20px",
      "margin-top": "5px"
    },
    attrs: {
      "type": "default",
      "size": "mini",
      "eventid": '1'
    },
    on: {
      "click": function($event) {
        _vm.updateScanMessage()
      }
    }
  }, [_vm._v("上传二维码信息")])], 1), _vm._v(" "), _c('div', {
    staticClass: "split"
  }), _vm._v(" "), _vm._m(2), _vm._v(" "), _c('div', {
    staticStyle: {
      "margin-top": "10px",
      "margin-left": "20px"
    }
  }, [_c('div', {
    staticClass: "picker_show"
  }, [_c('picker', {
    staticClass: "choose_button",
    attrs: {
      "value": _vm.timeIndex,
      "range": _vm.timeArray,
      "eventid": '2'
    },
    on: {
      "change": _vm.bindTimePickerChange
    }
  }, [_c('button', {
    attrs: {
      "type": "default",
      "size": "mini"
    }
  }, [_vm._v("\n          选择信息时间段\n        ")])], 1), _vm._v(" "), _c('div', {
    staticClass: "choose_show"
  }, [_vm._v(" 当前选择：" + _vm._s(_vm.timeArray[_vm.timeIndex]))])], 1), _vm._v(" "), _c('div', {
    staticClass: "picker_show"
  }, [_c('picker', {
    staticClass: "choose_button",
    attrs: {
      "value": _vm.cateIndex,
      "range": _vm.cateArray,
      "eventid": '3'
    },
    on: {
      "change": _vm.bindCatePickerChange
    }
  }, [_c('button', {
    attrs: {
      "type": "default",
      "size": "mini"
    }
  }, [_vm._v("\n          获取信息的类型\n        ")])], 1), _vm._v(" "), _c('div', {
    staticClass: "choose_show"
  }, [_vm._v(" 当前选择：" + _vm._s(_vm.cateArray[_vm.cateIndex]))])], 1)]), _vm._v(" "), _c('button', {
    staticClass: "weui-btn mini-btn",
    staticStyle: {
      "margin-top": "5px",
      "margin-left": "35%"
    },
    attrs: {
      "type": "default",
      "size": "mini",
      "eventid": '4'
    },
    on: {
      "click": function($event) {
        _vm.queryScanMessage()
      }
    }
  }, [_vm._v("获取信息")]), _vm._v(" "), _vm._m(3)], 1)
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tag-out"
  }, [_vm._v("\n    二维码\n    "), _c('div', {
    staticClass: "tag-inside"
  })])
},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "weui-flex"
  }, [_c('div', {
    staticClass: "weui-flex__item"
  }, [_c('div', {
    staticClass: "placeholder"
  }, [_vm._v("经度")])]), _vm._v(" "), _c('div', {
    staticClass: "weui-flex__item"
  }, [_c('div', {
    staticClass: "placeholder"
  }, [_vm._v("维度")])]), _vm._v(" "), _c('div', {
    staticClass: "weui-flex__item"
  }, [_c('div', {
    staticClass: "placeholder"
  }, [_vm._v("时间")])])])
},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tag-out"
  }, [_vm._v("\n    信息\n    "), _c('div', {
    staticClass: "tag-inside"
  })])
},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "scanMessage-list",
    staticStyle: {
      "margin": "5px"
    }
  }, [_c('div', {
    staticClass: "weui-flex"
  }, [_c('div', {
    staticClass: "weui-flex__item"
  }, [_c('div', {
    staticClass: "placeholder"
  }, [_vm._v("id")])]), _vm._v(" "), _c('div', {
    staticClass: "weui-flex__item"
  }, [_c('div', {
    staticClass: "placeholder"
  }, [_vm._v("经度")])]), _vm._v(" "), _c('div', {
    staticClass: "weui-flex__item"
  }, [_c('div', {
    staticClass: "placeholder"
  }, [_vm._v("维度")])])]), _vm._v(" "), _c('div', {
    staticClass: "weui-flex"
  }, [_c('div', {
    staticClass: "weui-flex__item"
  }, [_c('div', {
    staticClass: "placeholder"
  }, [_vm._v("weui")])]), _vm._v(" "), _c('div', {
    staticClass: "weui-flex__item"
  }, [_c('div', {
    staticClass: "placeholder"
  }, [_vm._v("weui")])]), _vm._v(" "), _c('div', {
    staticClass: "weui-flex__item"
  }, [_c('div', {
    staticClass: "placeholder"
  }, [_vm._v("weui")])]), _vm._v(" "), _c('div', {
    staticClass: "weui-flex__item"
  }, [_c('div', {
    staticClass: "placeholder"
  }, [_vm._v("weui")])])])])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-62291a4b", esExports)
  }
}

/***/ })

},[24]);
//# sourceMappingURL=main.js.map