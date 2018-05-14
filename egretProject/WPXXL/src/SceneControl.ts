class SceneControl{
    public static createScene(sceneName){                  //添加场景
        var load = sceneName
        Director.getInstance().pushScene(load);
    }
    public static repleaScene(sceneName){
        var choose = sceneName;             //替换场景
        Director.getInstance().repleaceScene(choose);
    }
   
    
   
}
