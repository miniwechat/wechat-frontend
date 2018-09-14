global.webpackJsonp([4],{

/***/ 39:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(40);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 40:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_8cb57012_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(43);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(41)
}
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-8cb57012"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_8cb57012_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/pages/picture/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8cb57012", Component.options)
  } else {
    hotAPI.reload("data-v-8cb57012", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 41:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_weui_wxss__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_weui_wxss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_weui_wxss__);
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
      imgUrls: ['http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg', 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'],
      upUrls: ['../../static/images/add.png']
    };
  },
  onLoad: function onLoad() {},
  onShow: function onShow() {},

  methods: {
    bindUpImage: function bindUpImage() {
      // wx.chooseImage({
      //   count: 1,
      //   sizeType: ['original', 'compressed'],
      //   sourceType: ['album', 'camera'],
      //   success (res) {
      //     // tempFilePath可以作为img标签的src属性显示图片
      //     const tempFilePaths = res.tempFilePaths
      //     console.log(tempFilePaths)
      //     wx.request({
      //       url: 'http://192.168.19.164:3000/photo/upload',
      //       data: {
      //         test: tempFilePaths[0]
      //       },
      //       success: function (res) {
      //         console.log(res)
      //       }
      //     })
      //   }
      // })
      wx.chooseImage({
        count: 1,
        success: function success(res) {
          console.log('chooseImage success');
          wx.showLoading({
            title: '上传中...'
          });
          var tempFilePaths = res.tempFilePaths;
          var uploadTask = wx.uploadFile({
            url: 'http://192.168.19.164:3000/photo/upload?',
            filePath: tempFilePaths[0],
            header: {
              'content-type': 'multipart/form-data'
            },
            name: 'file',
            formData: {
              'user': 'test'
            },
            success: function success(res) {
              var data = res.data;
              console.log(res);
              wx.hideLoading();
            },
            fail: function fail(res) {
              console.log(res);
            }
          });
          uploadTask.onProgressUpdate(function (res) {
            console.log('上传进度', res.progress);
            console.log('已经上传的数据长度', res.totalBytesSent);
            console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend);
          });

          // uploadTask.abort() // 取消上传任务
        }
      });
      // wx.request({
      //   url: 'http://192.168.19.164:3000/photo/upload',
      //   data: {
      //     test: 'test'
      //   },
      //   success: function (res) {
      //     console.log(res)
      //   }
      // })
    }
  }
});

/***/ }),

/***/ 43:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "weui-cell__bd"
  }, [_c('div', {
    staticClass: "weui-uploader"
  }, [_c('div', {
    staticClass: "weui-uploader__bd"
  }, [_c('div', {
    staticClass: "weui-uploader__file",
    attrs: {
      "id": "uploaderFiles"
    }
  }, _vm._l((_vm.imgUrls), function(item, index) {
    return _c('block', {
      key: index
    }, [_c('div', {
      staticClass: "weui-uploader__img"
    }, [_c('img', {
      staticStyle: {
        "width": "80px",
        "height": "80px"
      },
      attrs: {
        "src": item,
        "mode": _vm.aspectFill
      }
    })])])
  })), _vm._v(" "), _c('div', {
    staticClass: "weui-uploader__file"
  }, _vm._l((_vm.upUrls), function(item, index) {
    return _c('block', {
      key: index
    }, [_c('div', {
      staticClass: "weui-uploader__img",
      attrs: {
        "eventid": '0-' + index
      },
      on: {
        "click": _vm.bindUpImage
      }
    }, [_c('img', {
      staticStyle: {
        "width": "80px",
        "height": "80px",
        "background-color": "#D5D5D6"
      },
      attrs: {
        "src": item,
        "mode": _vm.aspectFill
      }
    })])])
  }))])])])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-8cb57012", esExports)
  }
}

/***/ })

},[39]);
//# sourceMappingURL=main.js.map