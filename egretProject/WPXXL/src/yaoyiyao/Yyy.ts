class Yyy extends eui.Component {
    private isWin: boolean = false;
    private isNoWin: boolean = false;
    private isDaJiang: boolean = false;
    private isMengNiu: boolean = false;
    private isShanDian: boolean = false;
    private isMigu: boolean = false;
    private isJieLuoFu: boolean = false;
    private gameWin:WinScene = new WinScene();
    constructor() {
        super();
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "src/yaoyiyao/yyy.exml";
    }

    private uiCompHandler() {
        isCanChouJiang = false;
        //判断是否中奖
        // var request = new egret.HttpRequest();
        // request.responseType = egret.HttpResponseType.TEXT;
        // request.open(zhongJiang, egret.HttpMethod.GET);
        // request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        // request.send();
        // request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
        this.gameWin.addEventListener(GameEvents.SUBMIT_INFO,()=>{
            SceneControl.repleaScene(new InputScene());
        },this)

        // egret.setTimeout(()=>{
        //     this._playResult();
        // },this,1000)
        this.win();
        //this.fail();
    }

    public verification: string;
    public rewards: number = 0;
    private _motion: egret.Motion;
    private onGetComplete(event: egret.Event) {
        var request = <egret.HttpRequest>event.currentTarget;
        console.log("get data : ", request.response);
        //返回的字符串转换成json
        var obj = JSON.parse(request.response);
        var result = obj.result;
        this.verification = obj.verification;
        if (result == 0) {
            this.isNoWin = true;   //沒中
        } else if (result == 1) {
            this.isWin = true;     //中牛奶
            this.rewards = 1;
        } else if (result == 2) {
            this.isDaJiang = true;  //中電影票
            this.rewards = 2;
        } else if (result == 3) {
            this.isMengNiu = true;  //中蒙牛代金券
            this.rewards = 2;
        } else if (result == 4) {
            this.isShanDian = true;   //闪电购
            this.rewards = 2;
        } else if (result == 5) {
            this.isMigu = true;   //咪咕阅读
            this.rewards = 2;
        }
        this._motion = new egret.Motion();
        this._motion.addEventListener(egret.Event.CHANGE, this.onMotion, this);
        this._motion.start();

        this.bgLayer = new egret.Sprite();
        this.bgLayer.graphics.beginFill(0x000000);
        this.bgLayer.graphics.drawRect(0, 0, 480, 854);
        this.bgLayer.graphics.endFill();
        this.addChild(this.bgLayer);
        this.bgLayer.alpha = 0;
    }


    private totalTime: number = 0;
    private prevX;
    private prevY;
    private prevZ;
    private onMotion(evt: egret.MotionEvent) {
        var x = evt.acceleration.x;
        var y = evt.acceleration.y;
        var z = evt.acceleration.z;
        var speed = Math.abs(x + y + z - this.prevX - this.prevY - this.prevZ);
        if (speed > 0.5) {
            this.totalTime += 0.2;
        }
        if (this.totalTime > 10) {
            this._playResult();
        }
        this.prevX = x;
        this.prevY = y;
        this.prevZ = z;
    }

    private _playResult() {
        if (this.isNoWin) {
            this.fail();              //没中
        } else {
            this.win();               //中奖
        }
    }

    //未中奖界面
    private bgLayer: egret.Sprite;
    private fail() {
        //this.bgLayer.alpha = 0.7;
        var faile = new FaileScene();
        this.addChild(faile);
    }

    //中奖界面
    private win() {
        //this.bgLayer.alpha = 0.7;
        this.addChild(this.gameWin);
    }
}