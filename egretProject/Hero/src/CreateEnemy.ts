class CreateEnemy extends egret.Sprite {
   
    private enemy_Zu:Enemy[];

    public constructor() {
        super();
        this.enemy_Zu = [];
    }
    /**key ,起始帧，帧数，帧间隔(毫秒),是否循环播放*/
    public getRole(key:number,step:number,step2:number ,time:number ,ci:boolean,type:number):Enemy{
        var index:number = 0;
        var isRole:boolean = false;
        for(index;index < this.enemy_Zu.length;index ++){
            if(key == this.enemy_Zu[index].key){
                isRole = true;
                break;
            }
        }
        if(isRole){
            //console.log("调试输出：池对象" + key.toString());//调试
            this.enemy_Zu[index].isTimer(true);//使用 对象 前，先 启动 对象里的 定时器
            if ( !ci )
            {
                this.enemy_Zu[index].setIndex();//如果不是循环播放，先复位到第一帧
            }
            return this.enemy_Zu[index];
        }else{
            //console.log("调试输出：新对象" + key.toString());//调试
            var newRo = new Enemy();
            newRo.setTimer(time);
            newRo.isTimer(true);//使用 对象 前，先 启动 对象里的 定时器
            newRo.startRole(step ,step2 ,ci,type)
            newRo.key = key;
            this.enemy_Zu.push(newRo);
            return newRo;
        }
        
    }
}