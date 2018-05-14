class EndScene extends eui.Component {
    private erWeiMa:eui.Image;
    constructor() {
        super();
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "src/endScene/endSceneUI.exml";
    }

    private uiCompHandler() {
        this.erWeiMa.addEventListener(egret.TouchEvent.TOUCH_BEGIN,()=>{
              window.location.href = wxUrl;
              //console.log("点到了")
        },this)
        
    }
}