
var video="http://m.v.qq.com/page/d/u/g/d030673znug.html?ptag=v_qq_com%23v.play.adaptor%233&from=singlemessage&isappinstalled=1";
gameRankList_create = function()
{
	var node = cc.BuilderReader.load("res/ccb/RankOne.ccbi");
	node.controller._init();
	return node;
};

gameRankList_scene = function () {
	var scene = cc.Scene.create();
	var layer = gameRankList_create();
	scene.addChild(layer);
	return scene;
};


function goShareScene() {

	//活动日期
	var startDate = new Date();
	startDate.setDate(startDay);
	startDate.setMonth(startMonth-1);
	startDate.setHours(startHour);
	startDate.setMinutes(0);
	startDate.setSeconds(0);
	startDate.setMilliseconds(0);

	var nowDate = new Date();

	var endDate = new Date();
	endDate.setDate(endDay);
	endDate.setMonth(endMonth-1);
	endDate.setHours(endHour);
	endDate.setMinutes(0);
	endDate.setSeconds(0);
	endDate.setMilliseconds(0);


	if(nowDate>=startDate&&nowDate<=endDate){
		cc.director.runScene(failScene_scene());
	}
	else{
		cc.director.runScene(endScene_scene());
	}
}
cc.BuilderReader.registerController("RankOne", {
	RANK_NUM:10,
	rank_0:null,
	rank_1:null,
	rank_2:null,
	rank_3:null,
	rank_4:null,
	rank_5:null,
	rank_6:null,
	rank_7:null,
	rank_8:null,
	rank_9:null,

	onDidLoadFromCCB : function()
	{
     this.rootNode.addChild(new PlayMusic());

	 var self = this;
	 if(nickname){
		this.name_1Label.setString(nickname);

	 }
		if(headimgurl){
			cc.loader.loadImg(headimgurl,{},function(res,tex){
				var sp = new cc.Sprite(tex);

				self.picture_1Sprite.addChild(sp);
				var wid = sp.getBoundingBox().width;
				var hei = sp.getBoundingBox().height;
				sp.setContentSize(self.picture_1Sprite.getBoundingBox());
				var wid2 = sp.getBoundingBox().height;
				sp.scaleX = 59/wid;
				sp.scaleY = 59/hei;
				sp.x -=1;
				sp.y -=1;
				//self.pictureSprite.setVisible(false);
			})
		}
		//刷新分数标签
		this.deFen.setString(GamePlayer.setScore);
		//this.picture_1Sprite.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame(ENEMY.img2[gameTutorial.nandu] + ".png"));

	},



	_init : function()
	{
        var rankX = 16;
		var rankY = 200;
		var hei = 90;
		var self=this;
		//可以抽奖了"+gameLayer.score+"
		isFenxiang = true;
		isCanChouJiang=true;
		/*var nickname = getQueryString("nickname");
		var headimgurl = getQueryString("headimgurl");
		var score = getQueryString("score");*/
		var xhr = cc.loader.getXMLHttpRequest();         //註冊接口
		xhr.open("GET", scoreRank+"?score="+GamePlayer.setScore+"&openid="+openid+"&nickname="+nickname+"&headimgurl="+headimgurl , true);             //打開接口
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
				var object = self.object = eval("(" + xhr.response + ")");
				var result = object.result;
				var data = object.data;
				var order = object.order;
				self.paiMing.setString(order);
				if(data.length > 0){
					var rank;
					for(var i = 0;i< 3;i++){
						var img = data[i]["headimgurl"];
						var name = data[i]["nickname"];
						var fen = data[i]["score"];
						var rankTemp = i+1;
						rank = rankTwo_create();
						self.list.addChild(rank);
						rank.x = rankX;
						rank.y = rankY ;
						rankY -= hei;
						rank.controller.setInfo(rankTemp,name,fen, img);
					}
				}

				/*var user = {order: null, score: gameLayer.score, nickname: nickname, headimgurl: headimgurl, openid: openid};
				 for(var i = 0;i< 5;i++){
				 if(gameLayer.score > data[i].score){
				 user.order = i+1;
				 data.splice(i,0,user);
				 data = data.pop();
				 }
				 }*/
                //goShareScene();    //测试
				shareConfig(title, desc, link, imgUrl);

			}
		};
		xhr.send();   //發送

	},


	onLucky:function()
	{
		//cc.director.runScene(failScene_scene());

		var size=cc.winSize;
		var layer=new cc.LayerColor(cc.color.BLACK);
		layer.setOpacity(100);
		this.rootNode.addChild(layer);
		layer.x=0;
		layer.y=0;

		var share=new cc.Sprite("#jiantou.png");
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
	OnplayAgain:function()
	{

        //不能抽奖了
        isCanChouJiang=false;
		shareConfig(title, desc, link, imgUrl);
        if(MUSIC.isCanPlay){
			if(click) click.play();
		}
        cc.director.runScene(gameScene_scene());
	}

});

