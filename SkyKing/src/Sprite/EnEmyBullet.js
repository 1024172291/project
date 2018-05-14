var EnEmyBulletSprite = cc.Sprite.extend({
    _listener:null,
    ctor: function () {
        this._super("res/zd_1.png");
        this._init();
    },
    _init: function () {
        this.initWithFile("res/zd_"+(1+parseInt(Math.random()*3)+".png"));
        var move = cc.moveTo(GAME_CONFIG.ENEMY_BULLET_NUM_1, cc.p(cc.winSize.width*Math.random(), -100));
        //敌方子弹移动
        this.runAction(cc.sequence(move, cc.callFunc(this._removeEnEmyBullet, this)));
        //子弹先移动到屏幕外时再移除掉
        this._listener =cc.eventManager.addCustomListener(GAME_EVENT.GIVE_ENEMY_BULLET,this._checkRectL.bind(this));
        //接收我方飞机抛出的事件及我方飞机自身，然后和一个敌方子弹对象进行检测碰撞
    },
    _checkRectL:function(event){
        var myplane = event.getUserData();
        var rect1 = this.getBoundingBox();
        var rect2 = myplane.getBound();
        //cc.eventManager.dispatchCustomEvent(DEBUG_SHOW_ME_RECT, [rect1,cc.color.RED]);
        //cc.eventManager.dispatchCustomEvent(DEBUG_SHOW_ME_RECT, [rect2,cc.color.RED]);
        if(cc.rectIntersectsRect(rect1, rect2)){
            this.removeFromParent(true);
            myplane.beHit();
        }
    },
    _removeEnEmyBullet:function(){
        this.removeFromParent(true)
    },

    onExit:function(){
        cc.eventManager.removeListener(this._listener);
    }
});
