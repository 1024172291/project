var BachGroundSprite = cc.Sprite.extend({
    sp1:null,
    sp2:null,
    moveSpeed:5,
    ctor:function(res){
        this._super();
        this._init(res);
    },
    _init:function(res){
        this.sp1 = new cc.Sprite(res);
        this.sp2 = new cc.Sprite(res);
        this.addChild(this.sp1);
        this.addChild(this.sp2);
        this.sp1.setAnchorPoint(0,0);
        this.sp1.setPosition(0,0);
        this.sp2.setAnchorPoint(0,0);
        this.sp2.setPosition(0, this.sp2.height);
        this.scheduleUpdate()
    },
    update:function(){
        this.sp1.y -= this.moveSpeed;
        this.sp2.y -= this.moveSpeed;
        if(this.sp1.y< -this.sp1.height){
            this.sp1.y = this.sp2.y+this.sp2.height
        }
        if(this.sp2.y< -this.sp2.height){
            this.sp2.y = this.sp1.y+this.sp2.height
        }
    },
    onExit:function(){
        this.removeAllChildren(true);
    }
});
