class AttributeUI extends eui.Component{
    private btn_wuqi:eui.ToggleButton;
    private btn_shangYi:eui.ToggleButton;
    private btn_jieZhi:eui.ToggleButton;
    private btn_touJian:eui.ToggleButton;
    private btn_huTui:eui.ToggleButton;
    private btn_dunPai:eui.ToggleButton;
    private btn_shouZhuo:eui.ToggleButton;
    private btn_xiangLian:eui.ToggleButton;
    private btn_xieZi:eui.ToggleButton;
    private btn_yaoDai:eui.ToggleButton;

    private btns:eui.ToggleButton[];
    private closeButton:eui.Button;
    private btn_focused:eui.ToggleButton;
    private btnNums = ["0","0","0","0","0","0","0","0","0","0"];

    private _pageFocusedPrev:string;
    private _pageFocused:string;
    
    private atk:eui.Label;
    private defense:eui.Label;

    private showAttriButeTimer:egret.Timer =  new egret.Timer(1,0);
    private roleclass;
    
    public constructor(){
        super();
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/eui_customs/Attribute.exml";
        this._init();
    }

    private roleClass;
    private _init(){
        this.roleClass = RoleClass.getInstance();
        this.atk.text = this.roleClass.attack+""; 
        this.defense.text = this.roleClass.defense+"";

        this.closeButton.addEventListener( egret.TouchEvent.TOUCH_TAP, this.btnCloseHandler, this );

        this.btns = [this.btn_dunPai,this.btn_shangYi,this.btn_huTui,this.btn_shouZhuo,this.btn_touJian,this.btn_wuqi,this.btn_xiangLian,
        this.btn_xieZi,this.btn_yaoDai,this.btn_jieZhi]

        this.btn_wuqi.addEventListener( egret.TouchEvent.TOUCH_TAP, this.mbtnHandler, this );
        this.btn_shangYi.addEventListener( egret.TouchEvent.TOUCH_TAP, this.mbtnHandler, this );
        this.btn_jieZhi.addEventListener( egret.TouchEvent.TOUCH_TAP, this.mbtnHandler, this );
        this.btn_touJian.addEventListener( egret.TouchEvent.TOUCH_TAP, this.mbtnHandler, this );
        this.btn_huTui.addEventListener( egret.TouchEvent.TOUCH_TAP, this.mbtnHandler, this );
        this.btn_dunPai.addEventListener( egret.TouchEvent.TOUCH_TAP, this.mbtnHandler, this );
        this.btn_shouZhuo.addEventListener( egret.TouchEvent.TOUCH_TAP, this.mbtnHandler, this );
        this.btn_xiangLian.addEventListener( egret.TouchEvent.TOUCH_TAP, this.mbtnHandler, this );
        this.btn_xieZi.addEventListener( egret.TouchEvent.TOUCH_TAP, this.mbtnHandler, this );
        this.btn_yaoDai.addEventListener( egret.TouchEvent.TOUCH_TAP, this.mbtnHandler, this );

    }

    private uiCompHandler(){
        this.roleClass = RoleClass.getInstance();
        this.showAttriButeTimer.addEventListener(egret.TimerEvent.TIMER, this.showAttriButeFile, this);
        this.showAttriButeTimer.start();
    }

    private showAttriButeFile(){
        this.atk.text = this.roleClass.attack+""; 
        this.defense.text = this.roleClass.defense+"";
    }

    //点击装备框进行处理
    private mbtnHandler(event:egret.Event){
        if(event.currentTarget == this.btn_focused){
            console.log( event.currentTarget.name, "已经选中不应当再处理!" );
            event.currentTarget.selected = false;
            event.currentTarget.enabled = false;
            return;
        }
        // for(var i = 0; i<this.btns.length; i++){
        //     this.btns[i].enabled = false;
        // }
        if(this.btn_focused){
            this.btn_focused.selected = false;
            this.btn_focused.enabled = true;
        }
        this.btn_focused = event.currentTarget;

        for(var i = 0;i<this.btnNums.length;i++){
           if(event.currentTarget.name == this.btnNums[i]){
                console.log("弹出"+event.currentTarget.name+"信息框");
                goods.goodsName = "金龙"+event.currentTarget.name;
                this.dispatchEventWith(GameEvents.TAN_CHU_ATT);
                
           }
        }   
        
    }
    
    // private resetFocus():void{
    //     console.log( " resetFocus " );
    //     if( this.btn_focused !=null ){
    //         this.btn_focused.selected = false;
    //         this.btn_focused.enabled = true;
    //         this.btn_focused = null;
    //     }
    // }

    private btnCloseHandler(){
        //this.parent.removeChild(this);
        this.$setVisible(false);
        isAddAtt = false;
         if( this.btn_focused !=null ){
             this.btn_focused.selected = false;
             this.btn_focused.enabled = true;
             this.btn_focused = null;
         }
         this.dispatchEventWith(GameEvents.CLOSE_GDDOS_DATE); //关闭信息提示界面
    }

    public getDate(evt:DateEvent){
        var isChongFu :Boolean = false ;
        for(var ii = 0 ;ii<this.btnNums.length;ii++){
            if(evt._goodsName == this.btnNums[ii]) isChongFu = true;
        }
        
        if(isChongFu){
            //alert("您已经购买了此道具，不能重复购买！");
            this.dispatchEventWith(GameEvents.BUY_CHONG_FU);
            return;
        } 

        for(var i = 0;i<this.btns.length;i++){
            if(evt._goodsName == this.btns[i].name){
               console.log("购买了"+ evt._goodsName);
               //alert("恭喜您成功购买了此道具!")
               this.dispatchEventWith(GameEvents.BUY_CHENG_GONG);
               //增加攻击或者防御
               this.roleClass.gold -= evt._goodsGold;
               if(goods.goodsComment == "防御加成 " ){
                 this.roleClass.defense += goods.goodsAddnum;
                 console.log(this.roleClass.defense)
               }else{
                 this.roleClass.attack += goods.goodsAddnum;
               }

                for(var j = 0; j < dsListHeros.length; j++){
                    if(dsListHeros[j].goodsName.split("金龙")[1] == evt._goodsName){
                        var spr = this.createBitmapByName(dsListHeros[j].icon);
                        spr.x = this.btns[i].x;
                        spr.y = this.btns[i].y;
                        var scaleX = this.btns[i].width/spr.width;
                        var scaleY = this.btns[i].height/spr.height;
                        spr.$setScaleX(scaleX);
                        spr.$setScaleY(scaleY);
                        this.addChildAt(spr,1000);
                        //this.addChild(spr);
                        this.setChildIndex( this.btns[i], this.numChildren);
                        this.btnNums[i] = evt._goodsName;
               
                    }
                }
             } 
          } 
    }

     private createBitmapByName(name:string):egret.Bitmap {
        var result = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    public order(){
        var dateEvent:DateEvent = new DateEvent(DateEvent.DATE);
        dateEvent._goodsName = goods.goodsName;
        this.dispatchEvent(dateEvent);
    }
}