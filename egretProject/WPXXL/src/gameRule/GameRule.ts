class GameRule extends eui.Component {
    private btn_start:eui.Button
    constructor() {
        super();
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "src/gameRule/gameRuleUI.exml";
        
    }
    private uiCompHandler(){
        this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onStart,this)
    }

    private onStart(){
        Director.getInstance().removeScene(this);
        Director.getInstance().popScene();
        _isStartGame = true;
    }
}