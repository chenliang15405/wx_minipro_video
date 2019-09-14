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
            url: app.serverUrl + "/user/query?userId=" + app.getGlobalUserInfo().id,
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
                    url: app.serverUrl + "/user/uploadFace?userId=" + app.getGlobalUserInfo().id,
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
                    wx.removeStorageSync("userInfo");
                    wx.redirectTo({
                        url: '/pages/userLogin/userLogin'
                    });
                }
            }
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1pbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSxJQUFNLEdBQUcsR0FBRyxNQUFNLEVBQVUsQ0FBQTtBQVU1QixJQUFJLENBQUM7SUFDSCxJQUFJLEVBQWE7UUFDZixPQUFPLEVBQUUsb0NBQW9DO1FBQzdDLFFBQVEsRUFBRSxVQUFVO1FBQ3BCLFVBQVUsRUFBRSxDQUFDO1FBQ2IsaUJBQWlCLEVBQUUsQ0FBQztRQUNwQixZQUFZLEVBQUUsQ0FBQztLQUNoQjtJQUNELE1BQU0sRUFBQztRQUNMLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQTtRQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUE7UUFFL0IsRUFBRSxDQUFDLFdBQVcsQ0FBQztZQUNkLEtBQUssRUFBRSxZQUFZO1NBQ3BCLENBQUMsQ0FBQTtRQUNGLEVBQUUsQ0FBQyxPQUFPLENBQUM7WUFDVCxHQUFHLEVBQUUsR0FBRyxDQUFDLFNBQVMsR0FBRyxxQkFBcUIsR0FBRyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxFQUFFO1lBQ3ZFLE1BQU0sRUFBRSxLQUFLO1lBQ2IsSUFBSSxFQUFFLEVBQ0w7WUFDRCxNQUFNLEVBQUU7Z0JBQ04sY0FBYyxFQUFFLGtCQUFrQjthQUNuQztZQUNELE9BQU8sRUFBUCxVQUFRLEdBQUc7Z0JBQ1QsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFBO2dCQUNULElBQUEsb0JBQUksQ0FBaUI7Z0JBQzVCLElBQU0sUUFBUSxHQUFPLElBQUksQ0FBQTtnQkFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUE7Z0JBQy9CLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxHQUFHLEVBQUU7b0JBQ3RCLElBQUcsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFO3dCQUN0QixRQUFRLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMs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ZixRQUFRLEVBQUUsSUFBSTtxQkFDZixDQUFDLENBQUE7b0JBR0YsRUFBRSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFBO29CQUVoQyxFQUFFLENBQUMsVUFBVSxDQUFDO3dCQUNaLEdBQUcsRUFBRSw0QkFBNEI7cUJBQ2xDLENBQUMsQ0FBQTtpQkFDRDtZQUNILENBQUM7U0FDSixDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy/ojrflj5blupTnlKjlrp7kvotcbmltcG9ydCB7IElNeUFwcCB9IGZyb20gJy4uLy4uL2FwcCdcblxuY29uc3QgYXBwID0gZ2V0QXBwPElNeUFwcD4oKVxuXG5pbnRlcmZhY2UgRGF0YVByb3Age1xuICBmYWNlVXJsOiBzdHJpbmdcbiAgbmlja25hbWU6IHN0cmluZ1xuICBmYW5zQ291bnRzOiBudW1iZXJcbiAgcmVjZWl2ZUxpa2VDb3VudHM6IG51bWJlclxuICBmb2xsb3dDb3VudHM6IG51bWJlclxufVxuXG5QYWdlKHtcbiAgZGF0YTogPERhdGFQcm9wPiB7XG4gICAgZmFjZVVybDogJy4uLy4uL3Jlc291cmNlL2ltYWdlcy9ub25lZmFjZS5wbmcnLFxuICAgIG5pY2tuYW1lOiAnbmlja25hbWUnLFxuICAgIGZhbnNDb3VudHM6IDAsXG4gICAgcmVjZWl2ZUxpa2VDb3VudHM6IDAsXG4gICAgZm9sbG93Q291bnRzOiAwXG4gIH0sXG4gIG9uTG9hZDpmdW5jdGlvbigpIHtcbiAgICBjb25zdCBfdGhpcyA9IHRoaXNcbiAgICBjb25zb2xlLmxvZygnbG9hZGluZy4uLi4uLi4uLi4nKVxuICAgIC8vIOiOt+WPlueUqOaIt+S/oeaBr1xuICAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICB0aXRsZTogJ0xvYWRpbmcuLi4nXG4gICAgfSlcbiAgICB3eC5yZXF1ZXN0KHtcbiAgICAgIHVybDogYXBwLnNlcnZlclVybCArIFwiL3VzZXIvcXVlcnk/dXNlcklkPVwiICsgYXBwLmdldEdsb2JhbFVzZXJJbmZvKCkuaWQsXG4gICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICBkYXRhOiB7XG4gICAgICB9LFxuICAgICAgaGVhZGVyOiB7XG4gICAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgIH0sXG4gICAgICBzdWNjZXNzKHJlcyk6IHZvaWQge1xuICAgICAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgICAgIGNvbnN0IHtkYXRhfTogYW55ID0gcmVzLmRhdGFcbiAgICAgICAgY29uc3QgdXNlckluZm86YW55ID0gZGF0YVxuICAgICAgICBjb25zb2xlLmxvZygnbG9hZC4uJywgdXNlckluZm8pXG4gICAgICAgIGlmIChkYXRhLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICBpZighdXNlckluZm8uZmFjZUltYWdlKSB7XG4gICAgICAgICAgICB1c2VySW5mby5mYWNlSW1hZ2UgPSBfdGhpcy5kYXRhLmZhY2VVcmxcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdXNlckluZm8uZmFjZUltYWdlID0gYXBwLnNlcnZlclVybCArIHVzZXJJbmZvLmZhY2VJbWFnZVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyDlkI7pnaLliqDkuIogISDpnZ7nqbrmlq3oqIDnrKbvvIzmoIfnpLrlkI7pnaLnmoTpnZ51bmRlZmluZWTvvIzopoHkuI3miqXplJlcbiAgICAgICAgICAvLyDmiJbogIXkvb/nlKggQHRzLWlnbm9yZVxuICAgICAgICAgIF90aGlzLnNldERhdGEhKHtcbiAgICAgICAgICAgIGZhY2VVcmw6IHVzZXJJbmZvLmZhY2VJbWFnZSxcbiAgICAgICAgICAgIG5pY2tuYW1lOiB1c2VySW5mby5uaWNrbmFtZSxcbiAgICAgICAgICAgIGZhbnNDb3VudHM6IHVzZXJJbmZvLmZhbnNDb3VudHMsXG4gICAgICAgICAgICByZWNlaXZlTGlrZUNvdW50czogdXNlckluZm8ucmVjZWl2ZUxpa2VDb3VudHMsXG4gICAgICAgICAgICBmb2xsb3dDb3VudHM6IHVzZXJJbmZvLmZvbGxvd0NvdW50c1xuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9LFxuICAvLyDkuIrkvKDlpLTlg49cbiAgY2hvb3NlRmFjZSgpOiB2b2lkIHtcbiAgICBjb25zdCBfdGhpcyA9IHRoaXNcbiAgICAvLyDlvq7kv6HkuIrkvKDlm77niYdcbiAgICB3eC5jaG9vc2VJbWFnZSh7XG4gICAgICBjb3VudDogMSxcbiAgICAgIHNpemVUeXBlOiBbJ29yaWdpbmFsJywgJ2NvbXByZXNzZWQnXSxcbiAgICAgIHNvdXJjZVR5cGU6IFsnYWxidW0nLCAnY2FtZXJhJ10sXG4gICAgICBzdWNjZXNzIChyZXMpIHtcbiAgICAgICAgLy8gdGVtcEZpbGVQYXRo5Y+v5Lul5L2c5Li6aW1n5qCH562+55qEc3Jj5bGe5oCn5pi+56S65Zu+54mHXG4gICAgICAgIGNvbnN0IHRlbXBGaWxlUGF0aHMgPSByZXMudGVtcEZpbGVQYXRoc1xuICAgICAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICAgICAgdGl0bGU6ICdMb2FkaW5nLi4uJ1xuICAgICAgICB9KVxuICAgICAgICAvLyDosIPnlKjlvq7kv6HnmoTkuIrkvKDlm77niYdhcGks5Y+v5Lul6I635Y+W5Yiw5Zu+54mH5L+h5oGv77yM54S25ZCO6LCD55SodXBsb2FkQVBJ77yM5LiK5Lyg5Zu+54mH5Yiw5pyN5Yqh56uvXG4gICAgICAgIHd4LnVwbG9hZEZpbGUoe1xuICAgICAgICAgIHVybDogYXBwLnNlcnZlclVybCArIFwiL3VzZXIvdXBsb2FkRmFjZT91c2VySWQ9XCIgKyBhcHAuZ2V0R2xvYmFsVXNlckluZm8oKS5pZCxcbiAgICAgICAgICBmaWxlUGF0aDogdGVtcEZpbGVQYXRoc1swXSxcbiAgICAgICAgICBuYW1lOiAnZmlsZScsXG4gICAgICAgICAgc3VjY2VzcyhyZXM6IGFueSkge1xuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxuICAgICAgICAgICAgLy8gdXBsb2FkRmlsZSBBUEkg6L+U5Zue55qEcmVzLmRhdGHmmK9TdHJpbmfnsbvlnovvvIzmiYDku6XpnIDopoHkvb/nlKjovazmjaLkuLpqc29u57G75Z6LXG4gICAgICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShyZXMuZGF0YSlcbiAgICAgICAgICAgIC8vZG8gc29tZXRoaW5nXG4gICAgICAgICAgICBjb25zb2xlLmxvZygndXBsb2FkIGZpbGUgOicsIHJlcylcbiAgICAgICAgICAgIGlmKGRhdGEuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+S4iuS8oOaIkOWKn34nLFxuICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICBjb25zdCBpbWFnZXVybCA9IGRhdGEuZGF0YVxuICAgICAgICAgICAgICBfdGhpcy5zZXREYXRhISh7XG4gICAgICAgICAgICAgICAgZmFjZVVybDogYXBwLnNlcnZlclVybCArIGltYWdldXJsXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn5LiK5Lyg5aSx6LSlfidcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgfSxcbiAgdXBsb2FkVmlkZW8oKTogdm9pZCB7XG4gICAgLy8g5b6u5L+h5LiK5Lyg6KeG6aKRQVBp77yM5Y+v5Lul6I635Y+W5Yiw6KeG6aKR55qE5aSa5Liq5L+h5oGv5pWw5o2u77yM5bm26L+U5Zue5Li05pe26Lev5b6EXG4gICAgd3guY2hvb3NlVmlkZW8oe1xuICAgICAgc291cmNlVHlwZTogWydhbGJ1bScsJ2NhbWVyYSddLFxuICAgICAgY2FtZXJhOiAnYmFjaycsXG4gICAgICBzdWNjZXNzKHJlczogYW55KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgY29uc3QgZHVyYXRpb246bnVtYmVyID0gcmVzLmR1cmF0aW9uXG4gICAgICAgIGNvbnN0IHRlbXBIZWlnaHQ6IG51bWJlciA9IHJlcy5oZWlnaHRcbiAgICAgICAgY29uc3QgdGVtcFdpZHRoOiBudW1iZXIgPSByZXMud2lkdGhcbiAgICAgICAgY29uc3QgdGVtcEZpbGVQYXRoOiBzdHJpbmcgPSByZXMudGVtcEZpbGVQYXRoXG4gICAgICAgIGNvbnN0IHRodW1iVGVtcEZpbGVQYXRoOiBzdHJpbmcgPSByZXMudGh1bWJUZW1wRmlsZVBhdGhcbiAgICAgICAgLy8g5Yik5patXG4gICAgICAgIGlmKGR1cmF0aW9uID4gMTEpIHtcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICfop4bpopHplb/luqbkuI3og73otoXov4cxMHMuLi4nLFxuICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgZHVyYXRpb246IDIwMDBcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2UgaWYoZHVyYXRpb24gPCAxKSB7XG4gICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICB0aXRsZTogJ+inhumikemVv+W6puWkquefrScsXG4gICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyDov5vlhaXpgInmi6liZ23pobXpnaLvvIzmkLrluKbop4bpopHnmoTlj4LmlbDkv6Hmga9cbiAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgIHVybDogYC9wYWdlcy9iZ20vYmdtP2R1cmF0aW9uPSR7ZHVyYXRpb259JnRlbXBIZWlnaHQ9JHt0ZW1wSGVpZ2h0fSZ0ZW1wV2lkdGg9JHt0ZW1wV2lkdGh9JnRlbXBGaWxlUGF0aD0ke3RlbXBGaWxlUGF0aH0mdGVtcENvbnZlclBhdGg9JHt0aHVtYlRlbXBGaWxlUGF0aH1gXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG4gIGxvZ291dCgpOiB2b2lkIHtcbiAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICB0aXRsZTogJ+ato+WcqOmAgOWHuueZu+W9lSdcbiAgICB9KVxuICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgdXJsOiBhcHAuc2VydmVyVXJsICsgXCIvbG9nb3V0XCIsXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgZGF0YToge1xuICAgICAgfSxcbiAgICAgIGhlYWRlcjoge1xuICAgICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICB9LFxuICAgICAgc3VjY2VzcyhyZXM6IGFueSk6IHZvaWQge1xuICAgICAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgICAgIGNvbnNvbGUubG9nKCdsb2dvdXQnLCByZXMuZGF0YSlcbiAgICAgICAgY29uc3QgeyBzdGF0dXMgfTogYW55ID0gcmVzLmRhdGFcbiAgICAgICAgaWYgKHN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICflt7LpgIDlh7rnmbvlvZUnLFxuICAgICAgICAgICAgaWNvbjogXCJzdWNjZXNzXCIsXG4gICAgICAgICAgICBkdXJhdGlvbjogMzAwMFxuICAgICAgICAgIH0pXG4gICAgICAgICAgLy8gYXBwLnVzZXJJbmZvID0ge31cbiAgICAgICAgICAvLyDmuIXpmaTnvJPlrZhcbiAgICAgICAgICB3eC5yZW1vdmVTdG9yYWdlU3luYyhcInVzZXJJbmZvXCIpXG4gICAgICAgICAgLy8g6Lez6L2s6aG16Z2iXG4gICAgICAgICAgd3gucmVkaXJlY3RUbyh7XG4gICAgICAgICAgICB1cmw6ICcvcGFnZXMvdXNlckxvZ2luL3VzZXJMb2dpbidcbiAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pXG4gIH1cbn0pIl19