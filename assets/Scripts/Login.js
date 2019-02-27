
cc.Class({
    extends: cc.Component,

    properties: {
        loadingBar : {
            default : null,
            type : cc.ProgressBar
        }
    },

    onLoad : function(){
        this.loadingBar.active = false;
    },

    onEnable: function () {
        if (!(cc.sys.platform === cc.sys.WECHAT_GAME)) {
            return;
        }

        //获取屏幕宽高
        wx.getSystemInfo({
            success(res) {
                var screenWidth = res.screenWidth;
                var screenHeight = res.screenHeight;
                var viewWidth = 150;
                var viewHeight = 50;
                //定义获取用户信息按钮
                Global.userLoginBtn = wx.createUserInfoButton({
                    type: "text",
                    text: "登录游戏",
                    //如果使用图片，就用下面的方式
                    // type : "image",
                    // image : "res/raw-assets/",  //或者使用网络地址
                    style: {
                        left: screenWidth / 2 - viewWidth / 2,
                        top: screenHeight / 2 + 120 - viewHeight / 2,
                        width: viewWidth,
                        height: viewHeight,
                        lineHeight: 50,
                        backgroundColor: "#00ffff",
                        borderColor : "#ffffff",
                        color: "#ffffff",
                        textAlign: "center",
                        fontSize: 20,
                        borderRadius: 8,
                        borderWidth : 2
                    }
                });

                //点击事件
                Global.userLoginBtn.onTap((res1) => {
                    wx.getSetting({
                        success(auths) {
                            if (auths.authSetting["scope.userInfo"]) {
                                console.log("已经授权*****************");
                                //已经授权，隐藏登录按钮
                                Global.userLoginBtn.hide();
                                wx.login({
                                    success(res2) {
                                        console.log("res2：" + res2);
                                        //获得个人信息
                                        wx.getUserInfo({
                                            withCredentials: true,
                                            lang: 'zh_CN',
                                            success(res3) {
                                                console.log("res3：" + res3);
                                                console.log("login---获取用户信息成功");
                                                Global.userLoginData.rawData = res3.rawData;
                                                Global.userLoginData.signature = res3.signature;
                                                Global.userLoginData.encryptedData = res3.encryptedData;
                                                Global.userLoginData.iv = res3.iv;

                                                Global.userLoginData.userInfo.avatarUrl = res3.userInfo.avatarUrl;
                                                Global.userLoginData.userInfo.nickName = res3.userInfo.nickName;
                                                Global.userLoginData.userInfo.gender = res3.userInfo.gender;
                                                Global.userLoginData.userInfo.country = res3.userInfo.country;
                                                Global.userLoginData.userInfo.province = res3.userInfo.province;
                                                Global.userLoginData.userInfo.city = res3.userInfo.city;
                                                Global.userLoginData.userInfo.language = res3.userInfo.language;

                                                var userInfoStr1 = JSON.stringify(res3);
                                                var userInfoStr2 = JSON.stringify(Global.userLoginData);
                                                var userBasicInfoStr = JSON.stringify(Global.userLoginData.userInfo);
                                                console.log("用户信息1：" + userInfoStr1);
                                                console.log("用户信息2：" + userInfoStr2);
                                                console.log("用户基本信息：" + userBasicInfoStr);

                                                //把用户数据保存在本地
                                                cc.sys.localStorage.setItem("my_userLoginData", JSON.stringify(Global.userLoginData));

                                                // this.loadingBar.active = true;

                                                //登录成功后，跳转到游戏主界面
                                                // cc.loader.onProgress = function(completedCount, totalCount, item){
                                                //     var progress = (completedCount / totalCount).toFixed(2);
                                                //     if(item && item.uuid && progress > this.loadingBar.fillRange){
                                                //         this.loadingBar.progress = progress;
                                                //     }
                                                // };

                                                cc.director.loadScene("main",null,function(){
                                                    // cc.loader.onProgress = null;
                                                    // this.loadingBar.active = false;
                                                });
                                            },
                                            fail() {
                                                console.log("login---获取用户信息失败");
                                            }
                                        });
                                    }
                                });
                            } else {
                                console.log("拒绝授权*****************");
                                Global.userLoginBtn.show();
                            }
                        }
                    });
                });
                Global.userLoginBtn.show();
            }
        });
    },

    onDisable: function () {
        if (Global.userLoginBtn) {
            Global.userLoginBtn.hide();
        }
    },

    onDestroy: function () {
        if (Global.userLoginBtn) {
            Global.userLoginBtn.destroy();
        }
    }
});
