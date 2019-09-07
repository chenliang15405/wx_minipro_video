//获取应用实例
import { IMyApp } from '../../app'

const app = getApp<IMyApp>()

Page({
  data: {

  },
  doRegist(e: any): void{
    const {username, password} = e.detail.value
    if(username.length == 0 || password == 0){
      wx.showToast({
        title: "用户名、密码不能为空",
        icon: "none",
        duration:3000
      })
    } else {
      const url = app.serverUrl
      wx.request({
        url: url + "/regist",
        method: "POST",
        data: {
          username: username,
          password: password
        },
        header: {
          'Content-type': 'application/json'
        },
        success(res: any):void {
          console.log(res.data)
          const {status,msg,data}:any = res.data
          if(status == 200) {
            wx.showToast({
              title: '用户注册成功～',
              icon: "none",
              duration: 3000
            })
            app.userInfo = data
          }else {
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
  goLogin():void {
    wx.navigateTo({
      url: '../userLogin/userLogin'
    })
  }
})