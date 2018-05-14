var HelloWordLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this._init();
    },
    _init: function () {
        var sp = new cc.Sprite("res/bg.png");
        sp.setAnchorPoint(0,0);
        this.addChild(sp);
        var label = new cc.LabelBMFont("START", res.mikado_fnt);
        var item = new cc.MenuItemLabel(label, function(){
            cc.director.pushScene(new cc.TransitionFlipAngular(1, new GameScene(), cc.color(0, 255, 255)))
        }, this);
        item.setPosition(200, -300);
        var menu_font = new cc.Menu(item);
        this.addChild(menu_font);

        var _labelScore = new cc.LabelBMFont("",res.mikado_fnt);
        _labelScore.setPosition(cc.winSize.width>>1,cc.winSize.height/2 - 50);
        //_labelScore.scale = 1/2;
        this.addChild(_labelScore);

        var lab = new cc.LabelBMFont("HIGH SCORE", res.mikado_fnt);
        var im = new cc.MenuItemLabel(lab, function(){
            var is = cc.sys.localStorage;
            var data = is.getItem("key_");
            if(data == null){
                _labelScore.setString("0");
            }
            else{
                _labelScore.setString(""+data);
            }
        }, this);
        im.setPosition(0, 0);
        var mu = new cc.Menu(im);
        this.addChild(mu);

    }
});
var HelloWordScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWordLayer();
        this.addChild(layer);
        var info = new CoderInfo();
        this.addChild(info);
    }
});