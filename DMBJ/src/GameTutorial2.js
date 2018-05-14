var GameTutorial_create = cc.Layer.extend({
	sprite:null,
	ctor:function () {

		this._super();
		
		//加载资源
		cc.spriteFrameCache.addSpriteFrames("res/res/kuaiqiangshoudafeiji.plist");

		var sp=new cc.Sprite("#juese1.png");
		sp.x=240;
		sp.y=360;
		this.addChild(sp);
		sp.setScale(0.5);

		var fanzhuan=cc.orbitCamera(1,1,0,0,90,0,0);
		sp.runAction(fanzhuan);
	
		return true;
	}
});

var GameTutorialScene_scene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new GameTutorial_create();
		this.addChild(layer);
	}
});

