"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app = getApp();
Page({
    data: {},
    doRegist: function (e) {
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
                success: function (res) {
                    console.log(res.data);
                    var _a = res.data, status = _a.status, msg = _a.msg, data = _a.data;
                    if (status == 200) {
                        wx.showToast({
                            title: '用户注册成功～',
                            icon: "none",
                            duration: 3000
                        });
                        app.userInfo = data;
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
    goLogin: function () {
        wx.navigateTo({
            url: '../userLogin/userLogin'
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlclJlZ2lzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVzZXJSZWdpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSxJQUFNLEdBQUcsR0FBRyxNQUFNLEVBQVUsQ0FBQTtBQUU1QixJQUFJLENBQUM7SUFDSCxJQUFJLEVBQUUsRUFFTDtJQUNELFFBQVEsRUFBUixVQUFTLENBQU07UUFDUCxJQUFBLG1CQUFxQyxFQUFwQyxzQkFBUSxFQUFFLHNCQUEwQixDQUFBO1FBQzNDLElBQUcsUUFBUSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksUUFBUSxJQUFJLENBQUMsRUFBQztZQUN2QyxFQUFFLENBQUMsU0FBUyxDQUFDO2dCQUNYLEtBQUssRUFBRSxZQUFZO2dCQUNuQixJQUFJLEVBQUUsTUFBTTtnQkFDWixRQUFRLEVBQUMsSUFBSTthQUNkLENBQUMsQ0FBQTtTQUNIO2FBQU07WUFDTCxJQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFBO1lBQ3pCLEVBQUUsQ0FBQyxPQUFPLENBQUM7Z0JBQ1QsR0FBRyxFQUFFLEdBQUcsR0FBRyxTQUFTO2dCQUNwQixNQUFNLEVBQUUsTUFBTTtnQkFDZCxJQUFJLEVBQUU7b0JBQ0osUUFBUSxFQUFFLFFBQVE7b0JBQ2xCLFFBQVEsRUFBRSxRQUFRO2lCQUNuQjtnQkFDRCxNQUFNLEVBQUU7b0JBQ04sY0FBYyxFQUFFLGtCQUFrQjtpQkFDbkM7Z0JBQ0QsT0FBTyxFQUFQLFVBQVEsR0FBUTtvQkFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtvQkFDZixJQUFBLGFBQWdDLEVBQS9CLGtCQUFNLEVBQUMsWUFBRyxFQUFDLGNBQW9CLENBQUE7b0JBQ3RDLElBQUcsTUFBTSxJQUFJLEdBQUcsRUFBRTt3QkFDaEIsRUFBRSxDQUFDLFNBQVMsQ0FBQzs0QkFDWCxLQUFLLEVBQUUsU0FBUzs0QkFDaEIsSUFBSSxFQUFFLE1BQU07NEJBQ1osUUFBUSxFQUFFLElBQUk7eUJBQ2YsQ0FBQyxDQUFBO3dCQUNGLEdBQUcsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFBO3FCQUNwQjt5QkFBSzt3QkFDSixFQUFFLENBQUMsU0FBUyxDQUFDOzRCQUNYLEtBQUssRUFBRSxHQUFHOzRCQUNWLElBQUksRUFBRSxNQUFNOzRCQUNaLFFBQVEsRUFBRSxJQUFJO3lCQUNmLENBQUMsQ0FBQTtxQkFDSDtnQkFDSCxDQUFDO2FBQ0YsQ0FBQyxDQUFBO1NBQ0g7SUFDSCxDQUFDO0lBQ0QsT0FBTyxFQUFQO1FBQ0UsRUFBRSxDQUFDLFVBQVUsQ0FBQztZQUNaLEdBQUcsRUFBRSx3QkFBd0I7U0FDOUIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8v6I635Y+W5bqU55So5a6e5L6LXG5pbXBvcnQgeyBJTXlBcHAgfSBmcm9tICcuLi8uLi9hcHAnXG5cbmNvbnN0IGFwcCA9IGdldEFwcDxJTXlBcHA+KClcblxuUGFnZSh7XG4gIGRhdGE6IHtcblxuICB9LFxuICBkb1JlZ2lzdChlOiBhbnkpOiB2b2lke1xuICAgIGNvbnN0IHt1c2VybmFtZSwgcGFzc3dvcmR9ID0gZS5kZXRhaWwudmFsdWVcbiAgICBpZih1c2VybmFtZS5sZW5ndGggPT0gMCB8fCBwYXNzd29yZCA9PSAwKXtcbiAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgIHRpdGxlOiBcIueUqOaIt+WQjeOAgeWvhueggeS4jeiDveS4uuepulwiLFxuICAgICAgICBpY29uOiBcIm5vbmVcIixcbiAgICAgICAgZHVyYXRpb246MzAwMFxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdXJsID0gYXBwLnNlcnZlclVybFxuICAgICAgd3gucmVxdWVzdCh7XG4gICAgICAgIHVybDogdXJsICsgXCIvcmVnaXN0XCIsXG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICB1c2VybmFtZTogdXNlcm5hbWUsXG4gICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkXG4gICAgICAgIH0sXG4gICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfSxcbiAgICAgICAgc3VjY2VzcyhyZXM6IGFueSk6dm9pZCB7XG4gICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpXG4gICAgICAgICAgY29uc3Qge3N0YXR1cyxtc2csZGF0YX06YW55ID0gcmVzLmRhdGFcbiAgICAgICAgICBpZihzdGF0dXMgPT0gMjAwKSB7XG4gICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+eUqOaIt+azqOWGjOaIkOWKn++9nicsXG4gICAgICAgICAgICAgIGljb246IFwibm9uZVwiLFxuICAgICAgICAgICAgICBkdXJhdGlvbjogMzAwMFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGFwcC51c2VySW5mbyA9IGRhdGFcbiAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICB0aXRsZTogbXNnLFxuICAgICAgICAgICAgICBpY29uOiBcIm5vbmVcIixcbiAgICAgICAgICAgICAgZHVyYXRpb246IDMwMDBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfSxcbiAgZ29Mb2dpbigpOnZvaWQge1xuICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgdXJsOiAnLi4vdXNlckxvZ2luL3VzZXJMb2dpbidcbiAgICB9KVxuICB9XG59KSJdfQ==