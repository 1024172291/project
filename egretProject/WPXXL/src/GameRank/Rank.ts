class Rank extends eui.Component {
    private btn_share: eui.Button;
    private btn_again: eui.Button;
    private rankLabel: eui.BitmapLabel;
    private getScore: eui.BitmapLabel;
    private nameLabel: eui.Label;
    private listGoods: eui.List;
    private touXiang: eui.Group;
    constructor() {
        super();
        this.addChild(new PlayMusic());
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "src/GameRank/rankUI.exml";
        this.once(egret.Event.ADDED_TO_STAGE, this.init, this);
    }

    //皮肤加载完成
    private uiCompHandler() {
        this.btn_share.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShare, this)
        this.btn_again.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAgain, this)
        this.listGoods.itemRenderer = GoodsListIRSkin;
    }

    private imgLoadHandler(evt: egret.Event) {
        var loader: egret.ImageLoader = evt.currentTarget;
        var bmd: egret.BitmapData = loader.data;
        var bmp: egret.Bitmap = new egret.Bitmap(bmd);
        this.touXiang.addChild(bmp);
        bmp.width = this.touXiang.width;
        bmp.height = this.touXiang.height;
    }

    private init() {
        if (wxArr[1]) this.nameLabel.text = wxArr[1];
        if (wxArr[2]) {
            var imgLoader: egret.ImageLoader = new egret.ImageLoader;
            imgLoader.once(egret.Event.COMPLETE, this.imgLoadHandler, this);
            imgLoader.load(wxArr[2]);
        }

        isFenxiang = true;
        isCanChouJiang = true;
        //服务器代码
        // var request = new egret.HttpRequest();
        // request.responseType = egret.HttpResponseType.TEXT;
        // request.open(scoreRank + "?score=" + GamePlayer.score + "&openid=" + wxArr[0] + "&nickname=" + wxArr[1] + "&headimgurl=" + wxArr[2], egret.HttpMethod.GET);
        // request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        // request.send();
        // request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
    }
    
    private onGetComplete(event: egret.Event): void {
        //服务器返回
        var request = <egret.HttpRequest>event.currentTarget;
        console.log("get data : ", request.response);
        //返回的字符串转换成json
        var obj = JSON.parse(request.response);
        var score = obj.score;
        var rank = obj.order;
        var data = obj.data;
        this.listGoods.dataProvider = new eui.ArrayCollection(data)
        this.getScore.text = score;
        this.rankLabel.text = rank;
       
        

        //alert("服务器返回")
        for (var i = 0; i < data.length; i++) {
            var img = data[i]["headimgurl"];
            
        }
        shareConfig(title, desc, link, imgUrl);
        //SceneControl.repleaScene(new Yyy());
    }

    private onShare() {
        var layer:egret.Sprite = new egret.Sprite();
        layer.graphics.beginFill(0x000000);
        layer.graphics.drawRect(0,0,480,854);
        layer.graphics.endFill();
        this.addChild(layer);
        layer.alpha = 0.3;
        layer.touchEnabled = true;

        var sp:egret.Bitmap = new egret.Bitmap();
        sp.texture = RES.getRes("jiantou_png");
        this.addChild(sp);
        sp.x = this.stage.stageWidth/5;
        sp.y = sp.height/2;

        layer.addEventListener(egret.TouchEvent.TOUCH_BEGIN,()=>{
             this.removeChild(layer);
             this.removeChild(sp);
        },this)
        SceneControl.repleaScene(new Yyy());

    }

    private bgLayer: egret.Sprite;
    private onAgain() {
        //不能抽奖了
        isCanChouJiang = false;
        shareConfig(title, desc, link, imgUrl);

        SceneControl.repleaScene(new startGame());
        this.bgLayer = new egret.Sprite();
        this.bgLayer.graphics.beginFill(0x000000);
        this.bgLayer.graphics.drawRect(0, 0, 480, 854);
        this.bgLayer.graphics.endFill();
        this.addChild(this.bgLayer);
        this.bgLayer.alpha = 0.7;
        SceneControl.createScene(this.bgLayer);
        SceneControl.createScene(new GameRule());
    }
}

class GoodsListIRSkin extends eui.ItemRenderer {
    public touXiang: eui.Image;
    constructor() {
        super();
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "rankListUI";

    }
    private uiCompHandler() {
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
    } 
    private init() {
        
    }
   
}

