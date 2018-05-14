class GoodsUI extends eui.Component {
    private roleClass;

    private goods:GoodsListIRSkin = new GoodsListIRSkin();

    constructor() {
        super();
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/eui_customs/goodsUISkin.exml";
        
    }
    
    private uiCompHandler():void {
        console.log( "\t\tGoodsUI uiCompHandler" );
        this.roleClass = RoleClass.getInstance();
         //返回逻辑
         this.btnReturn.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=> {
              this.parent.removeChild(this);
              isAddMenu = false;
         }, this );

        // 填充数据
       
        this.listGoods.dataProvider = new eui.ArrayCollection( dsListHeros );
        
        
        this.listGoods.itemRenderer = GoodsListIRSkin;

       
        this.listGoods.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onChange,this);
 
        
        
    }
    private onChange(e:eui.PropertyEvent):void{
        //获取点击消息
        //console.log(this.listGoods.selectedItem,this.listGoods.selectedIndex)
    }

    protected createChildren():void {
        super.createChildren();

        //this.scrListGoods.horizontalScrollBar = null;
    }
    private btnReturn:eui.Button;

    private listGoods:eui.List;
    //private scrListGoods:eui.Scroller;
}

class GoodsListIRSkin extends eui.ItemRenderer {
    private btn_buyEquip:eui.Button;
    private cb:eui.CheckBox;
    private needGold:eui.Label;
    private addComment:eui.Label;
    private roleClass;
    private icon:eui.Image;
    private goodsName:eui.Label;
    constructor() {
        super();
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName ="resource/eui_customs/goodsListIRSkin.exml";
        
    }
    private uiCompHandler(){
        this.addEventListener( egret.Event.ADDED_TO_STAGE, this.init, this );
        this.roleClass = RoleClass.getInstance();
    }
    private init(){
        this.btn_buyEquip.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBuyEquip,this)
    }
    
    private onBuyEquip(){

        goods.goodsName = this.goodsName.$getText().split("金龙")[1];
        goods.goodsGold = parseInt(this.needGold.$getText());
        goods.goodsComment = this.addComment.$getText().split("+")[0];
        goods.goodsAddnum = parseInt(this.addComment.$getText().split("+")[1]);
        if(this.roleClass.gold >= goods.goodsGold){
            //传装备给人物装备栏
            isAttToPlayer = true;
        }else{
            //alert("金币不足，无法购买")
            bNoGood = true;
        }
        
    }

    public order(){
        var dateEvent:DateEvent = new DateEvent(DateEvent.DATE);
        dateEvent._goodsName = goods.goodsName;
        dateEvent._goodsGold = goods.goodsGold;
        dateEvent._goodsComment = goods.goodsComment;
        dateEvent._goodsAddnum = goods.goodsAddnum;
        this.dispatchEvent(dateEvent);
    }

    protected createChildren():void {
        super.createChildren();
    }

    protected dataChanged():void {
    }

}