cc.Class({
    extends: cc.Component,

    properties: {
        adsBtn: {
            default: null,
            type: cc.Sprite,
            displayName: "广告按钮",
            tooltip: "点击进行广告展示"
        },
        complaintBtn: {
            default: null,
            type: cc.Sprite,
            displayName: "投诉按钮",
            tooltip: "点击进行投诉"
        },
        kefuBtn: {
            default: null,
            type: cc.Sprite,
            displayName: "客服按钮",
            tooltip: "点击进行客服交流"
        },
        giftBtn: {
            default: null,
            type: cc.Sprite,
            displayName: "礼包按钮",
            tooltip: "点击获取礼包"
        },
        invitationBtn: {
            default: null,
            type: cc.Sprite,
            displayName: "邀请按钮",
            tooltip: "点击进行邀请"
        },
        rankingBtn: {
            default: null,
            type: cc.Sprite,
            displayName: "排行榜按钮",
            tooltip: "点击查看排行榜"
        },
        dialog: {
            default: null,
            type: cc.Node
        }
    },

    onLoad() {
        this.adsBtn.node.on(cc.Node.EventType.TOUCH_END, this.ads, this);
        this.complaintBtn.node.on(cc.Node.EventType.TOUCH_END, this.complaint, this);
        this.kefuBtn.node.on(cc.Node.EventType.TOUCH_END, this.kefu, this);
        this.giftBtn.node.on(cc.Node.EventType.TOUCH_END, this.gift, this);
        this.invitationBtn.node.on(cc.Node.EventType.TOUCH_END, this.invitation, this);
        this.rankingBtn.node.on(cc.Node.EventType.TOUCH_END, this.ranking, this);
    },

    onDestroy() {
        this.adsBtn.node.off(cc.Node.EventType.TOUCH_END, this.ads, this);
        this.complaintBtn.node.off(cc.Node.EventType.TOUCH_END, this.complaint, this);
        this.kefuBtn.node.off(cc.Node.EventType.TOUCH_END, this.kefu, this);
        this.giftBtn.node.off(cc.Node.EventType.TOUCH_END, this.gift, this);
        this.invitationBtn.node.off(cc.Node.EventType.TOUCH_END, this.invitation, this);
        this.rankingBtn.node.off(cc.Node.EventType.TOUCH_END, this.ranking, this);
    },

    /**
     * 广告
     */
    ads: function () {
        this.dialog.active = true;
        this.dialog.getComponent("Dialog").modifyDialogContent("点击了广告按钮");
    },

    /**
     * 投诉
     */
    complaint: function () {
        this.dialog.active = true;
        this.dialog.getComponent("Dialog").modifyDialogContent("点击了投诉按钮");
    },

    /**
     * 投诉
     */
    kefu: function () {
        this.dialog.active = true;
        this.dialog.getComponent("Dialog").modifyDialogContent("点击了客服按钮");
    },

    /**
     * 礼包
     */
    gift: function () {
        this.dialog.active = true;
        this.dialog.getComponent("Dialog").modifyDialogContent("点击了礼包按钮");
    },

    /**
     * 邀请
     */
    invitation: function () {
        this.dialog.active = true;
        this.dialog.getComponent("Dialog").modifyDialogContent("点击了邀请按钮");
    },

    /**
     * 排行榜
     */
    ranking: function () {
        this.dialog.active = true;
        this.dialog.getComponent("Dialog").modifyDialogContent("点击了排行榜按钮");
    },

    /**
     * 隐藏全部控件
     */
    hideAllView: function () {
        this.node.active = false;
    },

    /**
     * 显示全部控件
     */
    showAllView: function () {
        this.node.active = true;
    },

    /**
     * 通过动画，移出界面
     */
    moveOutAnimation: function () {
        var myAction = cc.moveTo(0.5, -730, -5)
        this.node.runAction(myAction);
    },

    /**
     * 通过动画，移入界面
     */
    moveInAnimation: function () {
        var myAction = cc.moveTo(0.5, -535, -5)
        this.node.runAction(myAction);
    }

});