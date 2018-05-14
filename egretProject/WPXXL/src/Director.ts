class Director {
    public static instance:Director = null;
    private stackLayer = [];
    //��Ϸ��,��ʵ����Main��
    private gameLayer:Main = null;

    public static getInstance() {
        if (Director.instance == null) {
            Director.instance = new Director();
        }
        return Director.instance;
    }

    public initWithMain(m:Main) {
        if (this.gameLayer == null) {
            this.gameLayer = m;
        }

    }

    // ====================ǣ����Ϸ�߼��Ĳ�����====================================
    //替换场景
    public repleaceScene(layer:egret.DisplayObject) {
        if (this.gameLayer != null && layer != null) {
            this.gameLayer.removeChildren();
            this.gameLayer.addChild(layer);
        }
    }
    //添加场景
    public pushScene(layer:egret.DisplayObject) {
        if (this.gameLayer != null && layer != null) {
            this.gameLayer.addChild(layer);
            this.stackLayer.push(layer);
        }
    }
    //移除场景
    public popScene() {
        if (this.gameLayer != null) {
            var len = this.stackLayer.length;
            if (len > 0) {
                var layer = this.stackLayer[len - 1];
                if (layer.parent == this.gameLayer) {
                    this.gameLayer.removeChild(layer)
                }
            }
        }
    }
    //移除对应名场景
    public removeScene(layer:egret.DisplayObject) {
        if (this.gameLayer != null && layer != null) {
            this.gameLayer.removeChild(layer);
            for(var i = 0;i<this.stackLayer.length;i++){
                if(layer == this.stackLayer[i]){
                    this.stackLayer.splice(i,1);
                }
            }
            
        }
    }
  
}
