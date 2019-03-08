cc.Class({
    extends: cc.Component,

    properties: {
        weaponMainLevelUpBtn: {
            default: null,
            type: cc.Sprite,
            displayName: "显示主武器升级面板按钮"
        },
        weaponSubLevelUpBtn: {
            default: null,
            type: cc.Sprite,
            displayName: "显示副武器升级面板按钮"
        },
        coinLevelUpBtn: {
            default: null,
            type: cc.Sprite,
            displayName: "显示金币升级面板按钮"
        },
        weaponMainLevelUpContainer: {
            default: null,
            type: cc.Node,
            displayName: "主武器升级面板"
        },
        weaponSubLevelUpContainer: {
            default: null,
            type: cc.Node,
            displayName: "副武器升级面板"
        },
        coinLevelUpContainer: {
            default: null,
            type: cc.Node,
            displayName: "金币升级面板"
        },
        weaponSubItemPanel: {
            default: null,
            type: cc.ScrollView,
            displayName: "副武器列表面板"
        },

        //当副武器面板显示出来后，需要隐藏或改变其他部分的UI
        player: {
            default: null,
            type: cc.Sprite,
            displayName: "玩家飞机"
        },
        shootTipLabel: {
            default: null,
            type: cc.Label,
            displayName: "提示文字"
        },
        slideBarContainer: {
            default: null,
            type: cc.Node,
            displayName: "左边功能栏容器"
        },
        mainWeaponSelected: {
            default: false,
            visible: false,
            displayName: "主武器是否被选中"
        },
        subWeaponSelected: {
            default: false,
            visible: false,
            displayName: "副武器是否被选中"
        },
        coinSelected: {
            default: false,
            visible: false,
            displayName: "金币是否被选中"
        },
    },

    onLoad() {
        this.weaponMainLevelUpBtn.node.on(cc.Node.EventType.TOUCH_END, this.showWeaponMainLevelUpPanel, this);
        this.weaponSubLevelUpBtn.node.on(cc.Node.EventType.TOUCH_END, this.showWeaponSubLevelUpPanel, this);
        this.coinLevelUpBtn.node.on(cc.Node.EventType.TOUCH_END, this.showCoinLevelUpPanel, this);
        this.weaponSubItemPanel.active = false;
    },

    onDestroy() {
        this.weaponMainLevelUpBtn.node.off(cc.Node.EventType.TOUCH_END, this.showWeaponMainLevelUpPanel, this);
        this.weaponSubLevelUpBtn.node.off(cc.Node.EventType.TOUCH_END, this.showWeaponSubLevelUpPanel, this);
        this.coinLevelUpBtn.node.off(cc.Node.EventType.TOUCH_END, this.showCoinLevelUpPanel, this);
    },


    /**
     * 显示主武器升级面板
     */
    showWeaponMainLevelUpPanel: function () {
        if (!this.mainWeaponSelected) {
            this.hideOrMoveUI(true, false, false);

            this.changeBtnSpriteFrame(this.weaponMainLevelUpBtn, "spriteFrames/bg_main_weapon_pressed");
            this.changeBtnSpriteFrame(this.weaponSubLevelUpBtn, "spriteFrames/bg_sub_weapon_normal");
            this.changeBtnSpriteFrame(this.coinLevelUpBtn, "spriteFrames/bg_coin_normal");
        }
    },

    /**
     * 显示副武器升级面板
     */
    showWeaponSubLevelUpPanel: function () {
        if (!this.subWeaponSelected) {
            this.hideOrMoveUI(false, true, false);

            this.changeBtnSpriteFrame(this.weaponMainLevelUpBtn, "spriteFrames/bg_main_weapon_normal");
            this.changeBtnSpriteFrame(this.weaponSubLevelUpBtn, "spriteFrames/bg_sub_weapon_pressed");
            this.changeBtnSpriteFrame(this.coinLevelUpBtn, "spriteFrames/bg_coin_normal");
        }
    },

    /**
     * 显示金币升级面板
     */
    showCoinLevelUpPanel: function () {
        if (!this.coinSelected) {
            this.hideOrMoveUI(false, false, true);

            this.changeBtnSpriteFrame(this.weaponMainLevelUpBtn, "spriteFrames/bg_main_weapon_normal");
            this.changeBtnSpriteFrame(this.weaponSubLevelUpBtn, "spriteFrames/bg_sub_weapon_normal");
            this.changeBtnSpriteFrame(this.coinLevelUpBtn, "spriteFrames/bg_coin_pressed");
        }
    },

    /**
     * 改变btn的spriteFrame
     * @param {cc.Button} btn 需要改变的按钮
     * @param {cc.String} spriteFrameStr 改变的图片路径
     */
    changeBtnSpriteFrame: function (btn, spriteFrameStr) {
        cc.loader.loadRes(spriteFrameStr, cc.SpriteFrame, function (err, spriteFrame) {
            btn.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
    },

    /**
     * 隐藏左边SlideBar，并且向上移动player飞机
     * @param {boolean} mainWeaponIsShow 主武器升级面板是否显示
     * @param {boolean} subWeaponIsShow 副武器升级面板是否显示
     * @param {boolean} coinIsShow 金币升级面板是否显示
     */
    hideOrMoveUI: function (mainWeaponIsShow, subWeaponIsShow, coinIsShow) {
        //隐藏摇摆提示文字
        var tipScript = this.shootTipLabel.getComponent("ShootTipController");
        tipScript.stopSwingAnimation();
        tipScript.hideTip();
        //滑动隐藏左边面板
        var slidePanel = this.slideBarContainer.getComponent("SlideBar");
        slidePanel.moveOutAnimation();
        //向上移动飞机
        var mPlayer = this.player.getComponent("Player");
        mPlayer.moveUpAnimation();

        Global.fullScreenClicked = false;

        //相关面板的显示与隐藏
        this.weaponMainLevelUpContainer.active = mainWeaponIsShow;
        this.weaponSubLevelUpContainer.active = subWeaponIsShow;
        this.weaponSubItemPanel.node.active = subWeaponIsShow;
        this.coinLevelUpContainer.active = coinIsShow;
        //相关状态的更改
        this.mainWeaponSelected = mainWeaponIsShow;
        this.subWeaponSelected = subWeaponIsShow;
        this.coinSelected = coinIsShow;
    },

    /**
     * 隐藏所有升级面板，并重置相关状态到初始状态
     */
    hideAllLevelUpPanel: function () {
        this.weaponMainLevelUpContainer.active = false;
        this.weaponSubLevelUpContainer.active = false;
        this.weaponSubItemPanel.node.active = false;
        this.coinLevelUpContainer.active = false;

        this.changeBtnSpriteFrame(this.weaponMainLevelUpBtn, "spriteFrames/bg_main_weapon_normal");
        this.changeBtnSpriteFrame(this.weaponSubLevelUpBtn, "spriteFrames/bg_sub_weapon_normal");
        this.changeBtnSpriteFrame(this.coinLevelUpBtn, "spriteFrames/bg_coin_normal");

        this.mainWeaponSelected = false;
        this.subWeaponSelected = false;
        this.coinSelected = false;
    },

    /**
     * 隐藏所有面板
     */
    hideAllPanel: function () {
        this.node.active = false;
    }


});