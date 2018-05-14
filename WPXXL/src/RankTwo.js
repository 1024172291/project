var PlayRank;
rankTwo_create = function()
{
    var node = cc.BuilderReader.load("res/ccb/RankTwo.ccbi");
    node.controller._init();
    return node;
};

rankTwo_scene = function () {
    var scene = new cc.Scene();
    var layer = rankTwo_create();
    scene.addChild(layer);
    return scene;
};
cc.BuilderReader.registerController("RankTwo", {
    onDidLoadFromCCB : function()
    {
        PlayRank = this;

    },
    _init : function()
    {

    },

    setInfo:function(_rankTemp,_name,_score,_img){
        this.paiMing.setString(_rankTemp);
        this.deFen.setString(_score);
        if(_name.length>7){
            _name = _name.substring(0,6)+"...";
        }
        this.nameLabel.setString(_name)
        //this.picture_1Sprite.initWithFile(_sp);
        var self = this;
        cc.loader.loadImg(_img,{},function(res,tex){
            var sp = new cc.Sprite(tex);

            var point = self.picture_1Sprite.getPosition();
            sp.x = point.x - self.picture_1Sprite.width/2;
            sp.y = point.y - self.picture_1Sprite.height/2+5;
            self.rootNode.addChild(sp);

            var wid = sp.getBoundingBox().width;
            var hei = sp.getBoundingBox().height;
            sp.setContentSize(self.picture_1Sprite.getBoundingBox());
            var wid2 = sp.getBoundingBox().height;
            sp.scaleX = 59/wid;
            sp.scaleY = 59/hei;
            sp.y -= 4;
            self.picture_1Sprite.setVisible(false);
        });
    }
});