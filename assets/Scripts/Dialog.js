
cc.Class({
    extends: cc.Component,

    properties: {
        dialogContent: {
            default: null,
            type: cc.Label
        },
        mask: {
            default: null,
            type: cc.Node
        }
    },

    onLoad() {
        this.node.active = false;
    },

    onEnable() {
        //监听对话框的触摸事件，防止穿透
        this.mask.on(cc.Node.EventType.TOUCH_START, function (event) {
            event.stopPropagation();
        });
        this.mask.on(cc.Node.EventType.TOUCH_END, function (event) {
            event.stopPropagation();
        });
    },

    onDisable() {
        //解除监听
        this.mask.off(cc.Node.EventType.TOUCH_START, function (event) {
            event.stopPropagation();
        });
        this.mask.off(cc.Node.EventType.TOUCH_END, function (event) {
            event.stopPropagation();
        });
    },

    /**
     * 修改dialog中的显示内容
     * @param {string} desc 说明内容
     */
    modifyDialogContent: function (desc) {
        this.dialogContent.string = desc;
        setTimeout(function () {
            this.node.active = false;
        }.bind(this), 1000);
    },


});
