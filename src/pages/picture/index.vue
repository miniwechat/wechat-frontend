<template>
  <div>
    <div style="display: flex;height: 45px;margin-top: 5px">
      <div style="line-height: 45px;margin-left: 20px">视频</div>
      <div style="line-height: 45px">
        <switch checked @change="switchImage"/>
      </div>
      <div style="line-height: 45px">图片</div>
      <button v-if="imgOrViedo" @click="bindUpImage">上传图片</button>
      <button v-if="!imgOrViedo" @click="bindUpImage">上传视频</button>
    </div>
    <button @click="bindDownloadFile" class="download">获取服务器文件列表</button>
    <div>文件名称列表(点击下载相应文件)</div>
    <div v-for="(item,index) in imgNames" :key = index>
      <div @click="downFile(item.name)">{{item.name}}</div>
    </div>
    <button type="primary" style="width: 90%;margin-bottom: 10px" @click="downFiles(imgNames)">下载所有文件</button>
    <div class="weui-cell__bd">
      <div class="weui-uploader">
        <div class="weui-uploader__bd">
          <div v-for="(item,index) in imgUrls" :key="index">
            <div class="weui-uploader__file">
              <block v-for="(items,indexs) in item" :key="indexs">
                <div class="weui-uploader__img">
                  <img :src="items"  :mode="aspectFill" style="width: 80px;height: 80px;background-color: #D5D5D6"/>
                </div>
              </block>
            </div>
          </div>
          <!--<div class="weui-uploader__file" id="uploaderFiles" v-for="(item,index) in imgUrls" :key="index">-->
            <!--<block v-for="(items,indexs) in item" :key="indexs">-->
              <!--<div style="display: flex;width: 100%;background-color: #586C94">-->
                <!--<div class="weui-uploader__img">-->
                  <!--<img :src="items"  :mode="aspectFill" style="width: 80px;height: 80px"/>-->
                <!--</div>-->
              <!--</div>-->
            <!--</block>-->
          <!--</div>-->
          <!--<div class="weui-uploader__file" id="uploaderFiles">-->
            <!--<div v-for="(item,index) in imgUrls" :key="index">-->
              <!---->
            <!--</div>-->
            <!--&lt;!&ndash;<block v-for="(item,index) in imgUrls" :key="index">&ndash;&gt;-->
              <!--&lt;!&ndash;<div class="weui-uploader__img">&ndash;&gt;-->
                <!--&lt;!&ndash;<img :src="item"  :mode="aspectFill" style="width: 80px;height: 80px"/>&ndash;&gt;-->
              <!--&lt;!&ndash;</div>&ndash;&gt;-->
            <!--&lt;!&ndash;</block>&ndash;&gt;-->
          <!--</div>-->
        </div>
      </div>
      <!--<div class="split"></div>-->
      <!--<button @click="bindDownloadFile" class="download">下载文件</button>-->
    </div>
  </div>

</template>


<script>
  import 'weui-wxss'
  export default {
    data () {
      return {
        imgUrls: [
          [
            'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
          ],
          [
            'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
          ]
        ],
        imgNames: [],
        upUrls: [
          '../../static/images/add.png'
        ],
        imgOrViedo: true // 默认上传图片
      }
    },
    onLoad () {
    },
    onShow () {
    },
    methods: {
      switchImage: function () {
        console.log('test1')
        var that = this
        that.imgOrViedo = !(that.imgOrViedo)
      },
      bindUpImage: function () {
        var that = this
        that.imgOrViedo ? that.uploadImage() : that.uploadVideo()
      },
      uploadVideo: function () {
        wx.chooseVideo({
          count: 1,
          success: function (res) {
            console.log('chooseVideo success')
            var tempFilePaths = res.tempFilePath
            console.log(tempFilePaths)
            const uploadTask = wx.uploadFile({
              url: 'http://192.168.19.164:3000/file/upload?',
              filePath: tempFilePaths,
              header: {
                'content-type': 'multipart/form-data'
              },
              name: 'file',
              formData: {
                // 'user': 'test'
              },
              success: function (res) {
                var data = res.data
                console.log(data)
                wx.hideLoading()
              },
              fail: function (res) {
                console.log(res)
              }
            })
            uploadTask.onProgressUpdate((res) => {
              wx.showLoading({
                title: '上传中...'
              })
              console.log('上传进度', res.progress)
              console.log('已经上传的数据长度', res.totalBytesSent)
              console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
            })
          }
        })
      },
      // TO DO verify the command of downloading files
      bindDownloadFile: function () {
        let that = this
        wx.request({
          url: 'http://192.168.19.164:3000/file/download',
          success: function (res) {
            if (res.data.fileList && res.data.fileList.length > 0) {
              console.log(res.data)
              that.imgNames = res.data.fileList
            } else {
              wx.showModal({
                title: '文件下载情况',
                content: '数据库无图片/视频文件'
              })
            }
          },
          fail: function () {
            console.log('fail')
          }
        })
      },
      downFile: function (name) {
        wx.downloadFile({
          url: 'http://192.168.19.164:3000/' + name,
          success (res) {
            console.log(res.tempFilePath)
          },
          fail: function (res) {
            console.log(res)
          }
        })
      },
      downFiles: function (res) {
        // let that = this
        // for (let k = 0; k < res.length; k++) {
        //   let length = that.imgUrls.length - 1
        //   if (that.imgUrls[length].length % 3 === 0) {
        //     that.imgUrls[length].push(res.tempFilePath[k])
        //   } else {
        //     that.imgUrls.push([])
        //     that.imgUrls[length + 1].push(res.tempFilePath[k])
        //   }
        // }
        // wx.downloadFile({
        //   url: 'http://192.168.19.164:3000/' + res.name,
        //   success (res) {
        //     console.log(res.tempFilePath)
        //   },
        //   fail: function (res) {
        //     console.log(res)
        //   }
        // })
      },
      uploadImage: function () {
        wx.chooseImage({
          count: 1,
          success: function (res) {
            console.log('chooseImage success')
            var tempFilePaths = res.tempFilePaths
            console.log(tempFilePaths[0])
            const uploadTask = wx.uploadFile({
              url: 'http://192.168.19.164:3000/file/upload?',
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
                console.log(data)
                wx.hideLoading()
              },
              fail: function (res) {
                console.log(res)
              }
            })
            uploadTask.onProgressUpdate((res) => {
              wx.showLoading({
                title: '上传中...'
              })
              console.log('上传进度', res.progress)
              console.log('已经上传的数据长度', res.totalBytesSent)
              console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
            })
          }
        })
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
    border:3px dotted dodgerblue;
    border-radius: 3px;
    width: 90%;
    position: absolute;
    align-content: center;
    margin-left: 20px;
  }
  .weui-uploader__file {
    /*float: left;*/
    /*margin-right: 9px;*/
    /*margin-bottom: 9px;*/
    display: flex;
    width: 100%;
    margin: 10px;
    /*background-color: red;*/
  }
  .weui-uploader__img {
    display: block;
    flex: 1;
    /*width: 100px;*/
    margin: 5px;
  }

  img-test {
    z-index:2;
    background-color: #888888;
    /*position: absolute;*/
  }

  .split {
    background-color: #C7C7C7;
    height: 2px;
    width: 96%;
    margin-left: 2%;
    margin-top: 10px;
  }

  .download {
    margin-top: 10px;
    width: 90%;
  }
</style>

