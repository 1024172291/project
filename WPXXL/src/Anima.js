var Anima = cc.Sprite.extend({
    type:null,
    _urlArr:null,
    scoreValue:null,
    ctor: function () {
        this._super();
        this._init();
    },
    _init: function () {
        this._urlArr = [res.anima_1,res.anima_2,res.anima_3];

        if(Math.random() <= 0.5){
            this.type =  this._urlArr[0];
            this.scoreValue = 10;
        }else if(Math.random() <= 0.8){
            this.type =  this._urlArr[1];
            this.scoreValue = 20;
        }else{
            this.type =  this._urlArr[2];
            this.scoreValue = 30;
        }
        this.initWithFile(this.type);
    }
});