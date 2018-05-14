var GameOverLayer = cc.Layer.extend({
    _listener:null,
    _lis:null,
    ctor: function () {
        this._super();
        this._init()
    },
    _init: function () {
        this._listener = cc.eventManager.addCustomListener(GAME_EVENT.GAME_OVER,this._addTexture.bind(this));
        this._lis = cc.eventManager.addCustomListener(GAME_EVENT.GAME_WIN,this._addTextureWin.bind(this));
    },
    _addTexture:function(){
        /*var gradient= new cc.LayerGradient(cc.color(96,96,96,100),cc.color(96,96,96,100),cc.p(1,1));
        this.addChild(gradient,20);*/
        var sp = new cc.Sprite("res/over.png");
        sp.setPosition(cc.winSize.width>>1,cc.winSize.height*0.7);
        this.addChild(sp);
        this.scheduleOnce(function(){
            cc.director.popScene()
        },5);
        cc.eventManager.dispatchCustomEvent(GAME_EVENT.SET_HIGH_SCORE)
    },
    _addTextureWin:function(){
        var that = this;
        this.scheduleOnce(function(){
            var sp1 = new cc.Sprite("res/gameWin.png");
            sp1.setPosition(cc.winSize.width>>1,cc.winSize.height*0.7);
            that.addChild(sp1);
            that.scheduleOnce(function(){
                cc.director.popScene()
            },5)
        },3)
    },
    onExit:function(){
       cc.eventManager.removeListener(this._listener);
       cc.eventManager.removeListener(this._lis);
    }
});