interface SignPackage {
    appId:string;
    nonceStr:string;
    timestamp:number;
    signature:string;
    url:string;
}

var title: string = "王牌消消乐";
var desc: string = "为了领张电影票  我居然把这游戏玩完了！";
var link: string = 'http://www.gamedo.net/movie/JJ/';
var imgUrl: string = 'http://www.gamedo.net/movie/JJ/resource/res/icon.jpg';
//中奖有效日期
var startMonth: number = 9;
var startDay: number = 25;
var startHour: number = 12;
var endDay: number = 30;
var endMonth: number = 10;
var endHour: number = 12;

var isCanChouJiang: boolean = false;
var isFenxiang: boolean = false;
//服务器接口
//var serverurl = "https://www.gamedo.net/";
//获取微信认证接口
//var weixin = serverurl + "wechatjj.action";
//游戏名次接口
//var scoreRank = serverurl + "scorelottery.action";
//判断是否中奖接口
//var zhongJiang = serverurl + "checklottery.action";
//提交中奖用户信息接口
//var zhongJiangUser = serverurl + "commitlottery.action";
//微信公众号URL
var wxUrl = "http://url.cn/2CxiseP";
//未中奖URL
var faileUrl = "http://mp.weixin.qq.com/s?__biz=MzA5NzU1MDU1Ng==&mid=502767698&idx=1&sn=c6cf0a93a64d05ca24d84a7cd359af0e";
//中奖URL
var winUrl = "http://mp.weixin.qq.com/s?__biz=MzA5NzU1MDU1Ng==&mid=502767700&idx=1&sn=5b2d4ae20ce745e0836609c4eb82e8e6";


function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    }
    return null;
}

window.onload = function () {
	var url = "http://www.gamedo.net:8889/get_sign?game_url=" + encodeURIComponent(location.href).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
	var urlloader = new egret.URLLoader();
    var req = new egret.URLRequest(url);
    urlloader.load(req);
    req.method = egret.URLRequestMethod.GET;
    urlloader.addEventListener(egret.Event.COMPLETE,(e)=> {
            var signPackage = <SignPackage>JSON.parse(e.target.data);
            var bodyConfig = new BodyConfig();
            bodyConfig.debug = false;
            bodyConfig.appId = 'wx8923c424f092e0af';
            bodyConfig.timestamp = signPackage.timestamp;
            bodyConfig.nonceStr = signPackage.nonceStr;
            bodyConfig.signature = signPackage.signature;
            bodyConfig.jsApiList =  [
				'checkJsApi',
				'onMenuShareTimeline',
				'onMenuShareAppMessage',
				'onMenuShareQQ',
				'onMenuShareWeibo'
			]
            wx.config(bodyConfig);
            wx.ready(function(){
                shareConfig(title, desc, link, imgUrl);
            })
        },this)

};

function shareConfig(title: string, desc: string, link: string, imgUrl: string) {
	//if(!window.wx) return;

	// 分享给朋友
	var shareAppMessage = new BodyMenuShareAppMessage();
	shareAppMessage.title = title;
	shareAppMessage.desc = desc;
	shareAppMessage.link = link;
	shareAppMessage.imgUrl = imgUrl;
	shareAppMessage.success = function (res) {
		//分享后跳转
		if (isCanChouJiang)
			goShareScene();
			//alert("分享成功")
	};
	shareAppMessage.fail = function (res) {
	}
	wx.onMenuShareAppMessage(shareAppMessage);

	// 分享到朋友圈
	var sharet = new BodyMenuShareTimeline();
    sharet.title = desc;
	sharet.link = link;
	sharet.imgUrl = imgUrl;
	sharet.success = function (res) {
		if (isCanChouJiang)
			goShareScene();
	}
	sharet.fail = function (res) {
	}
	wx.onMenuShareTimeline(sharet);

	// 分享到QQ
	var shareqq = new BodyMenuShareQQ();  
	shareqq.title = title;
	shareqq.desc = desc;
	shareqq.link = link;
	shareqq.imgUrl = imgUrl;
	shareqq.success = function (res) {
		if (isCanChouJiang)
			goShareScene();
	}
	shareqq.fail = function (res) {
	}
	wx.onMenuShareQQ(shareqq);

	// 分享到微博
	var shareweibo = new BodyMenuShareWeibo();
	shareweibo.title = title;
	shareweibo.desc = desc;
	shareweibo.link = link;
	shareweibo.imgUrl = imgUrl;
	shareweibo.success = function (res) {
		if (isCanChouJiang) 
		    goShareScene();
			
	}
	shareweibo.fail = function (res) {
	}
    wx.onMenuShareWeibo(shareweibo);
	
}

function goShareScene() {


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
		SceneControl.repleaScene(new Yyy());
	}
	else{
		SceneControl.repleaScene(new EndScene());
	}
}