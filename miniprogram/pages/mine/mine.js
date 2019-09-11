"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app = getApp();
Page({
    data: {
        faceUrl: '../../resource/images/noneface.png',
        nickname: 'nickname',
        fansCounts: 0,
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
                var data = res.data.data;
                var userInfo = data;
                console.log('load..', userInfo);
                if (data.status == 200) {
                    if (!userInfo.faceImage) {
                        userInfo.faceImage = _this.data.faceUrl;
                    }
                    else {
                        userInfo.faceImage = app.serverUrl + userInfo.faceImage;
                    }
                    _this.setData({
                        faceUrl: userInfo.faceImage,
                        nickname: userInfo.nickname,
                        fansCounts: userInfo.fansCounts,
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
        wx.chooseVideo({
            sourceType: ['album', 'camera'],
            camera: 'back',
            success: function (res) {
                console.log(res);
                var duration = res.duration;
                var tempHeight = res.height;
                var tempWidth = res.width;
                var tempFilePath = res.tempFilePath;
                var thumbTempFilePath = res.thumbTempFilePath;
                if (duration > 11) {
                    wx.showToast({
                        title: '视频长度不能超过10s...',
                        icon: 'none',
                        duration: 2000
                    });
                }
                else if (duration < 1) {
                    wx.showToast({
                        title: '视频长度太短',
                        icon: 'none',
                        duration: 2000
                    });
                }
                else {
                    wx.navigateTo({
                        url: "/pages/bgm/bgm?duration=" + duration + "&tempHeight=" + tempHeight + "&tempWidth=" + tempWidth + "&tempFilePath=" + tempFilePath + "&tempConverPath=" + thumbTempFilePath
                    });
                }
            }
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1pbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSxJQUFNLEdBQUcsR0FBRyxNQUFNLEVBQVUsQ0FBQTtBQVU1QixJQUFJLENBQUM7SUFDSCxJQUFJLEVBQWE7UUFDZixPQUFPLEVBQUUsb0NBQW9DO1FBQzdDLFFBQVEsRUFBRSxVQUFVO1FBQ3BCLFVBQVUsRUFBRSxDQUFDO1FBQ2IsaUJBQWlCLEVBQUUsQ0FBQztRQUNwQixZQUFZLEVBQUUsQ0FBQztLQUNoQjtJQUNELE1BQU0sRUFBQztRQUNMLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQTtRQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUE7UUFFL0IsRUFBRSxDQUFDLFdBQVcsQ0FBQztZQUNkLEtBQUssRUFBRSxZQUFZO1NBQ3BCLENBQUMsQ0FBQTtRQUNGLEVBQUUsQ0FBQyxPQUFPLENBQUM7WUFDVCxHQUFHLEVBQUUsR0FBRyxDQUFDLFNBQVMsR0FBRyxxQkFBcUIsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDNUQsTUFBTSxFQUFFLEtBQUs7WUFDYixJQUFJLEVBQUUsRUFDTDtZQUNELE1BQU0sRUFBRTtnQkFDTixjQUFjLEVBQUUsa0JBQWtCO2FBQ25DO1lBQ0QsT0FBTyxFQUFQLFVBQVEsR0FBRztnQkFDVCxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUE7Z0JBQ1QsSUFBQSxvQkFBSSxDQUFpQjtnQkFDNUIsSUFBTSxRQUFRLEdBQU8sSUFBSSxDQUFBO2dCQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQTtnQkFDL0IsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLEdBQUcsRUFBRTtvQkFDdEIsSUFBRyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUU7d0JBQ3RCLFFBQVEsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENB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QUk7cUJBQ2YsQ0FBQyxDQUFBO29CQUNGLEdBQUcsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFBO29CQUVqQixFQUFFLENBQUMsVUFBVSxDQUFDO3dCQUNaLEdBQUcsRUFBRSw0QkFBNEI7cUJBQ2xDLENBQUMsQ0FBQTtpQkFDRDtZQUNILENBQUM7U0FDSixDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy/ojrflj5blupTnlKjlrp7kvotcbmltcG9ydCB7IElNeUFwcCB9IGZyb20gJy4uLy4uL2FwcCdcblxuY29uc3QgYXBwID0gZ2V0QXBwPElNeUFwcD4oKVxuXG5pbnRlcmZhY2UgRGF0YVByb3Age1xuICBmYWNlVXJsOiBzdHJpbmdcbiAgbmlja25hbWU6IHN0cmluZ1xuICBmYW5zQ291bnRzOiBudW1iZXJcbiAgcmVjZWl2ZUxpa2VDb3VudHM6IG51bWJlclxuICBmb2xsb3dDb3VudHM6IG51bWJlclxufVxuXG5QYWdlKHtcbiAgZGF0YTogPERhdGFQcm9wPiB7XG4gICAgZmFjZVVybDogJy4uLy4uL3Jlc291cmNlL2ltYWdlcy9ub25lZmFjZS5wbmcnLFxuICAgIG5pY2tuYW1lOiAnbmlja25hbWUnLFxuICAgIGZhbnNDb3VudHM6IDAsXG4gICAgcmVjZWl2ZUxpa2VDb3VudHM6IDAsXG4gICAgZm9sbG93Q291bnRzOiAwXG4gIH0sXG4gIG9uTG9hZDpmdW5jdGlvbigpIHtcbiAgICBjb25zdCBfdGhpcyA9IHRoaXNcbiAgICBjb25zb2xlLmxvZygnbG9hZGluZy4uLi4uLi4uLi4nKVxuICAgIC8vIOiOt+WPlueUqOaIt+S/oeaBr1xuICAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICB0aXRsZTogJ0xvYWRpbmcuLi4nXG4gICAgfSlcbiAgICB3eC5yZXF1ZXN0KHtcbiAgICAgIHVybDogYXBwLnNlcnZlclVybCArIFwiL3VzZXIvcXVlcnk/dXNlcklkPVwiICsgYXBwLnVzZXJJbmZvLmlkLFxuICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgZGF0YToge1xuICAgICAgfSxcbiAgICAgIGhlYWRlcjoge1xuICAgICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICB9LFxuICAgICAgc3VjY2VzcyhyZXMpOiB2b2lkIHtcbiAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxuICAgICAgICBjb25zdCB7ZGF0YX06IGFueSA9IHJlcy5kYXRhXG4gICAgICAgIGNvbnN0IHVzZXJJbmZvOmFueSA9IGRhdGFcbiAgICAgICAgY29uc29sZS5sb2coJ2xvYWQuLicsIHVzZXJJbmZvKVxuICAgICAgICBpZiAoZGF0YS5zdGF0dXMgPT0gMjAwKSB7XG4gICAgICAgICAgaWYoIXVzZXJJbmZvLmZhY2VJbWFnZSkge1xuICAgICAgICAgICAgdXNlckluZm8uZmFjZUltYWdlID0gX3RoaXMuZGF0YS5mYWNlVXJsXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHVzZXJJbmZvLmZhY2VJbWFnZSA9IGFwcC5zZXJ2ZXJVcmwgKyB1c2VySW5mby5mYWNlSW1hZ2VcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8g5ZCO6Z2i5Yqg5LiKICEg6Z2e56m65pat6KiA56ym77yM5qCH56S65ZCO6Z2i55qE6Z2edW5kZWZpbmVk77yM6KaB5LiN5oql6ZSZXG4gICAgICAgICAgLy8g5oiW6ICF5L2/55SoIEB0cy1pZ25vcmVcbiAgICAgICAgICBfdGhpcy5zZXREYXRhISh7XG4gICAgICAgICAgICBmYWNlVXJsOiB1c2VySW5mby5mYWNlSW1hZ2UsXG4gICAgICAgICAgICBuaWNrbmFtZTogdXNlckluZm8ubmlja25hbWUsXG4gICAgICAgICAgICBmYW5zQ291bnRzOiB1c2VySW5mby5mYW5zQ291bnRzLFxuICAgICAgICAgICAgcmVjZWl2ZUxpa2VDb3VudHM6IHVzZXJJbmZvLnJlY2VpdmVMaWtlQ291bnRzLFxuICAgICAgICAgICAgZm9sbG93Q291bnRzOiB1c2VySW5mby5mb2xsb3dDb3VudHNcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfSxcbiAgLy8g5LiK5Lyg5aS05YOPXG4gIGNob29zZUZhY2UoKTogdm9pZCB7XG4gICAgY29uc3QgX3RoaXMgPSB0aGlzXG4gICAgLy8g5b6u5L+h5LiK5Lyg5Zu+54mHXG4gICAgd3guY2hvb3NlSW1hZ2Uoe1xuICAgICAgY291bnQ6IDEsXG4gICAgICBzaXplVHlwZTogWydvcmlnaW5hbCcsICdjb21wcmVzc2VkJ10sXG4gICAgICBzb3VyY2VUeXBlOiBbJ2FsYnVtJywgJ2NhbWVyYSddLFxuICAgICAgc3VjY2VzcyAocmVzKSB7XG4gICAgICAgIC8vIHRlbXBGaWxlUGF0aOWPr+S7peS9nOS4umltZ+agh+etvueahHNyY+WxnuaAp+aYvuekuuWbvueJh1xuICAgICAgICBjb25zdCB0ZW1wRmlsZVBhdGhzID0gcmVzLnRlbXBGaWxlUGF0aHNcbiAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xuICAgICAgICAgIHRpdGxlOiAnTG9hZGluZy4uLidcbiAgICAgICAgfSlcbiAgICAgICAgLy8g6LCD55So5b6u5L+h55qE5LiK5Lyg5Zu+54mHYXBpLOWPr+S7peiOt+WPluWIsOWbvueJh+S/oeaBr++8jOeEtuWQjuiwg+eUqHVwbG9hZEFQSe+8jOS4iuS8oOWbvueJh+WIsOacjeWKoeerr1xuICAgICAgICB3eC51cGxvYWRGaWxlKHtcbiAgICAgICAgICB1cmw6IGFwcC5zZXJ2ZXJVcmwgKyBcIi91c2VyL3VwbG9hZEZhY2U/dXNlcklkPVwiICsgYXBwLnVzZXJJbmZvLmlkLFxuICAgICAgICAgIGZpbGVQYXRoOiB0ZW1wRmlsZVBhdGhzWzBdLFxuICAgICAgICAgIG5hbWU6ICdmaWxlJyxcbiAgICAgICAgICBzdWNjZXNzKHJlczogYW55KSB7XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgICAgICAgICAvLyB1cGxvYWRGaWxlIEFQSSDov5Tlm57nmoRyZXMuZGF0YeaYr1N0cmluZ+exu+Wei++8jOaJgOS7pemcgOimgeS9v+eUqOi9rOaNouS4umpzb27nsbvlnotcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKHJlcy5kYXRhKVxuICAgICAgICAgICAgLy9kbyBzb21ldGhpbmdcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd1cGxvYWQgZmlsZSA6JywgcmVzKVxuICAgICAgICAgICAgaWYoZGF0YS5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn5LiK5Lyg5oiQ5YqfficsXG4gICAgICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIGNvbnN0IGltYWdldXJsID0gZGF0YS5kYXRhXG4gICAgICAgICAgICAgIF90aGlzLnNldERhdGEhKHtcbiAgICAgICAgICAgICAgICBmYWNlVXJsOiBhcHAuc2VydmVyVXJsICsgaW1hZ2V1cmxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICfkuIrkvKDlpLHotKV+J1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuICB1cGxvYWRWaWRlbygpOiB2b2lkIHtcbiAgICAvLyDlvq7kv6HkuIrkvKDop4bpopFBUGnvvIzlj6/ku6Xojrflj5bliLDop4bpopHnmoTlpJrkuKrkv6Hmga/mlbDmja7vvIzlubbov5Tlm57kuLTml7bot6/lvoRcbiAgICB3eC5jaG9vc2VWaWRlbyh7XG4gICAgICBzb3VyY2VUeXBlOiBbJ2FsYnVtJywnY2FtZXJhJ10sXG4gICAgICBjYW1lcmE6ICdiYWNrJyxcbiAgICAgIHN1Y2Nlc3MocmVzOiBhbnkpIHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBjb25zdCBkdXJhdGlvbjpudW1iZXIgPSByZXMuZHVyYXRpb25cbiAgICAgICAgY29uc3QgdGVtcEhlaWdodDogbnVtYmVyID0gcmVzLmhlaWdodFxuICAgICAgICBjb25zdCB0ZW1wV2lkdGg6IG51bWJlciA9IHJlcy53aWR0aFxuICAgICAgICBjb25zdCB0ZW1wRmlsZVBhdGg6IHN0cmluZyA9IHJlcy50ZW1wRmlsZVBhdGhcbiAgICAgICAgY29uc3QgdGh1bWJUZW1wRmlsZVBhdGg6IHN0cmluZyA9IHJlcy50aHVtYlRlbXBGaWxlUGF0aFxuICAgICAgICAvLyDliKTmlq1cbiAgICAgICAgaWYoZHVyYXRpb24gPiAxMSkge1xuICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+inhumikemVv+W6puS4jeiDvei2hei/hzEwcy4uLicsXG4gICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICBkdXJhdGlvbjogMjAwMFxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSBpZihkdXJhdGlvbiA8IDEpIHtcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgIHRpdGxlOiAn6KeG6aKR6ZW/5bqm5aSq55+tJyxcbiAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgZHVyYXRpb246IDIwMDBcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIOi/m+WFpemAieaLqWJnbemhtemdou+8jOaQuuW4puinhumikeeahOWPguaVsOS/oeaBr1xuICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL2JnbS9iZ20/ZHVyYXRpb249JHtkdXJhdGlvbn0mdGVtcEhlaWdodD0ke3RlbXBIZWlnaHR9JnRlbXBXaWR0aD0ke3RlbXBXaWR0aH0mdGVtcEZpbGVQYXRoPSR7dGVtcEZpbGVQYXRofSZ0ZW1wQ29udmVyUGF0aD0ke3RodW1iVGVtcEZpbGVQYXRofWBcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfSxcbiAgbG9nb3V0KCk6IHZvaWQge1xuICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgIHRpdGxlOiAn5q2j5Zyo6YCA5Ye655m75b2VJ1xuICAgIH0pXG4gICAgd3gucmVxdWVzdCh7XG4gICAgICB1cmw6IGFwcC5zZXJ2ZXJVcmwgKyBcIi9sb2dvdXRcIixcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBkYXRhOiB7XG4gICAgICB9LFxuICAgICAgaGVhZGVyOiB7XG4gICAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgIH0sXG4gICAgICBzdWNjZXNzKHJlczogYW55KTogdm9pZCB7XG4gICAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAgICAgY29uc29sZS5sb2coJ2xvZ291dCcsIHJlcy5kYXRhKVxuICAgICAgICBjb25zdCB7IHN0YXR1cyB9OiBhbnkgPSByZXMuZGF0YVxuICAgICAgICBpZiAoc3RhdHVzID09IDIwMCkge1xuICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+W3sumAgOWHuueZu+W9lScsXG4gICAgICAgICAgICBpY29uOiBcInN1Y2Nlc3NcIixcbiAgICAgICAgICAgIGR1cmF0aW9uOiAzMDAwXG4gICAgICAgICAgfSlcbiAgICAgICAgICBhcHAudXNlckluZm8gPSB7fVxuICAgICAgICAgIC8vIOi3s+i9rOmhtemdolxuICAgICAgICAgIHd4LnJlZGlyZWN0VG8oe1xuICAgICAgICAgICAgdXJsOiAnL3BhZ2VzL3VzZXJMb2dpbi91c2VyTG9naW4nXG4gICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KVxuICB9XG59KSJdfQ==