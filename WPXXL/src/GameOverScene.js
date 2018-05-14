var endLayer;
endScene_create = function () {
    var node = cc.BuilderReader.load("res/ccb/gameOverScene.ccbi");
    node.controller._init();
    return node;
};

endScene_scene = function () {
    var scene = cc.Scene.create();
    var layer = endScene_create();
    scene.addChild(layer);
    return scene;
};
cc.BuilderReader.registerController("gameOverScene", {
    onDidLoadFromCCB: function () {
        endLayer = this;
    },
    _init: function () {
        var that = this.pictureSprite;
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,      //吞没事件
            onTouchBegan: function (touch, event) {
                var pos = touch.getLocation();
                var rect = cc.rect(0, 0, that.width, that.height);
                var localPoint = that.convertToNodeSpace(pos);
                if (cc.rectContainsPoint(rect, localPoint)) {
                    window.location.href = wxUrl;
                    return true
                }
            }
        });
        cc.eventManager.addListener(listener, that);
    }
});