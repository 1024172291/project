var windowInnerHeight = 0;     //手机屏幕高度
var keboardHeight = 0;         //手机键盘高度
var heightScale = 0;           //屏幕分辨率和手机屏幕高度的比值
winScene_create = function () {
    var node = cc.BuilderReader.load("res/ccb/winningInterface.ccbi");
    node.controller._init();
    return node;
};

winScene_scene = function () {
    var scene = cc.Scene.create();
    var layer = winScene_create();
    scene.addChild(layer);
    return scene;
};


cc.BuilderReader.registerController("winningInterface", {
    box1: null,
    box2: null,
    boxCheck: null,
    _touchListener2: null,
    onDidLoadFromCCB: function () {
        winLayer = this;
        if (this.layerView) {
            this.layerView.bake();
        }

    },
    _init: function () {
      /*  var inputBox = [this.xingMing, this.haoMa];
        var size = cc.winSize;
        //创建输入框
        for (var i = 0; i < 2; i++) {
            var bg = inputBox[i];
            var wid = bg.width;
            var hei = bg.height;
            bg = bg.convertToWorldSpace(cc.p(0, 0));
            var textField =this["box" + (i + 1)] =  new ccui.TextField("PlaceHolder", "Marker Felt", 30);
            textField.x = bg.x;
            textField.y = bg.y;
            textField.setAnchorPoint(0, 0);
            textField.addEventListener(this.textFieldEvent, this);
            this.rootNode.addChild(textField);
            this.label = new cc.LabelTTF("","",30);
            this.label.setPosition(textField.x,textField.y);
            this.rootNode.addChild(this.label);
        }
    },
    textFieldEvent: function (textField, type) {
        var size = cc.winSize;
        switch (type) {
            case ccui.TextField.EVENT_ATTACH_WITH_IME:
                this.rootNode.setPosition(0,-size.height/2);
                this.label.setString("attach with IME");
                break;
            case ccui.TextField.EVENT_DETACH_WITH_IME:
                //textField.runAction(cc.moveTo(0.175, cc.p(size.width / 2.0, size.height / 2.0)));
                break;
            case ccui.TextField.EVENT_INSERT_TEXT:
                break;
            case ccui.TextField.EVENT_DELETE_BACKWARD:
                break;
            default:
                break;
        }
    },*/
        var inputBox = [this.xingMing, this.haoMa];
        var size = cc.winSize;
        //创建输入框
        for (var i = 0; i < 2; i++) {
            var bg = inputBox[i];
            var wid = bg.width;
            var hei = bg.height;
            bg = bg.convertToWorldSpace(cc.p(0, 0));
            //cc.log(bg.x,bg.y,wid,hei);
            var box = this["box" + (i + 1)] = new cc.EditBox(cc.size(wid, hei), new cc.Scale9Sprite(), new cc.Scale9Sprite());
            box.x = bg.x;
            box.y = bg.y;
            box.setAnchorPoint(0, 0);
            box.setFontSize(20);
            box.setFontColor(cc.color.BLACK);
            box.setDelegate(this);
            this.rootNode.addChild(box, 100);
            this.boxCheck = box;
            if (i == 0) {
                box.setMaxLength(6);
            }
            else {
                box.setMaxLength(11);
            }
        }
        //cc.log( window.innerHeight);
        windowInnerHeight = window.innerHeight;
        heightScale = cc.winSize.height / windowInnerHeight;
    },
    editBoxEditingDidBegin: function (editBox) {
        var rootNode = this.rootNode;
        /*setTimeout(function () {
            if(keboardHeight==0)
                keboardHeight = windowInnerHeight - window.innerHeight;//获取弹出android软键盘后的窗口高度
            rootNode.setPositionY(-keboardHeight*heightScale);
            //alert("editBox  editBoxEditingDidBegin !" + window.innerHeight);
        }, 500);*/
        var u = navigator.userAgent;
        if(u.indexOf('iPhone') > -1 ) return;
        else{
           rootNode.schedule(function () {
               if (windowInnerHeight != window.innerHeight) {
                   keboardHeight = windowInnerHeight - window.innerHeight;//获取弹出android软键盘后的窗口高度
                   rootNode.setPositionY(-keboardHeight * heightScale);
               }
               //alert("editBox  editBoxEditingDidBegin !" + window.innerHeight);
           }.bind(rootNode), 0.01)
        }
    },

    editBoxEditingDidEnd: function (editBox) {
        var rootNode = this.rootNode;
         /*setTimeout(function () {//由于键盘弹出是有动画效果的，要获取完全弹出的窗口高度，使用了计时器
         rootNode.setPositionY(0);
         }, 500);*/
        var u = navigator.userAgent;
        if(u.indexOf('iPhone') > -1 ) return;
        else{
            rootNode.schedule(function () {
                if (windowInnerHeight == window.innerHeight) {
                    rootNode.setPositionY(0);
                }
            }.bind(rootNode), 0.01)
        }
    },

    editBoxTextChanged: function (editBox, text) {
        //alert("editBox , TextChanged, text: " + text);
    },

    editBoxReturn: function (editBox) {
        //alert("editBox  was returned !");
    },

    onRender: function () {
        var self = this;
        var size = cc.winSize;
        //this.renderControl.setEnabled(false);
        //中奖用户信息
        var useName = self["box" + 1].getString();
        var usePhone = self["box" + 2].getString();
        if (useName.trim().length == 0 || usePhone.trim().length == 0) {
            alert("请输入您的姓名和手机号！");
            return;
        }

        var xhr = cc.loader.getXMLHttpRequest();
        xhr.open("GET", zhongJiangUser + "?name=" + useName + "&phone=" + usePhone + "&verification=" + failLayer.verification + "&rewards=" + failLayer.rewards, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
                //alert("提交成功！");
                var share = new cc.Sprite("#tijiaochenggong.png");
                share.x = size.width / 2;
                share.y = size.height / 2;
                self.rootNode.addChild(share);
                share.setScale(0.67);
                //移除中奖层
                var removeLayer = cc.callFunc(function () {
                    share.removeFromParent();
                });
                share.runAction(cc.sequence(cc.scaleTo(0.2, 1), cc.delayTime(0.5), removeLayer));
                setTimeout(function () {
                    window.location.href = "http://url.cn/2CxiseP";
                }, 1000);
            }
        };
        xhr.send();
    }
});

