cc.Class({
    extends: cc.Component,

    properties: {
        addCoinBtn : {
            default : null,
            type : cc.Sprite,
            displayName : "增加金币按钮",
            tooltip : "用于玩家进行金币的增加"
        },
        addDiamondBtn : {
            default : null,
            type : cc.Sprite,
            displayName : "购买钻石按钮",
            tooltip : "用于玩家进行钻石的购买"
        },
        addPowerBtn : {
            default : null,
            type : cc.Sprite,
            displayName : "增加体力按钮",
            tooltip : "用于玩家进行体力的增加"
        },
        settingBtn : {
            default : null,
            type : cc.Sprite,
            displayName : "设置按钮",
            tooltip : "用于玩家进行相关设置"
        },
        diamondCount : {
            default : null,
            type : cc.Label,
            displayName : "钻石数量",
            tooltip : "用于对钻石总数量的统计"
        },
        coinCount : {
            default : null,
            type : cc.Label,
            displayName : "金币数量",
            tooltip : "用于对金币总数量的统计"
        },
        powerCount : {
            default : null,
            type : cc.Label,
            displayName : "体力数量",
            tooltip : "用于对体力总数量的统计"
        },
        dialog : {
            default : null,
            type : cc.Node
        }
    },

    start () {
        this.addCoinBtn.node.on(cc.Node.EventType.TOUCH_END,this.addCoin,this);
        this.addPowerBtn.node.on(cc.Node.EventType.TOUCH_END,this.addPower,this);
        this.addDiamondBtn.node.on(cc.Node.EventType.TOUCH_END,this.addDiamond,this);
        this.settingBtn.node.on(cc.Node.EventType.TOUCH_END,this.setting,this);
    },
    
    onDestroy(){
        this.addCoinBtn.node.off(cc.Node.EventType.TOUCH_END,this.addCoin,this);
        this.addPowerBtn.node.off(cc.Node.EventType.TOUCH_END,this.addPower,this);
        this.addDiamondBtn.node.off(cc.Node.EventType.TOUCH_END,this.addDiamond,this);
        this.settingBtn.node.off(cc.Node.EventType.TOUCH_END,this.setting,this);
    },

    /**
     * 添加钻石——打开购买钻石界面
     */
    addDiamond : function(){
        this.dialog.active = true;
        this.dialog.getComponent("Dialog").modifyDialogContent("点击了添加钻石按钮");
        var randomDiamond = Math.floor(Math.random() * 1000);
        this.modifyDiamondTotalCount(randomDiamond);
    },

    /**
     * 添加金币——打开增加金币界面
     */
    addCoin : function(){
        this.dialog.active = true;
        this.dialog.getComponent("Dialog").modifyDialogContent("点击了添加金币按钮");
        var randomDiamond = Math.floor(Math.random() * 1000);
        this.modifyCoinTotalCount(randomDiamond);
    },

    /**
     * 添加体力——打开增加体力界面
     */
    addPower : function(){
        this.dialog.active = true;
        this.dialog.getComponent("Dialog").modifyDialogContent("点击了增加体力按钮");
        var randomDiamond = Math.floor(Math.random() * 80);
        this.modifyPowerCount(randomDiamond);
    },

    /**
     * 设置
     */
    setting : function(){
        this.dialog.active = true;
        this.dialog.getComponent("Dialog").modifyDialogContent("点击了设置按钮");
    },

    /**
     * 修改玩家钻石数量
     * @param {Number} num  增加钻石的数量
     */
    modifyDiamondTotalCount : function(num){
        Global.roleDiamondTotalCount += num;
        this.diamondCount.string = Global.roleDiamondTotalCount;
    },

    /**
     * 修改玩家金币数量
     * @param {Number} num  增加金币的数量
     */
    modifyCoinTotalCount : function(num){
        Global.roleCoinTotalCount += num;
        this.coinCount.string = Global.roleCoinTotalCount;
    },

    /**
     * 修改玩家体力
     * @param {Number} num  体力数值
     */
    modifyPowerCount : function(num){
        Global.rolePowerCount = num;
        this.powerCount.string = num;
    },

});