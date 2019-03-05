var common = require("Common")

cc.Class({
    extends: cc.Component,

    properties: {
        subWeaponPrefabs: {
            default: null,
            type: cc.Prefab,
            displayName: "副武器列表项item的prefab"
        },
        scrollView: {
            default: null,
            type: cc.ScrollView
        },
        weaponSubLevelUpContainer: {
            default: null,
            type: cc.Node,
            displayName: "副武器详情面板"
        },
        subWeaponIcons: [cc.SpriteFrame],
        dialog: {
            default: null,
            type: cc.Node
        },
    },

    onLoad() {
        this.content = this.scrollView.content;
        this.subWeaponDatas = []; //存储实际创建的技能对象
        this.weaponItemData = null;

        var weapon1 = new common.SubWeaponItemFunc(0, Global.subWeaponItemNames[0], Global.subWeaponFunctionNames[0], Global.subWeaponFunctionValues[5],
            Global.subWeaponFunctionLevels[0],Global.subWeaponFunctionLevelUpCoins[4], Global.subWeaponFireName, Global.subWeaponFireValues[0], 
            Global.subWeaponFireLevels[0], Global.subWeaponFireLevelUpCoins[0]);
        var weapon2 = new common.SubWeaponItemFunc(1, Global.subWeaponItemNames[1], Global.subWeaponFunctionNames[1], Global.subWeaponFunctionValues[4],
            Global.subWeaponFunctionLevels[1],Global.subWeaponFunctionLevelUpCoins[4], Global.subWeaponFireName, Global.subWeaponFireValues[1], 
            Global.subWeaponFireLevels[1], Global.subWeaponFireLevelUpCoins[1]);
        var weapon3 = new common.SubWeaponItemFunc(2, Global.subWeaponItemNames[2], Global.subWeaponFunctionNames[2], Global.subWeaponFunctionValues[3],
            Global.subWeaponFunctionLevels[2],Global.subWeaponFunctionLevelUpCoins[4], Global.subWeaponFireName, Global.subWeaponFireValues[2], 
            Global.subWeaponFireLevels[2], Global.subWeaponFireLevelUpCoins[2]);
        var weapon4 = new common.SubWeaponItemFunc(3, Global.subWeaponItemNames[3], Global.subWeaponFunctionNames[3], Global.subWeaponFunctionValues[2],
            Global.subWeaponFunctionLevels[3],Global.subWeaponFunctionLevelUpCoins[4], Global.subWeaponFireName, Global.subWeaponFireValues[3], 
            Global.subWeaponFireLevels[3], Global.subWeaponFireLevelUpCoins[3]);
        var weapon5 = new common.SubWeaponItemFunc(4, Global.subWeaponItemNames[4], Global.subWeaponFunctionNames[4], Global.subWeaponFunctionValues[1],
            Global.subWeaponFunctionLevels[4],Global.subWeaponFunctionLevelUpCoins[4], Global.subWeaponFireName, Global.subWeaponFireValues[4], 
            Global.subWeaponFireLevels[4], Global.subWeaponFireLevelUpCoins[4]);
        var weapon6 = new common.SubWeaponItemFunc(5, Global.subWeaponItemNames[5], Global.subWeaponFunctionNames[5], Global.subWeaponFunctionValues[0],
            Global.subWeaponFunctionLevels[5],Global.subWeaponFunctionLevelUpCoins[4], Global.subWeaponFireName, Global.subWeaponFireValues[5], 
            Global.subWeaponFireLevels[5], Global.subWeaponFireLevelUpCoins[5]);
        this.subWeaponDatas.push(weapon1);
        this.subWeaponDatas.push(weapon2);
        this.subWeaponDatas.push(weapon3);
        this.subWeaponDatas.push(weapon4);
        this.subWeaponDatas.push(weapon5);
        this.subWeaponDatas.push(weapon6);

        this.initSkillList();
    },

    /**
     * 初始化列表数据
     */
    initSkillList: function () {
        console.log(this.subWeaponDatas);
        for (let i = 0; i < this.subWeaponDatas.length; i++) {
            var itemPrefab = cc.instantiate(this.subWeaponPrefabs);

            itemPrefab.getChildByName("sub_weapon_prefabs_icon").getComponent(cc.Sprite).spriteFrame = this.subWeaponIcons[this.subWeaponDatas[i].weaponIcon];
            var selectedWeapon = itemPrefab.getChildByName("sub_weapon_prefabs_bg");

            //需要使用闭包进行点击事件的注册
            //fixme ：此处需要优化，现阶段因为技术原因，只能放在此处，以后需要单独提取出点击事件的逻辑？？？？？？？
            var self = this;
            (function (i, datas, tipDialog) {
                selectedWeapon.on(cc.Node.EventType.TOUCH_END, function (event) {
                    cc.log(i);
                    //i表示当前副武器的下标索引
                    self.changeSubWeaponPanelUI(datas[i]);
                }, this);
            })(i, this.subWeaponDatas, this.dialog);

            this.content.addChild(itemPrefab);
        }
    },

    /**
     * 根据选中的副武器，来修改副武器的面板UI
     * @param {object} weaponItem 副武器item
     */
    changeSubWeaponPanelUI: function (weaponItem) {
        this.weaponSubLevelUpContainer.getChildByName("functionLabel").string = weaponItem.weaponFunctionName + "(lv" + weaponItem.weaponFunctionLevel + ")";
        this.weaponSubLevelUpContainer.getChildByName("functionValue").string = weaponItem.weaponFunctionValue;
        this.weaponSubLevelUpContainer.getChildByName("functionLevelUpCoin").string = weaponItem.weaponFunctionLevelUpCoin;
        this.weaponSubLevelUpContainer.getChildByName("firePowerLabel").string = weaponItem.weaponFireName + "(lv" + weaponItem.weaponFireLevel + ")";
        this.weaponSubLevelUpContainer.getChildByName("firePower").string = weaponItem.weaponFireValue;
        this.weaponSubLevelUpContainer.getChildByName("firePowerLevelUpCoin").string = weaponItem.weaponFireLevelUpCoin;
        cc.log(this.weaponSubLevelUpContainer);

        this.weaponItemData = weaponItem;
        console.log("武器图标下标：" + weaponItem.weaponIcon + "，武器名称：" + weaponItem.weaponName + "，武器功能名称：" + weaponItem.weaponFunctionName +
                "，武器功能值：" + weaponItem.weaponFunctionValue + "，武器功能等级：" + weaponItem.weaponFunctionLevel +
                "，武器功能升级所需金币：" + weaponItem.weaponFunctionLevelUpCoin + "，武器火力名称：" + weaponItem.weaponFireName +
                "，武器火力值：" + weaponItem.weaponFireValue + "，武器火力等级：" + weaponItem.weaponFireLevel + "，武器火力升级所需金币：" + weaponItem.weaponFireLevelUpCoin);

        var functionBtn = this.weaponSubLevelUpContainer.getChildByName("functionLevelUpBg");
        var fireBtn = this.weaponSubLevelUpContainer.getChildByName("firePowerLevelUpBg");
        functionBtn.on(cc.Node.EventType.TOUCH_END, this.functionLevelUpClick, this);
        functionBtn.off(cc.Node.EventType.TOUCH_END, this.functionLevelUpClick, this);
        fireBtn.on(cc.Node.EventType.TOUCH_END, function (event) {
            cc.log("ssss");
        }, this);
    },

    functionLevelUpClick : function(){
        console.log("武器图标下标：" + this.weaponItemData.weaponIcon + "，武器名称：" + this.weaponItemData.weaponName + "，武器功能名称：" + this.weaponItemData.weaponFunctionName +
                "，武器功能值：" + this.weaponItemData.weaponFunctionValue + "，武器功能等级：" + this.weaponItemData.weaponFunctionLevel +
                "，武器功能升级所需金币：" + this.weaponItemData.weaponFunctionLevelUpCoin + "，武器火力名称：" + this.weaponItemData.weaponFireName +
                "，武器火力值：" + this.weaponItemData.weaponFireValue + "，武器火力等级：" + this.weaponItemData.weaponFireLevel + 
                "，武器火力升级所需金币：" + this.weaponItemData.weaponFireLevelUpCoin);
    }


});