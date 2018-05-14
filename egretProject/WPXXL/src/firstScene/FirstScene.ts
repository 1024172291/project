class FirstScene extends eui.Component{
    private btn_play:eui.Button;
    
    public constructor(){
        super();
        this.addChild(new PlayMusic());
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "src/firstScene/firstUI.exml";
    }
    private uiCompHandler():void {
        this.btn_play.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onPlayGame,this);
        
    }
    private bgLayer;
    private onPlayGame():void{
        
        SceneControl.repleaScene(new startGame());
        this.bgLayer = new egret.Sprite();
        this.bgLayer.graphics.beginFill(0x000000);
        this.bgLayer.graphics.drawRect(0,0,480,854);
        this.bgLayer.graphics.endFill();
        this.addChild(this.bgLayer);
        this.bgLayer.alpha = 0.7;
        SceneControl.createScene(this.bgLayer);
        SceneControl.createScene(new GameRule());
    }

    
}