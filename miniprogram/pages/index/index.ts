//获取应用实例
import { IMyApp } from '../../app'

const app = getApp<IMyApp>()

Page({
  data: {
    screenWidth: 554,
    page: 1,
    totalPages: 1,
    videoList: [],
    serverUrl: app.serverUrl
  },
  onLoad() {
    // 获取当前设备宽度
    this.getDeviceInfo()
    // 获取video list
    this.getVideosList(this.data.page);
  },
  getDeviceInfo() {
    const width: number = wx.getSystemInfoSync().screenWidth
    this.setData!({ screenWidth: width})
  },
  onReachBottom() {
    // 上拉刷新事件
    let page: number = this.data.page
    const totalPages: number = this.data.totalPages
    if (page === totalPages) {
      wx.showToast({
        title: '已经没有视频啦...',
        icon: 'none'
      })
      return
    }
    page = page + 1
    this.getVideosList(page)
  },
  onPullDownRefresh() {
    // 下拉刷新
    wx.showNavigationBarLoading()
    this.getVideosList(1)
  },
  getVideosList(page: number) {
    const _this = this
    wx.showLoading({
      title: 'Loading...'
    })
    wx.request({
      url: `${app.serverUrl}/video/showAll?page=${page}`,
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log('video list', res.data)
        wx.hideLoading()
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
        // 如果是第一页，重置videosList
        if(page === 1) {
          _this.setData!({
            videoList: []
          })
        }
        const resp: any = res.data
        const currentList: Array<object> = _this.data.videoList
        const videoList: Array<object> = resp.data.rows || []

        _this.setData!({
          totalPages: resp.data.totalPages,
          videoList: videoList.concat(currentList),
          page: page
        })
      }
    })
  }
})