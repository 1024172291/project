var EnemyDate = {
    enemyPlane_1:{
         pic:"res/enemyPlane_1.png",
         hp:3
     },
    enemyPlane_2:{
         pic:"res/enemyPlane_2.png",
         hp:2
     },
    enemyPlane_3:{
        pic:"res/enemyPlane_3.png",
        hp:1
    }
};
var EnEmyPlaneSprite = cc.Sprite.extend({
    type:2,
    enemyDate:null,
    hpTarget:null,
    _lis:null,
    ctor: function (type) {
        this.enemyDate = EnemyDate["enemyPlane_"+ type];
        this._super(this.enemyDate.pic);
        this._init();
    },
    _init: function () {
        this.hpTarget = this.enemyDate.hp;
        var move = cc.moveTo(GAME_CONFIG.ENEMY_PLANE_NUM1,cc.p(cc.winSize.width*Math.random(),-100));
        //敌机移动动作
        this.runAction(cc.sequence(move,cc.callFunc(this._removeEnEmyPlane,this)));
        //敌机移动到屏幕外后移除掉
        this.scheduleUpdate();
        var that = this;
        this.schedule(function(){cc.eventManager.dispatchCustomEvent(GAME_EVENT.ENEMY_PLANE_FILE,that.getPosition())},GAME_CONFIG.ENEMY_BULLET_NUM,cc.REPEAT_FOREVER);
        this._lis = cc.eventManager.addCustomListener(GAME_EVENT.GIVE_ENEMY_BULLET,this._checkIsRect.bind(this));
    },
    update:function(){
        if(this.y>cc.winSize.height)  return;
        cc.eventManager.dispatchCustomEvent(GAME_EVENT.ENEMY_PLANE_UPDATE,this);
        //敌机抛出事件和它本身
    },
    _checkIsRect:function(event){
        var myplane = event.getUserData();
        var rect1 = myplane.getBound();
        var rect2 = this.getBox();
        //cc.eventManager.dispatchCustomEvent(DEBUG_SHOW_ME_RECT, [rect1,cc.color.RED]);
        //cc.eventManager.dispatchCustomEvent(DEBUG_SHOW_ME_RECT, [rect2,cc.color.RED]);
        if(cc.rectIntersectsRect(rect1, rect2)){
            this.removeFromParent(true);
            myplane.beHit();
        }
    },
    /*
    * 设置敌机碰撞检测的框体
    * */
    getBox:function(){
        var widths = this.width/4;
        var heights = this.height/4;
        return cc.rect(this.x-widths,this.y-heights,this.width/2,this.height/2)
    },
    _removeEnEmyPlane:function(target){
        target.removeFromParent(true)
    },
    hpReduce:function(){
        if(this.hpTarget == 1){
            this.removeFromParent(true);
            cc.eventManager.dispatchCustomEvent(GAME_EVENT.PLANE_BOMB,this.getPosition());
            cc.eventManager.dispatchCustomEvent(GAME_EVENT.ADD_SCORE,this.enemyDate.hp*10);
            //敌机死亡抛出事件和对应敌机的分数
        }
        else this.hpTarget--;
    },

    onExit:function(){
        cc.eventManager.removeListener(this._lis);
        this.removeAllChildren(true);
    }
});