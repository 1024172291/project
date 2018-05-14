var EnEmyBossSprite = cc.Sprite.extend({
    _listener:null,
    _hpTarget: null,
    ctor: function () {
        this._super("res/boss.png");
        this._init();
    },
    _init: function () {
        this._hpTarget = GAME_CONFIG.ENEMY_BOSS_HP;
        this.setPosition(cc.winSize.width>>1,cc.winSize.height*0.8);
        var move1 = cc.moveBy(GAME_CONFIG.ENEMY_BOSS_SPEED,cc.p(cc.winSize.width/4,0));
        var move2 = move1.reverse();
        var that = this;
        this.runAction(
            cc.sequence(move1,move2,cc.callFunc(function(){that.schedule(that._test,GAME_CONFIG.ENEMY_BOSS_BULLET_SPEED,cc.repeatForever)}),cc.delayTime(3),cc.callFunc(function(){that.unschedule(that._test)}),move2,move1)
        ).repeatForever();
        this._listener = cc.eventManager.addCustomListener(GAME_EVENT.BULLET_BEHIT_BOSS,this._checkRectFi.bind(this));
        this._lis = cc.eventManager.addCustomListener(GAME_EVENT.PLANE_BOSS_RECT,this._destruct.bind(this))
    },
    _checkRectFi:function(event){
        var mybullet = event.getUserData();
        var rect1 = mybullet.getBoundingBox();
        var rect2 = this.getBox();
        //cc.eventManager.dispatchCustomEvent(DEBUG_SHOW_ME_RECT, [rect1,cc.color.RED]);
        //cc.eventManager.dispatchCustomEvent(DEBUG_SHOW_ME_RECT, [rect2,cc.color.RED]);
        if(cc.rectIntersectsRect(rect1, rect2)){
            this.reduceHp();
            mybullet.faded();
        }
    },
    _destruct:function(event){
        var myPlane = event.getUserData();
        var rect1 = myPlane.getBound();
        var rect2 = this.getBox();
        //cc.eventManager.dispatchCustomEvent(DEBUG_SHOW_ME_RECT, [rect1,cc.color.RED]);
        //cc.eventManager.dispatchCustomEvent(DEBUG_SHOW_ME_RECT, [rect2,cc.color.RED]);
        if(cc.rectIntersectsRect(rect1, rect2)){
            this.reduceHp();
            myPlane.beHit();
        }
    },
    _test:function(){
        cc.eventManager.dispatchCustomEvent(GAME_EVENT.ENEMY_BOSS_UPDATE,this);
        //敌方BOSS抛出事件和它本身
    },
    reduceHp:function(){
        if(this._hpTarget>0){
            this._hpTarget -- ;
        }
        else{
            this.removeFromParent(true);
            cc.eventManager.dispatchCustomEvent(GAME_EVENT.PROPS_ADD_SCORE,GAME_CONFIG.BOSS_DIE_GIVE_SCORE);
            cc.eventManager.dispatchCustomEvent(GAME_EVENT.BOSS_BOOM_ANIMATION,this.getPosition());
            cc.eventManager.dispatchCustomEvent(GAME_EVENT.GAME_WIN)
        }
    },
    getBox:function(){
        var widths = this.width/4;
        var heights = this.height/4;
        return cc.rect(this.x-widths,this.y-heights,this.width/2,this.height/2)
    },
    onExit:function(){
        cc.eventManager.removeListener(this._listener);
        this.removeAllChildren(true);
        cc.eventManager.removeListener(this._lis);
    }
});