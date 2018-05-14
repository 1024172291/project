var MyPlaneLayer = cc.Layer.extend({
    _listener:null,
    _targetHp:null,
    ctor: function () {
        this._super();
        this._init();
    },
    _init: function () {
        this._targetHp = 3;
        this._listener = cc.eventManager.addCustomListener(GAME_EVENT.PLANE_AGAIN,this._addPlane.bind(this));
        this._addPlane();
    },
    _addPlane:function() {
        if (this._targetHp > 0) {
            var plane = new MyPlaneSprite();
            this.addChild(plane);
            this._targetHp --;
            //cc.log("飞机生命值："+" "+this._targetHp)
        }
        else {
           cc.eventManager.dispatchCustomEvent(GAME_EVENT.GAME_OVER)
        }
    },
    onExit:function(){
        this._super();
        //this.removeAllChildren(true);
        cc.eventManager.removeListener(this._listener);
    }
});