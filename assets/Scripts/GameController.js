
cc.Class({
    extends: cc.Component,

    properties: {
        bottomBar: {
            default: null,
            type: cc.Node,
            displayName: "底部面板容器"
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
    },

    onDestroy() {
        this.node.off(cc.Node.EventType.TOUCH_END, this.changeUI, this);
    },

    /**
     * 改变UI
     */
    changeUI: function () {
        var tipScript = this.shootTipLabel.getComponent("ShootTipController");
        var bottomPanel = this.bottomBar.getComponent("BottomBar");
        var slidePanel = this.slideBarContainer.getComponent("SlideBar");
        var mPlayer = this.player.getComponent("Player");
        if (!Global.fullScreenClicked) {
            Global.fullScreenClicked = true;

            //显示摇摆提示文字
            tipScript.showTip();
            tipScript.startSwingAnimation();
            //隐藏底部升级面板
            bottomPanel.hideAllLevelUpPanel();
            //滑动显示左边面板
            slidePanel.showAllView();
            slidePanel.moveInAnimation();
            //向下移动飞机
            mPlayer.moveDownAnimation();
        } else {
            cc.log("开始游戏");
            //隐藏底部所有面板
            bottomPanel.hideAllPanel();
            //隐藏提示文字
            tipScript.stopSwingAnimation();
            tipScript.hideTip();
            //隐藏左边面板
            slidePanel.moveOutAnimation();

            Global.isStartGame = true;
            //注册玩家飞机的触摸移动事件
            mPlayer.registerMoveEvent();
        }
    },
});