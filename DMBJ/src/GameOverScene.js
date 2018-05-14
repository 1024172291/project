
var video="http://m.v.qq.com/page/d/u/g/d030673znug.html?ptag=v_qq_com%23v.play.adaptor%233&from=singlemessage&isappinstalled=1";
gameOverScene_create = function()
{
	var node = cc.BuilderReader.load("res/ccb/gameOverScene.ccbi");
	node.controller._init();
	return node;
};

gameOverScene_scene = function () {
	var scene = cc.Scene.create();
	var layer = gameOverScene_create();
	scene.addChild(layer);
	return scene;
};


function goShareScene() {
	var scene = shareScene_scene();
	cc.director.runScene(scene);
}
cc.BuilderReader.registerController("gameOverScene", {
	onDidLoadFromCCB : function()
	{
		if (this.layerView) {
			this.layerView.bake();
		}


	},



	_init : function()
	{
		this.rootNode.addChild(new PlayMusic());
		this.biliLabel.visible = false;
        var self=this;
        //可以抽奖了"+gameLayer.score+"
		isFenxiang = true;
        isCanChouJiang=true;
		var nickname = getQueryString("nickname");
		var headimgurl = getQueryString("headimgurl");
		var xhr = cc.loader.getXMLHttpRequest();         //註冊接口
		xhr.open("GET", scoreRank+"?score="+gameLayer.score+"&openid="+openid+"&nickname="+nickname+"&headimgurl="+headimgurl , true);             //打開接口
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
				var object = self.object = eval("(" + xhr.response + ")");
				var result = object.result;
                var data = object.data;
				//self.mingzi1.setString(data[0]['nickname']);
				if(data.length > 0){
					for(var i = 0;i< data.length;i++){
						var img = data[i]["headimgurl"];
						self.loadPic(i, img, self);
						self["mingzi"+(i+1)].setString(data[i]['nickname']);
						self["fenshu"+(i+1)].setString(data[i]['score']);
					}
				}
				if(data.length < 5){
					self["top"+(data.length+1)].visible = false;
				}

				/*var user = {order: null, score: gameLayer.score, nickname: nickname, headimgurl: headimgurl, openid: openid};
				for(var i = 0;i< 5;i++){
					if(gameLayer.score > data[i].score){
						user.order = i+1;
						data.splice(i,0,user);
						data = data.pop();
					}
				}*/

				var desc = descStart + result + descEnd;
				shareConfig(title, desc, link, imgUrl);
				self.biliLabel.setString(result);
				self.biliLabel.visible = true;
			}
		};
		xhr.send();   //發送

        //刷新分数标签
        this.scoreLabel.setString(gameLayer.score);
		this.zi1.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame(ENEMY.img2[gameTutorial.nandu] + ".png"));
	},

	loadPic : function (i, img, self) {
		cc.loader.loadImg(img,{},function(res,tex){
			var sp = new cc.Sprite(tex);

			var point = self["touxiang"+(i+1)].getPosition();
			var localPoint = self["top"+(i+1)].convertToWorldSpaceAR(self["touxiang"+(i+1)].getPosition());
			var pos= cc.p(localPoint.x - point.x/3,localPoint.y - point.y+7);
			sp.setPosition(pos);
			//self["touxiang"+(i+1)].setAnchorPoint(0,0.5);
			self.rootNode.addChild(sp,200);

			var wid1 = sp.getBoundingBox().height;
			sp.setContentSize(self["touxiang"+(i+1)].getBoundingBox());
			var wid2 = sp.getBoundingBox().height;
			sp.scale = wid2/wid1;
			self["touxiang"+(i+1)].setVisible(false);
		});

	},

	onShare:function()
	{
		var size=cc.winSize;
		var layer=new cc.LayerColor(cc.color.BLACK);
		layer.setOpacity(100);
		this.rootNode.addChild(layer);
		layer.x=0;
		layer.y=0;

		var share=new cc.Sprite("res/res/fenxiangzi.png");
		share.setAnchorPoint(0.5,1);
		share.x=size.width/2;
		share.y=size.height;
		layer.addChild(share);

		var _touchListener2 = cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan: function(touch,event){
				return true;
			},
			onTouchEnded:function(touch,event)
			{
				layer.removeFromParent();
			}
		});
		cc.eventManager.addListener(_touchListener2, layer);
	},
	onVideo:function()
	{
	},
	onAgain:function()
	{

        //不能抽奖了
        isCanChouJiang=false;
		shareConfig(title, desctr, link, imgUrl);
        if(MUSIC.isCanPlay){
			if(click) click.play();
		}
        cc.director.runScene(gameTutorialScene_scene());
	},


});

