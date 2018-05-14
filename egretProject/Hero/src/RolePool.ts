/**
 * Created by Administrator on 2015/5/22.
 * 对象池？？？哈哈
 */
class RolePool extends egret.Sprite{
    private Ro_Zu:role[];

    public constructor() {
        super();
        this.Ro_Zu = [];
    }
    /**key ,起始帧，帧数，帧间隔(毫秒),是否循环播放*/
    public getRole(key:number,step:number,step2:number ,time:number ,ci:boolean):role{
        var index:number = 0;
        var isRole:boolean = false;
        for(index;index < this.Ro_Zu.length;index ++){
            if(key == this.Ro_Zu[index].key){
                isRole = true;
                break;
            }
        }
        if(isRole){
            //console.log("调试输出：池对象" + key.toString());//调试
            this.Ro_Zu[index].isTimer(true);//使用 对象 前，先 启动 对象里的 定时器
            if ( !ci )
            {
                this.Ro_Zu[index].setIndex();//如果不是循环播放，先复位到第一帧
            }
            return this.Ro_Zu[index];
        }else{
            //console.log("调试输出：新对象" + key.toString());//调试
            var newRo = new role();
            newRo.setTimer(time);
            newRo.isTimer(true);//使用 对象 前，先 启动 对象里的 定时器
            newRo.startRole(key,step ,step2 ,ci)
            newRo.key = key;
            this.Ro_Zu.push(newRo);
            return newRo;
        }
        
    }
}