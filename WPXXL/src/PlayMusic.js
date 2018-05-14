var PlayMusic = cc.Layer.extend({
    type:null,
    ctor: function () {
        this._super();
        this._init();
    },
    _init: function () {

        var size=cc.winSize;
        //静音按钮
        var checkBox = new ccui.CheckBox();
        checkBox.setTouchEnabled(true);
        checkBox.loadTextures(res.playMusic,res.stopMusic,res.stopMusic,res.stopMusic,res.stopMusic);
        /* checkBox.x = size.width-30;
         checkBox.y = size.height-30;*/
        checkBox.setPosition(size.width*0.9,size.height-50);
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