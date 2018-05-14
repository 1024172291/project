//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class LoadingUI extends egret.Sprite {

    public constructor() {
        super();
        //this.createView();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this)
        
        this.createBitmapByName("resource/res/jindutiao.png", "resource/res/wanzhengjindutiao.png", "resource/res/beijing5.jpg", "resource/res/baifenbi.png");
    }

    private onAddToStage(){
        shareConfig(title, desc, link, imgUrl);
    }

    private beijing: egret.Bitmap;
    private jindu: egret.Bitmap;
    private jinDuKuang: egret.Bitmap;
    private baiFenBi: egret.Bitmap;
    private maskRect: egret.Rectangle;

    private createBitmapByName(name1: string, name2: string, name3: string, name4: string): void {
        this.beijing = new egret.Bitmap();
        this.beijing.x = 0;
        this.beijing.y = 0;
        this.addChild(this.beijing);
        this.jinDuKuang = new egret.Bitmap();
        this.jinDuKuang.x = 55;
        this.jinDuKuang.y = 592;
        this.addChild(this.jinDuKuang);
        this.jindu = new egret.Bitmap();
        this.jindu.x = 65;
        this.jindu.y = 598;
        this.addChild(this.jindu);
        this.baiFenBi = new egret.Bitmap();
        this.baiFenBi.x = 200;
        this.baiFenBi.y = 598;
        this.addChild(this.baiFenBi);
        var self = this;
        this.maskRect = new egret.Rectangle(0, 0, 0, 24);
        this.jindu.mask = this.maskRect;//设置空的遮罩，亮条不显示
        RES.getResByUrl(name3, function (texture: egret.Texture): void {
            self.beijing.texture = texture;
        }, this, RES.ResourceItem.TYPE_IMAGE);
        RES.getResByUrl(name1, function (texture: egret.Texture): void {
            self.jinDuKuang.texture = texture;
        }, this, RES.ResourceItem.TYPE_IMAGE);
        
        RES.getResByUrl(name4, function (texture: egret.Texture): void {
            self.baiFenBi.texture = texture;
        }, this, RES.ResourceItem.TYPE_IMAGE);
        RES.getResByUrl(name2, function (texture: egret.Texture): void {
            self.jindu.texture = texture;
        }, this, RES.ResourceItem.TYPE_IMAGE);

    }

    public setProgress(current: number, total: number): void {
        //this.textField.text = `Loading...${current}/${total}`;
        var per: number = current / total;//加载的比例
        this.maskRect = new egret.Rectangle(0, 0, per * this.jindu.width, 24);//计算遮罩的大小
        this.jindu.mask = this.maskRect;
    }
}
