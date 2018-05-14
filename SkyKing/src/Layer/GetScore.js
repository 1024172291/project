var TARGET_SCORE = 0;
var GetScoreLayer = cc.Layer.extend({
    _madeScore:null,
    _hp:null,             //我方飞机生命
    _labelHp:null,
    _labelScore:null,
    _listener:null,
    _lis:null,
    _listener_1:null,
    _key:null,
    ctor: function () {
        this._super();
        this._init()
    },
    _init: function () {
        var is = cc.sys.localStorage;
        var data = is.getItem("key_");
        TARGET_SCORE = data;
        //添加分数
        this._madeScore = 0;
        var that = this;
        this._lis = cc.eventManager.addCustomListener(GAME_EVENT.PROPS_ADD_SCORE,function(event){
            var data = event.getUserData();
            that._madeScore = parseInt(data)+parseInt(that._madeScore);
            that._labelScore.setString("SCORE :"+"  " +that._madeScore);
            that._setHighScore()
        });

        this._labelScore = new cc.LabelBMFont("",res.mikado_fnt);
        this._labelScore.setPosition(cc.winSize.width>>1,cc.winSize.height*0.95);
        this._labelScore.scale = 1/2;
        this._labelScore.setString("SCORE :"+"  " +this._madeScore);
        this.addChild(this._labelScore);

        cc.eventManager.addCustomListener(GAME_EVENT.ADD_SCORE, this._setScore.bind(this));
        this._hp = GAME_CONFIG.MY_PLANE_HP;
        var sp = new cc.Sprite("res/myPlane_4.png");
        sp.setPosition(cc.winSize.width*0.1,cc.winSize.height*0.95);
        this.addChild(sp);

        this._labelHp = new cc.LabelBMFont("",res.mikado_fnt);
        this._labelHp.setPosition(cc.winSize.width*0.15,cc.winSize.height*0.95);
        this._labelHp.scale = 1/2;
        this._labelHp.setString("x"+" "+this._hp);
        this.addChild(this._labelHp);

        this._listener = cc.eventManager.addCustomListener(GAME_EVENT.PLANE_AGAIN,this._changeHp.bind(this));
        //接收飞机死亡时传来的事件更改飞机的生命值

        this._listener_1= cc.eventManager.addCustomListener(GAME_EVENT.SET_HIGH_SCORE,this._setHighScore.bind(this));
    },
    _setHighScore:function(){
        if(TARGET_SCORE < this._madeScore){
            TARGET_SCORE = this._madeScore;
            var key = "key_";
            var is = cc.sys.localStorage;
            is.setItem(key,TARGET_SCORE);
        }
    },
    _setScore:function(event){
        var data = event.getUserData();
        this._madeScore += data;
        this._labelScore.setString("SCORE :"+"  " +this._madeScore);
        this._setHighScore()
    },
    _changeHp:function(){
        if(this._hp == 0) return;
        this._hp --;
        this._labelHp.setString("x"+" "+this._hp);
    },
    onExit:function(){
        cc.eventManager.removeCustomListeners(GAME_EVENT.ADD_SCORE);
        this.removeAllChildren(true);
        cc.eventManager.removeListener(this._lis);
        cc.eventManager.removeListener(this._listener);
        cc.eventManager.removeListener(this._listener_1)
    }
});
