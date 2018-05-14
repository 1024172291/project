var BulletLayer = cc.Layer.extend({
    _shredArr:null, //子弹数组
    _listener:null,
    _lis:null,
    ctor: function () {
        this._super();
        this._init()
    },
    _init:function(){
        this._shredArr = [];
        this._lis = cc.eventManager.addCustomListener(GAME_EVENT.PLANE_FIRE,this._makeBullet.bind(this));
        //接收飞机传来的坐标生成子弹
        //this._listener = cc.eventManager.addCustomListener(GAME_EVENT.ENEMY_PLANE_UPDATE,this._checkRect.bind(this));
        //接收敌机传来的事件及敌机自身，检查与子弹的碰撞情况
    },
    _makeBullet:function(event){
        var pos = event.getUserData();
        var sp = new BulletSprite();
        sp.setPosition(pos.x,pos.y);
        this.addChild(sp);
        this._shredArr.push(sp);
    },
   /*
    *检查碰撞，当碰撞时把子弹和敌机存在一个数组里，遍历数组，消除子弹，并且把敌机抛给敌机管理层进行消除处理
    * */
    /*_checkRect:function(event){
        var clearArr = [];
        var enemy = event.getUserData();              //获得敌机的数据
        for (var index in this._shredArr){
             var ob = this._shredArr[index];
             var zdbox  = ob.getBoundingBox();
             var enemybox = enemy.getBox();
             //cc.eventManager.dispatchCustomEvent(DEBUG_SHOW_ME_RECT, [zdbox,cc.color.RED])
             //cc.eventManager.dispatchCustomEvent(DEBUG_SHOW_ME_RECT, [enemybox,cc.color.RED])
            if(cc.rectIntersectsRect(zdbox, enemybox)){
                /!*ob.removeFromParent(true);
                enemy.removeFromParent(true);
                this._shredArr.splice(this._shredArr.indexOf(ob),1);*!/
                clearArr.push(ob,enemy)
            }
        }
        for(var sed in clearArr){
            var clear = clearArr[sed];
            switch (clear.type){
                case 1:
                    clear.removeFromParent(true);
                    this._shredArr.splice(this._shredArr.indexOf(clear),1);
                    break;
                case 2:
                   cc.eventManager.dispatchCustomEvent(GAME_EVENT.ENEMY_DIE,clear)
                    break;
            }
        }
    },*/
    onExit:function(){
        this.removeAllChildren(true);
        cc.eventManager.removeListener(this._lis);
        //cc.eventManager.removeListener(this._listener);
    }
});
