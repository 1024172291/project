var shareLayer;
shareLayer_create = function()
{
	var node = cc.BuilderReader.load("res/ccb/shareLayer.ccbi");
	node.controller._init();
	return node;
};

shareScene_scene = function () {
	var scene = cc.Scene.create();
	var layer = shareLayer_create();
	scene.addChild(layer);
	return scene;
};
cc.BuilderReader.registerController("shareLayer", {
    progressSprite:null,
    speed:0,
    onDidLoadFromCCB : function()
    {

        if (this.layerView) {
            this.layerView.bake();
        }
        isFenxiang = false;
        this.progressSprite = changePt(this.jinDu );
        setBgPt(this.progressSprite, 0);
        var that =this;
        this.rootNode.onUpdate = function(dt) {
            this.controller._onUpdate(dt);
            that.speed += parseInt(dt*100);
            that.jinDuzhi.setString(that.speed);
            if(that.speed >= 100){
                that.speed = 100;
                var myDate = new Date();
                var year = myDate.getFullYear();
                var month = myDate.getMonth()+1;
                var day = myDate.getDate();
                //cc.log(year,+" "+month,+" "+day);
                if((month===endMonth&&day>endDay)||(month===startMonth&&day<startDay)){
                    cc.director.runScene(endScene_scene());
                }
                else{
                    cc.director.runScene(failScene_scene());
                }
            }
        };
        this.rootNode.schedule(this.rootNode.onUpdate);


    },
    _onUpdate : function(dt) {
        setBgPt(this.progressSprite, getBgPt(this.progressSprite) + dt / 1.5 * 100);
    },

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
