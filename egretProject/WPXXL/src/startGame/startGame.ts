//declare function wxRZ();
var wxArr = [];
class startGame extends eui.Component {
    private totalGroup: eui.Group;
    private _bgwid: number = 0;

    private shred_arr = [];
    private _fourCellHengArr = [];
    private _fourCellShuArr = [];
    private _checkFirstFourArr = [];       //检查第一次产生的特殊块保存起来进行处理
    private _returnClearArr;               //返回所有消除的块
    private _booFirstArr = [];             //第一次产生的特殊块不消除时进行保存的数组


    private cell: Cell = new Cell();
    private _firstSp = null;                //第一次点击
    private _checkIsOver: Boolean = false;  //检查是否为稳定状态
    private _isTouchStart: Boolean = false; //判断是否为第一次点击
    private _haveFourCell: Boolean = false; //判断有无四消
    //private _isStartGame: Boolean = false;  //判断游戏开始
    private _fourCellNum: number = 0;       //生成四消块的数量
    private _count: number = 0;             //计算点击一次消除块的次数
    private _bo: Boolean = true;            //判断检查消除数组里面有没有特殊块
    private _isFirstClear: Boolean = true;  //判断是第一次点击还是掉落状态
    private _isTouchSpcial: Boolean = false;//判断第一次点击交换的块是不是特殊块
    private _boo: Boolean = false;          //判断第一次产生的特殊块需不需要消除
    private _timeCount: number = 60;         //设置倒计时
    private setScore: number = 0;            //设置得分
    //倒计时
    private countTimeLabel: eui.BitmapLabel;
    private countTimer: egret.Timer = new egret.Timer(1000, 0);
    private addEvtCount: egret.Timer = new egret.Timer(1, 0);
    //分数
    private scoreLabel: eui.BitmapLabel;

    private playerName: eui.Label;
    private touXiang: eui.Group;

    constructor() {
        super();
        this.addChild(new PlayMusic());
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "src/startGame/startGameUI.exml";
    }

    private imgLoadHandler(evt: egret.Event) {
        var loader: egret.ImageLoader = evt.currentTarget;
        var bmd: egret.BitmapData = loader.data;
        var bmp: egret.Bitmap = new egret.Bitmap(bmd);
        this.touXiang.addChild(bmp);
        bmp.width = this.touXiang.width;
        bmp.height = this.touXiang.height;
    }

    //皮肤加载完成
    private uiCompHandler() {
        //var arr = wxRZ();
        //wxArr = arr;
        // if (wxArr[1]) this.playerName.text = wxArr[1];
        // if (wxArr[2]) {
        //     var imgLoader: egret.ImageLoader = new egret.ImageLoader;
        //     imgLoader.once(egret.Event.COMPLETE, this.imgLoadHandler, this);
        //     imgLoader.load(wxArr[2]);
        // }



        this.countTimeLabel.text = this._timeCount + "";
        this.scoreLabel.text = this.setScore + "";

        this.countTimer.addEventListener(egret.TimerEvent.TIMER, this.oncountFrameFile, this);
        var rule = new GameRule();
        this.addEvtCount.addEventListener(egret.TimerEvent.TIMER, () => {
            if (_isStartGame) {
                this.countTimer.start();
                this.addEvtCount.stop();
            }
        }, this);
        this.addEvtCount.start();

        var bg: egret.Bitmap = new egret.Bitmap();
        bg = GameVoid.createBitmapByName("gamebiankuang_png");
        this.totalGroup.addChild(bg);
        this.shred_arr = Creat2X2Arr(GAME_CONFIG.SHRED_NUM_W, GAME_CONFIG.SHRED_NUM_H, 1);
        this._bgwid = GAME_CONFIG.BG_BOX_WIDTH / GAME_CONFIG.SHRED_NUM_W;
        for (var i = 0; i < GAME_CONFIG.SHRED_NUM_W; i++) {
            for (var j = 0; j < GAME_CONFIG.SHRED_NUM_H; j++) {
                this.cell = new Cell();
                this.totalGroup.addChild(this.cell);
                this.cell.x = i * this._bgwid + 13;
                this.cell.y = j * this._bgwid + 10;
                this.shred_arr[i][j] = this.cell;
                this.cell.setArrIndex(i, j);
                this.cell.addEventListener(GameEvents.TOUCH_START, this.onStart, this);
            }
        }
        this.totalGroup.setChildIndex(bg, this.totalGroup.numChildren);


        this.cell.addEventListener(GameEvents.CELL_ADD_OVER, this._changeArr, this);

    }
    //如果有相同颜色3个相连块，重置类型
    private _changeArr() {
        var arr = this._checkArr();
        if (arr.length > 0) {
            for (var index in arr) {
                var ob = arr[index];
                this.shred_arr[ob[0]][ob[1]].changeType()
            }
            this._changeArr();
        } else {
            console.log("没有相连的3个相同颜色块了");
            //   for(var i = 0; i<GAME_CONFIG.SHRED_NUM_W; i++) {
            //         for (var j = 0; j < GAME_CONFIG.SHRED_NUM_H; j++) {
            //             this.shred_arr[i][j].changeType();
            //         }
            //     }
            //     this._changeArr();
            RES.removeEventListener(GameEvents.CELL_ADD_OVER, this._changeArr, this);
        }
    }

    /*
   * 检查相同颜色的块3个相连，返回数组
   * */
    private _checkArr() {
        var returnArr = [];
        for (var i = 0; i < GAME_CONFIG.SHRED_NUM_W; i++) {
            for (var j = 0; j < GAME_CONFIG.SHRED_NUM_H; j++) {
                if (i < GAME_CONFIG.SHRED_NUM_W - 2 &&
                    this.shred_arr[i][j].type == this.shred_arr[i + 1][j].type &&
                    this.shred_arr[i + 1][j].type == this.shred_arr[i + 2][j].type
                ) {
                    returnArr.push([i, j], [i + 1, j], [i + 2, j]);
                }
                if (j < GAME_CONFIG.SHRED_NUM_W - 2 &&
                    this.shred_arr[i][j].type == this.shred_arr[i][j + 1].type &&
                    this.shred_arr[i][j + 1].type == this.shred_arr[i][j + 2].type
                ) {
                    returnArr.push([i, j], [i, j + 1], [i, j + 2]);
                }
                if (i < GAME_CONFIG.SHRED_NUM_W - 3 && this._isTouchStart &&
                    this.shred_arr[i][j].type == this.shred_arr[i + 1][j].type &&
                    this.shred_arr[i + 1][j].type == this.shred_arr[i + 2][j].type &&
                    this.shred_arr[i + 2][j].type == this.shred_arr[i + 3][j].type) {
                    this._fourCellHengArr.push([i, j], [i + 1, j], [i + 2, j], [i + 3, j]);
                }
                if (j < GAME_CONFIG.SHRED_NUM_W - 3 && this._isTouchStart &&
                    this.shred_arr[i][j].type == this.shred_arr[i][j + 1].type &&
                    this.shred_arr[i][j + 1].type == this.shred_arr[i][j + 2].type &&
                    this.shred_arr[i][j + 2].type == this.shred_arr[i][j + 3].type
                ) {
                    this._fourCellShuArr.push([i, j], [i, j + 1], [i, j + 2], [i, j + 3]);
                }
            }
        }
        var arr = [];
        returnArr = HandleDelSameCell.filterDelSame(returnArr, arr);
        this._fourCellShuArr = HandleDelSameCell.filterDelSame(this._fourCellShuArr, arr);
        this._fourCellHengArr = HandleDelSameCell.filterDelSame(this._fourCellHengArr, arr);
        return returnArr;
    }

    //开始点击
    private onStart() {
        this._isTouchStart = true;  //点击开始;
        var targetSp = touchCellArr;
        touchCellArr = [];
        console.log("当前点击块", targetSp[0], targetSp[1])
        if (this._checkIsOver) return;
        if (this._firstSp == null) {
            this.changeAphla(targetSp);
            this._firstSp = targetSp;
        } else {
            if (this._firstSp == targetSp) {
                this.resetAphla();
                this._firstSp = null;
                return
            }
            if ((targetSp[0] == this._firstSp[0] || targetSp[1] == this._firstSp[1]) &&
                Math.abs(targetSp[0] - this._firstSp[0] + targetSp[1] - this._firstSp[1]) == 1
            ) {
                this._checkIsOver = true;
                this._changePos(this._firstSp, targetSp, true);
                this.resetAphla();
                this._firstSp = null;
            } else {
                this.resetAphla();
                this._firstSp = targetSp;
                this.changeAphla(targetSp);
            }
        }
    }

    //给当前点击的块添加特效
    private touchCellSp = new egret.Bitmap;
    private changeAphla(cell) {
        this.touchCellSp.texture = RES.getRes("kuang_png")
        this.touchCellSp.x = this.shred_arr[cell[0]][cell[1]].x;
        this.touchCellSp.y = this.shred_arr[cell[0]][cell[1]].y;
        this.totalGroup.addChild(this.touchCellSp);
    }

    //如果当前点击的块是已经选中的块，取消特效
    private resetAphla() {
        this.totalGroup.removeChild(this.touchCellSp);
    }

    //两块交换
    private _changePos(old, tar, endCheck) {
        var shred1 = new egret.Bitmap(), shred2 = new egret.Bitmap(), temp = new egret.Bitmap();

        shred1 = this.shred_arr[old[0]][old[1]];
        shred2 = this.shred_arr[tar[0]][tar[1]];
        this.shred_arr[old[0]][old[1]].movePosition(shred2, tar);
        this.shred_arr[tar[0]][tar[1]].movePosition(shred1, old);

        temp = this.shred_arr[old[0]][old[1]];
        this.shred_arr[old[0]][old[1]] = this.shred_arr[tar[0]][tar[1]];
        this.shred_arr[tar[0]][tar[1]] = temp;


        if (endCheck) {
            var that = this;
            egret.setTimeout(function () {
                var end = that._checkArr();
                if (end.length == 0) {
                    that._changePos(tar, old, false);
                    that._checkIsOver = false;
                } else {
                    that._checkIsDown(end, tar, old)
                    console.log("可以消除")
                }
            }, this, 300)
        }
    }
    private _checkFourArr(tar, old) {
        var returnArr = [];
        for (var indexArr in this._fourCellShuArr) {
            var ob = this._fourCellShuArr[indexArr];
            if ((ob[0] == old[0] && ob[1] == old[1]) || (ob[0] == tar[0] && ob[1] == tar[1])) {
                console.log("生成消除横着一条的方块", ob[0], ob[1]);
                this.shred_arr[ob[0]][ob[1]].setToSpecial(1);
                this._fourCellNum++;
                returnArr.push(ob);
            }
        }
        for (var indexArr2 in this._fourCellHengArr) {
            var obj = this._fourCellHengArr[indexArr2];
            if ((obj[0] == old[0] && obj[1] == old[1]) || (obj[0] == tar[0] && obj[1] == tar[1])) {
                console.log("生成消除竖着一条的方块", obj[0], obj[1]);
                this.shred_arr[obj[0]][obj[1]].setToSpecial(2);
                this._fourCellNum++;
                returnArr.push(obj);
            }
        }
        return returnArr;
    }

    private _checkIsState(arr) {
        var returnArr = [];
        for (var indexArr in this._fourCellShuArr) {
            var ob = this._fourCellShuArr[indexArr];
            if (ob[0] == arr[0] && ob[1] == arr[1]) {
                console.log("生成消除横着一条的方块", ob[0], ob[1]);
                this.shred_arr[ob[0]][ob[1]].setToSpecial(1);
                this._fourCellNum++;
                returnArr.push(ob)
            }
        }

        for (var indexArr2 in this._fourCellHengArr) {
            var obj = this._fourCellHengArr[indexArr2];
            if (obj[0] == arr[0] && obj[1] == arr[1]) {
                console.log("生成消除竖着一条的方块", obj[0], obj[1]);
                this.shred_arr[obj[0]][obj[1]].setToSpecial(2);
                this._fourCellNum++;
                returnArr.push(obj)
            }
        }
        return returnArr;
    }

    //开始对消除的块进行处理
    private _checkIsDown(arr, tar, old) {
        this._haveFourCell = false;
        var temp;
        if (this._isFirstClear) {
            for (var arrIndex in arr) {
                var ob = arr[arrIndex];
                if (ob[0] == tar[0] && ob[1] == tar[1]) {
                    temp = tar;
                } else if (ob[0] == old[0] && ob[1] == old[1]) {
                    temp = old;
                }
            }
            if (arr.length >= 4 && this.shred_arr[temp[0]][temp[1]].isSpecial) {
                if (this._fourCellShuArr.length > 0 || this._fourCellHengArr.length > 0) {
                    this._isTouchSpcial = true;
                }
            } else {
                for (var arrIn in arr) {
                    var obj = arr[arrIn];
                    if ((obj[0] == tar[0] && obj[1] == tar[1] && (this._fourCellHengArr.length > 0 || this._fourCellShuArr.length > 0)) ||
                        (obj[0] == old[0]) && (obj[1] == old[1]) && (this._fourCellHengArr.length > 0 || this._fourCellShuArr.length > 0)) {
                        var spSpecialArr = this._checkFourArr(tar, old);
                    }
                }
                if (spSpecialArr) {
                    arr = HandleDelSameCell.filterDeleteSame(arr, spSpecialArr);
                    this._checkFirstFourArr.push(spSpecialArr);
                }
            }
        } else {
            if (this._fourCellHengArr.length > 0) {
                var arrFo = HandleDelSameCell.filtCreatFourHeng(this._fourCellHengArr);
                for (var i = 0; i < arrFo.length; i++) {
                    for (var j = 0; j < arrFo[i].length; j++) {
                        if (!this.shred_arr[arrFo[i][j][0]][arrFo[i][j][1]].isSpecial) {
                            var spSpecialArr2 = this._checkIsState(arrFo[i][j]);
                            if (spSpecialArr2) {
                                arr = HandleDelSameCell.filterDeleteSame(arr, spSpecialArr2);
                                this._checkFirstFourArr.push(spSpecialArr2);
                            }
                            break;
                        }
                    }
                }

            } if (this._fourCellShuArr.length > 0) {
                var arrFord = HandleDelSameCell.filtCreatFourShu(this._fourCellShuArr);
                for (var k = 0; k < arrFord.length; k++) {
                    for (var l = 0; l < arrFord[k].length; l++) {
                        if (!this.shred_arr[arrFord[k][l][0]][arrFord[k][l][1]].isSpecial) {
                            var SpecialArr = this._checkIsState(arrFord[k][l]);
                            if (SpecialArr) {
                                arr = HandleDelSameCell.filterDeleteSame(arr, SpecialArr);
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
        if (this._isTouchSpcial) {
            arr = HandleDelSameCell.filterDeleteSame(arr, temp);
            if (this._fourCellShuArr.length > 0) {
                this.shred_arr[temp[0]][temp[1]].setToSpecial(1);
                this._fourCellNum++;
            } else {
                this.shred_arr[temp[0]][temp[1]].setToSpecial(2);
                this._fourCellNum++;
            }
        }
        this._clearCell(arr);
    }

    private _isCheckFourClear(arr): void {
        this._boo = false;
        this._bo = false;
        var clearOnceArr = [];
        for (var arrIndex in arr) {
            var obj = arr[arrIndex];
            if (this._checkFirstFourArr.length > 0) {
                for (var firstArrIndex in this._checkFirstFourArr) {
                    var checkFirst = this._checkFirstFourArr[firstArrIndex];
                    if (obj[0] == checkFirst[0][0] && obj[1] == checkFirst[0][1]) {
                        this._boo = true;
                        this._booFirstArr.push(obj);
                    }
                }
            }
        }
        if (this._boo) {
            arr = HandleDelSameCell.filterDeleteSame(arr, this._booFirstArr);
            this._booFirstArr = [];
        }
        for (var arrIndex2 in arr) {
            var ob = arr[arrIndex2];
            if (this.shred_arr[ob[0]][ob[1]].isSpecial) {  //判断是不是特效块
                this._bo = true;
                this.shred_arr[ob[0]][ob[1]].resetSpecal();
                if (this.shred_arr[ob[0]][ob[1]].isCreatType == 1) {
                    this._haveFourCell = true;
                    for (var k = 0; k < GAME_CONFIG.SHRED_NUM_W; k++) {
                        clearOnceArr.push([k, ob[1]])
                    }
                } else {

                    this._haveFourCell = true;
                    for (var l = 0; l < GAME_CONFIG.SHRED_NUM_W; l++) {
                        clearOnceArr.push([ob[0], l])
                    }
                }
            }
        }
        if (clearOnceArr) arr = HandleDelSameCell.filterDelSame(clearOnceArr, arr);
        if (this._bo) {
            this._isCheckFourClear(arr);
        }
        else {
            this._returnClearArr = arr.slice()

        }
        return this._returnClearArr;
    }
    private anim: Animation = new Animation();
    private animPool: AnimPool = new AnimPool();
    //消除
    private _clearCell(arr): void {
        //播放消除一横一竖音效
        if (this._haveFourCell) SoundsMgr.playHengShu();
        //四连消音效
        else if (this._fourCellShuArr.length > 0 || this._fourCellHengArr.length > 0) {
            SoundsMgr.playFourClear();
        }
        //消除音效
        else {
            SoundsMgr.clearCell();
        }


        for (var arrIndex in arr) {
            var ob = arr[arrIndex];
           
            //添加消除特效
            this.anim = this.animPool.getRole(1, 6, 100, 1);
            this.anim.x = this.shred_arr[ob[0]][ob[1]].x + 25;
            this.anim.y = this.shred_arr[ob[0]][ob[1]].y + 29;
            this.totalGroup.addChild(this.anim);

            this.totalGroup.removeChild(this.shred_arr[ob[0]][ob[1]]);
            this.shred_arr[ob[0]][ob[1]] = null;
        }

        this._count += 1;
        this.setScore += (arr.length + this._fourCellNum) * this._count * 10;
        this.scoreLabel.text = this.setScore + "";

        this._fourCellNum = 0;
        this._fourCellShuArr = [];
        this._fourCellHengArr = [];
        this._isFirstClear = false;
        this._returnClearArr = [];
        this._isTouchSpcial = false;
        this._checkFirstFourArr = [];

        var that = this;
        egret.setTimeout(function () {
            that._shredDown();
        }, this, 100)
    }

    //消除后开始下落
    private _shredDown() {
        for (var i = 0; i < GAME_CONFIG.SHRED_NUM_W; i++) {
            for (var j = GAME_CONFIG.SHRED_NUM_H - 1; j >= 0; j--) {
                var downNum: number = 0;
                if (this.shred_arr[i][j] != null) {
                    for (var k = j; k < GAME_CONFIG.SHRED_NUM_H; k++) {
                        if (this.shred_arr[i][k] == null) downNum++;
                    }
                    if (downNum != 0) {
                        this.shred_arr[i][j].fallDown(downNum, this._bgwid);
                        var updataMoveend = this.shred_arr[i][j].arrayIndex;
                        this.shred_arr[updataMoveend[0]][updataMoveend[1]] = this.shred_arr[i][j];
                        this.shred_arr[i][j] = null;
                    }
                }
            }
        }
        var that = this;
        egret.setTimeout(function () {
            that._fillEmpty();
        }, this, 100)
    }

    /*
     * 消除后生成新的块补缺
     * */
    private _fillEmpty(): void {
        var that = this;
        for (var i = 0; i < GAME_CONFIG.SHRED_NUM_W; i++) {
            for (var j = 0; j < GAME_CONFIG.SHRED_NUM_H; j++) {
                if (this.shred_arr[i][j] == null) {
                    var sp = new Cell();
                    this.totalGroup.addChild(sp);
                    this.shred_arr[i][j] = sp;
                    sp.newBorn(i, j, this._bgwid);
                    sp.setArrIndex(i, j);
                    sp.addEventListener(GameEvents.TOUCH_START, this.onStart, this);
                }
            }
        }
        console.log("补缺完成");
        var end = this._checkArr();
        if (end.length == 0) {
            console.log("进入稳定状态 停止");
            this._checkIsOver = false;
            this._isTouchStart = false;
            this._isFirstClear = true;
            this._count = 0;
            //this._result.setArrIndex(this.shred_arr)
        } else {
            var a = [], b = [];
            egret.setTimeout(function () {
                that._checkIsDown(end, a, b)
            }, this, 500)
        }
    }
    //倒计时
    private oncountFrameFile() {
        this._timeCount--;
        if (this._timeCount <= 0) {
            this._timeCount = 0;
            this.countTimer.stop();
            _isStartGame = false;
            this._checkIsOver = true;
            var that = this;
            GamePlayer.score = this.setScore;
            egret.setTimeout(function () {
                var rank = new Rank();
                SceneControl.createScene(rank);
            }, this, 1000)
        }
        this.countTimeLabel.text = this._timeCount + "";
    }
}    
