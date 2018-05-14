var GamePlayer;
gameScene_create = function()
{
    var node = cc.BuilderReader.load("res/ccb/gameScene.ccbi");
    node.controller._init();
    return node;
};

gameScene_scene = function () {
    var scene = new cc.Scene();
    var layer = gameScene_create();
    scene.addChild(layer);
    return scene;
};
cc.BuilderReader.registerController("gameScene", {
    _listener:null,            //监听
    _lis:null,                  //监听
    _rule:null,                 //规则
    shred_arr:null,            //保存块的数组
    _firstSp:null,             //第一次点击
    _checkIsOver:null,        //检查是否为稳定状态
    _result:null,              //检查死局类
    _bgwid:null,               //背景图小框框的尺寸
    _fourCellShuArr:[],       //保存竖着相连4个相同块
    _fourCellHengArr:[],      //保存横着相连4个相同块

    _bo:true,                   //判断检查消除数组里面有没有特殊块
    _isFirstClear:true,       //判断是第一次点击还是掉落状态
    _isTouchSpcial:false,     //判断第一次点击交换的块是不是特殊块
    _checkFirstFourArr:[],    //检查第一次产生的特殊块保存起来进行处理
    _returnClearArr:[],       //返回所有消除的块
    _boo:null,                 //判断第一次产生的特殊块需不需要消除
    _booFirstArr:[],          //第一次产生的特殊块不消除时进行保存的数组
    _isTouchStart:false,     //判断是不是开始点击
    _count:null,              //计算点击一次消除块的次数
    setScore:null,            //设置得分
    _timeCount:null,          //设置倒计时
    _haveFourCell:false,     //判断有无四消
    _isStartGame:false,       //判断游戏开始
    _fourCellNum:0,            //生成四消块的数量

    NodeTo:null,
    headPicture:null,
    onDidLoadFromCCB : function()
    {
        GamePlayer = this;
        //cc.log(this.pictureSprite.getPosition());
        var self = this;
        if(nickname){
            this.xingMing.setString(nickname);
        }

        //headimgurl = "http://localhost:63342/WJST/res/res/game.png";
        if(headimgurl){
            cc.loader.loadImg(headimgurl,{},function(res,tex){
                self.headPicture = new cc.Sprite(tex);

                self.pictureSprite.parent.addChild(self.headPicture);

                var wid = self.headPicture.getBoundingBox().width;
                var hei = self.headPicture.getBoundingBox().height;
                self.headPicture.setContentSize(self.pictureSprite.getBoundingBox());
                self.headPicture.scaleX = 59/wid;
                self.headPicture.scaleY = 59/hei;

                self.headPicture.x = self.pictureSprite.x - 27;
                self.headPicture.y = self.pictureSprite.y - 26 ;

                self.pictureSprite.visible = false;
            })
        }

        this.rootNode.addChild(new PlayMusic());
        this.rootNode.addChild(new AnimationSprite());
        this._count = 0;
        this.setScore = 0;
        this._timeCount = 60;
        this.deFen.setString(this.setScore);
        this.shiJian.setString(this._timeCount);


        this.rootNode.schedule(this._setTime.bind(this),1);


    },
    _init:function(){
        this._rule = gameRule_create();
        this.rootNode.addChild(this._rule);
        this._lis = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function(touch,event){
                return true;
            },
            onTouchEnded:function(touch,event)
            {

            }
        });
        cc.eventManager.addListener(this._lis, this._rule);


        this.NodeTo = new cc.Sprite();
        this.NodeTo.setPosition(cc.winSize.width/2,cc.winSize.height*0.4);
        this.Gezi.addChild(this.NodeTo);

        var bg = new cc.Sprite("#gamebiankuang.png");
        this.NodeTo.addChild(bg,3);

        var bgSp = new cc.Sprite("res/res/game.png");
        this.NodeTo.addChild(bgSp);

        this._bgwid = GAME_CONFIG.BG_BOX_WIDTH/GAME_CONFIG.SHRED_NUM_W;

        this.shred_arr = Creat2X2Arr(GAME_CONFIG.SHRED_NUM_W, GAME_CONFIG.SHRED_NUM_H, 1);
        for(var i = 0; i<GAME_CONFIG.SHRED_NUM_W; i++) {
            for(var j = 0; j<GAME_CONFIG.SHRED_NUM_H; j++){
                var sp = new Cell();
                this.NodeTo.addChild(sp,2);
                sp.setAnchorPoint(0.5,0.5);
                sp.setPosition(i*this._bgwid - 171,175 -j*this._bgwid);
                this.shred_arr[i][j] = sp;
                sp.setArrIndex(i,j);
            }
        }
        this._listener = cc.eventManager.addCustomListener(GAME_EVENT.USER_CLICK_SHRED_EVERT,this._checkTouch.bind(this));
        this._changeArr();
    },
    /*
     * 初始产生没有颜色相同的3个相连
     * */
    _changeArr:function(){
        var arr = this._checkArr();
        //cc.log("第"+this.timeCount++ +"次",arr.length);
        if(arr.length>0) {
            for (var index in arr) {
                var ob = arr[index];
                this.shred_arr[ob.x][ob.y].changeType()
            }
            this._changeArr();
        }
        else{
            cc.log("没有相连的3个相同颜色块了");
            this._result = new DieCheckResult();
            var bo = this._result.setArrIndex(this.shred_arr);
            if(bo){
                for(var i = 0; i<GAME_CONFIG.SHRED_NUM_W; i++) {
                    for (var j = 0; j < GAME_CONFIG.SHRED_NUM_H; j++) {
                        this.shred_arr[i][j].changeType();
                    }
                }
                this._changeArr()
            }
        }
    },
    /*
     * 检查相同颜色的块3个相连，返回数组
     * */
    _checkArr:function(){
        var returnArr = [];
        for(var i = 0 ; i < GAME_CONFIG.SHRED_NUM_W ; i++){
            for(var j = 0; j <GAME_CONFIG.SHRED_NUM_H; j++){
                if(i<GAME_CONFIG.SHRED_NUM_W -2&&
                    this.shred_arr[i][j].type == this.shred_arr[i+1][j].type &&
                    this.shred_arr[i+1][j].type == this.shred_arr[i+2][j].type
                ){
                    returnArr.push(cc.p(i,j),cc.p(i+1,j),cc.p(i+2,j));
                }
                if(j<GAME_CONFIG.SHRED_NUM_W -2&&
                    this.shred_arr[i][j].type == this.shred_arr[i][j+1].type &&
                    this.shred_arr[i][j+1].type == this.shred_arr[i][j+2].type
                ){
                    returnArr.push(cc.p(i,j),cc.p(i,j+1),cc.p(i,j+2));
                }
                if(i<GAME_CONFIG.SHRED_NUM_W -3&&this._isTouchStart&&
                    this.shred_arr[i][j].type == this.shred_arr[i+1][j].type &&
                    this.shred_arr[i+1][j].type == this.shred_arr[i+2][j].type&&
                    this.shred_arr[i+2][j].type == this.shred_arr[i+3][j].type){
                    this._fourCellHengArr.push(cc.p(i,j),cc.p(i+1,j),cc.p(i+2,j),cc.p(i+3,j));
                }
                if(j<GAME_CONFIG.SHRED_NUM_W -3&&this._isTouchStart&&
                    this.shred_arr[i][j].type == this.shred_arr[i][j+1].type &&
                    this.shred_arr[i][j+1].type == this.shred_arr[i][j+2].type&&
                    this.shred_arr[i][j+2].type == this.shred_arr[i][j+3].type
                ){
                    this._fourCellShuArr.push(cc.p(i,j),cc.p(i,j+1),cc.p(i,j+2),cc.p(i,j+3));
                }
            }

        }
        var arr = [];
        returnArr = this._filterDelSame(returnArr,arr);
        this._fourCellShuArr = this._filterDelSame(this._fourCellShuArr,arr);
        this._fourCellHengArr = this._filterDelSame(this._fourCellHengArr,arr);
        return returnArr
    },
    /*
     * 删除相同的元素
     * */
    _filterDeleteSame:function(arr1,arr2){
        var returnArr = arr1.concat(arr2);
        for(var i = 0; i < returnArr.length; i++){
            var nowPo = returnArr[i];
            for(var j = i + 1; j < returnArr.length; j++){
                if(cc.pSameAs(returnArr[j], nowPo)){
                    returnArr.splice(j , 1);
                    returnArr.splice(i , 1);
                    j--
                }
            }
        }
        return returnArr
    },

    /*
     * 对重复的块进行处理
     * */
    _filterDelSame: function(arr1,arr2){
        var returnArr = arr1.concat(arr2);
        for(var i = 0; i < returnArr.length; i++){
            var nowPo = returnArr[i];
            for(var j = i + 1; j < returnArr.length; j++){
                if(cc.pSameAs(returnArr[j], nowPo)){
                    returnArr.splice(j , 1);
                    j--
                }
            }
        }
        return returnArr
    },
    /*
     * 点击判断
     * */
    _checkTouch:function(event){
        this._isTouchStart = true;     //点击开始;
        var targetSp = event.getUserData();
        if(this._checkIsOver) return;
        if(this._firstSp == null){
            this.shred_arr[targetSp.x][targetSp.y].changeAphla();
            this._firstSp = targetSp;
            //点击一个块，选中
        }else {
            if (this._firstSp == targetSp) {
                this.shred_arr[targetSp.x][targetSp.y].resetAphla();
                this._firstSp = null;
                //点击的块是已经被选中的块，则取消选中
                return
            }
            if ((targetSp.x == this._firstSp.x || targetSp.y == this._firstSp.y) &&
                Math.abs(targetSp.x - this._firstSp.x + targetSp.y - this._firstSp.y) == 1
            ){
                this._checkIsOver = true;
                this._changePos(this._firstSp, targetSp,true);
                this.shred_arr[targetSp.x][targetSp.y].resetAphla();
                this._firstSp = null;
                //点击的块是已选中块的周围，则交换位置
            } else{
                this.shred_arr[this._firstSp.x][this._firstSp.y].resetAphla();
                this._firstSp = targetSp;
                this.shred_arr[targetSp.x][targetSp.y].changeAphla();
            }   //点击的块不是已选中块的周围，则互换透明度
        }
    },
    /*
     * 交换两个点击的块
     * */
    _changePos:function(old,tar,endCheck){
        var shred1 = this.shred_arr[old.x][old.y].getPosition();
        var shred2 = this.shred_arr[tar.x][tar.y].getPosition();
        this.shred_arr[old.x][old.y].movePosition(shred2,tar);
        this.shred_arr[tar.x][tar.y].movePosition(shred1,old);
        var temp = this.shred_arr[old.x][old.y];
        this.shred_arr[old.x][old.y] = this.shred_arr[tar.x][tar.y];
        this.shred_arr[tar.x][tar.y]=temp;
        if(endCheck){
            var that = this;
            this.rootNode.scheduleOnce(function(){
                var end = that._checkArr();
                if(end.length == 0){
                    that._changePos(tar,old,false);
                    that._checkIsOver = false;
                }else{
                    that._checkIsDown(end,tar,old)
                }
            },0.3)
        }
    },

    _checkFourArr:function(tar,old){
        var returnArr = [];
        for(var indexArr in this._fourCellShuArr){
            var ob = this._fourCellShuArr[indexArr];
            if((ob.x == old.x&&ob.y == old.y)||(ob.x == tar.x&&ob.y == tar.y)){
                cc.log("生成消除横着一条的方块",ob.x,ob.y);
                this.shred_arr[ob.x][ob.y].setToSpecial(1);
                this._fourCellNum++;
                returnArr.push (ob);
            }
        }
        for(var indexArr2 in this._fourCellHengArr){
            var obj = this._fourCellHengArr[indexArr2];
            if((obj.x == old.x&&obj.y == old.y)||(obj.x == tar.x&&obj.y == tar.y)){
                cc.log("生成消除竖着一条的方块",obj.x,obj.y);
                this.shred_arr[obj.x][obj.y].setToSpecial(2);
                this._fourCellNum++;
                returnArr.push (obj);
            }
        }
        return returnArr;
    },
    _checkIsState:function(arr){
        var returnArr = [];
        for(var indexArr in this._fourCellShuArr){
            var ob = this._fourCellShuArr[indexArr];
            if(ob.x == arr.x&&ob.y == arr.y) {
                cc.log("生成消除横着一条的方块", ob.x, ob.y);
                this.shred_arr[ob.x][ob.y].setToSpecial(1);
                this._fourCellNum++;
                returnArr.push (cc.p(ob.x,ob.y))
            }
        }

        for(var indexArr2 in this._fourCellHengArr){
            var obj = this._fourCellHengArr[indexArr2];
            if(obj.x == arr.x&&obj.y == arr.y){
                cc.log("生成消除竖着一条的方块",obj.x,obj.y);
                this.shred_arr[obj.x][obj.y].setToSpecial(2);
                this._fourCellNum++;
                returnArr.push (cc.p(obj.x,obj.y))
            }
        }
        return returnArr;
    },
    _checkIsDown:function(arr,tar,old){
        this._haveFourCell = false;
        var temp;
        if(this._isFirstClear){
            for(var arrIndex in arr){
                var ob = arr[arrIndex];
                if(ob.x == tar.x&&ob.y == tar.y){
                    temp = tar;
                }else if(ob.x == old.x&&ob.y == old.y){
                    temp = old;
                }
            }
            if(arr.length >=4 &&this.shred_arr[temp.x][temp.y].isSpecial){
                if(this._fourCellShuArr.length>0||this._fourCellHengArr.length>0) {
                    this._isTouchSpcial = true;
                }
            }else{
                for(var arrIn in arr){
                    var obj = arr[arrIn];
                    if((obj.x == tar.x&&obj.y == tar.y&&(this._fourCellHengArr.length>0||this._fourCellShuArr.length>0))||
                        (obj.x == old.x)&&(obj.y==old.y)&&(this._fourCellHengArr.length>0||this._fourCellShuArr.length>0)){
                        var spSpecialArr = this._checkFourArr(tar,old);
                    }
                }
                if(spSpecialArr){
                    arr = this._filterDeleteSame(arr,spSpecialArr);
                    this._checkFirstFourArr.push(spSpecialArr);
                }
            }
        }else{
            if (this._fourCellHengArr.length > 0) {
                var arrFo = this._filtCreatFourHeng(this._fourCellHengArr);
                for(var i = 0;i< arrFo.length;i++) {
                    for(var j = 0;j<arrFo[i].length;j++){
                        if(!this.shred_arr[arrFo[i][j].x][arrFo[i][j].y].isSpecial){
                            var spSpecialArr2 = this._checkIsState(arrFo[i][j]);
                            if(spSpecialArr2){
                                arr = this._filterDeleteSame(arr,spSpecialArr2);
                                this._checkFirstFourArr.push(spSpecialArr2);
                            }
                            break;
                        }
                    }
                }

            } if (this._fourCellShuArr.length > 0) {
                var arrFord = this._filtCreatFourShu(this._fourCellShuArr);
                for(var k = 0;k< arrFord.length;k++) {
                    for(var l = 0;l<arrFord[k].length;l++){
                        if(!this.shred_arr[arrFord[k][l].x][arrFord[k][l].y].isSpecial){
                            var SpecialArr = this._checkIsState(arrFord[k][l]);
                            if(SpecialArr){
                                arr = this._filterDeleteSame(arr,SpecialArr);
                                this._checkFirstFourArr.push(SpecialArr);
                            }
                            break
                        }
                    }
                }
            }
        }
        //有四消
        arr = this._isCheckFourClear(arr);
        if(this._isTouchSpcial){
            arr = this._filterDeleteSame(arr,temp);
            if(this._fourCellShuArr.length>0){
                this.shred_arr[temp.x][temp.y].setToSpecial(1);
                this._fourCellNum++;
            }else{
                this.shred_arr[temp.x][temp.y].setToSpecial(2);
                this._fourCellNum++;
            }
        }
        this._clearCell(arr);
    },
    _isCheckFourClear:function(arr){
        this._boo = false;
        this._bo = false;
        var clearOnceArr = [];
        for(var arrIndex in arr) {
            var obj = arr[arrIndex];
            if (this._checkFirstFourArr.length>0) {
                for (var firstArrIndex in this._checkFirstFourArr) {
                    var checkFirst = this._checkFirstFourArr[firstArrIndex];
                    if (obj.x == checkFirst[0].x && obj.y == checkFirst[0].y) {
                        this._boo = true;
                        this._booFirstArr = obj
                    }
                }
            }
        }
        if(this._boo){
            arr = this._filterDeleteSame(arr, this._booFirstArr);
            this._booFirstArr = [];
        }
        for(var arrIndex2 in arr) {
            var ob = arr[arrIndex2];
            if(this.shred_arr[ob.x][ob.y].isSpecial){  //判断是不是特效块
                this._bo = true;
                this.shred_arr[ob.x][ob.y].resetSpecal();
                if(this.shred_arr[ob.x][ob.y].isCreatType ==1){
                    cc.log("有四消,消除横着一条",(ob.x,ob.y));
                    this._haveFourCell = true;
                    for(var k = 0;k<GAME_CONFIG.SHRED_NUM_W;k++){
                        clearOnceArr.push(cc.p(k,ob.y))
                    }
                }else{
                    cc.log("有四消,消除竖着一条",(ob.x,ob.y));
                    this._haveFourCell = true;
                    for(var l = 0;l<GAME_CONFIG.SHRED_NUM_W;l++){
                        clearOnceArr.push(cc.p(ob.x,l))
                    }
                }
            }
        }
        if(clearOnceArr) arr = this._filterDelSame(clearOnceArr,arr);
        if(this._bo){
            this._isCheckFourClear(arr);
        }
        else {
            this._returnClearArr = arr.slice()
        }
        return  this._returnClearArr;
    },
    _filtCreatFourHeng:function(arr){
        var a =[];
        var returnArr = [];
        for(var i = 0;i< GAME_CONFIG.SHRED_NUM_W;i++){
            for(var j = 0;j< arr.length;j++){
                if(arr[j].y == i){
                    a.push(arr[j])
                }
            }
            if(a.length>0) returnArr.push(a);
            a = [];
        }
        return returnArr;
    },
    _filtCreatFourShu:function(arr){
        var a =[];
        var returnArr = [];
        for(var i = 0;i< GAME_CONFIG.SHRED_NUM_W;i++){
            for(var j = 0;j< arr.length;j++){
                if(arr[j].x == i){
                    a.push(arr[j])
                }
            }
            if(a.length>0) returnArr.push(a);
            a = [];
        }
        return returnArr;
    },
    _clearCell:function(arr){
        //播放消除一横一竖音效
        if(this._haveFourCell) cc.audioEngine.playEffect(res.hengshu,false);
        //四连消音效
        else if(this._fourCellShuArr.length>0||this._fourCellHengArr.length>0){
            cc.audioEngine.playEffect(res.fourClear,false)
        }
        //消除音效
        else{
            cc.audioEngine.playEffect(res.clear,false)
        }

        //只负责消除逻辑
        for (var index in arr) {
            var ob = arr[index];
            cc.eventManager.dispatchCustomEvent(GAME_EVENT.ANIMAL_BOMB,this.shred_arr[ob.x][ob.y]);
            this.shred_arr[ob.x][ob.y].removeFromParent(true);
            this.shred_arr[ob.x][ob.y] = null;
        }
        this._count += 1;
        this.setScore += (arr.length+this._fourCellNum)*this._count*10;
        this.deFen.setString(this.setScore);


        this._fourCellNum = 0;
        this._fourCellShuArr = [];
        this._fourCellHengArr = [];
        this._isFirstClear = false;
        this._returnClearArr = [];
        this._isTouchSpcial = false;
        this._checkFirstFourArr = [];


        this.rootNode.scheduleOnce(this._shredDown.bind(this),0.1);
    },
    /*
    * 有四消时产生魂兽
    * */
    /* _createHunShou:function(){
        var layer =  new cc.LayerColor(cc.color.WHITE);
        layer.setOpacity(200);
        layer.scale = 1/2;
        layer.setAnchorPoint(0.5,0.5);
        this.rootNode.addChild(layer,2);

        var newAnima = new Anima();
        newAnima.setPosition(layer.width/2,layer.height/2);
        layer.addChild(newAnima);
        newAnima.setScale(1);
        newAnima.runAction(cc.scaleTo(0.2,1.5));
        this.setScore += newAnima.scoreValue;
        this.deFen.setString(this.setScore);
        this.rootNode.scheduleOnce(function(){
            layer.removeFromParent(true)
        },0.5)
    },*/
    /*
     * 下落
     * */
    _shredDown:function(){
        for(var i = 0; i<GAME_CONFIG.SHRED_NUM_W; i++) {
            for(var j = GAME_CONFIG.SHRED_NUM_H-1; j>= 0; j--){
                var downNum = 0;
                if(this.shred_arr[i][j]!= null){
                    for(var k = j; k< GAME_CONFIG.SHRED_NUM_H; k++){
                        if(this.shred_arr[i][k]== null)  downNum++;
                    }
                    if(downNum!=0){
                        this.shred_arr[i][j].fallDown(downNum,this._bgwid);
                        var updataMoveend = this.shred_arr[i][j].arrayIndex;
                        this.shred_arr[updataMoveend.x][updataMoveend.y] = this.shred_arr[i][j];
                        this.shred_arr[i][j] = null;
                    }
                }
            }
        }

        this.rootNode.scheduleOnce(this._fillEmpty.bind(this),0.1)
    },

    /*
     * 消除后生成新的块补缺
     * */
    _fillEmpty:function(){
        var that = this;
        for(var i = 0; i<GAME_CONFIG.SHRED_NUM_W; i++) {
            for (var j = 0; j < GAME_CONFIG.SHRED_NUM_H; j++) {
                if (this.shred_arr[i][j] == null) {
                    var sp = new Cell();
                    this.NodeTo.addChild(sp,2);
                    this.shred_arr[i][j] = sp;
                    sp.newBorn(i,j,this._bgwid);
                }
            }
        }
        cc.log("补缺完成");
        var end = this._checkArr();
        if(end.length == 0){
            cc.log("进入稳定状态 停止");
            this._checkIsOver = false;
            this._isTouchStart = false;
            this._isFirstClear = true;
            this._count = 0;
            this._result.setArrIndex(this.shred_arr)
        }else{
            this.rootNode.scheduleOnce(function(){
                that._checkIsDown(end)
            },0.5)
        }
    },
    _setTime:function(){
        if(!this._isStartGame) return;
        this._timeCount --;
        if(this._timeCount <= 0){
            this._timeCount = 0;
            cc.log("游戏结束");
            this._isStartGame = false;
            var self = this;
            setTimeout(function(){
                cc.eventManager.dispatchCustomEvent(GAME_EVENT.OVER_STOP);
                //this.rootNode.unschedule(this._setTime);
                self.rootNode.unscheduleAllCallbacks();
                cc.director.runScene(gameRankList_scene());
            },1000);
        }
        this.shiJian.setString(this._timeCount);
    },
    /*_gameOver:function(){
        cc.eventManager.dispatchCustomEvent(GAME_EVENT.OVER_STOP);
        //this.rootNode.unschedule(this._setTime);
        this.rootNode.unscheduleAllCallbacks();

        cc.director.runScene(gameRankList_scene());
        var size = cc.winSize;
        var layer = new cc.LayerColor(cc.color.BLACK);
        layer.setOpacity(100);
        this.rootNode.addChild(layer, 2000);
        layer.x = 0;
        layer.y = 0;

        var gameOver = new cc.Sprite("res/res/gameover.png");
        gameOver.x = size.width / 2;
        gameOver.y = size.height / 2;
        gameOver.setScale(0.5);
        layer.addChild(gameOver);


        var _touchListener2 = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                return true;
            },
            onTouchEnded: function (touch, event) {
            }
        });
        cc.eventManager.addListener(_touchListener2, layer);

        gameOver.runAction(cc.sequence(cc.scaleTo(0.2,0.8), cc.delayTime(1), cc.callFunc(function () {
            cc.director.runScene(gameRankList_scene());
        })));
    },*/
    onExit:function(){
        this.removeAllChildren(true);
        cc.eventManager.removeListener(this._listener);
        cc.eventManager.removeListener(this._lis);
    }
});
