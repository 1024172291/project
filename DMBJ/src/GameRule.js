var gameRule;
gameRule_create = function()
{
	var node = cc.BuilderReader.load("res/ccb/gameRule.ccbi");
	node.controller._init();
	return node;
};

gameRule_scene = function () {
	var scene = new cc.Scene();
	var layer = gameRule_create();
	scene.addChild(layer);
	return scene;
};

//注册ccbi文件，第一个文件名
cc.BuilderReader.registerController("gameRule", {
	roleId:null,
    //初始化
    imageArray:[],
	onDidLoadFromCCB : function()
	{
		var size = cc.winSize;
        cc.spriteFrameCache.addSpriteFrames("res/res/daomubiji.plist");
	},
	_init:function()
	{
        this.imageArray=["zhu_guaiwu33","zhu_guaiwu11","zhu_guaiwu22","zhu_guaiwu44"];
        this.guaiwu .setSpriteFrame(cc.spriteFrameCache.getSpriteFrame(this.imageArray[gameTutorial.nandu]+".png"));
		this.initData();
        //this.rootNode.setColor(cc.color.BLACK) ;
	},
	initData:function()
	{
		
	},


    onOk:function()
    {
        this.rootNode.removeFromParent();
        gameLayer.isGameReady=true;

        //ready标签
        var readLabel1 = gameLayer.jiShi;
        //readLabel.setZOrder(100)
        var readLabel = gameLayer.daoJishi;
        readLabel1.setVisible(true);
        readLabel.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("zhu_pia.png"));
        if(gameLayer.readShu>0)
        {readLabel.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("zhu_"+gameLayer.readShu+".png"));}
        readLabel.setScale(1);
        var scaleto=cc.scaleTo(0.2,1.5);
        var xiaoxi=cc.callFunc(function(){
            readLabel1.setVisible(false);
        });
        readLabel.runAction(cc.sequence(scaleto,cc.delayTime(0.2),xiaoxi));
        gameLayer.readShu--;
        //gameLayer.addReadyLabel();
    }


});

