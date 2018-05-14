var PlayMusic = cc.Layer.extend({
    type:null,
    ctor: function () {
        this._super();
        this._init();
    },
    _init: function () {
        //加载资源
        cc.spriteFrameCache.addSpriteFrames("res/res/kuaiqiangshoudafeiji.plist");
        var size=cc.winSize;
        //静音按钮
        var checkBox = new ccui.CheckBox();
        checkBox.setTouchEnabled(true);
        checkBox.loadTextures("yinyue.png","guanyinyue.png","guanyinyue.png","guanyinyue.png","guanyinyue.png",ccui.Widget.PLIST_TEXTURE);
        /* checkBox.x = size.width-30;
         checkBox.y = size.height-30;*/
        checkBox.setPosition(size.width*0.1,size.height-30);
        checkBox.addEventListener(this.selectedStateEvent, this);
        this.addChild(checkBox);
        checkBox.setSelected(!MUSIC.isCanPlay);
    },
    selectedStateEvent: function (sender, type) {
        switch (type) {
            case  ccui.CheckBox.EVENT_UNSELECTED:
                MUSIC.isCanPlay=true;
                if(bg)
                    bg.play();
                break;
            case ccui.CheckBox.EVENT_SELECTED:
                MUSIC.isCanPlay=false;
                if(bg)
                    bg.pause();
                break;
            default:
                break;
        }
    }
});