var StartPageLayer = cc.Layer.extend({
    backMenu:null,
    ctor:function () {
        this._super();
        this._init();

    },
    _init:function(){
        var bg = new cc.Sprite("res/bg.jpg");
        bg.setAnchorPoint(0,0);
        this.addChild(bg);
        //添加回放按钮
        var menuImg = new cc.MenuItemImage("res/play.png", "res/pause.png","res/pause.png",this.startGame, this);
        menuImg.scale = 2;
        this.backMenu = new cc.Menu(menuImg);
        this.backMenu.setPosition(cc.winSize.width/2,cc.winSize.height/2);
        this.addChild((this.backMenu));

    },
    startGame:function(){
        cc.director.runScene(new GameScene());
    },

});
var startPageScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new StartPageLayer();
        this.addChild(layer);
    }
});
