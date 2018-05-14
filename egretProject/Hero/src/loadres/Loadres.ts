/**
 * Created by Administrator on 2015/5/26.
 */

class LoadRes extends egret.Sprite {
    /**加载进度界面*/
    private loadingView: LoadingUI = new LoadingUI();
    private Group_Zu: string[] = [];//储存 已加载的 组名字
    private Zu: string[] = [];//等待加载
    private isJZ: boolean = false;//是否正在加载
    private timer: egret.Timer = new egret.Timer(1000 / 1);
    public constructor() {
        super();
    }
    public onAddToStage(Group: string): void {
        console.warn("加载:" + Group);
        if (this.isGroup(Group))
        {
            //如果已经加载过 组，就跳过
        } else
        {
            if (!this.timer.running)
            {
                this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
                this.timer.start();
            }
            this.Zu.push(Group);
        }
    }

    private onTimer(e: egret.TimerEvent) {

        if (this.isJZ)
        {
            return;
        } else
        {
            if (this.Zu.length > 0)
            {
                this.addChild(this.loadingView);
                this.isJZ = true;
                RES.setMaxLoadingThread(5);//设置最大加载线程
                RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                RES.loadGroup(this.Zu[0]);
            } else
            {
                this.timer.stop();
                this.timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
                this.dispatchEvent(new egret.Event("stopRes"));//派发全部加载完毕事件
            }
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent): void {
        //TODO
        console.warn("加载失败Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event: RES.ResourceEvent): void {
        this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        //console.warn("加载进度Group:" + event.groupName  + "  " +  event.itemsLoaded + "/" + event.itemsTotal);
    }
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        this.loadingView.setProgress(0, 0);
        this.removeChild(this.loadingView);
        //这里。。
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        this.Group_Zu.push(event.groupName);//保存 组名字
        
        
        console.warn("加载完成:" + event.groupName);
        this.dispatchEvent(new egret.Event(event.groupName));
        this.Zu.splice(0, 1);
        this.isJZ = false;
    }

    //查询是否已加载过 组
    private isGroup(name: string): boolean {
        var index: number = 0;
        var isRo: boolean = false;
        for (index; index < this.Group_Zu.length; index++)
        {
            if (name == this.Group_Zu[index])
            {
                isRo = true;
                break;
            }
        }
        return isRo;
    }
}