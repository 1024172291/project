
class Enemy extends egret.Sprite {
    private mc:egret.MovieClip;
    private mcf:egret.MovieClipDataFactory;
    public key:number = 0;//对象的标识

    private timer:egret.Timer = new egret.Timer(1000);//默认1秒
    private _speed : number = 0
    private gameTime : egret.Timer = new egret.Timer(1,0);

    private i:number = 0;//起始帧
    private n:number = 0;//帧数
    private j:number = 0;//播放计数
    private m: boolean = true;//是否循环播放
    

    public constructor() {
        super();
        this._speed = GameSpeed;
        this.gameTime.addEventListener(egret.TimerEvent.TIMER, this.onGameTimer, this)
        
    }
    
    private enemyClass = EnemyClass.getInstance();
    private onGameTimer(){
        this.x -= this._speed;
    }

    public isGameTimer(is:boolean){
        if(is){
            this.gameTime.start();
        }else{
            this.gameTime.stop();
        }
    }

    /**设置定时器的 时间间隔 毫秒*/
    public setTimer(time:number){
        this.timer.delay = time;
    }
    /**是否启动定时器*/
    public isTimer(is:boolean){
        if(is){
            this.timer.start();
        }else{
            this.timer.stop();
        }
    }
    /**复位第一帧*/
    public setIndex():void
    {
        this.mc.gotoAndStop(this.i);
    }
    //参数 stepA 是 方向标识，用于 新对象 跳帧
    public startRole(step:number , step2:number , step3:boolean,type:number): egret.MovieClip {
        this.i = step;
        this.n = step2;
        this.m = step3;
        var data = RES.getRes("1_json");
        var tex = RES.getRes("1_png");
        this.mcf = new egret.MovieClipDataFactory(data,tex);
        this.mc = new egret.MovieClip( this.mcf.generateMovieClipData("enemy_"+type));
        
        this.mc.gotoAndStop(this.i);
        this.addChild(this.mc);
        
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onRoleTimer, this);
    
        return this.mc;
    }
   
   
    private onRoleTimer(evt:egret.Event):void
    {
        //减去自身一帧
        if(this.j >= this.n -1){
                this.j = 0;
                if ( !this.m )
                {
                    this.timer.stop();
                    return;
                }
        }else{
            this.j += 1;
        }
        
        this.mc.gotoAndStop(this.i + this.j);
    }
}