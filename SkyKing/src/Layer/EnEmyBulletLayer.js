var EnEmyBulletLayer = cc.Layer.extend({
    _listener:null,
    _lis:null,
    _sp:null,
    ctor: function () {
        this._super();
        this._init()
    },
    _init:function(){
        this._listener = cc.eventManager.addCustomListener(GAME_EVENT.ENEMY_PLANE_FILE,this._madeBullet.bind(this));
        //接收敌方飞机抛出来的坐标生成敌方子弹
        this._lis = cc.eventManager.addCustomListener(GAME_EVENT.ENEMY_BOSS_UPDATE,this._makeBossBullet.bind(this));
    },
    _madeBullet:function(event){
        var pos = event.getUserData();
        var sp = new EnEmyBulletSprite();
        sp.setPosition(pos.x,pos.y);
        this.addChild(sp);
    },
    _makeBossBullet:function(event){
        var data = event.getUserData();
        this._sp = new EnEmyBossBulletSprite();
        VIEW+=(parseInt(Math.random()*5)+10);
        this._sp. setPosition(data.x,data.y);
        this.addChild(this._sp);
    },
    onExit:function(){
        cc.eventManager.removeListener(this._listener);
        cc.eventManager.removeListener(this._lis);
        this.removeAllChildren(true);
    }
});