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
cc.BuilderReader.registerController("gameRule", {
    onDidLoadFromCCB : function()
    {
    },
    _init:function(){

    },
    OnStart:function(){
        this.rootNode.removeFromParent();
        GamePlayer._isStartGame = true;
    }
});
