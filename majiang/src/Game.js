var GameData = {};
var mjGetWid = null;
var mjGetHei = null;
function sortNumber(a,b)
{
    return a - b
}
var GameLayer = cc.Layer.extend({
    //保存麻将显示对象
    player_0_pais:null,
    player_1_pais:null,
    player_2_pais:null,
    //保存麻将数据
    player_0_nums:null,
    player_1_nums:null,
    player_2_nums:null,

    player1ChuPaiCount:0, //庄家出牌次数
    player2ChuPaiCount:0, //520出牌次数
    player0ChuPaiCount:0, //乱码出牌次数

    player1PengPaiCount:0, //庄家碰牌次数
    player2PengPaiCount:0, //520碰牌次数
    player0PengPaiCount:0, //乱码碰牌次数

    operCount:null,   //出牌步数
    PLAY_SPEED:1,   //回放速度
    ctor:function () {
        this._super();
        this._init();

    },
    _init:function() {
        var that = this;
        //加载JSON文件
        cc.loader.loadJson("res/20160921173000.json", function (error, data) {
            //cc.log(data); //data is the json object
            GameData = data;
            that._initGame()
        });
    },
    _initGame:function(){
        cc.spriteFrameCache.addSpriteFrames(res.maJiang_0);
        this.addChild(new PlayerInfo());

        var bg = new cc.Sprite("res/desk.png");
        bg.setAnchorPoint(0.5,0);
        bg.x = cc.winSize.width*0.5;
        bg.y = cc.winSize.width*0.4;
        bg.scale = 0.55;
        this.addChild(bg);

        this.player_0_pais = [];
        this.player_1_pais = [];
        this.player_2_pais = [];

        this.player_0_nums = GameData.opers[0].pais.sort(sortNumber);
        this.player_1_nums = GameData.opers[1].pais.sort(sortNumber);
        this.player_2_nums = GameData.opers[2].pais.sort(sortNumber);

        this.operCount = 2;
        this._createMahJong();  //添加麻将显示
        this.scheduleOnce(this._setCount,1);
    },

    //显示初始麻将
    _createMahJong:function() {
        for (var j = 0; j < 3; j++){
            for (var i = 0; i < 20; i++) {
                var mj = new MahJong(0);
                this.addChild(mj);
                mjGetWid = mj.getBoundingBox().width;
                mjGetHei = mj.getBoundingBox().height;
                switch (j) {
                    case 0:
                        mj.setPosition(cc.winSize.width*0.87,cc.winSize.height*0.3+mjGetWid*i);
                        mj.rotation = -90;
                        this.player_0_pais.push(mj);
                        break;
                    case 1:
                        mj.setPosition(cc.winSize.width * 0.21 + i * mjGetWid, cc.winSize.height * 0.25);
                        this.player_1_pais.push(mj);
                        break;
                    case 2:
                        mj.setPosition(cc.winSize.width*0.14,cc.winSize.height*0.61-mjGetWid*i);
                        mj.rotation = 90;
                        this.player_2_pais.push(mj);
                        break
                }
            }
        }
        this._showPais();
    },
    //刷新显示
    _showPais:function(){
        var arr = [this.player_0_nums, this.player_1_nums, this.player_2_nums];
        for(var i=0;i<arr.length;i++){
            for(var j=0;j<20;j++){
                this['player_'+i+'_pais'][j].setNewPaim(arr[i][j]?arr[i][j]:100);
            }
        }
    },
    //设置回合次数
    _setCount:function(){
        this.operCount++;
        if(this.operCount>= GameData.opers.length-1){
            this.operCount = GameData.opers.length-1;
            this.unschedule(this._setCount);
        }
        this._playBack();
    },

    //开始回放
    _playBack:function(){
        var self = this;
        // oper 7   pais 34 34 34    pidx 2
        var pid = GameData.opers[this.operCount].pidx;      //对应玩家
        var oper = GameData.opers[this.operCount].oper;      //对应操作
        var pai = GameData.opers[this.operCount].pais; //碰牌
        //---------测试数据--------------
        /*oper = 21
        pai = [34]*/
        //---------测试数据--------------///
        switch (oper){
            case PaiOper.CHUPAI:        //出牌
                if(this["player_"+pid+"_nums"].indexOf(pai[0]) > 0) {
                    this["player_" + pid + "_nums"][this["player_" + pid + "_nums"].indexOf(pai[0])] *= -1
                }
                setTimeout(function() {
                    self._showFold(pai[0], pid,oper);
                },this.PLAY_SPEED*1000);
                break;
            case PaiOper.PENG:           //碰
                //console.log(this["player_"+pid+"_nums"])
                var url = "res/peng.png";
                this._addSpecialSp(url);

                for(var i=0;i<pai.length;i++){
                if(this["player_"+pid+"_nums"].indexOf(pai[i]) > 0){
                    this["player_"+pid+"_nums"][this["player_"+pid+"_nums"].indexOf(pai[i])] *= -1
                }
            }
                setTimeout(function() {
                    for(var i =0;i<pai.length;i++){
                        self._showFold(pai[i], pid,oper);
                    }
                },this.PLAY_SPEED*1000);
                break;
            case PaiOper.FAPAI_2:              //起牌
                this["player_"+pid+"_nums"][14] = pai[0];
                break;
            case PaiOper.BGANG:                //补杠
                var url = "res/gang.png";
                this._addSpecialSp(url);

                for(var i=0;i<pai.length;i++){
                    if(this["player_"+pid+"_nums"].indexOf(pai[i]) > 0){
                        this["player_"+pid+"_nums"][this["player_"+pid+"_nums"].indexOf(pai[i])] *= -1
                    }
                }
                setTimeout(function() {
                    for(var i =0;i<pai.length;i++){
                        self._showFold(pai[i], pid,oper);
                    }
                },this.PLAY_SPEED*1000);
                break;
            case PaiOper.HU:                         //胡
                var url = "res/hu.png";
                this._addSpecialSp(url);
                this.unscheduleAllCallbacks();         //结束游戏
        }
        this._showAndDelPais()
    },
    _showAndDelPais:function(){
        this._showPais();
        var self = this;
        this.scheduleOnce(function(){
            var arr = [self.player_0_nums, self.player_1_nums, self.player_2_nums]
            for(var i=0;i<arr.length;i++){
                for(var j=0;j<arr[i].length;j++){
                    if(arr[i][j] < 0){
                        arr[i][j] = 100
                    }
                }
                arr[i].sort(sortNumber);
                //console.log(arr[i])
            }
            self._showPais();
            self._setCount()
        },this.PLAY_SPEED)
    },
    //显示弃牌
    _showFold:function(pai,pid,oper){
        var foldMj = new MahJong(pai);
        foldMj.qiPai();
        this.addChild(foldMj);
        if(pid ==1){
            if(oper ==PaiOper.CHUPAI){
                foldMj.setPosition(cc.winSize.width*0.3 + mjGetWid*this.player1ChuPaiCount,cc.winSize.height*0.34);
                this.player1ChuPaiCount++;
            }else if(oper == PaiOper.PENG){
                foldMj.setPosition(cc.winSize.width*0.3 + mjGetWid*this.player1PengPaiCount,cc.winSize.height*0.34-mjGetHei);
                this.player1PengPaiCount ++;
            }else if(oper == PaiOper.BGANG){
                foldMj.setPosition(cc.winSize.width*0.3 + mjGetWid*this.player1PengPaiCount,cc.winSize.height*0.34-mjGetHei);
                this.player1PengPaiCount ++;
            }
        }
        if(pid == 2){
            foldMj.rotation = 90;
            if(oper ==PaiOper.CHUPAI){
                foldMj.setPosition(cc.winSize.width*0.3,cc.winSize.height*0.57 - mjGetWid*this.player2ChuPaiCount);
                this.player2ChuPaiCount++;
            }else if(oper == PaiOper.PENG){
                foldMj.setPosition(cc.winSize.width*0.3-mjGetHei,cc.winSize.height*0.57 - mjGetWid*this.player2PengPaiCount);
                this.player2PengPaiCount ++;
            }else if(oper == PaiOper.BGANG){
                foldMj.setPosition(cc.winSize.width*0.3-mjGetHei,cc.winSize.height*0.57 - mjGetWid*this.player2PengPaiCount);
                this.player2PengPaiCount ++;
            }

        }if(pid == 0){
            foldMj.rotation = -90;
            if(oper ==PaiOper.CHUPAI){
                foldMj.setPosition(cc.winSize.width*0.7,cc.winSize.height*0.35 + mjGetWid*this.player0ChuPaiCount);
                this.player0ChuPaiCount++;
            }else if(oper == PaiOper.PENG){
                foldMj.setPosition(cc.winSize.width*0.7+mjGetHei,cc.winSize.height*0.35 + mjGetWid*this.player0PengPaiCount);
                this.player0PengPaiCount ++;
            }else if(oper == PaiOper.BGANG){
                foldMj.setPosition(cc.winSize.width*0.7+mjGetHei,cc.winSize.height*0.35 + mjGetWid*this.player0PengPaiCount);
                this.player0PengPaiCount ++;
            }

        }
    },
    //显示特效图片
    _addSpecialSp:function(url){
        var self = this;
        var pengSp = new cc.Sprite(url);
        pengSp.x = cc.winSize.width / 2;
        pengSp.y = cc.winSize.height / 2;
        pengSp.setScale(0.5);
        this.addChild(pengSp);
        pengSp.runAction(cc.sequence(cc.scaleTo(0.2,0.8), cc.delayTime(1), cc.callFunc(function () {
            pengSp.removeFromParent(true);
        })));
    },
});


var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});

