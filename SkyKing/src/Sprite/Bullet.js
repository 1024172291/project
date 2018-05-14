var BulletSprite = cc.Sprite.extend({
    type:1,
    //listener:null,
    ctor: function () {
        this._super("res/pf01.png");
        this._init();
    },
    _init:function(){
        var move = cc.moveBy(GAME_CONFIG.BULLET_NUM_1, cc.p(0,cc.winSize.height+100));
        //子弹移动
        this.runAction(cc.sequence(move,cc.callFunc(this._removeBullet,this)));
        //子弹先移动到屏幕外时再移除掉
        this._listener = cc.eventManager.addCustomListener(GAME_EVENT.ENEMY_PLANE_UPDATE,this._checkRect.bind(this));
        //接收敌机抛出的事件及敌机自身，然后进行和一个子弹对象进行检测碰撞
        this.schedule(function(){cc.eventManager.dispatchCustomEvent(GAME_EVENT.BULLET_BEHIT_BOSS,this)},0.01,cc.repeatForever)
    },
    /*
    * 检测碰撞，如果碰撞之后进行移除
    * */
    _checkRect:function(event){
        var enemy = event.getUserData();
        var rect1 = this.getBoundingBox();
        var rect2 = enemy.getBox();
        if(cc.rectIntersectsRect(rect1, rect2)){
            this.removeFromParent(true);
            enemy.hpReduce();
        }
    },
    faded:function(){
        this.removeFromParent(true);
    },
    _removeBullet:function(target){
        target.removeFromParent(true)
    },
    onExit:function(){
        this.removeAllChildren(true);
        cc.eventManager.removeListener(this._listener);
    }
});
