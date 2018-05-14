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
    verification:null,
    rewards:null,

    isWin:false,
    isNoWin:false,
    isDaJiang: false,
    isMengNiu:false,
    isShanDian:false,
    isMigu:false,
    isJieLuoFu:false,

    totalTime:0,
    onDidLoadFromCCB: function () {
        failLayer = this;
    },
    _init: function () {
        isCanChouJiang = false;
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
                    self.rewards = 2;
                }else if(result == 4) {
                    self.isShanDian = true;   //闪电购
                    self.rewards = 2;
                }else if(result == 5) {
                    self.isMigu = true;   //咪咕阅读
                    self.rewards = 2;
                }
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
                        self._playResult(self);
                    }

                    self.prevX = x;
                    self.prevY = y;
                    self.prevZ = z;
                }
            }, this.rootNode);
        }
        //this.rootNode.animationManager.runAnimations(0, 0);           //播放timeline動畫

       /* setTimeout(function(){
             self._playResult(self);
         },1000);*/                        //测试
    },
    _playResult: function (self) {
        if(self.isNoWin){
            self.rootNode.animationManager.runAnimations(1, 0);  //没中
            self._touchCode();
        }else{
            self.rootNode.animationManager.runAnimations(2, 0);  //中奖
        }
    },
    onAward:function(){
        cc.director.runScene(winScene_scene());
    },
    _touchCode:function(){
        var that = this.code;
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,      //吞没事件
            onTouchBegan: function (touch, event) {
                var pos = touch.getLocation();
                var rect = cc.rect(0, 0, that.width, that.height);
                var localPoint = that.convertToNodeSpace(pos);
                if (cc.rectContainsPoint(rect, localPoint)) {
                    window.location.href = faileUrl;
                    return true
                }
            }
        });
        cc.eventManager.addListener(listener, that);
    }
});