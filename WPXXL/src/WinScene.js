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
    box: null,
    _touchListener2: null,
    onDidLoadFromCCB: function () {
        winLayer = this;
       /* if( failLayer.rewards == 1){
            this.prizeLaber.setString("牛奶");
        }else{
            this.prizeLaber.setString("电影票");
        }*/

    },
    _init: function () {
        var bg = this.haoMa;
        var wid = bg.width;
        var hei = bg.height;
        bg = bg.convertToWorldSpace(cc.p(0, 0));
        cc.log(bg.x,bg.y,wid,hei);
        var textField = this.box  = new ccui.TextField("               ", "Marker Felt", 30);
        this.rootNode.addChild(textField);
        textField.setTextColor(cc.color.BLACK);
        textField.x = bg.x+110;
        textField.y = bg.y+20;
        textField.setMaxLength(11);
        textField.setMaxLengthEnabled(true);

        /*var size = cc.winSize;
        //创建输入框
            var bg = this.haoMa;
            var wid = bg.width;
            var hei = bg.height;
            bg = bg.convertToWorldSpace(cc.p(0, 0));
            cc.log(bg.x,bg.y,wid,hei);
            var box = this.box = new cc.EditBox(cc.size(wid, hei), new cc.Scale9Sprite(), new cc.Scale9Sprite());
            box.x = bg.x+130 ;
            box.y = bg.y+20;

            box.setFontSize(20);
            box.setFontColor(cc.color.BLACK);
            //box.setDelegate(this);
            box.setInputMode(cc.EDITBOX_INPUT_MODE_PHONENUMBER);
            this.rootNode.addChild(box, 100);
            box.setMaxLength(11);*/

            windowInnerHeight = window.innerHeight;
            heightScale = cc.winSize.height / windowInnerHeight;
    },
    editBoxEditingDidBegin: function (editBox) {
       /* var rootNode = this.rootNode;

        var u = navigator.userAgent;
        if(u.indexOf('iPhone') > -1 ) return;
        else{
           rootNode.schedule(function () {
               if (windowInnerHeight != window.innerHeight) {
                   keboardHeight = windowInnerHeight - window.innerHeight;//获取弹出android软键盘后的窗口高度
                   rootNode.setPositionY(-keboardHeight * heightScale);
               }

           }.bind(rootNode), 0.01)
        }*/
    },

    editBoxEditingDidEnd: function (editBox) {
        /*var rootNode = this.rootNode;
        var u = navigator.userAgent;
        if(u.indexOf('iPhone') > -1 ) return;
        else{
            rootNode.schedule(function () {
                if (windowInnerHeight == window.innerHeight) {
                    rootNode.setPositionY(0);
                }
            }.bind(rootNode), 0.01)
        }*/
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
        var usePhone = self.box.getString();
        if ( usePhone.trim().length == 0) {
            alert("请输入您的手机号！");
            return;
        }

        var xhr = cc.loader.getXMLHttpRequest();
        xhr.open("GET", zhongJiangUser  +"?name="+nickname+ "&phone=" + usePhone + "&verification=" + failLayer.verification + "&rewards=" + failLayer.rewards, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
                alert("提交成功！");
                /*var share = new cc.Sprite("#tijiaochenggong.png");
                share.x = size.width / 2;
                share.y = size.height / 2;
                self.rootNode.addChild(share);
                share.setScale(0.67);
                //移除中奖层
                var removeLayer = cc.callFunc(function () {
                    share.removeFromParent();
                });
                share.runAction(cc.sequence(cc.scaleTo(0.2, 1), cc.delayTime(0.5), removeLayer));*/
                setTimeout(function () {
                    window.location.href = winUrl;
                }, 1000);

            }
        };
        xhr.send();
    }
});

