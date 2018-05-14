startScene_create = function()
{
	var node = cc.BuilderReader.load("res/ccb/startGame.ccbi");
	node.controller._init();
	return node;
};

startScene_scene = function () {
	var scene = new cc.Scene();
	var layer = startScene_create();
	scene.addChild(layer);
	return scene;
};

cc.BuilderReader.registerController("startGame", {
    progressSprite:null,
    speed:0,
    onDidLoadFromCCB : function()
    {

        if (this.layerView) {
            this.layerView.bake();
        }

        this.progressSprite = changePt(this.jinDu );
        setBgPt(this.progressSprite, 0);
        var that =this;
        this.rootNode.onUpdate = function(dt) {
            this.controller._onUpdate(dt);
            that.speed += parseInt(dt*100);
            that.speedLabel.setString(that.speed);
            if(that.speed >= 100){
                that.speed = 100;
                var scene =loadingScene_create();
                cc.director.runScene(scene);
            }
        };
        this.rootNode.schedule(this.rootNode.onUpdate);


    },
    _onUpdate : function(dt) {
        setBgPt(this.progressSprite, getBgPt(this.progressSprite) + dt / 1.5 * 100);
    },
    /*onStart:function(){
     var scene =gameTutorialScene_scene();
     cc.director.runScene(scene);
     },*/
    _init : function()
    {

    }
});
//进度条相关
var changePt = function(_sprite, barChangeRate, midpoint, type)
{
    //cc.log(_sprite._renderCmd);
    var bg = new cc.ProgressTimer(_sprite);
    bg.setType(type || cc.ProgressTimer.TYPE_BAR);
    bg.setBarChangeRate(barChangeRate||cc.p(1, 0));
    bg.setPosition(_sprite.getPosition());
    //bg.setPosition(cc.winSize.width>>1,cc.winSize.height>>1)
    bg.setScaleX(_sprite.getScaleX());
    bg.setScaleY(_sprite.getScaleY());
    bg.setAnchorPoint(_sprite.getAnchorPoint());
    bg.setMidpoint(midpoint||cc.p(0,0));
    bg.setPercentage(100);
    //_sprite._renderCmd._textureCoord =0;

    var parent = _sprite.getParent();
    _sprite.removeFromParent();
    parent.addChild(bg);
    return bg;

};
//设置进度条比例
var setBgPt = function(_sprite, value)
{
    _sprite.setPercentage(value);
};
//获取进度条比例
var getBgPt = function(_sprite)
{
    return _sprite.getPercentage();
};


