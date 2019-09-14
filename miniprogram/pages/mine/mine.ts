//获取应用实例
import { IMyApp } from '../../app'

const app = getApp<IMyApp>()

interface DataProp {
  faceUrl: string
  nickname: string
  fansCounts: number
  receiveLikeCounts: number
  followCounts: number
}

Page({
  data: <DataProp> {
    faceUrl: '../../resource/images/noneface.png',
    nickname: 'nickname',
    fansCounts: 0,
    receiveLikeCounts: 0,
    followCounts: 0
  },
  onLoad:function() {
    const _this = this
    console.log('loading..........')
    // 获取用户信息
     wx.showLoading({
      title: 'Loading...'
    })
    wx.request({
      url: app.serverUrl + "/user/query?userId=" + app.getGlobalUserInfo().id,
      method: "GET",
      data: {
      },
      header: {
        'Content-type': 'application/json'
      },
      success(res): void {
        wx.hideLoading()
        const {data}: any = res.data
        const userInfo:any = data
        console.log('load..', userInfo)
        if (data.status == 200) {
          if(!userInfo.faceImage) {
            userInfo.faceImage = _this.data.faceUrl
          } else {
            userInfo.faceImage = app.serverUrl + userInfo.faceImage
          }
          // 后面加上 ! 非空断言符，标示后面的非undefined，要不报错
          // 或者使用 @ts-ignore
          _this.setData!({
            faceUrl: userInfo.faceImage,
            nickname: userInfo.nickname,
            fansCounts: userInfo.fansCounts,
            receiveLikeCounts: userInfo.receiveLikeCounts,
            followCounts: userInfo.followCounts
          })
        }
      }
    })
  },
  // 上传头像
  chooseFace(): void {
    const _this = this
    // 微信上传图片
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        wx.showLoading({
          title: 'Loading...'
        })
        // 调用微信的上传图片api,可以获取到图片信息，然后调用uploadAPI，上传图片到服务端
        wx.uploadFile({
          url: app.serverUrl + "/user/uploadFace?userId=" + app.getGlobalUserInfo().id,
          filePath: tempFilePaths[0],
          name: 'file',
          success(res: any) {
            wx.hideLoading()
            // uploadFile API 返回的res.data是String类型，所以需要使用转换为json类型
            const data = JSON.parse(res.data)
            //do something
            console.log('upload file :', res)
            if(data.status === 200) {
              wx.showToast({
                title: '上传成功~',
                icon: 'success',
                duration: 1000
              })
              const imageurl = data.data
              _this.setData!({
                faceUrl: app.serverUrl + imageurl
              })
            } else {
              wx.showToast({
                title: '上传失败~'
              })
            }
          }
        })
      }
    })
  },
  uploadVideo(): void {
    // 微信上传视频APi，可以获取到视频的多个信息数据，并返回临时路径
    wx.chooseVideo({
      sourceType: ['album','camera'],
      camera: 'back',
      success(res: any) {
        console.log(res)
        const duration:number = res.duration
        const tempHeight: number = res.height
        const tempWidth: number = res.width
        const tempFilePath: string = res.tempFilePath
        const thumbTempFilePath: string = res.thumbTempFilePath
        // 判断
        if(duration > 11) {
          wx.showToast({
            title: '视频长度不能超过10s...',
            icon: 'none',
            duration: 2000
          })
        } else if(duration < 1) {
          wx.showToast({
          title: '视频长度太短',
          icon: 'none',
          duration: 2000
          })
        } else {
          // 进入选择bgm页面，携带视频的参数信息
          wx.navigateTo({
            url: `/pages/bgm/bgm?duration=${duration}&tempHeight=${tempHeight}&tempWidth=${tempWidth}&tempFilePath=${tempFilePath}&tempConverPath=${thumbTempFilePath}`
          })
        }
      }
    })
  },
  logout(): void {
    wx.showLoading({
      title: '正在退出登录'
    })
    wx.request({
      url: app.serverUrl + "/logout",
      method: "POST",
      data: {
      },
      header: {
        'Content-type': 'application/json'
      },
      success(res: any): void {
        wx.hideLoading()
        console.log('logout', res.data)
        const { status }: any = res.data
        if (status == 200) {
          wx.showToast({
            title: '已退出登录',
            icon: "success",
            duration: 3000
          })
          // app.userInfo = {}
          // 清除缓存
          wx.removeStorageSync("userInfo")
          // 跳转页面
          wx.redirectTo({
            url: '/pages/userLogin/userLogin'
          })
          }
        }
    })
  }
})