class MapUI extends eui.Component{
    private bg_1 : eui.Image;
    private bg_2 : eui.Image;
    private bg_3 : eui.Image;
    private bg_4 : eui.Image;

    public hp:eui.ProgressBar;
    public mp:eui.ProgressBar;
    public levelBar:eui.ProgressBar;
    
    public label_exp:eui.Label;
    public label_lv:eui.Label;
   
    public hei:number;
    private _speed : number = 0
    private gameTime : egret.Timer = new egret.Timer(1,0);
    private refreshMp : egret.Timer = new egret.Timer(1,0);
    //弹出人物属性界面按钮
    private openAtt:eui.Button;
    //人物属性界面
    private hero_attribute;
    //人物属性文本
    private atk:eui.Label;
    private roleClass;
    private gold:eui.Label;
    private score:eui.Label;
    private roleTitle: RoleTitle = new RoleTitle();

    private addHp:eui.Button;
    private addMp:eui.Button;
    public menu:eui.Button;

    //血瓶和蓝瓶的实际数量
    public hpProsNum:number = 5;
    public mpProsNum:number = 5;
    //血瓶和蓝瓶的显示数量
    private _hpNum:eui.Label;
    private _mpNum:eui.Label;
    public constructor(){
        super();
        this.skinName = "resource/eui_customs/GameScene.exml";
        this.once(egret.Event.ADDED_TO_STAGE,this.init,this);
        this.once(egret.Event.REMOVED_FROM_STAGE,this.destroy,this);
    }
    
    //初始化
    private init(){
        this.roleClass = RoleClass.getInstance();
       //人物属性
        
        this.roleClass.hp = this.roleClass.maxHp;   //人物血量
        this.roleClass.mp = this.roleClass.maxMp;   //人物蓝量
        
        this.roleClass.name = "女侠";
        //角色标题
        this.roleTitle.setName( this.roleClass.name);
        //this.addChild(this.roleTitle);
        this.setProsNumShow();
        this.refreshDisplay();
        //地板移动
        this._speed = GameSpeed;
        this.refreshMp.addEventListener(egret.TimerEvent.TIMER, this.refreshDisplay, this)
        this.gameTime.addEventListener(egret.TimerEvent.TIMER, this.onGameTimer, this)
        this.hei = this.bg_3.height; 
        this.gameTime.start();

        this.initProgressBar();  //血条（蓝条）

        this.openAtt.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnOpenAttHandler,this);  //弹出人物属性界面
        this.menu.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onMenu,this);                //弹出商店界面
        
        this.addHp.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnAdd,this);
        this.addMp.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnAdd,this);
        
         
    }

    //刷新人物属性显示
    public refreshDisplay(){
         //人物属性
        this.atk.text = this.roleClass.attack+"";    //人物攻击
        this.gold.text = this.roleClass.gold+"";     //人物金钱
        this.score.text = this.roleClass.score+""; //人物分数
        if(this.roleClass.exp>lvExp){
            this.roleClass.exp = lvExp;
        }
        this.label_exp.text = "Exp:"+ this.roleClass.exp +" / "+ lvExp;  //人物经验
        this.label_lv.text = "Lv:"+ this.roleClass.level;                //人物等级
        this.hp.maximum = this.roleClass.maxHp;   //人物血条进度条最大值刷新
        this.hp.value = this.roleClass.hp;        //人物血条显示
        this.mp.maximum = this.roleClass.maxMp;   //人物蓝条进度条最大值刷新
        this.mp.value = this.roleClass.mp;        //人物蓝条显示
        //刷新血瓶和蓝瓶数量
        this.setProsNumShow();
        //刷新血条和蓝条
        //this.timerHandler(); 
        
    }

    private onMenu(event){
        if(isAddMenu) return;
        this.dispatchEventWith(GameEvents.ADD_MENU);
    }
    
    private btnAdd(event){
        if(event.currentTarget.name == "血瓶"){
           //if(this.hpProsNum == 0 ) return;
           if(this.hpProsNum == 0 || this.roleClass.hp == this.roleClass.maxHp) return;
           this.hpProsNum -=1;
           this.roleClass.hp += (this.roleClass.maxHp*0.5); //实际血量
           this.hp.value += this.roleClass.hp; //进度条显示
           if(this.hp.value>=this.roleClass.maxHp)  this.hp.value = this.roleClass.maxHp;
           if(this.roleClass.hp>=this.roleClass.maxHp)  this.roleClass.hp = this.roleClass.maxHp;
        }else{
           //if(this.mpProsNum == 0 ) return;
           if(this.mpProsNum == 0 || this.roleClass.mp == this.roleClass.maxMp) return;
           this.mpProsNum -=1;
           this.roleClass.mp += (this.roleClass.maxMp*0.5); //实际蓝量
           this.mp.value += this.roleClass.mp; //进度条显示
           if(this.mp.value>=this.roleClass.maxMp)  this.mp.value = this.roleClass.maxMp;
           if(this.roleClass.mp>=this.roleClass.maxMp)  this.roleClass.mp = this.roleClass.maxMp;
        }
        this.setProsNumShow();
    }
    
    //血瓶蓝瓶显示
    private setProsNumShow(){
        this._hpNum.text = this.hpProsNum+"";
        this._mpNum.text = this.mpProsNum+"";
    }
    
    private btnOpenAttHandler(){
        if(isAddAtt) return;
        this.dispatchEventWith(GameEvents.ADD_ATT);
    }


    private onGameTimer (){
        this.bg_1.x -= this._speed;
        this.bg_2.x -= this._speed;
        if(this.bg_1.x < -this.width){
            this.bg_1.x = this.bg_2.x+this.bg_2.width
        }
        if(this.bg_2.x < -this.width){
            this.bg_2.x = this.bg_1.x+this.bg_1.width
        }
        this.bg_3.x = this.bg_1.x;
        this.bg_4.x = this.bg_2.x;
    }

    public isGameTimer(is:boolean){
        if(is){
            this.gameTime.start();
        }else{
            this.gameTime.stop();
        }
    }
    

    private initProgressBar():void{
        
        this.hp.maximum = this.roleClass.maxHp;//设置进度条的最大值
        this.hp.minimum = 0;//设置进度条的最小值
        this.addChild(this.hp);
        this.hp.value =  this.roleClass.hp;//设置进度条的初始值
        //用timer来模拟加载进度
        
       
        this.mp.maximum = this.roleClass.maxMp;//设置进度条的最大值
        this.mp.minimum = 0;//设置进度条的最小值
        this.addChild(this.mp);
        this.mp.value = this.roleClass.mp;//设置进度条的初始值

        this.levelBar.maximum = 100;
        this.levelBar.minimum = 0;
        this.addChild(this.levelBar);
        this.levelBar.value =  0;
        //用timer来模拟加载进度,调试
        //  var timer:egret.Timer = new egret.Timer(1,0);
        //  timer.addEventListener(egret.TimerEvent.TIMER,this.timerHandler,this);
        //  timer.start();
    }

    private timerHandler():void{
        this.levelBar.value = 50;
    }
    
    
    private destroy (){
        
    }

}