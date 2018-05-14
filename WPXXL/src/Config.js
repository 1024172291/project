var GAME_EVENT = {
    USER_CLICK_SHRED_EVERT:"user_click_shred_evert",
    ADD_SCORE : "add_score",
    ANIMAL_BOMB:"animal_bomb",
    OVER_STOP:"over_stop",
    NO_CLEAR_DIE:"no_clear_die",
    OVER_BACK_INIT_INTERFACE:"over_back_init_inteface",
    ADD_LEVEL:"add_level",
    VICTORY:"victory",
    GAME_OVER_STOP_CLEAR:"game_over_stop_clear"
};
var GAME_CONFIG ={
    currentLevel:0,
    score:0,
    SHRED_NUM_W : 8,
    SHRED_NUM_H : 8,
    SHRED_NUM :3,   //方块满足的数量进行消除
    SETSCORE:100,
    TYPENUM:5,
    BG_BOX_WIDTH:390,

    level1:{
        TYPENUM : 3,
        TIME:800
    },
    level2:{
        TYPENUM : 5,
        TIME:60
    },
    level3:{
        TYPENUM : 7,
        TIME:40
    }
};


var TracePointArray = function(arr){
    var s = '';
    for(var index in arr){
        var po = arr[index];
        s += po.x+","+po.y+"    "
    }
       //cc.log(s)
};
var Trace2xArr = function(arr){
    for(var i = 0;i<arr.length;i++){
        var s = '';
        for(var j = 0 ; j<arr[i].length;j++){
            s += arr[j][i]+'  '
        }
        //cc.log(s)
    }
};
var Creat2X2Arr = function(_i,_j,defaultValue){
    var returnArr = [];
    for(var i = 0;i<_i;i++){
        returnArr[i] = [];
        for(var j=0;j<_j;j++){
            returnArr[i][j] = defaultValue;
        }
    }
    return returnArr
};

var MUSIC={
    isCanPlay:true
}