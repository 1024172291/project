var Cell = cc.Sprite.extend({
    arrayIndex:null,
    type:null,
    _checkIsOver:true,
    _listener:null,
    _lis:null,
    ctor:function() {
        this._super("#jewel1.png");
        this._init();
    },
    _init:function(){
        //this.scale = 1.2;
        this._checkIsOver = true;
        var that = this;
        this._lis = cc.eventManager.addCustomListener(GAME_EVENT.OVER_STOP,function(){
            that._checkIsOver = false;
        });
        this.changeType();    //改变类型
        var listener = cc.EventListener.create({
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches:true,      //吞没事件
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();             //当前点击的对象
                var pos = touch.getLocation();                     //获取当前全局点击点坐标
                var s = target.getContentSize();                   //获取点击对象的尺寸
                var rect = cc.rect(0, 0, s.width, s.height);     //对象的框型区域
                var localPoint = target.convertToNodeSpace(pos);   //转换为本地坐标
                if (cc.rectContainsPoint(rect, localPoint)) {     //检测碰撞
                    if(!that._checkIsOver) return;
                    cc.audioEngine.playEffect("res/music/click.mp3",false); //播放点击音效
                    cc.eventManager.dispatchCustomEvent(GAME_EVENT.USER_CLICK_SHRED_EVERT, that.arrayIndex);
                    return true
                } else {
                    return false
                }
            }
        });
        var label = new cc.LabelTTF("","",10);
        label.enableStroke(cc.color(0,0,0,255),1);
        label.setPosition(10,10);
        this.addChild(label);
        this._listener =cc.eventManager.addListener(listener.clone(),this);

    },
    resetSpecal:function(){
        //this.bossAdd.removeFromParent(true);
        this.isSpecial = false;
    },
    setToSpecial:function(num){
        this.bossAdd = new cc.Sprite();
        this.bossAdd.initWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame("huang" + this.type + ".png"));
        this.bossAdd.setAnchorPoint(0,0);
        if(this.bossAdd){
            this.addChild(this.bossAdd);
        }
        this.isSpecial = true;
        this.isCreatType = num;
    },
    changeType:function(){
        this.type = 1 + parseInt(Math.random() * GAME_CONFIG.TYPENUM);
        //this.initWithFile("res/res/jewel" + this.type + ".png");
        this.initWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame("jewel" + this.type + ".png"));
    },
    //方块下落动画
    fallDown:function(num,_bgwid){
        this.arrayIndex.y += num;
        var move = cc.moveBy(0.2,cc.p(0,-_bgwid*num));
        this.runAction(move);
        this.label.setString(this.arrayIndex.x+","+this.arrayIndex.y,"",10)
    },
    setArrIndex:function(i,j){
        this.arrayIndex = cc.p(i,j);
        this.label = new cc.LabelTTF(i+","+j,"",10);
        this.label.enableStroke(cc.color(0,0,0,255),1);
        this.label.setPosition(10,10);
        //this.addChild(this.label);
    },
    newBorn:function(_i,_j,_bgwid){
        this.setAnchorPoint(0.5,0.5);
        this.setPosition(_i*_bgwid - 171,cc.winSize.height+30);

        var fadeout = cc.fadeOut(0.0001);
        var move1 = cc.moveTo(0.01,cc.p(_i*_bgwid - 171,175 -(_j-1)*_bgwid));
        var fadein = cc.fadeIn(0.0001);
        var move2 = cc.moveTo(0.1,cc.p(_i*_bgwid - 171,175 -_j*_bgwid));
        this.runAction(cc.sequence(cc.sequence(fadeout,move1),cc.spawn(fadein,move2)));
        this.setArrIndex(_i,_j);
        /*if(bo){
            this._checkIsOver = false;
        }*/
    },
    movePosition:function(pos,xb){
        var move = cc.moveTo(0.1,pos);
        this.runAction(move);
        this.arrayIndex = xb;
        this.label.setString(this.arrayIndex.x+","+this.arrayIndex.y,"",10)
    },
    touchCell:null,
    changeAphla:function(){
        this.touchCell = new cc.Sprite("#kuang.png");
        this.touchCell.setAnchorPoint(0,0);
        this.addChild(this.touchCell);
    },
    resetAphla: function(){
        if(this.touchCell){
            this.touchCell.removeFromParent();
        }
    },
    onExit:function(){
        cc.eventManager.removeListener(this._listener);
        cc.eventManager.removeListener(this._lis);
    }
});