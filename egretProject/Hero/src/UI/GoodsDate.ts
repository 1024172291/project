class GoodsDate extends eui.Component {
    private btn_return:eui.Button;
    private needGold:eui.Label;
    private addComment:eui.Label;
    private roleClass;
    private icon:eui.Image;
    private goodsName:eui.Label;
    
    
    constructor() {
        super();
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/eui_customs/goodsDate.exml";
        
    }

    private uiCompHandler(){
        this.btn_return.addEventListener( egret.TouchEvent.TOUCH_TAP, this.OnCloseHandler, this );
    }

    private OnCloseHandler(){
        this.parent.removeChild(this);
        isGoodsDate = false;
    }

    public getDate(evt:DateEvent){
        for(var i = 0;i<dsListHeros.length;i++){
           if(evt._goodsName == dsListHeros[i].goodsName){
                this.needGold.text = dsListHeros[i].gold + "";
                this.addComment.text = dsListHeros[i].comment;
                this.goodsName.text = dsListHeros[i].goodsName + "";
                this.icon.source = dsListHeros[i].icon;
                this.addChild(this.icon);
           }
        }
        
    }
}