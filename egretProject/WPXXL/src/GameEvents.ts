class GameEvents{
    public static GAME_START:string = "GAME_START";
    public static REMOVE_RULE:string = "REMOVE_RULE";
    public static CELL_ADD_OVER = "CELL_ADD_OVER";
    public static TOUCH_RULE_START_GAME = "TOUCH_RULE_START_GAME";
    public static TOUCH_START = "TOUCH_START";
    public static SUBMIT_INFO = "SUBMIT_INFO";
}
class GameVoid{
    public static  createBitmapByName(name:string):egret.Bitmap {
        var result = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}
class Constant{
     private static _instance:Constant;
     public static getInstance(){
         if(!this._instance) this._instance = new Constant()
         return this._instance
     }
     stageW: number = 0;
     stageH: number = 0;
}
class GAME_CONFIG{
      public static SHRED_NUM_W :number = 8;
      public static SHRED_NUM_H :number= 8;
      public static BG_BOX_WIDTH :number = 390;
      public static TYPENUM :number = 5;
}
var Creat2X2Arr = function(_i,_j,defaultValue){
    var returnArr = [];
    for(var i = 0;i<_i;i++){
        returnArr[i] = [];
        for(var j=0;j<_j;j++){
            returnArr[i][j] = defaultValue;
        }
    }
    return returnArr
}

var touchCellArr = [];
var _isStartGame = false;
var MUSIC = {
    isCanPlay:true
}
var GamePlayer = {
    score : 0
}
//declare function wxRZ();
