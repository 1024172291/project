class Animation extends egret.Sprite {
    private mc: egret.MovieClip;
    private mcf: egret.MovieClipDataFactory;
    public key: number = 0;//对象的标识

    private timer: egret.Timer = new egret.Timer(1000);//默认1秒
    private gameTime: egret.Timer = new egret.Timer(1, 0);

    private i: number = 0;//起始帧
    private n: number = 0;//帧数
    private j: number = 0;//播放计数
    private m: boolean = true;//是否循环播放


    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }
    private onAddToStage(){
        
    }

    /**复位第一帧*/
    public setIndex(): void {
        this.mc.gotoAndStop(this.i);
    }
    //参数 stepA 是 方向标识，用于 新对象 跳帧
    public startRole(step: number, step2: number, ci: number): egret.MovieClip {
        var data = RES.getRes("11_json");
        var tex = RES.getRes("11_png");
        this.mcf = new egret.MovieClipDataFactory(data, tex);
        this.mc = new egret.MovieClip(this.mcf.generateMovieClipData("11"));

        //this.mc.gotoAndStop(step);
        this.addChild(this.mc);
        this.mc.gotoAndPlay(step, ci);
        this.mc.addEventListener(egret.Event.COMPLETE, (e: egret.Event) => {
            this.parent.removeChild(this);
            console.log("播放完成")
            //播放完成移除动画
        }, this);
        this.mc.scaleX = 0.5;
        this.mc.scaleY = 0.5;

        return this.mc;
    }



}