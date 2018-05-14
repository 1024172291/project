var AnimationSprite = cc.Sprite.extend({
    _listener:null,
    ctor: function () {
        this._super();
        this._init();
    },
    _init: function () {
        cc.spriteFrameCache.addSpriteFrames(res.animation_10);
        var mExplodeFrames = [];
        for(var i= 1;i< 7;i++){
            var frame = cc.spriteFrameCache.getSpriteFrame(i+".png");
            //var frame = new cc.Sprite("res/res/"+i+".png");
            mExplodeFrames.push(frame);
        }
        var anim = new cc.Animation(mExplodeFrames,0.04);
        var that = this;
        this._listener = cc.eventManager.addCustomListener(GAME_EVENT.ANIMAL_BOMB,function(event){
            //var target = event.getUserData();
            var target = event.getUserData();
            var sp = new cc.Sprite();
            //var sp = new cc.ParticleSystem("res/BoilingFoam.plist");
            var localPoint = target.convertToWorldSpace(cc.p(0,0));
            cc.log(target,localPoint);
            sp.setPosition(localPoint);
            sp.x -= 13;
            sp.y -= 13;
            that.addChild(sp);
            sp.scale = 1/2;
            sp.setAnchorPoint(0,0);
            sp.runAction(cc.sequence(cc.animate(anim),cc.fadeOut(0.1)))
        });
    },
    onExit:function(){
        cc.eventManager.removeListener( this._listener);
        this.removeAllChildren(true);
    }
});
