class Props extends egret.Bitmap {
     private type:number = 0;
    
     public constructor(x,y,obj) {
        super();
        this.once(egret.Event.ADDED_TO_STAGE,function(){this.init(x,y,obj)},this);
    }
    
    private init(x:number,y:number,obj:any){
        this.type = obj.type;
        this.x = x;
        this.y = y;
        this.texture = RES.getRes("300"+this.type+"_png");

    }

}