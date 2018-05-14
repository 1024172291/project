var VIEW = 0;
var EnEmyBossBulletSprite = cc.Sprite.extend({
    _listener:null,
    _fireAngle:null,
    ctor: function () {
        this._super("res/zd_5.png");
        this._init();
    },
    _init: function () {
        this._setBullet();
        this._lis = cc.eventManager.addCustomListener(GAME_EVENT.PLANE_PK_BOSS_DIE,this._checkRectFile.bind(this))
    },
    _setBullet:function(){
        this._fireAngle = cc.degreesToRadians(VIEW);
        var forAngle = cc.pForAngle(this._fireAngle);
        var distance = cc.p(forAngle.x*1000,forAngle.y * 1000);
        var move = cc.moveBy(GAME_CONFIG.ENEMY_BOSS_BULLET_FLY_SPEED,distance);
        this.runAction(cc.sequence(move, cc.callFunc(this._removeEnEmyBullet, this)));
    },
    _checkRectFile:function(event){
        var myPlane = event.getUserData();
        var rect1 = myPlane.getBound();
        var rect2 = this.getBoundingBox();
        //cc.eventManager.dispatchCustomEvent(DEBUG_SHOW_ME_RECT, [rect1,cc.color.RED]);
        //cc.eventManager.dispatchCustomEvent(DEBUG_SHOW_ME_RECT, [rect2,cc.color.RED]);
        if(cc.rectIntersectsRect(rect1, rect2)){
            this.removeFromParent(true);
            myPlane.beHit();
        }
    },
    _removeEnEmyBullet:function(){
        this.removeFromParent(true);
    },
    onExit:function(){
        cc.eventManager.removeListener(this._lis);
    }
});