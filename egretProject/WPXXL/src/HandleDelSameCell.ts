class HandleDelSameCell{ 
    //处理重复的块
    public static filterDelSame(arr1, arr2) {
        var returnArr = arr1.concat(arr2);
        for (var i = 0; i < returnArr.length; i++) {
            var nowPo = returnArr[i];
            for (var j = i + 1; j < returnArr.length; j++) {
                if (returnArr[j][0] == nowPo[0] && returnArr[j][1] == nowPo[1]) {
                    returnArr.splice(j, 1);
                    j--
                }
            }
        }
        return returnArr
    }

     /*
     * 删除相同的元素
     * */
    public static filterDeleteSame(arr1,arr2){
        var returnArr = arr1.concat(arr2);
        for(var i = 0; i < returnArr.length; i++){
            var nowPo = returnArr[i];
            for(var j = i + 1; j < returnArr.length; j++){
                if(returnArr[j][0] == nowPo[0] && returnArr[j][1] == nowPo[1]){
                    returnArr.splice(j , 1);
                    returnArr.splice(i , 1);
                    j--
                }
            }
        }
        return returnArr
    }
    /*
     * 生成横着4消的数组
     * */
    public static filtCreatFourHeng(arr){
        var a =[];
        var returnArr = [];
        for(var i = 0;i< GAME_CONFIG.SHRED_NUM_W;i++){
            for(var j = 0;j< arr.length;j++){
                if(arr[j][1] == i){
                    a.push(arr[j])
                }
            }
            if(a.length>0) returnArr.push(a);
            a = [];
        }
        return returnArr;
    }

    /*
     * 生成竖着4消的数组
     * */
    public static filtCreatFourShu(arr){
        var a =[];
        var returnArr = [];
        for(var i = 0;i< GAME_CONFIG.SHRED_NUM_W;i++){
            for(var j = 0;j< arr.length;j++){
                if(arr[j][0] == i){
                    a.push(arr[j])
                }
            }
            if(a.length>0) returnArr.push(a);
            a = [];
        }
        return returnArr;
    }
}