
cc.Class({
    extends: cc.Component,

    properties: {
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

        //当点击全屏遮罩后，需要显示或改变其他部分的UI
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
    },

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_END, this.changeUI, this);

        var tipAction = cc.repeatForever(cc.sequence(cc.rotateBy(2, 45), cc.rotateBy(2, -45)));
        this.shootTipLabel.node.runAction(tipAction);
    },

    onDestroy() {
        this.node.off(cc.Node.EventType.TOUCH_END, this.changeUI, this);
    },

    /**
     * 改变UI
     */
    changeUI: function () {
        if (!Global.fullScreenClicked) {
            Global.fullScreenClicked = true;

            this.weaponMainLevelUpContainer.active = false;
            this.weaponSubLevelUpContainer.active = false;
            this.coinLevelUpContainer.active = false;
            this.weaponSubItemPanel.active = false;
            this.shootTipLabel.active = true;
            this.slideBarContainer.active = true;

            var playerAction = cc.moveTo(1, -15, -480);
            this.player.node.runAction(playerAction);

            var myAction = cc.moveTo(1,-535,-5)
            this.slideBarContainer.runAction(myAction);
        } else {
            cc.log("开始游戏");
        }

    },
});