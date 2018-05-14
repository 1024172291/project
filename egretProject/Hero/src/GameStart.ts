class GameStart extends egret.DisplayObjectContainer{
    private map:MapUI = new MapUI();
    private loadRes:LoadRes = new LoadRes();
    private hero_attribute = new AttributeUI();
    private mneu_store = new GoodsUI();
    private goodsDate = new GoodsDate();
    private goldList : GoodsListIRSkin = new GoodsListIRSkin();
    /**角色池*/
    private RolePool_0_1: RolePool = new RolePool();
    /**首次加载角色是否已经创建完毕*/
    /**主角*/
    private Role_0_1: role = new role();
    /**主角标题*/
    private isCreateRo: boolean = false;
    private isCreateEnemy: boolean = false;
    private enemy:Enemy = new Enemy();
    private startPoint: Point = new Point();
    /**主角定时器*/
    private GameFrame: egret.Timer = new egret.Timer(100);
    /**攻击事件定时器*/
    private GongJiFrame: egret.Timer = new egret.Timer( 1000 );
    /**玩家死亡定时器 */
    private DieFrame: egret.Timer = new egret.Timer( 2000 );
    /**玩家复活定时器 */
    private FuHuoFrame: egret.Timer = new egret.Timer( 100 );
    //怪物生成定时器
    private CreateEnemyTimer: egret.Timer = new egret.Timer(3000);
    //道具生成定时器
    private CreatePropTimer :egret.Timer = new egret.Timer(10,0);
    //检测道具和玩家碰撞事件
    private gameTime: egret.Timer = new egret.Timer(1,0);
    //检测怪物和玩家的距离
    private enemyToPlayer: egret.Timer = new egret.Timer(0.01,0);
    /**把装备抛给人物装备栏定时器*/
    private OnAttToTimer: egret.Timer = new egret.Timer(0.01,0);
    private _speed:number = 0;
    
    private txtName: egret.TextField = new egret.TextField;
    private txtHp: egret.TextField = new egret.TextField;
    private txtLevel: egret.TextField = new egret.TextField;
    private txtShowResult: egret.TextField = new egret.TextField;
    private bResult: boolean = false;

    //刷新数据显示
    private ShowTimer: egret.Timer = new egret.Timer(0.1,0);
    private ShowEnemyRoTimer:egret.Timer = new egret.Timer(0.1,0);

    private showNoGoldTimer:egret.Timer = new egret.Timer(0.1,0);
    /**升级所需经验组*/
    private levelExp: any =[];

    private roleClass = RoleClass.getInstance();
    private enemyClass ;
    private enemyNameArr = ["饿狼（普通）","木乃伊（普通）","木乃伊（精英）","白虎（精英）","木乃伊（BOSS）"];
    private enemyHpArr = [20,30,50,80,120];
    private enemyAttackArr = [5,6,8,9,12];
    private enemyDefenseArr = [5,6,8,9,12];
    private enemyArr = [];
    
    public constructor(){
        super();
        //玩家道具碰撞检测

        this._speed = 5;
        this.gameTime.addEventListener(egret.TimerEvent.TIMER, this.onGameTimer, this);
        this.enemyToPlayer.addEventListener(egret.TimerEvent.TIMER, this.onEnemyToPlayer, this);
    
        this.addEventListener( egret.Event.ADDED_TO_STAGE, this.onAddToStage, this );
        this.CreateEnemyTimer.addEventListener( egret.TimerEvent.TIMER, this.CreateEnemyTimeFile, this );
        this.CreateEnemyTimer.start();
        //刷新数据显示
        this.ShowTimer.addEventListener( egret.TimerEvent.TIMER, this.ShowTimerFile, this );
        this.ShowTimer.start();
        this.ShowEnemyRoTimer.addEventListener(egret.TimerEvent.TIMER, this.ShowEnemyRoTimerFile, this )
        //道具生成,生成时间控制
        this.CreatePropTimer.addEventListener( egret.TimerEvent.TIMER, this.CreatePropTimerFile, this );
        this.CreatePropTimer.start();
        //层级定时器打开
        this.OnAttToTimer.addEventListener( egret.TimerEvent.TIMER, this.OnAttToPlayer, this );
        this.OnAttToTimer.start();

        this.showNoGoldTimer.addEventListener( egret.TimerEvent.TIMER, this.showNoGoldFile, this );
        this.showNoGoldTimer.start();

        this.addChildAt(this.hero_attribute,1000);
        this.hero_attribute.$setVisible(false);
        
        this.onGetEventFile();
        
    }

    private showNoGoldFile(){
        if(bNoGood){
            this.showResult(4);
            bNoGood = false;
        }
    }

    private onGetEventFile(){
        this.hero_attribute.addEventListener(GameEvents.TAN_CHU_ATT,()=>{
            //弹出对应装备属性界面
            this.addChild(this.goodsDate);
            isGoodsDate = true;
            console.log("辉哥无敌帅")
            
            this.hero_attribute.addEventListener(DateEvent.DATE,this.goodsDate.getDate,this.goodsDate);
            this.hero_attribute.order();
            
        },this);

        this.hero_attribute.addEventListener(GameEvents.CLOSE_GDDOS_DATE,()=>{
             if(isGoodsDate){
                this.removeChild(this.goodsDate);
                isGoodsDate = false;
             }
        },this);

        this.hero_attribute.addEventListener(GameEvents.BUY_CHONG_FU,()=>{
             this.showResult(1)
        },this);

        this.hero_attribute.addEventListener(GameEvents.BUY_CHENG_GONG,()=>{
             this.showResult(2);
        },this);


    }
    private showResult(resultNum){
        if(resultNum == 1){
            this.txtShowResult.text = "您已经购买了此道具，不能重复购买！"
            this.txtShowResult.x = 50;
            this.txtShowResult.y = 50;
            this.txtShowResult.size = 30;
            this.txtShowResult.textColor = 0xff0000;
            
        }else if(resultNum == 2){
            this.txtShowResult.text = "恭喜您成功购买此道具！"
            this.txtShowResult.x = 100;
            this.txtShowResult.y = 50;
            this.txtShowResult.size = 30;
            this.txtShowResult.textColor = 0xff0000;
            
        }else if(resultNum == 3){
            this.txtShowResult.text = "恭喜您升级了！"
            this.txtShowResult.x = 100;
            this.txtShowResult.y = 100
            this.txtShowResult.size = 50;
            this.txtShowResult.textColor = 0xff0000;
        }
        else if(resultNum == 4){
            this.txtShowResult.text = "金币不足，无法购买！"
            this.txtShowResult.x = 100;
            this.txtShowResult.y = 50
            this.txtShowResult.size = 30;
            this.txtShowResult.textColor = 0xff0000;
        }
        else if(resultNum == 5){
            this.txtShowResult.text = "很遗憾，游戏结束！"
            this.txtShowResult.x = 100;
            this.txtShowResult.y = 100
            this.txtShowResult.size = 40;
            this.txtShowResult.textColor = 0xff0000;
        }
        this.txtShowResult.width = 400;
        this.txtShowResult.height = 200;
        if(!this.bResult){
            this.addChildAt(this.txtShowResult,10000);
            this.bResult = true;
        }
        this.txtShowResult.$setVisible(true);
        setTimeout(()=>{
            this.txtShowResult.$setVisible(false);
        },3000)
    }

    private attToPlayer(){
        this.goldList.addEventListener(DateEvent.DATE,this.hero_attribute.getDate,this.hero_attribute);
        this.goldList.order();
        isAttToPlayer = false;
    }

    private OnAttToPlayer(){
        //抛出武器给人物属性界面
        if(isAttToPlayer)
             this.attToPlayer();
    }

    private onAddToStage(event: egret.Event){
        //人物初始属性
        this.roleClass.attack = 20;
        this.roleClass.defense = 10;
        this.roleClass.gold = 0;
        this.roleClass.hp = this.roleClass.maxHp;
        //升级所需经验
        for(var index = 1;index<=100;index++){
            var temp = index*index*10;
            this.levelExp.push(temp);
        }

        this.removeEventListener( egret.Event.ADDED_TO_STAGE, this.onAddToStage, this );
        //添加 主角走动 的定时器
        this.GameFrame.addEventListener( egret.TimerEvent.TIMER, this.onGameFrame, this );
        this.GameFrame.start();
        //添加 攻击事件 的定时器
        this.GongJiFrame.addEventListener( egret.TimerEvent.TIMER, this.onGongJiFrame, this );
        //添加 复活事件 的定时器
        this.FuHuoFrame.addEventListener( egret.TimerEvent.TIMER, this.onFuHuoFrame, this );
        //添加 死亡事件 的定时器
        this.DieFrame.addEventListener( egret.TimerEvent.TIMER, this.onDieFrame, this );
        var Group:string;
        this.addChild(this.loadRes);
        this.addChild(this.map);


        this.map.addEventListener(GameEvents.ADD_ATT,()=>{
            this.hero_attribute.x = 70;
            this.hero_attribute.y = 180;
            this.hero_attribute.$setVisible(true);
            isAddAtt = true;
        },this);

        this.map.addEventListener(GameEvents.ADD_MENU,()=>{
            this.addChildAt(this.mneu_store,1001);
            isAddMenu = true;
        },this);

        
    }
    //刷新数据显示
    private ShowTimerFile(){
         lvExp = this.levelExp[ this.roleClass.level - 1 ] ;//升级所需经验
         this.map.refreshDisplay();
         if(gameType)this.CreatePropTimer.delay = Math.random()*20000+(10000+this.roleClass.level*2000)
         else this.CreatePropTimer.delay = Math.random()*10000+10000;   
           
    }
    //刷新怪物标题坐标
    private ShowEnemyRoTimerFile(){
         this.txtName.x = this.enemy.x;
         this.txtName.y = this.enemy.y;
         this.txtHp.x = this.enemy.x-30;
         this.txtHp.y = this.enemy.y-20;
         this.txtLevel.x = this.enemy.x+40;
         this.txtLevel.y = this.enemy.y-20;  
    }

    private onGameFrame( e: egret.Event ){
        this.tiaozheng( 1 );
        this.enemyToPlayer.start();
    }
    private onEnemyToPlayer(){
        if(this.enemyArr.length>0){
            this.enemyArr[0].anchorOffsetX = 0;
            var rect1:egret.Rectangle = this.Role_0_1.getBounds();//获取显示对象的测量边界
            var rect2:egret.Rectangle = this.enemyArr[0].getBounds();
            rect1.x = this.Role_0_1.x;
            rect1.y = this.Role_0_1.y;
            rect2.x = this.enemyArr[0].x;
            rect2.y = this.enemyArr[0].y;
            var distance = rect2.x - rect1.x;
            if(distance<150){
                this.GameFrame.stop();
                this.enemyToPlayer.stop();
                this.GongJiFrame.start();
            }
        }
    }

    private onGongJiFrame( e: egret.Event ){
         for(var index in this.enemyArr){
             var mo = this.enemyArr[index]
             mo.isGameTimer(false);
         }
         this.CreateEnemyTimer.stop();
         
        if(this.enemyClass.hp>0){

            this.tiaozheng( 2 );
            
            this.map.isGameTimer(false);
            for(var index in this.enemyArr){
                var mo = this.enemyArr[index]
                mo.isGameTimer(false);
            }
            this.CreateEnemyTimer.stop();
             
            //判断攻击动作是否到最后一帧，如果是则走下面
            if(isPlayOver){
                isPlayOver = false;
                if(this.roleClass.attack>this.enemyClass.defense){
                    this.enemyClass.hp -= (this.roleClass.attack - this.enemyClass.defense);
                }else{
                    this.enemyClass.hp -= 1;
                }
                
                if(this.enemyClass.attack>this.roleClass.defense){
                    this.roleClass.hp -=(this.enemyClass.attack - this.roleClass.defense);
                }else{
                    this.roleClass.hp -= 1;
                }
              
                 if(this.enemyClass.hp < 0 ) {
                    this.enemyClass.hp = 0;
                 }
                 if(this.roleClass.hp <= 0){
                     this.roleClass.hp = 0;
                     this.GongJiFrame.stop();
                     this.tiaozheng(3);
                     this.DieFrame.start();  //玩家死亡
                 }
                 this.txtHp.text = "Hp:" + this.enemyClass.hp;  
            }      
        }
         if(this.enemyClass.hp == 0){  
                //攻击停止，移除怪物 
                this.GongJiFrame.stop();
                if(this.enemyArr[0] != undefined && this.enemyArr[0] != null){
                    this.removeChild(this.enemyArr[0]);
                }
               
                if(this.txtHp != undefined && this.txtHp != null){
                    //this.removeChild(this.txtHp);
                    this.txtHp.$setVisible(false);
                }
                if(this.txtName != undefined && this.txtName != null){
                    //this.removeChild(this.txtName);
                    this.txtName.$setVisible(false);
                }
                if(this.txtLevel != undefined && this.txtLevel != null){
                    //this.removeChild(this.txtLevel);
                    this.txtLevel.$setVisible(false);
                 }
                this.enemyArr.shift();
                this.roleClass.gold += this.enemyClass.gold;
                this.roleClass.score+= this.enemyClass.score;

                if(!isNaN( lvExp )){
                    this.roleClass.exp += this.enemyClass.exp;
                    this.map.levelBar.value = this.roleClass.exp/lvExp*this.map.levelBar.maximum;
                    //是否满足升级条件
                    if ( this.roleClass.exp >= lvExp &&this.roleClass.level<this.levelExp.length){
                        this.roleClass.level += 1;
                        this.roleClass.attack += this.roleClass.level*2;//攻击提升
                        this.roleClass.defense +=this.roleClass.level*2;//防御提升
                        this.roleClass.maxHp += this.roleClass.level*5;
                        this.roleClass.hp = this.roleClass.maxHp;
                        this.roleClass.maxMp += this.roleClass.level*5;
                        this.roleClass.mp = this.roleClass.maxMp;
                        this.roleClass.exp = 0;
                        this.map.levelBar.value = this.roleClass.exp/lvExp*this.map.levelBar.maximum;
                        this.showResult(3);
                    }
                    if(this.roleClass.level==this.levelExp.length){
                        this.roleClass.level==this.levelExp.length;
                    }
                }
                this.CreateEnemyTimer.start();
                this.map.isGameTimer(true);
                this.GameFrame.start();
                if(this.enemyArr.length>0){
                    this.enemyArr[0].isGameTimer(true);
                    this.enemyClass.hp = this.enemyClass.maxHp 
                } 
             }
    }

    private onDieFrame(e: egret.Event){
        if(isDie){
           isDie = false;
           if(gameType){
               this.tiaozheng(4);
               this.FuHuoFrame.start();
               this.DieFrame.stop();
           }else{
               //alert("游戏结束");
               this.showResult(5);
               //this.parent.addChild(new InitSceneUI());
               this.DieFrame.stop();
               this.gameTime.stop();
               this.CreateEnemyTimer.stop();
               this.CreatePropTimer.stop();
               this.ShowTimer.stop();
               setTimeout(()=>{
                  this.parent.addChild(new InitSceneUI());
                  this.parent.removeChild(this); 
               },3000)
           }
        }
    }
    
    private onFuHuoFrame(e: egret.Event){
        if(isResurGence){
            isResurGence = false;
            this.roleClass.hp = this.roleClass.maxHp;
            this.GongJiFrame.start();
            this.FuHuoFrame.stop();
        }
    }
    private type:number = 0;
    private prop;
    
    private CreatePropTimerFile(){
        var propX = this.width*0.1;
        var propY = this.height*0.5;
        this.type = parseInt(Math.random()*3+1+"");
        this.prop = new Props(propX,propY,GameData["prop"+this.type]);
        this.addChild(this.prop);
        this.gameTime.start();
        this.setChildIndex( this.prop, this.getChildIndex(this) );
        if(isAddAtt)this.setChildIndex( this.hero_attribute,  this.getChildIndex(this.prop));
        if(isAddMenu)this.setChildIndex( this.mneu_store, this.getChildIndex(this.prop));

    }
    
     private onGameTimer (){
        this.prop.y += this._speed;
         
        var rect1:egret.Rectangle = this.Role_0_1.getBounds();//获取显示对象的测量边界
        var rect2:egret.Rectangle = this.prop.getBounds();
        rect1.x = this.Role_0_1.x;
        rect1.y = 650;
        rect2.x = this.prop.x;
        rect2.y = this.prop.y;
        if(rect1.intersects(rect2)){
             this.removeChild(this.prop);
             this.gameTime.stop();
             if(this.type == 1 ){
                  this.roleClass.gold += 100;
             }else if(this.type == 2){
                  this.map.hpProsNum +=1;
             }else{
                  this.map.mpProsNum +=1;
             }
        }
    }

    //刷新每种怪物的坐标 
    private CreateEnemyTimeFile(){
        var type:number = 0;
        var temp = Math.random();
        
        if(temp<=0.3) type = 1;
        else if(temp>0.3&&temp<=0.6) type = 2;
        else if(temp>0.6&&temp<=0.8) type = 3;
        else if(temp>0.8&&temp<=0.95) type = 4;
        else type = 5;
        
        this.enemy = new CreateEnemy().getRole(1,1,4,100,true,type);
        if(type == 1){
            this.enemy.x = this.width*0.4;
            this.enemy.y = this.height-this.map.hei-this.enemy.height-this.enemy.height/2;
        }else if(type == 2||type == 3){
            this.enemy.x = this.width*0.4;
            this.enemy.y = this.height-this.map.hei-this.enemy.height - 25;
        }else if(type == 4){
            this.enemy.x = this.width*0.4;
            this.enemy.y = this.height-this.map.hei-this.enemy.height*2 + 6;
        }else if(type == 5){
            this.enemy.x = this.width*0.4;
            this.enemy.y = this.height-this.map.hei-this.enemy.height-3;
        }
    
        this.enemy.isGameTimer(true);
        this.addChild(this.enemy);
        this.enemyArr.push(this.enemy)
        //this.CreateEnemyTimer.delay = 1000+Math.random()*3000;
        
        
        this.enemyClass = EnemyClass.getInstance();
        //this.enemyClass = new EnemyClass();
        if(!this.isCreateEnemy){
            this.isCreateEnemy = true;
        }
        this.moAttribute(type);
        if(isAddAtt)this.setChildIndex( this.hero_attribute, this.numChildren);
        if(isAddMenu)this.setChildIndex( this.mneu_store, this.numChildren);
    }     

     //刷新怪物数据
    private moAttribute(type){
        this.enemyClass.name = this.enemyNameArr[type-1];
        this.enemyClass.level = this.roleClass.level;
        this.enemyClass.maxHp = this.enemyHpArr[type-1]*this.enemyClass.level;
        this.enemyClass.hp = this.enemyClass.maxHp;
        this.enemyClass.attack = this.enemyAttackArr[type-1]*this.enemyClass.level;
        this.enemyClass.defense = this.enemyDefenseArr[type-1]*this.enemyClass.level;//怪物的防御 
        this.enemyClass.exp = this.enemyClass.level*5*type;    //怪物死亡给的经验值
        this.enemyClass.gold = this.enemyClass.level*10*type;
        this.enemyClass.score = this.enemyClass.level*100*type;
        
        
        this.txtName.text = this.enemyClass.name+"";
        this.txtHp.text = "Hp:"+this.enemyClass.hp;
        this.txtLevel.text = "Lv:"+this.enemyClass.level;

        this.txtName.width = 160;
        this.txtName.height = 22;
        this.txtHp.width = 140;
        this.txtHp.height = 22;
        this.txtLevel.width = 140;
        this.txtLevel.height = 22;

        this.txtName.size = 18;
        this.txtName.textAlign = "center";
        this.txtHp.size = 18;
        this.txtHp.textAlign = "center";
        this.txtLevel.size = 18;
        this.txtLevel.textAlign = "center";

        this.addChild(this.txtHp);
        this.addChild(this.txtName);
        this.addChild(this.txtLevel);
        this.ShowEnemyRoTimer.start();
        this.txtHp.$setVisible(true);
        this.txtName.$setVisible(true);
        this.txtLevel.$setVisible(true);
        
    }
   
       

    private tiaozheng( n: number ): void
    {
        var J: Point = new Point();
        //先判断 是否已有 对象 显示到舞台
        if ( this.isCreateRo )
        {
            this.Role_0_1.isTimer( false );//从 舞台 删除前，先停止 对象里的 定时器
            this.removeChild( this.Role_0_1 );//清除显示
            J.x = this.Role_0_1.x;
            J.y = this.Role_0_1.y;
        } else
        {
            J.x = this.startPoint.x;
            J.y = this.startPoint.y;
        }
        switch(n){
        
            //跑
            case 1:
                this.Role_0_1 = this.RolePool_0_1.getRole( 1, 1, 8, 100, true );//key ,起始帧，帧数，帧间隔(毫秒)
                this.Role_0_1.x = this.width*0.1;
                this.Role_0_1.y = this.height-this.map.hei;    
                this.addChild( this.Role_0_1);
                break;
            //攻击
            case 2:
                this.Role_0_1 = this.RolePool_0_1.getRole( 2, 10, 10, 100, true );//key ,起始帧，帧数，帧间隔(毫秒)
                this.Role_0_1.x = this.width*0.1;
                this.Role_0_1.y = this.height-this.map.hei;
                this.addChild( this.Role_0_1 );
                break;
            //死亡
            case 3:
                this.Role_0_1 = this.RolePool_0_1.getRole( 3, 20, 5, 200, false );//key ,起始帧，帧数，帧间隔(毫秒)
                this.Role_0_1.x = this.width*0.1;
                this.Role_0_1.y = this.height-this.map.hei;
                this.addChild( this.Role_0_1 );
                break;
            //复活
            case 4:
                this.Role_0_1 = this.RolePool_0_1.getRole( 4, 25, 8, 200, false );//key ,起始帧，帧数，帧间隔(毫秒)
                this.Role_0_1.x = this.width*0.1;
                this.Role_0_1.y = this.height-this.map.hei;
                this.addChild( this.Role_0_1 );
                break;
         }
         if(isAddAtt)this.setChildIndex( this.hero_attribute, this.numChildren);
         if(isAddMenu)this.setChildIndex( this.mneu_store, this.numChildren);
         if ( !this.isCreateRo )
        {
            this.isCreateRo = true;
        }
     } 
}