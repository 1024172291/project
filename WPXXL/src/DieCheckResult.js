var DieCheckResult = cc.Class.extend({
    cell_arr:null,
    setArrIndex:function(arr){
        this.cell_arr = Creat2X2Arr(GAME_CONFIG.SHRED_NUM_W, GAME_CONFIG.SHRED_NUM_H, 1);
        for(var i = 0; i<GAME_CONFIG.SHRED_NUM_W; i++) {
            for (var j = 0; j < GAME_CONFIG.SHRED_NUM_H; j++){
                this.cell_arr[i][j] = arr[i][j].type
            }
        }
        Trace2xArr(this.cell_arr);
        var bo = this.checkIsEnd();
        return bo;
    },
    checkIsEnd:function(){
        for(var i = 0; i<GAME_CONFIG.SHRED_NUM_W; i++) {
            for (var j = 0; j < GAME_CONFIG.SHRED_NUM_H-1; j++) {
                var temp = this.cell_arr[i][j];
                this.cell_arr[i][j] = this.cell_arr[i][j+1];
                this.cell_arr[i][j+1] = temp;
                var end = this.checkArr();
                if(end.length>0){
                    //cc.log("不是死局");
                    return
                }
                this.cell_arr[i][j+1] = this.cell_arr[i][j];
                this.cell_arr[i][j] = temp
            }
        }
        for(var i = 0; i<GAME_CONFIG.SHRED_NUM_W-1; i++) {
            for (var j = 0; j < GAME_CONFIG.SHRED_NUM_H; j++) {
                var temp = this.cell_arr[i][j];
                this.cell_arr[i][j] = this.cell_arr[i+1][j];
                this.cell_arr[i+1][j] = temp;
                var end = this.checkArr();
                if(end.length>0){
                    //cc.log("不是死局");
                    return
                }
                this.cell_arr[i+1][j] = this.cell_arr[i][j];
                this.cell_arr[i][j] = temp
            }
        }
        //cc.log("是死局");
        cc.eventManager.dispatchCustomEvent(GAME_EVENT.NO_CLEAR_DIE);
        return true
    },
    checkArr:function(){
        var returnArr = [];
        for(var i = 0 ; i < GAME_CONFIG.SHRED_NUM_W ; i++){
            for(var j = 0; j <GAME_CONFIG.SHRED_NUM_H; j++){
                if(i<GAME_CONFIG.SHRED_NUM_W -2&&
                    this.cell_arr[i][j]== this.cell_arr[i+1][j] &&
                    this.cell_arr[i+1][j] == this.cell_arr[i+2][j]
                ){
                    returnArr.push(cc.p(i,j),cc.p(i+1,j),cc.p(i+2,j));
                }
                if(j<GAME_CONFIG.SHRED_NUM_W -2&&
                    this.cell_arr[i][j] == this.cell_arr[i][j+1] &&
                    this.cell_arr[i][j+1] == this.cell_arr[i][j+2]
                ){
                    returnArr.push(cc.p(i,j),cc.p(i,j+1),cc.p(i,j+2));
                }
            }
        }
        return returnArr
    },
    onExit:function(){
        this.removeAllChildren(true);
    }
});
