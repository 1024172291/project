/**
 * 添加签名
 * 使用方法 在初始scene里  addChild(new CoderInfo())
 */
var CoderInfo = cc.Layer.extend({
    info:"触控未来 \n《空中霸王》 \n4班学员文俊辉 \nQQ 1024172291\n2016-6-28",
    ctor:function(){
        this._super()
        var imgBtn = new cc.MenuItemImage('res/icon_coder.png','res/icon_coder_down.png',this.showInfo,this)
        imgBtn.scale = 0.5
        var info_menu = new cc.Menu(imgBtn)
        this.addChild(info_menu)
        info_menu.setPosition(30, cc.winSize.height-30)
        cc.textureCache.addImage("res/CK14.png");
    },
    isShowInfo:false,
    showInfo:function(){
        if(this.isShowInfo) return
        this.isShowInfo = true
        var gradient = new cc.LayerColor(cc.color(255,222,222,200));
        this.addChild(gradient);

        var param = {}
        param.minFilter = gl.LINEAR
        param.magFilter = gl.LINEAR
        param.wrapS = gl.REPEAT
        param.wrapT = gl.REPEAT
        var tex = cc.textureCache.addImage("res/CK14.png");
        tex.setTexParameters(param)
        var sp = new cc.Sprite(tex)
        sp.setTextureRect(cc.rect(0,0,cc.winSize.width, cc.winSize.height))
        sp.setPosition(cc.winSize.width>>1,cc.winSize.height>>1)
        this.addChild(sp)

        var label = new cc.LabelTTF(this.info,"Microsoft YaHei",30)
        label.enableStroke(cc.color(0,0,0,255),2)
        label.setPosition(cc.winSize.width>>1,cc.winSize.height>>1)
        this.addChild(label)

        var closeLabel = new cc.LabelTTF("3秒后自动关闭","Microsoft YaHei",20)
        closeLabel.enableStroke(cc.color(0,0,0,255),1.5)
        closeLabel.setPosition(cc.winSize.width-closeLabel.width,closeLabel.height)
        this.addChild(closeLabel)

        var that = this
        setTimeout(function(){
            that.removeChild(sp)
            that.removeChild(gradient)
            that.removeChild(label)
            that.removeChild(closeLabel)
            that.isShowInfo = false
        },3000)
    },
})
