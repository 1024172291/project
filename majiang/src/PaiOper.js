var PaiOper = {

/// <summary>
/// 发手牌
/// </summary>
    FAPAI : 36,

/// <summary>
/// 过
/// </summary>
    GUO : 1,

/// <summary>
/// 换牌
/// </summary>
    HUANPAI : 2,

/// <summary>
/// 打牌
/// </summary>
    CHUPAI : 3,

/// <summary>
/// 吃牌1 如：[x]yz
/// </summary>
    CHI_L : 4,

/// <summary>
/// 吃牌2 如：x[y]z
/// </summary>
    CHI_M : 5,

/// <summary>
/// 吃牌3 如：xy[z]
/// </summary>
    CHI_R : 6,

/// <summary>
/// 碰
/// </summary>
    PENG : 7,

/// <summary>
/// 明杠
/// </summary>
    MGANG : 8,

/// <summary>
/// 补杠
/// </summary>
    BGANG : 9,

/// <summary>
/// 暗杠
/// </summary>
    AGANG : 10,

/// <summary>
/// 皮子杠
/// </summary>
    PIZIG : 11,

/// <summary>
/// 赖子杠
/// </summary>
    LAIZIG : 12,

/// <summary>
/// 补花
/// </summary>
    BUHUA : 13,


/// <summary>
/// 亮倒
/// </summary>
    LIANGDAO : 14,

/// <summary>
/// 胡牌
/// </summary>
    HU : 16,

/// <summary>
/// 诈胡
/// </summary>
    ZHAHU : 17,

/// <summary>
/// 海底捞发牌
/// </summary>
    HAIDILAO : 18,

/// <summary>
/// 定缺
/// </summary>
    DINGQUE : 19,

/// <summary>
/// 通知庄家打牌
/// </summary>
    DAPAI_FIR : 20,

/// <summary>
/// 正常发牌
/// </summary>
    FAPAI_2 : 21,

/// <summary>
/// 算分
/// </summary>
    SUANFEN : 22,

/// <summary>
/// 查花猪
/// </summary>
    CHAHUAZHU : 23,

/// <summary>
/// 翻宝牌
/// </summary>
    BAOPAI : 24,

/// <summary>
/// 查听
/// </summary>
    CTING : 30,
//添加一个翻赖子的操作
    FanlanZiOver : null,
//添加一个询问服务器是否能胡的操作
    AskHu : null,
/// <summary>
/// 空操作
/// </summary>
    NULL : null,
 }