<template>
  <div class="weui-cell__bd">
    <div class="weui-uploader">
      <!--<div class="weui-uploader__hd">-->
        <!--<div class="weui-uploader__title">图片上传</div>-->
        <!--<view class="weui-uploader__info">/2</view>-->
      <!--</div>-->
      <div class="weui-uploader__bd">
        <div class="weui-uploader__file" id="uploaderFiles">
          <block v-for="(item,index) in imgUrls" :key="index">
            <div class="weui-uploader__img">
              <img :src="item"  :mode="aspectFill" style="width: 80px;height: 80px"/>
            </div>
          </block>
        </div>
        <div class="weui-uploader__file">
          <block v-for="(item,index) in upUrls" :key="index">
            <div class="weui-uploader__img" @click="bindUpImage">
              <img :src="item"  :mode="aspectFill" style="width: 80px;height: 80px;background-color: #D5D5D6"/>
            </div>
          </block>
        </div>
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
        imgUrls: [
          'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
        ],
        upUrls: [
          '../../static/images/add.png'
        ]
      }
    },
    onLoad () {
    },
    onShow () {
    },
    methods: {
      bindUpImage: function () {
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
          success: function (res) {
            console.log('chooseImage success')
            wx.showLoading({
              title: '上传中...'
            })
            var tempFilePaths = res.tempFilePaths
            const uploadTask = wx.uploadFile({
              url: 'http://192.168.19.164:3000/photo/upload?',
              filePath: tempFilePaths[0],
              header: {
                'content-type': 'multipart/form-data'
              },
              name: 'file',
              formData: {
                'user': 'test'
              },
              success: function (res) {
                var data = res.data
                console.log(res)
                wx.hideLoading()
              },
              fail: function (res) {
                console.log(res)
              }
            })
            uploadTask.onProgressUpdate((res) => {
              console.log('上传进度', res.progress)
              console.log('已经上传的数据长度', res.totalBytesSent)
              console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
            })

            // uploadTask.abort() // 取消上传任务
          }
        })
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
  }
</script>

<style scoped>

  .weui-uploader{}
  .weui-uploader__hd {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    padding-bottom: 10px;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
  .weui-uploader__title {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
  }
  .weui-uploader__info {
    color: #B2B2B2;
  }
  .weui-uploader__bd {
    margin-bottom: -4px;
    margin-right: -9px;
    overflow: hidden;
  }
  .weui-uploader__file {
    /*float: left;*/
    /*margin-right: 9px;*/
    /*margin-bottom: 9px;*/
    display: flex;
    width: 100%;
    margin: 10px;
  }
  .weui-uploader__img {
    display: block;
    flex: 1;
    margin: 5px;
  }

  img-test {
    z-index:2;
    background-color: #888888;
    /*position: absolute;*/
  }

</style>

