//获取应用实例
import { IMyApp } from '../../app'

const app = getApp<IMyApp>()

interface DataProp {
  bgmList: Array<Object>
  serverUrl?: string
  videoParams: {
    duration: string
    tempHeight?: number
    tempWidth?: number
    tempFilePath: string
    tempConverPath?: string
  }
}


Page({
  data: <DataProp> {
    bgmList:[],
    serverUrl: app.serverUrl,
    videoParams: {
      duration: '',
      tempHeight: 0,
      tempWidth: 0,
      tempFilePath: '',
      tempConverPath: ''
    }
  },
  onLoad(params: any){
    const _this = this
    console.log('videoParams', params)
    _this.setData!({
      videoParams: params
    })
    // 获取bgmList
    wx.showLoading({
      title: '获取BGM...'
    })
    wx.request({
      url: app.serverUrl + "/bgm/list",
      method: 'GET',
      header: {
        'Content-type': 'application/json'
      },
      success(res: any): void {
        wx.hideLoading()
        if(res.data.status === 200) {
          _this.setData!({
            bgmList: res.data.data
          })
        }
      }
    })
  },
  uploadVideo(e: any) {
    const _this = this
    const bgmId = e.detail.value.bgmId
    const desc = e.detail.value.desc

    const duration: string = _this.data.videoParams.duration || '0'
    const tmpHeight: number = _this.data.videoParams.tempHeight || 0
    const tempWidth: number = _this.data.videoParams.tempWidth || 0
    const tempVideoPath: string = _this.data.videoParams.tempFilePath || ''
    // 微信返回的封面图片是一个文件，所以需要再次上传（手机小程序不会返回该参数）
    // const tempConverFilePath: string = _this.data.videoParams.tempConverPath || ''

    // 上传视频
    wx.showLoading({
          title: '上传中...'
    })
    wx.uploadFile({
      url: app.serverUrl + "/video/upload",
      formData:{
        userId: app.getGlobalUserInfo().id, //替换全局缓存: app.userInfo
        bgmId: bgmId,
        videoSeconds: duration,
        videoWidth: tempWidth,
        videoHeight: tmpHeight,
        desc: desc,
      },
      filePath: tempVideoPath,
      name: 'file',
      header: {
        'Content-type': 'application/json'
      },
      success(res: any) {
        wx.hideLoading()
        // uploadFile API 返回的res.data是String类型，所以需要使用转换为json类型
        const data = JSON.parse(res.data)
        //do something
        console.log('upload video :', data)
        if(data.status === 200) {
          //返回上一级页面
          wx.navigateBack({
            delta: 1
          })
          wx.showToast({
            title: '上传成功~',
            icon: 'success',
            duration: 2000
          })
          // 上传封面图片文件
          // const videoId = data.data
          // 手机上不会返回封面图临时路径
          // wx.uploadFile({
          //   url: app.serverUrl + "/video/uploadCover",
          //   formData:{
          //     userId: app.userInfo.id,
          //     videoId: videoId
          //   },
          //   filePath: tempConverFilePath,
          //   name: 'file',
          //   header: {
          //     'Content-type': 'application/json'
          //   },
          //   success(res: any) {
          //     wx.hideLoading()
          //     // uploadFile API 返回的res.data是String类型，所以需要使用转换为json类型
          //     const data = JSON.parse(res.data)
          //     //do something
          //     console.log('upload cover file  :', res)
          //     if(data.status === 200) {
          //       wx.showToast({
          //         title: '上传成功~',
          //         icon: 'success',
          //         duration: 1000
          //       })   
          //     } else {
          //       wx.showToast({
          //         title: '上传失败~'
          //       })
          //     }
          //   }
          // })

        } else {
          wx.showToast({
            title: '上传失败~'
          })
        }
      }
    })
  }
})