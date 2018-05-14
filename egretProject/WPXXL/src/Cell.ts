class Cell extends egret.Sprite {
    private type:number = 0;
    private arrayIndex = [];
    private cell = new egret.Bitmap();
    private bossAdd = new egret.Bitmap();
    private isSpecial:Boolean = false;
    private isCreatType:number = 0;
    
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        
    }
     private onAddToStage(){
        this.cell.texture = RES.getRes("jewel1_png");
        this.changeType();
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
        this.dispatchEventWith(GameEvents.CELL_ADD_OVER);
    }
    public changeType(){
        this.type = 1 + parseInt(Math.random() * GAME_CONFIG.TYPENUM+"");
        this.cell.texture = RES.getRes("jewel"+this.type+"_png");
        this.addChild(this.cell);
    }
    public setArrIndex(i,j){
        this.arrayIndex = [i,j];
    }
    private onTouchBegin(touch:egret.Event){
        var target = touch.currentTarget;
        var rect1 :egret.Rectangle = this.getBounds();
        var rect2 :egret.Rectangle = target.getBounds();
        rect1.x = this.x;
        rect1.y = this.y;
        rect2.x = target.x;
        rect2.y = target.y;
        if(rect1.intersects(rect2)){
            touchCellArr =  this.arrayIndex;
            this.dispatchEventWith(GameEvents.TOUCH_START);
            SoundsMgr.clickCell();
        }       
    } 
    
    public movePosition(sp,ob){
      egret.Tween.get(this).to({x:sp.x,y:sp.y},100)
      this.arrayIndex = ob;  
    }

    public fallDown(num,_bgwid):void{
        this.arrayIndex[1] += num;
        egret.Tween.get(this).to({x:this.x,y:this.y+_bgwid*num},100)       
    }
    
    public newBorn(_i,_j,_bgwid){
        this.x = _i*_bgwid+13;
        this.y = (_j-1)*_bgwid;
        egret.Tween.get(this).to({x:this.x,y:_j*_bgwid+10},100)           
    }

    public setToSpecial(num):void{
        this.bossAdd.texture = RES.getRes("huang" + this.type + "_png");
        this.addChild(this.bossAdd);
        this.isSpecial = true;
        this.isCreatType = num;
    } 

    public resetSpecal():void{
        this.isSpecial = false;
    }
    
}