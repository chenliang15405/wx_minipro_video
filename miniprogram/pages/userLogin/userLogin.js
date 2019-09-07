"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app = getApp();
Page({
    data: {},
    doLogin: function (e) {
        var _a = e.detail.value, username = _a.username, password = _a.password;
        if (username.length == 0 || password == 0) {
            wx.showToast({
                title: "用户名、密码不能为空",
                icon: "none",
                duration: 3000
            });
        }
        else {
            var url = app.serverUrl;
            wx.showLoading({
                title: "Loading..."
            });
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
                success: function (res) {
                    wx.hideLoading();
                    console.log(res.data);
                    var _a = res.data, status = _a.status, msg = _a.msg, data = _a.data;
                    if (status == 200) {
                        wx.showToast({
                            title: '登录成功',
                            icon: "success",
                            duration: 3000
                        });
                        console.log(data);
                        app.userInfo = data;
                        wx.navigateTo({
                            url: '/pages/mine/mine'
                        });
                    }
                    else {
                        wx.showToast({
                            title: msg,
                            icon: "none",
                            duration: 3000
                        });
                    }
                }
            });
        }
    },
    goRegist: function () {
        wx.navigateTo({
            url: '../userRegist/userRegist'
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlckxvZ2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXNlckxvZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0EsSUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFVLENBQUE7QUFFNUIsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFFLEVBRUw7SUFDRCxPQUFPLEVBQVAsVUFBUSxDQUFNO1FBQ04sSUFBQSxtQkFBdUMsRUFBckMsc0JBQVEsRUFBRSxzQkFBMkIsQ0FBQTtRQUM3QyxJQUFJLFFBQVEsQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLFFBQVEsSUFBSSxDQUFDLEVBQUU7WUFDekMsRUFBRSxDQUFDLFNBQVMsQ0FBQztnQkFDWCxLQUFLLEVBQUUsWUFBWTtnQkFDbkIsSUFBSSxFQUFFLE1BQU07Z0JBQ1osUUFBUSxFQUFFLElBQUk7YUFDZixDQUFDLENBQUE7U0FDSDthQUFNO1lBQ0wsSUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQTtZQUN6QixFQUFFLENBQUMsV0FBVyxDQUFDO2dCQUNiLEtBQUssRUFBRSxZQUFZO2FBQ3BCLENBQUMsQ0FBQTtZQUNGLEVBQUUsQ0FBQyxPQUFPLENBQUM7Z0JBQ1QsR0FBRyxFQUFFLEdBQUcsR0FBRyxRQUFRO2dCQUNuQixNQUFNLEVBQUUsTUFBTTtnQkFDZCxJQUFJLEVBQUU7b0JBQ0osUUFBUSxFQUFFLFFBQVE7b0JBQ2xCLFFBQVEsRUFBRSxRQUFRO2lCQUNuQjtnQkFDRCxNQUFNLEVBQUU7b0JBQ04sY0FBYyxFQUFFLGtCQUFrQjtpQkFDbkM7Z0JBQ0QsT0FBTyxFQUFQLFVBQVEsR0FBUTtvQkFDZCxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUE7b0JBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO29CQUNmLElBQUEsYUFBcUMsRUFBbkMsa0JBQU0sRUFBRSxZQUFHLEVBQUUsY0FBc0IsQ0FBQTtvQkFDM0MsSUFBSSxNQUFNLElBQUksR0FBRyxFQUFFO3dCQUNqQixFQUFFLENBQUMsU0FBUyxDQUFDOzRCQUNYLEtBQUssRUFBRSxNQUFNOzRCQUNiLElBQUksRUFBRSxTQUFTOzRCQUNmLFFBQVEsRUFBRSxJQUFJO3lCQUNmLENBQUMsQ0FBQTt3QkFDRixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO3dCQUNqQixHQUFHLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQTt3QkFFbkIsRUFBRSxDQUFDLFVBQVUsQ0FBQzs0QkFDWixHQUFHLEVBQUUsa0JBQWtCO3lCQUN4QixDQUFDLENBQUE7cUJBQ0g7eUJBQU07d0JBQ0wsRUFBRSxDQUFDLFNBQVMsQ0FBQzs0QkFDWCxLQUFLLEVBQUUsR0FBRzs0QkFDVixJQUFJLEVBQUUsTUFBTTs0QkFDWixRQUFRLEVBQUUsSUFBSTt5QkFDZixDQUFDLENBQUE7cUJBQ0g7Z0JBQ0gsQ0FBQzthQUNGLENBQUMsQ0FBQTtTQUNIO0lBQ0gsQ0FBQztJQUNELFFBQVEsRUFBUjtRQUNFLEVBQUUsQ0FBQyxVQUFVLENBQUM7WUFDWixHQUFHLEVBQUUsMEJBQTBCO1NBQ2hDLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvL+iOt+WPluW6lOeUqOWunuS+i1xuaW1wb3J0IHsgSU15QXBwIH0gZnJvbSAnLi4vLi4vYXBwJ1xuXG5jb25zdCBhcHAgPSBnZXRBcHA8SU15QXBwPigpXG5cblBhZ2Uoe1xuICBkYXRhOiB7XG5cbiAgfSxcbiAgZG9Mb2dpbihlOiBhbnkpOiB2b2lke1xuICAgIGNvbnN0IHsgdXNlcm5hbWUsIHBhc3N3b3JkIH0gPSBlLmRldGFpbC52YWx1ZVxuICAgIGlmICh1c2VybmFtZS5sZW5ndGggPT0gMCB8fCBwYXNzd29yZCA9PSAwKSB7XG4gICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICB0aXRsZTogXCLnlKjmiLflkI3jgIHlr4bnoIHkuI3og73kuLrnqbpcIixcbiAgICAgICAgaWNvbjogXCJub25lXCIsXG4gICAgICAgIGR1cmF0aW9uOiAzMDAwXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB1cmwgPSBhcHAuc2VydmVyVXJsXG4gICAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICAgIHRpdGxlOiBcIkxvYWRpbmcuLi5cIlxuICAgICAgfSlcbiAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICB1cmw6IHVybCArIFwiL2xvZ2luXCIsXG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICB1c2VybmFtZTogdXNlcm5hbWUsXG4gICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkXG4gICAgICAgIH0sXG4gICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfSxcbiAgICAgICAgc3VjY2VzcyhyZXM6IGFueSk6IHZvaWQge1xuICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSlcbiAgICAgICAgICBjb25zdCB7IHN0YXR1cywgbXNnLCBkYXRhIH06IGFueSA9IHJlcy5kYXRhXG4gICAgICAgICAgaWYgKHN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgIHRpdGxlOiAn55m75b2V5oiQ5YqfJyxcbiAgICAgICAgICAgICAgaWNvbjogXCJzdWNjZXNzXCIsXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAzMDAwXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSlcbiAgICAgICAgICAgIGFwcC51c2VySW5mbyA9IGRhdGFcbiAgICAgICAgICAgIC8vIOi3s+i9rOmhtemdolxuICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgIHVybDogJy9wYWdlcy9taW5lL21pbmUnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICB0aXRsZTogbXNnLFxuICAgICAgICAgICAgICBpY29uOiBcIm5vbmVcIixcbiAgICAgICAgICAgICAgZHVyYXRpb246IDMwMDBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfSxcbiAgZ29SZWdpc3QoKTp2b2lkIHtcbiAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgIHVybDogJy4uL3VzZXJSZWdpc3QvdXNlclJlZ2lzdCdcbiAgICB9KVxuICB9XG59KSJdfQ==