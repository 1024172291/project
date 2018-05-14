class PlayMusic extends eui.Component {
     private play_music:eui.CheckBox;
     constructor() {
        super();
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this); 
        this.skinName = "src/music/playMusicUI.exml";   
     }

     private uiCompHandler(){
        this.play_music.addEventListener(egret.Event.CHANGE,this.onChange,this);
        this.play_music.$setSelected(!MUSIC.isCanPlay)
     } 

     private onChange(event:egret.TouchEvent){
        if(this.play_music.selected){ 
            SoundsMgr.stopBg();
            MUSIC.isCanPlay = false;
        }else{
            SoundsMgr.playBg();
            MUSIC.isCanPlay = true;
        }
    } 
}