var failLayer;
failScene_create = function () {
    var node = cc.BuilderReader.load("res/ccb/notWinning.ccbi");
    node.controller._init();
    return node;
};

failScene_scene = function () {
    var scene = cc.Scene.create();
    var layer = failScene_create();
    scene.addChild(layer);
    return scene;
};
cc.BuilderReader.registerController("notWinning", {
    skewSpeed: null,
    totalTime: 0,

    //加速计
    preX: 0,
    preY: 0,
    preZ: 0,

    verification: null,

    isNoWin:false,
    isWin: false,
    isDaJiang: false,
    isMengNiu:false,
    isShanDian:false,
    isMigu:false,
    isJieLuoFu:false,
    onDidLoadFromCCB: function () {
        failLayer = this;
        this.rootNode.animationManager.runAnimations(1, 0);

    },
    _init: function () {
        this.rootNode.addChild(new PlayMusic());
        var size = cc.winSize;
        var self = this;
        //判断是否中奖
        var xhr = cc.loader.getXMLHttpRequest();         //註冊接口
        xhr.open("GET", zhongJiang, true);             //打開接口
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
                //alert(3);
                var object = self.object = eval("(" + xhr.response + ")");
                var result = object.result;
                self.verification = object.verification;
                if (result == 0) {
                    self.isNoWin = true;   //沒中
                }else if (result == 1) {
                    self.isWin = true;     //中牛奶
                    self.rewards = 1;
                }else if(result == 2){
                    self.isDaJiang = true;  //中電影票
                    self.rewards = 2;
                }else if(result == 3) {
                    self.isMengNiu = true;  //中蒙牛代金券
                }else if(result == 4) {
                    self.isShanDian = true;   //闪电购
                }else if(result == 5) {
                    self.isMigu = true;   //咪咕阅读
                }/*else if(result == 6) {
                    self.isJieLuoFu = true;    //婕珞芙
                }*/
            }
        };
        xhr.send();   //發送
        {
            //初始化摇一摇
            cc.inputManager.setAccelerometerInterval(1 / 30);
            cc.inputManager.setAccelerometerEnabled(true);
            cc.eventManager.addListener({
                event: cc.EventListener.ACCELERATION,
                callback: function (acc, event) {
                    x = acc.x;
                    y = acc.y;
                    z = acc.z;

                    //判断是否摇动了
                    var speed = Math.abs(x + y + z - self.prevX - self.prevY - self.prevZ);
                    if (speed > 0.5) {
                        self.totalTime += 0.2;
                    }

                    //判断累计时间是否足够
                    if (self.totalTime > 3) {
                        //self.produceResult(self);
                        self._playResult(self);
                    }

                    self.prevX = x;
                    self.prevY = y;
                    self.prevZ = z;
                }
            }, this.rootNode);
        }
        //this.rootNode.animationManager.runAnimations(0, 0);           //播放timeline動畫

        /*setTimeout(function(){
            self._playResult(self);
        },1000); */                       //测试

    },
    _playResult: function (self) {
        if (self.isWin) {
            self.rootNode.animationManager.runAnimations(2, 0);  //中牛奶
        } else if (self.isNoWin) {
            self.rootNode.animationManager.runAnimations(3, 0);  //没中
        } else if (self.isDaJiang) {
            self.rootNode.animationManager.runAnimations(1, 0);  //中电影票
        } else if (self.isMengNiu) {
            self.rootNode.animationManager.runAnimations(4, 0);  //中蒙牛代金券
        } else if (self.isShanDian) {
            self.rootNode.animationManager.runAnimations(6, 0);  //闪电购
        } else if (self.isMigu) {
            self.rootNode.animationManager.runAnimations(7, 0);  //咪咕阅读
        } /*else if (self.isJieLuoFu) {
            self.rootNode.animationManager.runAnimations(5, 0);  //婕珞芙
        }*/

    },
    onAward: function () {
        cc.director.runScene(winScene_scene());
    },
    onAward1: function () {
        cc.director.runScene(winScene_scene());
    },
    onAgain: function () {
        shareConfig(title, desctr, link, imgUrl);
        cc.director.runScene(gameTutorialScene_scene());
    },
    onMovie: function () {
        window.location.href = "http://wx.wepiao.com/movie_detail.html?movie_id=6047";
    },
    onAward2: function () {
        window.location.href="http://dwz.cn/himilk-wx-dmbj-zql75";
    },
    /*onAward3: function () {
        cc.director.runScene(winScene_scene());
    },*/
    onAward4: function () {
        window.location.href = "http://h5.m.52shangou.com/activity/dmbj_envelope.html?activity_code=new_user_coupon_2016_daomubiji";
    },
    onAward5: function () {
        window.location.href = "http://wap.cmread.com/rbc/p/M6050417.jsp?cm=M6050417";
    },
});