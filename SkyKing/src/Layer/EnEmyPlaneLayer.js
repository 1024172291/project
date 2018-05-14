var EnEmyPlaneLayer = cc.Layer.extend({
    _spArr:null, //敌机数组
    _scount:null,
    _listener:null,
    ctor: function () {
        this._super();
        this._init();
    },
    _init: function () {
        var t = parseInt(Math.random()*60)+30;
        this.scheduleOnce(this._appearBoss,t);
        this._spArr = [];
        this._scount = 0;
        this.schedule(this._makeEnEmyPlane,GAME_CONFIG.ENEMY_PLANE_NUM,cc.REPEAT_FOREVER,3);
        //生成敌方飞机
        this._listener = cc.eventManager.addCustomListener(GAME_EVENT.BOSS_BOOM_ANIMATION,this._boosBoom.bind(this));

    },
    _boosBoom:function(event){
        var pos = event.getUserData();
        var sp1 = new cc.ParticleSystem("res/boom.plist");
        sp1.setPosition(pos.x, pos.y);
        sp1.scale = 4;
        this.addChild(sp1, 1);
    },
    _appearBoss:function(){
        this.unschedule(this._makeEnEmyPlane);
        var boosSp = new EnEmyBossSprite();
        this.addChild(boosSp);
    },
    /*
    * 生成敌方飞机
    * */
    _makeEnEmyPlane:function(){
        this._scount = (1+parseInt(Math.random()*3));
        var sp = new EnEmyPlaneSprite(this._scount);
        sp.setPosition(cc.winSize.width*Math.random(),cc.winSize.height+100);
        this.addChild(sp);
        this._spArr.push(sp);
    },
    /*
    * 子弹和敌机碰撞时消除敌机
    * */
    /*_clearPlane:function(event){
        var target = event.getUserData();
            target.removeFromParent(true);
            this._spArr.splice(this._spArr.indexOf(target),1);
            cc.eventManager.dispatchCustomEvent(GAME_EVENT.ADD_SCORE,10)
    },*/
    /*
    * 移除自定义事件
    * */
    onExit:function(){
        cc.eventManager.removeCustomListeners(GAME_EVENT.ENEMY_DIE);
        cc.eventManager.removeListener(this._listener);
        this.removeAllChildren(true);
    }
});
