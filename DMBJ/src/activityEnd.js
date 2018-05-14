var endLayer;
endScene_create = function () {
    var node = cc.BuilderReader.load("res/ccb/activityEnd.ccbi");
    node.controller._init();
    return node;
};

endScene_scene = function () {
    var scene = cc.Scene.create();
    var layer = endScene_create();
    scene.addChild(layer);
    return scene;
};
cc.BuilderReader.registerController("activityEnd", {
    onDidLoadFromCCB: function () {
        endLayer = this;
    },
    _init: function () {
        var that = this.erWeima;
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,      //吞没事件
            onTouchBegan: function (touch, event) {
                var pos = touch.getLocation();
                var rect = cc.rect(0, 0, that.width, that.height);
                var localPoint = that.convertToNodeSpace(pos);
                if (cc.rectContainsPoint(rect, localPoint)) {
                    window.location.href = "http://url.cn/2CxiseP";
                    return true
                }
            }
        });
        cc.eventManager.addListener(listener, that);
    },
    onHomepage: function () {
        if (MUSIC.isCanPlay) {
            if (click) click.play();
        }
        cc.director.runScene(startScene_scene());
    },
})