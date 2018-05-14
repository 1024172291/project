var PlayerInfo = cc.Layer.extend({
    zhuangPlayer:null,
    beiPlayer:null,
    nanPlayer:null,
    ctor:function () {
        this._super();
        this._init();
    },
    _init:function(){
        this.zhuangPlayer = new cc.LabelTTF(GameData.name[1],"",20);
        this.zhuangPlayer.setPosition(cc.winSize.width*0.5,cc.winSize.height*0.2);
        this.addChild(this.zhuangPlayer,100);

        this.beiPlayer = new cc.LabelTTF(GameData.name[2],"",20);
        this.beiPlayer.setPosition(cc.winSize.width*0.04,cc.winSize.height*0.45);
        this.beiPlayer.rotation = 90;
        this.addChild(this.beiPlayer,100);

        this.nanPlayer = new cc.LabelTTF(GameData.name[0],"",20);
        this.nanPlayer.setPosition(cc.winSize.width*0.95,cc.winSize.height*0.45);
        this.nanPlayer.rotation = -90;
        this.addChild(this.nanPlayer,100);

        this.matchNameLab = new cc.LabelTTF(GameData.MatchName,"",40);
        this.matchNameLab.setPosition(cc.winSize.width*0.5,cc.winSize.height*0.85);
        this.addChild(this.matchNameLab,100);

        this.pnameLab = new cc.LabelTTF(GameData.pname,"",40);
        this.pnameLab.setPosition(cc.winSize.width*0.5,cc.winSize.height*0.78);
        this.addChild(this.pnameLab,100);
    }
});
