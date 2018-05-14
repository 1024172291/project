var Enemy = cc.Sprite.extend({
	kind:null,
	type: null,
    canTouch:true,
    row:null,
    col:null,
	
	ctor: function (type,row,col) {
		this._super();
		this.initWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame(gameLayer.enemy[type]+".png"));
		this.init(type,row,col);
	},

	init: function (type,row,col) {
		this.type = type;
		this.row=row;
		this.col=col;


        this.setListener();
        this.scheduleOnce(this.disAppear,existTime[gameLayer.stage]);  //怪物不点击存活时间

	},


    appear:function()
    {
        this.setAnchorPoint(0.5,0);
        this.setScale(1,0);
        this.runAction(cc.scaleTo(0.2,1));
    },
    disAppear:function(dt)
    {
        //取消点击
    	this.canTouch=false;

        //gameLayer["enemy"+this.type+"Count"]--;
        var index=gameLayer.appearEnemy.indexOf(this);
        gameLayer.appearEnemy.splice(index,1);
        this.removeFromParent(true);
    },
    playDie:function(self)
    {

        //播放音效
        self.playSound();

        //取消点击
        self.canTouch=false;
        
        self.unschedule(self.disAppear);
        self.updataUi();
        self.playScoreAnimation();

        //gameLayer["enemy"+this.type+"Count"]--;
        var index=gameLayer.appearEnemy.indexOf(self);
        gameLayer.appearEnemy.splice(index,1);
        self.removeFromParent(true);
    },
    playScoreAnimation:function()
    {
        var scorePhoto;
        if(this.type==0)
        {scorePhoto=new cc.Sprite("#zhu_100.png");}
        else
        {scorePhoto=new cc.Sprite("#zhu_50.png");}
        var count=this.row+3*this.col;
        var bg=gameLayer["bg"+count];
        scorePhoto.x=bg.x;
        scorePhoto.y=bg.y+80;
        gameLayer.rootNode.addChild(scorePhoto);

        var moveBy=new cc.MoveBy(0.3,0,50);
        var fadeOut=new cc.FadeOut(0.3);
        var spawn=new cc.Spawn(moveBy,fadeOut);
        scorePhoto.runAction(cc.sequence(spawn,cc.removeSelf()));
    },
    playSound:function()
    {
        if(!click){
            return;
        }
        if(!click.paused){
            cc.audioEngine.stopMusic(true);
            cc.audioEngine.playMusic("res/music/click.mp3",false);
        }else{
            cc.audioEngine.playMusic("res/music/click.mp3",false);
        }

       /* if(!click){
            return;
        }
        if(click.paused){
            click.play();
        }
        else{
            click.play();
        }*/

    },


    updataUi:function()
    {
        if(this.type==0)
        {
            gameLayer.score+=100;
        }
        else
        {
            gameLayer.score-=50;
        }
        gameLayer.limitScore();
        gameLayer.scoreLabel.setString(gameLayer.score);
    },


    setListener:function()
    {
        var self=this;
        //监听器
        var _touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan:function(touch,event)
            {
                if(!self.canTouch)
                {return false;}

                if(cc.rectContainsPoint(self.getBoundingBox(),gameLayer.baseLayer.convertToNodeSpace(touch.getLocation())))
                {

                    self.playDie(self);

                    if(self.type==0)
                    {gameLayer.enemyDieCount++;}
                }
                return false;
            }
        });
        cc.eventManager.addListener(_touchListener,this);
    }
});
