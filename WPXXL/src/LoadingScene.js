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
        //加载资源
        cc.spriteFrameCache.addSpriteFrames(res.clear_1);
    },
    _init : function()
    {

        shareConfig(title, desc, link, imgUrl);
        this.rootNode.addChild(new PlayMusic());

    },

    onStart:function()
    {
        cc.director.runScene(gameScene_scene());
    }
});