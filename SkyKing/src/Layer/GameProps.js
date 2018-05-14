var GamePropsLayer = cc.Layer.extend({
    _listener:null,
    ctor: function () {
        this._super();
        this._init()
    },
    _init: function () {
        var t = parseInt(Math.random()*GAME_CONFIG.STAR_PROP_TIME)+10;
        this.schedule(this._addProp,t,cc.repeatForever);
    },
    _addProp:function(){
        var sp1 = new StarSprite();
        this.addChild(sp1);
    },
    onExit:function(){
        this.removeAllChildren(true);
        //cc.eventManager.removeListener(this._listener)
    }
});