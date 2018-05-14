var GAME_EVENT = {
    PLANE_FIRE :"plane_fire",   //我方飞机抛给子弹自身坐标的事件名
    GIVE_ENEMY_BULLET:"give_enemy_bullet",//我放飞机抛给敌方子弹事件名
    ENEMY_PLANE_UPDATE:"en_emy_plane", //敌机抛出自身给子弹进行碰撞检测的事件名
    ENEMY_DIE:"en_emy_die",  //子弹方抛出需要消除的敌机给敌机层进行消除的事件名
    ENEMY_PLANE_1:"en_emy_plane_1",//敌机抛出自身给子弹进行碰撞检测的事件名
    ENEMY_PLANE_FILE:'en_emy_file', //敌机抛出坐标给敌方子弹管理层生成子弹
    ADD_SCORE :'add_score',           //敌机死亡获得分数
    PLANE_BOMB:"plane_bomb",         //飞机爆炸效果
    PLANE_AGAIN:"plane_again",          //飞机死亡时抛出的事件更改飞机的生命显示
    PROPS_ADD_SCORE:"props_add_score",  //捡到道具时加分事件
    PLANE_PROPS_RECT:"plane_props_rect", //飞机和道具碰撞时发出的事件
    GAME_OVER:"game_over",                 //游戏结束时发出的事件
    BULLET_BEHIT_BOSS:"bullet_behit_boss", //子弹打中boss发出的事件
    ENEMY_BOSS_UPDATE:"enemy_boss_update",  //boss发送事件生成子弹
    PLANE_BOSS_RECT:"plane_boss_rect",    //我方飞机和boss碰撞
    PLANE_PK_BOSS_DIE:"plane_pk_boss_die", //飞机被boss击毁
    BOSS_BOOM_ANIMATION:"boos_boom_animation", //boss爆炸抛出事件增加动画
    GAME_WIN:"game_win",                      //游戏胜利
    SET_HIGH_SCORE:"set_high_score",       //存取最高分数
    GET_HIGH_SCORE:"get_high_score"        //获取最高分数
};
var GAME_CONFIG = {
    BULLET_NUM:0.3,                    //子弹生成速度
    BULLET_NUM_1:1,                   //我方子弹飞行速度
    ENEMY_PLANE_NUM:1,               //敌方飞机生成速度
    ENEMY_PLANE_NUM1:5,              //敌方飞机飞行速度
    ENEMY_BULLET_NUM:1,              //敌方子弹生成速度
    ENEMY_BULLET_NUM_1:5,           //敌方子弹飞行速度
    MY_PLANE_Fade:0.5,               //显影的执行时间
    MY_PLANE_HP:2,                   //我方飞机生命值
    PLANE_WUDI_TIME:3,              //无敌时间
    STAR_PROP_TIME:10,              //道具刷新时间
    ENEMY_BOSS_HP:100,              //boss血量
    ENEMY_BOSS_SPEED:2 ,           //BOSS 移动速度
    STAR_PROP_SPEED:3,             //道具移动速度
    ENEMY_BOSS_BULLET_FLY_SPEED:3, //BOSS子弹飞行速度
    ENEMY_BOSS_BULLET_SPEED:0.01,  //BOSS生成子弹速度
    BOSS_DIE_GIVE_SCORE:1000       //BOSS死亡获得分数
};
var GameLayer = cc.Layer.extend({
    _myPlane:null, //飞机
    _bullet:null,  //子弹
    _enEmyPlane:null,//敌方飞机
    _enEmyBullet:null,//敌方子弹
    _addScore:null,       //返回按钮
    _texture:null,   //游戏背景图片
    _animation:null,  //爆炸效果
    _props:null,       //游戏道具
    _over:null,       //游戏结束
    _boss:null,       //敌方BOSS
    ctor:function () {
        this._super();
        this._init();
    },
    _init:function(){
        this._texture = new BachGroundSprite(res.bjSp);
        this.addChild(this._texture);
        //添加背景图片
        this._enEmyBullet = new EnEmyBulletLayer();
        this.addChild(this._enEmyBullet);
        //添加敌方子弹层
        this._enEmyPlane = new EnEmyPlaneLayer();
        this.addChild(this._enEmyPlane);
        //添加敌机层
        /*this._boss = new EnEmyBossSprite();
        this.addChild(this._boss);*/
        this._bullet = new BulletLayer();
        this.addChild(this._bullet);
        //添加子弹层
        this._myPlane = new MyPlaneLayer();
        this.addChild(this._myPlane);
        //添加我方飞机层
        this._addScore = new GetScoreLayer();
        this.addChild(this._addScore);
        //添加分数
        this._animation = new AnimationSprite();
        this.addChild(this._animation);
        //添加爆炸效果
        this._props = new GamePropsLayer();
        this.addChild(this._props );
        //添加游戏道具
        this._over = new GameOverLayer();
        this.addChild(this._over);
        //添加游戏结束
        var label = new cc.LabelBMFont("Back", res.mikado_fnt);
        var item = new cc.MenuItemLabel(label, function(){
            cc.director.popScene();
        }, this);
        item.setPosition(200, 450);
        var menu_font = new cc.Menu(item);
        this.addChild(menu_font);
    },
    onExit:function(){
        this.removeAllChildren(true);
    }
});
var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
        var info = new CoderInfo();
        this.addChild(info);
    }
});
