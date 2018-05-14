class SoundsMgr {
    private static bgSoundChannel:egret.SoundChannel = null;
    private static pauseTime:number = 0;

    public static playFourClear() {
        this.playMusic("fourClear_mp3");
    }

    public static playHengShu() {
        this.playMusic("hengshu_mp3");
    }

    public static clickCell() {
        this.playMusic("click_mp3");
    }

    public static playBg() {
        this.playMusic("bg_mp3");
    }
    public static stopBg() {
        this.stopMusic("bg_mp3");
    }

    public static clearCell() {
        this.playMusic("clear_mp3");
    }

    private static playMusic(v) {
        var sound:egret.Sound = RES.getRes(v.toString());
        if (sound) {
            if(v == "bg_mp3"){
                this.bgSoundChannel = sound.play(this.pauseTime, 1);
                this.bgSoundChannel.addEventListener(egret.Event.SOUND_COMPLETE, this.onComplete, this);
                
            }else{
                this.bgSoundChannel = sound.play(0, 1);
            } 
        }
    }
    
    private static onComplete(){
        this.pauseTime = 0;
        this.playBg();
    }

    private static stopMusic(v) {
        if (this.bgSoundChannel) {
            this.pauseTime = this.bgSoundChannel.position;
            this.bgSoundChannel.stop();
        }
    }
}
