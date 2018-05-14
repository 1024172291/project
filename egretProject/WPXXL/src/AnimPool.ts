class AnimPool extends egret.Sprite{
    private Anim_Zu:AnimPool[];
    public constructor() {
        super();
        this.Anim_Zu = [];
    }
    /**起始帧，帧数，帧间隔(毫秒),播放次数*/
    public getRole(step:number,step2:number,step3:number,ci:number):Animation{
        var newAnim = new Animation();
        newAnim.startRole(step ,step2 ,ci);
        return newAnim;
    }
}