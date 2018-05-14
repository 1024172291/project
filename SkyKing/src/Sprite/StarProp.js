var StarSprite = cc.Sprite.extend({
    _listener: null,
    _lis: null,
    ctor: function () {
        this._super("res/xingxing.png");
        this._init();
    },
    _init: function () {
         this.setPosition(cc.winSize.width*Math.random(),cc.winSize.height);
         var move = cc.moveTo(GAME_CONFIG.STAR_PROP_SPEED,cc.p(cc.winSize.width*Math.random(),-20));
         this.runAction(cc.sequence(move,cc.callFunc(function(target){
             target.removeFromParent(true)
         })));
         this._listener = cc.eventManager.addCustomListener(GAME_EVENT.PLANE_PROPS_RECT,this._checkIsRectGetScore.bind(this));
    },
    _checkIsRectGetScore:function(event){
        var myplane = event.getUserData();
        var rect1 = this.getBoundingBox();
        var rect2 = myplane.getBound();
         //cc.eventManager.dispatchCustomEvent(DEBUG_SHOW_ME_RECT, [rect1,cc.color.RED]);
         //cc.eventManager.dispatchCustomEvent(DEBUG_SHOW_ME_RECT, [rect2,cc.color.RED]);
        if(cc.rectIntersectsRect(rect1, rect2)){
            this.removeFromParent(true);
            cc.eventManager.dispatchCustomEvent((GAME_EVENT.PROPS_ADD_SCORE),50);
            //cc.eventManager.removeListener(this._listener)
        }
    },
    onExit: function () {
        cc.eventManager.removeListener(this._listener);
    }
})