var gameTutorial;
gameTutorial_create = function()
{
	var node = cc.BuilderReader.load("res/ccb/gameTutorial.ccbi");
	node.controller._init();
	return node;
};
gameTutorialScene_scene = function () {
	var scene = new cc.Scene();
	var layer = gameTutorial_create();
	scene.addChild(layer);
	return scene;
};
cc.BuilderReader.registerController("gameTutorial", {
	role:null,
    nandu:null,

    canTouch:true,
	onDidLoadFromCCB : function()
	{
		//静态变量
        gameTutorial=this;
        
        //监听器
        this._touchListener = cc.EventListener.create({
        	event: cc.EventListener.TOUCH_ONE_BY_ONE,
        	swallowTouches: true,
        	onTouchBegan: this.onTouchBegan.bind(this)
        });
        cc.eventManager.addListener(this._touchListener, this.rootNode);

	},

	_init : function()
	{
         this.rootNode.addChild(new PlayMusic());
        //加载资源
        cc.spriteFrameCache.addSpriteFrames("res/res/daomubiji.plist");

        //所有角色加入数组
		var role=this.role=[];
		role.push(this.juese1);
		role.push(this.juese2);
		role.push(this.juese3);
		role.push(this.juese4);
	},
	onTouchBegan : function (touch, event) {
        var size=cc.winSize;
        var self=this;

        //判断是否接受点击
        if(!this.canTouch)
        {return false;}

		for(var i=0;i<4;i++)
		{
			var juese=this.role[i];
			if(cc.rectContainsPoint(juese.getBoundingBox(), touch.getLocation()))
            {
                //中间点坐标
                var midX=(juese.x+size.width/2)/2;
                var midY=(juese.y+size.height/2)/2;
                var midWidth=(BACK_WIDTH+FRONT_WIDTH)/2;

                this.nandu=i;
                this.canTouch=false;
                //背面翻转
                //var fanzhuan=cc.orbitCamera(fanpaiSudu,1,0,0,90,0,0);
                var moveto=cc.moveTo(fanpaiSudu,cc.p(midX,midY+130));
                var scaleto=cc.scaleTo(fanpaiSudu,0,midWidth/FRONT_WIDTH);
                var spaw=cc.spawn(moveto,scaleto);

                //创建翻转后的菜单层
                //var layer = new cc.LayerColor(cc.color.BLACK);
                var layer=new cc.LayerColor(cc.color.WHITE);
                layer.setOpacity(200)
                this.rootNode.addChild(layer,2000);
                var layerCanTouch=false;

                //创建正面
                var newRole=new cc.Sprite("#juese_"+((i+1)+""+(i+1))+".png");
                newRole.x=midX;
                newRole.y=midY;
                layer.addChild(newRole);
                newRole.setScale(midWidth/BACK_WIDTH);
                newRole.tag=100;
                newRole.setVisible(false);
                newRole.runAction(cc.scaleTo(0.01,0,1));


                //触摸穿透层
                var _touchListener2 = cc.EventListener.create({
                    event: cc.EventListener.TOUCH_ONE_BY_ONE,
                    swallowTouches: true,
                    onTouchBegan: function(touch,event){
                        if(layerCanTouch)
                        {return true;}

                        return false;
                    },
                    onTouchEnded:function(touch,event)
                    {
                        //触发按钮
                        var anniu=layer.getChildByTag(105);
                        if(cc.rectContainsPoint(anniu.getBoundingBox(),touch.getLocation()))
                        {
                            anniu.runAction(cc.scaleBy(0.1,1.2));
                            cc.director.runScene(gameScene_scene());
                        }

                        anniu.removeFromParent();
                        cc.eventManager.removeListener(_touchListener2);

                        var newRole=layer.getChildByTag(100);

                        var callback=cc.callFunc(function(){
                            newRole.setVisible(false);
                            //var beimian=self.rootNode.getChildByTag(200);
                            //cc.log(self.rootNode.getChildByTag(200))
                            var beimian = juese;
                            beimian.setVisible(true);

                            //var fanzhuan3=cc.orbitCamera(fanpaiSudu,1,0,90,-90,0,0);
                            var moveto3=cc.moveTo(fanpaiSudu,2*midX-size.width/2,2*midY-size.height/2);
                            var scaleto3=cc.scaleTo(fanpaiSudu,1,1);
                            var spaw3=cc.spawn(moveto3,scaleto3);

                            var removeLayer=cc.callFunc(function(){
                                //移除菜单层
                                layer.removeFromParent();

                                //恢复监听
                                self.canTouch=true;

                                //
                                beimian.tag=10;
                                beimian.setLocalZOrder(1);
                            })

                            beimian.runAction(cc.sequence(spaw3,removeLayer));
                        })

                        //var fanzhuan1=cc.orbitCamera(fanpaiSudu,1,0,0,90,0,0);
                        var moveto1=cc.moveTo(fanpaiSudu,midX,midY);
                        var scaleto1=cc.scaleTo(fanpaiSudu,0,midWidth/BACK_WIDTH);
                        var spaw1=cc.spawn(moveto1,scaleto1);
                        newRole.runAction(cc.sequence(spaw1,callback));
                    }
                });
                cc.eventManager.addListener(_touchListener2, layer);

                //正面翻转
                var callback=cc.callFunc(function(){
                    juese.setVisible(false);
                    newRole.setVisible(true);

                    //var fanzhuan2=cc.orbitCamera(fanpaiSudu,1,0,-90,90,0,0);
                    var moveto2=cc.moveTo(fanpaiSudu,size.width/2,size.height/2+130);
                    var scaleto2=cc.scaleTo(fanpaiSudu,1,1);
                    var spaw2=cc.spawn(moveto2,scaleto2);

                    var layerChange=cc.callFunc(function(){
                        layerCanTouch=true;

                        //产生按钮
                        var anniu=new cc.Sprite("#button_queding.png");
                        anniu.x = size.width/2;
                        anniu.y = size.height*0.1;
                        layer.addChild(anniu);
                        anniu.tag=105;
                        anniu.setScale(1,0);
                        anniu.runAction(cc.scaleTo(0.1,1));
                    })
                    newRole.runAction(cc.sequence(spaw2,layerChange));
                });
                juese.setLocalZOrder(200);
                juese.tag=200;
                juese.runAction(cc.sequence(spaw,callback));
                break;
            }
		}
		
		return false;
	},

});