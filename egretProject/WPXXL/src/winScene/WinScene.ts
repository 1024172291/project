class WinScene extends eui.Component {
    private onAwards:eui.Button;
    constructor() {
        super();
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "src/winScene/winSceneUI.exml";
    }

    private uiCompHandler() {
        this.onAwards.addEventListener(egret.TouchEvent.TOUCH_BEGIN,()=>{
              console.log("点到了")
              this.dispatchEventWith(GameEvents.SUBMIT_INFO)
              SceneControl.repleaScene(new InputScene());

        },this)
        
    }
}