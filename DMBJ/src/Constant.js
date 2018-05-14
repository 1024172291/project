var MUSIC={
    isCanPlay:true
}
var ENEMY=
{
	XG:["zhu_guaiwu3","zhu_ganrao1","zhu_ganrao6","zhu_ganrao5"],
	AN:["zhu_guaiwu1","zhu_ganrao6","zhu_ganrao4","zhu_ganrao11"],
	PZ:["zhu_guaiwu2","zhu_ganrao8","zhu_ganrao6","zhu_ganrao7"],
	TZ:["zhu_guaiwu4","zhu_ganrao10","zhu_ganrao4","zhu_ganrao7"],
	img:["zhu_guaiwu33","zhu_guaiwu11","zhu_guaiwu22","zhu_guaiwu44"],
	img2:["defen_shiao","defen_houzi","defen_jingpo","defen_huli"]
}

var ENEMY_DIE=
{
		LGX:["zz2","js2"],
		ZJC:["zz2","js2"],
		TGER:["zz2","js2"],
		LXQ:["zz2","js2"],
}

var existTime=[1.2,0.9,0.6,0.6];           //怪物存活时间
var intervalTime=[0.8,0.5,0.2,0.2];       //怪物刷新时间

var fanpaiSudu=0.1;

var FRONT_WIDTH=220;
var BACK_WIDTH=340;

var MAX_ENEMY=[8,9,9,9];               //怪物出现最多的数量
var MAX_ENEMY_TYPE=[4,4,4,4];         //怪物出现类型
var MAX_SINGLE_GOOD_ENEMY=[3,5,9,11];
var MAX_BAD_ENEMY=[2,3,4,5];