var loadLayer;
loadingScene_create = function()
{
	var node = cc.BuilderReader.load("res/ccb/gameLoading.ccbi");
	node.controller._init();
	return node;
};

loadingScene_scene = function () {
	var scene = new cc.Scene();
	var layer = loadingScene_create();
	scene.addChild(layer);
	return scene;
};


cc.BuilderReader.registerController("gameLoading", {
	onDidLoadFromCCB : function()
	{
		loadLayer = this;
		var size=cc.winSize;
		this.tu.scale = 0.8;
		this.tu.setPosition(cc.winSize.width>>1,cc.winSize.height*0.3);
		cc.log(cc.winSize.width>>1,cc.winSize.height*0.4);
	},
	_init : function()
	{
		this.rootNode.addChild(new PlayMusic());
	},

	onStart:function()
	{
		cc.director.runScene(gameTutorialScene_scene());
	},

});
