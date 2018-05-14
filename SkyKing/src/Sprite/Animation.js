var AnimationSprite = cc.Sprite.extend({
    _listener:null,
    ctor: function () {
        this._super();
        this._init();
    },
    _init: function () {
        cc.spriteFrameCache.addSpriteFrames(res.exp_1);
        var mExplodeFrames = [];
        for(var i= 1;i< 17;i++){
            var frame = cc.spriteFrameCache.getSpriteFrame("explosion_"+("00"+i).slice(-2)+".png");
            mExplodeFrames.push(frame);
        }
        var anim = new cc.Animation(mExplodeFrames,0.04);
        var that = this;
        this._listener = cc.eventManager.addCustomListener(GAME_EVENT.PLANE_BOMB,function(event){
            var target = event.getUserData();
            var sp = new cc.Sprite();
            //var sp = new cc.ParticleSystem("res/BoilingFoam.plist");
            sp.setPosition(target);
            that.addChild(sp);
            sp.scale = Math.random()*2;
            sp.runAction(cc.sequence(cc.animate(anim),cc.fadeOut(0.1)))
        });
    },
    onExit:function(){
        cc.eventManager.removeListener( this._listener);
        this.removeAllChildren(true);
    }
});