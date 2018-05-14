class FaileScene extends eui.Component {
    private erWeiMa:eui.Image;
    constructor() {
        super();
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "src/faileScene/faileSceneUI.exml";
    }

    private uiCompHandler() {
        this.erWeiMa.addEventListener(egret.TouchEvent.TOUCH_BEGIN,()=>{
              window.location.href = faileUrl;
              //console.log("点到了")
        },this)
        
    }
}