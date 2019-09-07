"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app = getApp();
Page({
    data: {
        faceUrl: '../../resource/images/noneface.png',
        nickname: 'nickname',
        fansCount: 0,
        receiveLikeCounts: 0,
        followCounts: 0
    },
    onLoad: function () {
        var _this = this;
        console.log('loading..........');
        wx.showLoading({
            title: 'Loading...'
        });
        wx.request({
            url: app.serverUrl + "/user/query?userId=" + app.userInfo.id,
            method: "GET",
            data: {},
            header: {
                'Content-type': 'application/json'
            },
            success: function (res) {
                wx.hideLoading();
                var userInfo = res.data.data;
                console.log('load..', userInfo);
                if (res.data.status == 200) {
                    if (!userInfo.faceImage) {
                        userInfo.faceImage = _this.data.faceUrl;
                    }
                    else {
                        userInfo.faceImage = app.serverUrl + userInfo.faceImage;
                    }
                    _this.setData({
                        faceUrl: userInfo.faceImage,
                        nickname: userInfo.nickname,
                        fansCount: userInfo.fansCount,
                        receiveLikeCounts: userInfo.receiveLikeCounts,
                        followCounts: userInfo.followCounts
                    });
                }
            }
        });
    },
    chooseFace: function () {
        var _this = this;
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function (res) {
                var tempFilePaths = res.tempFilePaths;
                wx.showLoading({
                    title: 'Loading...'
                });
                wx.uploadFile({
                    url: app.serverUrl + "/user/uploadFace?userId=" + app.userInfo.id,
                    filePath: tempFilePaths[0],
                    name: 'file',
                    success: function (res) {
                        wx.hideLoading();
                        var data = JSON.parse(res.data);
                        console.log('upload file :', res);
                        if (data.status === 200) {
                            wx.showToast({
                                title: '上传成功~',
                                icon: 'success',
                                duration: 1000
                            });
                            var imageurl = data.data;
                            _this.setData({
                                faceUrl: app.serverUrl + imageurl
                            });
                        }
                        else {
                            wx.showToast({
                                title: '上传失败~'
                            });
                        }
                    }
                });
            }
        });
    },
    uploadVideo: function () {
    },
    logout: function () {
        wx.showLoading({
            title: '正在退出登录'
        });
        wx.request({
            url: app.serverUrl + "/logout",
            method: "POST",
            data: {},
            header: {
                'Content-type': 'application/json'
            },
            success: function (res) {
                wx.hideLoading();
                console.log('logout', res.data);
                var status = res.data.status;
                if (status == 200) {
                    wx.showToast({
                        title: '已退出登录',
                        icon: "success",
                        duration: 3000
                    });
                    app.userInfo = {};
                    wx.redirectTo({
                        url: '/pages/userLogin/userLogin'
                    });
                }
            }
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1pbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSxJQUFNLEdBQUcsR0FBRyxNQUFNLEVBQVUsQ0FBQTtBQVU1QixJQUFJLENBQUM7SUFDSCxJQUFJLEVBQWE7UUFDZixPQUFPLEVBQUUsb0NBQW9DO1FBQzdDLFFBQVEsRUFBRSxVQUFVO1FBQ3BCLFNBQVMsRUFBRSxDQUFDO1FBQ1osaUJBQWlCLEVBQUUsQ0FBQztRQUNwQixZQUFZLEVBQUUsQ0FBQztLQUNoQjtJQUNELE1BQU0sRUFBQztRQUNMLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQTtRQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUE7UUFFL0IsRUFBRSxDQUFDLFdBQVcsQ0FBQztZQUNkLEtBQUssRUFBRSxZQUFZO1NBQ3BCLENBQUMsQ0FBQTtRQUNGLEVBQUUsQ0FBQyxPQUFPLENBQUM7WUFDVCxHQUFHLEVBQUUsR0FBRyxDQUFDLFNBQVMsR0FBRyxxQkFBcUIsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDNUQsTUFBTSxFQUFFLEtBQUs7WUFDYixJQUFJLEVBQUUsRUFDTDtZQUNELE1BQU0sRUFBRTtnQkFDTixjQUFjLEVBQUUsa0JBQWtCO2FBQ25DO1lBQ0QsT0FBTyxFQUFQLFVBQVEsR0FBRztnQkFDVCxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUE7Z0JBQ2hCLElBQU0sUUFBUSxHQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFBO2dCQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQTtnQkFDL0IsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxHQUFHLEVBQUU7b0JBQzFCLElBQUcsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFO3dCQUN0QixRQUFRLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMs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QUksR0FBRyxFQUFFO29CQUNqQixFQUFFLENBQUMsU0FBUyxDQUFDO3dCQUNYLEtBQUssRUFBRSxPQUFPO3dCQUNkLElBQUksRUFBRSxTQUFTO3dCQUNmLFFBQVEsRUFBRSxJQUFJO3FCQUNmLENBQUMsQ0FBQTtvQkFDRixHQUFHLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQTtvQkFFakIsRUFBRSxDQUFDLFVBQVUsQ0FBQzt3QkFDWixHQUFHLEVBQUUsNEJBQTRCO3FCQUNsQyxDQUFDLENBQUE7aUJBQ0Q7WUFDSCxDQUFDO1NBQ0osQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8v6I635Y+W5bqU55So5a6e5L6LXG5pbXBvcnQgeyBJTXlBcHAgfSBmcm9tICcuLi8uLi9hcHAnXG5cbmNvbnN0IGFwcCA9IGdldEFwcDxJTXlBcHA+KClcblxuaW50ZXJmYWNlIERhdGFQcm9wIHtcbiAgZmFjZVVybDogc3RyaW5nXG4gIG5pY2tuYW1lOiBzdHJpbmdcbiAgZmFuc0NvdW50OiBudW1iZXJcbiAgcmVjZWl2ZUxpa2VDb3VudHM6IG51bWJlclxuICBmb2xsb3dDb3VudHM6IG51bWJlclxufVxuXG5QYWdlKHtcbiAgZGF0YTogPERhdGFQcm9wPiB7XG4gICAgZmFjZVVybDogJy4uLy4uL3Jlc291cmNlL2ltYWdlcy9ub25lZmFjZS5wbmcnLFxuICAgIG5pY2tuYW1lOiAnbmlja25hbWUnLFxuICAgIGZhbnNDb3VudDogMCxcbiAgICByZWNlaXZlTGlrZUNvdW50czogMCxcbiAgICBmb2xsb3dDb3VudHM6IDBcbiAgfSxcbiAgb25Mb2FkOmZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IF90aGlzID0gdGhpc1xuICAgIGNvbnNvbGUubG9nKCdsb2FkaW5nLi4uLi4uLi4uLicpXG4gICAgLy8g6I635Y+W55So5oi35L+h5oGvXG4gICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgIHRpdGxlOiAnTG9hZGluZy4uLidcbiAgICB9KVxuICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgdXJsOiBhcHAuc2VydmVyVXJsICsgXCIvdXNlci9xdWVyeT91c2VySWQ9XCIgKyBhcHAudXNlckluZm8uaWQsXG4gICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICBkYXRhOiB7XG4gICAgICB9LFxuICAgICAgaGVhZGVyOiB7XG4gICAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgIH0sXG4gICAgICBzdWNjZXNzKHJlcyk6IHZvaWQge1xuICAgICAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgICAgIGNvbnN0IHVzZXJJbmZvOmFueSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgY29uc29sZS5sb2coJ2xvYWQuLicsIHVzZXJJbmZvKVxuICAgICAgICBpZiAocmVzLmRhdGEuc3RhdHVzID09IDIwMCkge1xuICAgICAgICAgIGlmKCF1c2VySW5mby5mYWNlSW1hZ2UpIHtcbiAgICAgICAgICAgIHVzZXJJbmZvLmZhY2VJbWFnZSA9IF90aGlzLmRhdGEuZmFjZVVybFxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB1c2VySW5mby5mYWNlSW1hZ2UgPSBhcHAuc2VydmVyVXJsICsgdXNlckluZm8uZmFjZUltYWdlXG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIOWQjumdouWKoOS4iiAhIOmdnuepuuaWreiogOespu+8jOagh+ekuuWQjumdoueahOmdnnVuZGVmaW5lZO+8jOimgeS4jeaKpemUmVxuICAgICAgICAgIC8vIOaIluiAheS9v+eUqCBAdHMtaWdub3JlXG4gICAgICAgICAgX3RoaXMuc2V0RGF0YSEoe1xuICAgICAgICAgICAgZmFjZVVybDogdXNlckluZm8uZmFjZUltYWdlLFxuICAgICAgICAgICAgbmlja25hbWU6IHVzZXJJbmZvLm5pY2tuYW1lLFxuICAgICAgICAgICAgZmFuc0NvdW50OiB1c2VySW5mby5mYW5zQ291bnQsXG4gICAgICAgICAgICByZWNlaXZlTGlrZUNvdW50czogdXNlckluZm8ucmVjZWl2ZUxpa2VDb3VudHMsXG4gICAgICAgICAgICBmb2xsb3dDb3VudHM6IHVzZXJJbmZvLmZvbGxvd0NvdW50c1xuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9LFxuICAvLyDkuIrkvKDlpLTlg49cbiAgY2hvb3NlRmFjZSgpOiB2b2lkIHtcbiAgICBjb25zdCBfdGhpcyA9IHRoaXNcbiAgICAvLyDlvq7kv6HkuIrkvKDlm77niYdcbiAgICB3eC5jaG9vc2VJbWFnZSh7XG4gICAgICBjb3VudDogMSxcbiAgICAgIHNpemVUeXBlOiBbJ29yaWdpbmFsJywgJ2NvbXByZXNzZWQnXSxcbiAgICAgIHNvdXJjZVR5cGU6IFsnYWxidW0nLCAnY2FtZXJhJ10sXG4gICAgICBzdWNjZXNzIChyZXMpIHtcbiAgICAgICAgLy8gdGVtcEZpbGVQYXRo5Y+v5Lul5L2c5Li6aW1n5qCH562+55qEc3Jj5bGe5oCn5pi+56S65Zu+54mHXG4gICAgICAgIGNvbnN0IHRlbXBGaWxlUGF0aHMgPSByZXMudGVtcEZpbGVQYXRoc1xuICAgICAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICAgICAgdGl0bGU6ICdMb2FkaW5nLi4uJ1xuICAgICAgICB9KVxuICAgICAgICAvLyDosIPnlKjlvq7kv6HnmoTkuIrkvKDlm77niYdhcGks5Y+v5Lul6I635Y+W5Yiw5Zu+54mH5L+h5oGv77yM54S25ZCO6LCD55SodXBsb2FkQVBJ77yM5LiK5Lyg5Zu+54mH5Yiw5pyN5Yqh56uvXG4gICAgICAgIHd4LnVwbG9hZEZpbGUoe1xuICAgICAgICAgIHVybDogYXBwLnNlcnZlclVybCArIFwiL3VzZXIvdXBsb2FkRmFjZT91c2VySWQ9XCIgKyBhcHAudXNlckluZm8uaWQsXG4gICAgICAgICAgZmlsZVBhdGg6IHRlbXBGaWxlUGF0aHNbMF0sXG4gICAgICAgICAgbmFtZTogJ2ZpbGUnLFxuICAgICAgICAgIHN1Y2Nlc3MocmVzOiBhbnkpIHtcbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAgICAgICAgIC8vIHVwbG9hZEZpbGUgQVBJIOi/lOWbnueahHJlcy5kYXRh5pivU3RyaW5n57G75Z6L77yM5omA5Lul6ZyA6KaB5L2/55So6L2s5o2i5Li6anNvbuexu+Wei1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UocmVzLmRhdGEpXG4gICAgICAgICAgICAvL2RvIHNvbWV0aGluZ1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3VwbG9hZCBmaWxlIDonLCByZXMpXG4gICAgICAgICAgICBpZihkYXRhLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICfkuIrkvKDmiJDlip9+JyxcbiAgICAgICAgICAgICAgICBpY29uOiAnc3VjY2VzcycsXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgY29uc3QgaW1hZ2V1cmwgPSBkYXRhLmRhdGFcbiAgICAgICAgICAgICAgX3RoaXMuc2V0RGF0YSEoe1xuICAgICAgICAgICAgICAgIGZhY2VVcmw6IGFwcC5zZXJ2ZXJVcmwgKyBpbWFnZXVybFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+S4iuS8oOWksei0pX4nXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG4gIHVwbG9hZFZpZGVvKCk6IHZvaWQge1xuXG4gIH0sXG4gIGxvZ291dCgpOiB2b2lkIHtcbiAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICB0aXRsZTogJ+ato+WcqOmAgOWHuueZu+W9lSdcbiAgICB9KVxuICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgdXJsOiBhcHAuc2VydmVyVXJsICsgXCIvbG9nb3V0XCIsXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgZGF0YToge1xuICAgICAgfSxcbiAgICAgIGhlYWRlcjoge1xuICAgICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICB9LFxuICAgICAgc3VjY2VzcyhyZXM6IGFueSk6IHZvaWQge1xuICAgICAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgICAgIGNvbnNvbGUubG9nKCdsb2dvdXQnLCByZXMuZGF0YSlcbiAgICAgICAgY29uc3QgeyBzdGF0dXMgfTogYW55ID0gcmVzLmRhdGFcbiAgICAgICAgaWYgKHN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICflt7LpgIDlh7rnmbvlvZUnLFxuICAgICAgICAgICAgaWNvbjogXCJzdWNjZXNzXCIsXG4gICAgICAgICAgICBkdXJhdGlvbjogMzAwMFxuICAgICAgICAgIH0pXG4gICAgICAgICAgYXBwLnVzZXJJbmZvID0ge31cbiAgICAgICAgICAvLyDot7PovazpobXpnaJcbiAgICAgICAgICB3eC5yZWRpcmVjdFRvKHtcbiAgICAgICAgICAgIHVybDogJy9wYWdlcy91c2VyTG9naW4vdXNlckxvZ2luJ1xuICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSlcbiAgfVxufSkiXX0=