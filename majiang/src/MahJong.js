var MahJong = cc.Sprite.extend({
    type:null,
    ctor:function(type) {
        this._super();
        this.type = type;
        this.setNewPaim(0);
    },
    setNewPaim:function(type,bo){
        this.visible = type != 100;
        if(type != 100){
            if(type < 0){
                //有一张牌在选择出牌中
                this.scale = 1;
                type *= -1
            }else{
                this.scale = 0.4;
            }
            this.initWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame("new_" + type + ".png"));
        }
    },
    //弃牌
    qiPai:function(){
        this.initWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame("new_" + this.type + ".png"));
    },

});
