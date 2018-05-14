var isAddAtt:boolean = false;
var isAddMenu:boolean = false;
var isAttToPlayer:boolean = false;
var GameSpeed = 2;
var lvExp:number = 0;
var gameType : Boolean = false; //游戏类型为无限模式时为true
var isResurGence:Boolean = false; //玩家人物复活时为true
var isDie:Boolean = false;//玩家死亡时为true
var isPlayOver:Boolean = true;//攻击动作完成时为true
var isGoodsDate:Boolean = false; //装备信息界面是否显示
var bNoGood: boolean = false;
var gameTime :number = 0;
var goods = {
    goodsName : "" ,
    goodsGold : 0 ,
    goodsComment : "", 
    goodsAddnum: 0,
}

class DateEvent extends egret.Event{
    public static DATE:string = "装备";
    public _goodsGold :number = 0;
    public _goodsAddnum :number = 0;
    public _goodsName :string = "";
    public _goodsComment :string = "";
}
   

class GameEvents{
    public static EVT_ENDLESS:string = "EVT_ENDLESS";
    public static EVT_CHALLENGE:string = "EVT_CHALLENGE";
    public static EVT_CLOSE_ABOUT:string = "EVT_CLOSE_ABOUT";
    public static ADD_ATT:string = "ADD_ATT";
    public static STOP_MAP:string = "STOP_MAP";
    public static STOP_ENEMY:string = "STOP_ENEMY";
    public static START_MAP:string = "START_MAP";
    public static START_ENEMY:string = "START_ENEMY";
    public static ADD_MENU:string = "ADD_MENU";
    public static TAN_CHU_ATT:string = "TAN_CHU_ATT";
    public static CLOSE_GDDOS_DATE:string = "CLOSE_GDDOS_DATE";
    public static BUY_CHONG_FU:string = "BUY_CHONG_FU";
    public static BUY_CHENG_GONG:string = "BUY_CHENG_GONG";
    public static NO_GOLD_NO_BUY:string = "NO_GOLD_NO_BUY";
}

class Point {
    public x:number;
    public y:number;
}

class RoleClass
{    
    private static _instance:RoleClass;
    public static getInstance(){
        if(!this._instance) this._instance = new RoleClass()
        return this._instance
    }
     name: string = "";
     level: number = 1;
     exp: number = 0;
     hp: number = 0;
     maxHp: number = 120;
     mp:number = 0;
     maxMp: number = 100;
     attack: number = 0;
     defense: number = 0;
     gold: number = 0; 
     score:number = 0;
}

class EnemyClass {
     private static _instance:EnemyClass;
     public static getInstance(){
         if(!this._instance) this._instance = new EnemyClass()
         return this._instance
     }
    name: string = "";
    level: number = 1;
    hp: number = 0;
    maxHp: number = 0;
    attack: number = 0;
    defense: number = 0;
    exp:number = 0;
    gold:number = 0;
    
    
}

var GameData = {
     prop1 : {
         type:1,
         
     },
     prop2 : {
         type:2,
     },
     prop3 : {
         type:3,
     } 
}

var GameConfig = [50,20,10,5,5,50,5,5,5,10];
var GoldsArr = ["goods01_png","goods02_png","goods03_png","goods04_png","goods05_png","goods06_png","goods07_png","goods08_png","goods09_png","goods10_png"]

var dsListHeros:Array<any> = [
              {icon: "goods01_png", goodsName: "金龙战靴", comment: "防御加成 +30" ,gold:"1000"}
            , {icon: "goods02_png", goodsName: "金龙头肩", comment: "防御加成 +30"  ,gold:"1000"}
            , {icon: "goods03_png", goodsName: "金龙披风", comment: "防御加成 +50"  ,gold:"5000"} 
            , {icon: "goods04_png", goodsName: "金龙手镯", comment: "攻击加成 +50"  ,gold:"10000"}
            , {icon: "goods05_png", goodsName: "金龙吊坠", comment: "攻击加成 +50"  ,gold:"10000"}
            , {icon: "goods06_png", goodsName: "金龙上衣", comment: "防御加成 +80" ,gold:"10000"}  
            , {icon: "goods07_png", goodsName: "金龙护腿", comment: "防御加成 +80"  ,gold:"10000"}
            , {icon: "goods08_png", goodsName: "金龙戒指", comment: "攻击加成 +100"  ,gold:"30000"}
            , {icon: "goods09_png", goodsName: "金龙盾牌", comment: "防御加成 +500"  ,gold:"50000"}         
            , {icon: "goods10_png", goodsName: "金龙战刀", comment: "攻击加成 +500" ,gold:"100000"} 
            
        ];

