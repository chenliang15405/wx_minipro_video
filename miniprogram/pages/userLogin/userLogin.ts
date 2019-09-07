//获取应用实例
import { IMyApp } from '../../app'

const app = getApp<IMyApp>()

Page({
  data: {

  },
  doLogin(e: any): void{
    const { username, password } = e.detail.value
    if (username.length == 0 || password == 0) {
      wx.showToast({
        title: "用户名、密码不能为空",
        icon: "none",
        duration: 3000
      })
    } else {
      const url = app.serverUrl
      wx.showLoading({
        title: "Loading..."
      })
      wx.request({
        url: url + "/login",
        method: "POST",
        data: {
          username: username,
          password: password
        },
        header: {
          'Content-type': 'application/json'
        },
        success(res: any): void {
          wx.hideLoading()
          console.log(res.data)
          const { status, msg, data }: any = res.data
          if (status == 200) {
            wx.showToast({
              title: '登录成功',
              icon: "success",
              duration: 3000
            })
            console.log(data)
            app.userInfo = data
            // 跳转页面
            wx.navigateTo({
              url: '/pages/mine/mine'
            })
          } else {
            wx.showToast({
              title: msg,
              icon: "none",
              duration: 3000
            })
          }
        }
      })
    }
  },
  goRegist():void {
    wx.navigateTo({
      url: '../userRegist/userRegist'
    })
  }
})