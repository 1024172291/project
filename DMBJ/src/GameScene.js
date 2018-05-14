var gameLayer;
gameScene_create = function () {
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
    //计量
    countTime: 0,
    stageTime: 0,
    enemyTime: 0,
    readyTime: 0,

    //各类敌人总量
    enemy0Count: 0,
    enemy1Count: 0,
    enemy2Count: 0,
    enemy3Count: 0,
    enemy4Count: 0,

    enemyDieCount: 0,
    maxTime: 40,
    readShu: 3,
    goodEnemyCount: 0,
    badEnemyCount: 0,
    stage: 0,
    score: 0,

    enemyDieC:0,
    //逻辑变量
    isGameStart: false,
    isGameReady: false,

    //数组
    appearEnemy: null,
    enemy: null,
    enemyDie: null,
    onDidLoadFromCCB: function () {
        var size = cc.winSize;

        //静态变量
        gameLayer = this;

        //加载资源
        cc.spriteFrameCache.addSpriteFrames("res/res/daomubiji.plist");

        //计时器
        this.rootNode.onUpdate = function (dt) {
            this.controller.updateTime(dt);
        };
        this.rootNode.schedule(this.rootNode.onUpdate);

    },
    _init: function () {
        this.initShuzu(gameTutorial.nandu);
        this.initData();
        this.initRule();
        this.initUi();
        this.initMusic();
    },
    initMusic:function(){
            var size=cc.winSize;
            //静音按钮
            var checkBox = new ccui.CheckBox();
            checkBox.setTouchEnabled(true);
            checkBox.loadTextures("yinyue.png","guanyinyue.png","guanyinyue.png","guanyinyue.png","guanyinyue.png",ccui.Widget.PLIST_TEXTURE);
            checkBox.setPosition(size.width*0.92,size.height-40);
            checkBox.addEventListener(this._selectedStateEvent, this);
            this.rootNode.addChild(checkBox);
            checkBox.setSelected(!MUSIC.isCanPlay);
    },

    _selectedStateEvent:function(sender,type){
        switch (type) {
            case  ccui.CheckBox.EVENT_UNSELECTED:
                MUSIC.isCanPlay=true;
                if(bg)
                    bg.play();
                break;
            case ccui.CheckBox.EVENT_SELECTED:
                MUSIC.isCanPlay=false;
                if(bg)
                    bg.pause();
                break;
            default:
                break;
        }
    },
    updateTime: function (dt) {
        if (!this.isGameReady) {
            return;
        }

        if (!this.isGameStart) {
            this.readyTime += dt;
            if (this.readyTime > 0.95) {
                this.readyTime = 0;
                this.addReadyLabel();
            }
            //一秒执行一次addReadyLabel方法，添加等待动画

            this.countTime += dt;
            if (this.countTime > 3) {
                //this.addReadyLabel();
                this.countTime = 0;
                this.isGameStart = true;
            }
            return;
        }
        //3秒之后不再执行addReadyLabel方法，关闭等待动画

        this.countTime += dt;
        this.stageTime += dt;
        this.enemyTime += dt;

        //等待动画的倒计时
        this.readyTime += dt;
        if (this.readyTime > 1) {
            this.readyTime = 0;
            this.maxTime--;
            this.timeLabel.setString(this.maxTime);
        }
        //cc.log("stageTime:"+this.stageTime,"countTime:"+this.countTime);
        if (this.stageTime > 10) {
            //时间到了
            if (this.countTime >= 40) {
                this.gameOver();
                return;
            }

            this.stageTime = 0;
            this.stage++;

        }

        var enemyCount = this.appearEnemy.length, maxEnemy = MAX_ENEMY[this.stage];
        if (enemyCount < maxEnemy && this.enemyTime >intervalTime[this.stage]) {
            //cc.log("enemyTime:"+this.enemyTime)
            this.enemyTime = 0;
            var randomCount = Math.floor(Math.random() * (maxEnemy + 1 - enemyCount));
            for (var i = 0; i < randomCount; i++) {
                var type = this.limitType();
                var enemy = this.createEnemy(type);
                this.appearEnemy.push(enemy);

            }
        }
    },
    initShuzu: function (nandu) {
        this.appearEnemy = [];
        switch (nandu) {
            case 0:
            {
                this.enemy = ENEMY.XG;
                this.enemyDie = ENEMY_DIE.XG;
            }
                break;
            case 1:
            {
                this.enemy = ENEMY.AN;
                this.enemyDie = ENEMY_DIE.AN;
            }
                break;
            case 2:
            {
                this.enemy = ENEMY.PZ;
                this.enemyDie = ENEMY_DIE.PZ;
            }
                break;
            case 3:
            {
                this.enemy = ENEMY.TZ;
                this.enemyDie = ENEMY_DIE.TZ;
            }
                break;
            default :
                break;
        }
    },
    initData: function () {
    },
    initRule: function () {
        var node = gameRule_create();
        this.rootNode.addChild(node, 2000);
    },
    initUi: function () {
        this.timeLabel.setString(this.maxTime);
        this.scoreLabel.setString("0");
        this.touxiang.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("touxiang" + (gameTutorial.nandu + 1) + ".png"));
    },


    calculateEnemy: function (type) {

    },
    limitType: function () {
        var type = parseInt(Math.random() * MAX_ENEMY_TYPE[this.stage]);
        this["enemy"+type+"Count"]++;
        var self = this;
        //控制微票儿出现次数
       /* var isTypeLegal = function (self, type) {
            if(type === 4) {
                if (self.enemy4Count  > 3) {
                    return false
                }
            }
            return true;

        };

        while (!isTypeLegal(self, type)) {
            type = parseInt(Math.random() * MAX_ENEMY_TYPE[this.stage]);
            isTypeLegal(self, type);
        }*/

        return type;
    },
    limitScore: function () {
        if (gameLayer.score < 0) {
            gameLayer.score = 0;
        }
    },

    isEnemyExist: function (row, col) {
        for (var i = 0; i < this.appearEnemy.length; i++) {
            var enemy = this.appearEnemy[i];
            if (enemy.row == row && enemy.col == col) {
                return true;
            }
        }
        return false;
    },

    //读秒
    addReadyLabel: function () {
        var readLabel1 = this.jiShi;
        //readLabel.setZOrder(100)
        var readLabel = this.daoJishi;
        readLabel1.setVisible(true);
        readLabel.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("zhu_pia.png"));
        if (this.readShu > 0) {
            readLabel.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("zhu_"+this.readShu + ".png"));
        }
        readLabel.setScale(0.6);
        var scaleto = cc.scaleTo(0.2, 1);
        var xiaoxi = cc.callFunc(function () {
            readLabel1.setVisible(false);
        });
        readLabel.runAction(cc.sequence(scaleto,cc.delayTime(0.2), xiaoxi));
        this.readShu--;
    },
    //生成敌方小怪
    createEnemy: function (type) {
        var count = Math.floor(Math.random() * 9 + 1);
        var col = Math.floor((count - 1) / 3);
        var row = count - 3 * col;
        while (this.isEnemyExist(row, col)) {
            count = Math.floor(Math.random() * 9 + 1);
            col = Math.floor((count - 1) / 3);
            row = count - 3 * col;
        }
        var enemy = new Enemy(type, row, col);
        enemy.x = this["bg" + count].x;
        enemy.y = this["bg" + count].y;
        enemy.setAnchorPoint(0.5,0.5);
        this.baseLayer.addChild(enemy);
        return enemy;
    },


    gameOver: function () {
        var size = cc.winSize;
        this.timeLabel.setString(0);
        this.rootNode.unschedule(this.rootNode.onUpdate);

        //弹出层
        var layer = new cc.LayerColor(cc.color.BLACK);
        layer.setOpacity(100);
        this.rootNode.addChild(layer, 2000);
        layer.x = 0;
        layer.y = 0;

        var gameOver = new cc.Sprite("#over.png");
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
            cc.director.runScene(gameOverScene_scene());
        })));
    }

});

