class InitSceneUI extends eui.Component{
    private btn_endless : eui.Button;
    private btn_challenge : eui.Button;
    private btn_about : eui.Button;

    public constructor(){
        super();
        this.addEventListener(eui.UIEvent.COMPLETE,this.uiCompHandler,this);
        this.skinName = "resource/eui_customs/InitScene.exml";
    }

    private uiCompHandler():void{
        this.btn_endless.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnEndlessHandler,this);
        this.btn_challenge.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnChallengeHandler,this);
        this.btn_about.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnAboutHandler,this);
    }
    //无尽模式
    private btnEndlessHandler():void{
        gameType = true;
        if(gameTime == 0){
           gameTime ++;
           this.dispatchEventWith(GameEvents.EVT_ENDLESS);
        }else{
           this.parent.addChild(new GameStart());
           this.parent.removeChild(this);
        }
    }
    //挑战模式  
    private btnChallengeHandler():void{
        gameType = false;
        if(gameTime == 0){
           this.dispatchEventWith(GameEvents.EVT_ENDLESS);
           gameTime ++;
        }else{
           this.parent.addChild(new GameStart());
           this.parent.removeChild(this);
        }
    }
    //游戏帮助
    private btnAboutHandler():void{
         this.dispatchEventWith(GameEvents.EVT_CLOSE_ABOUT);
    }
}