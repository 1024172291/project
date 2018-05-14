var MyPlaneSprite = cc.Sprite.extend({
    _listener: null,
    _lis: null,
    numArr: null,
    type: null,
    ctor: function () {
        this._super("res/myPlane_1.png");
        this._init();
    },
    _init: function () {
        this.setAnchorPoint(0.5, 0);
        this.setPosition(cc.winSize.width >> 1, this.height + 50);

        var sp1 = new cc.ParticleSystem("res/fire.plist");
        sp1.setPosition(this.width / 2 - 13, 0);
        this.addChild(sp1, -1);

        var sp2 = new cc.ParticleSystem("res/fire.plist");
        sp2.setPosition(this.width / 2 + 13, 0);
        this.addChild(sp2, -1);

        var that = this;
        this.schedule(function () {
                var Fadeout = cc.fadeOut(GAME_CONFIG.MY_PLANE_Fade);
                var Fadein = cc.fadeIn(GAME_CONFIG.MY_PLANE_Fade);
                that.runAction(cc.sequence(Fadeout, cc.delayTime(0.1), Fadein));
            }, 1, GAME_CONFIG.PLANE_WUDI_TIME-1,0.00001);
        this._listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                return true
            },
            onTouchMoved: function (touch, event) {
                var target = that;
                var pos = touch.getDelta();
                target.x += pos.x;
                target.y += pos.y;
                if (that.x < 50) {
                    that.x = 50
                }
                if (that.x > cc.winSize.width - 50) {
                    that.x = cc.winSize.width - 50
                }
                if (that.y < 50) {
                    that.y = 50
                }
                if (that.y > cc.winSize.height - 50) {
                    that.y = cc.winSize.height - 50
                }
            }
        });
        cc.eventManager.addListener(this._listener, this);
        this.schedule(function(){cc.eventManager.dispatchCustomEvent(GAME_EVENT.PLANE_PROPS_RECT, this);},0.05,cc.REPEAT_FOREVER);
        //我方飞机抛出事件自身坐标给道具层进行碰撞检测
        this.schedule(function(){cc.eventManager.dispatchCustomEvent(GAME_EVENT.PLANE_FIRE, that.getPosition())},GAME_CONFIG.BULLET_NUM, cc.REPEAT_FOREVER);
        //我方飞机抛出事件自身坐标给子弹管理层生成我方子弹
        this.scheduleOnce(function(){
            that.schedule(function(){cc.eventManager.dispatchCustomEvent(GAME_EVENT.GIVE_ENEMY_BULLET, this);},0.05,cc.REPEAT_FOREVER);
            that.schedule(function(){cc.eventManager.dispatchCustomEvent(GAME_EVENT.PLANE_BOSS_RECT, this);},0.05,cc.REPEAT_FOREVER);
            that.schedule(function(){cc.eventManager.dispatchCustomEvent(GAME_EVENT.PLANE_PK_BOSS_DIE, this);},0.05,cc.REPEAT_FOREVER);
            //我方飞机抛出事件和它本身给敌方子弹进行检测碰撞
        },GAME_CONFIG.PLANE_WUDI_TIME)
    },
    beHit:function(){
        cc.eventManager.dispatchCustomEvent(GAME_EVENT.PLANE_BOMB,this.getPosition());
        this.removeFromParent(true);
        cc.eventManager.dispatchCustomEvent(GAME_EVENT.PLANE_AGAIN);
        //飞机死亡时抛出事件
    },
    getBound: function () {
        var widths = this.width / 4;
        var heights = this.height / 4;
        return cc.rect(this.x - widths, this.y+heights , this.width / 2, this.height / 2)
    },
    onExit: function () {
        cc.eventManager.removeListener(this._listener);
        this.removeAllChildren(true);
    }
});