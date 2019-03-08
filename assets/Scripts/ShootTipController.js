cc.Class({
    extends: cc.Component,

    properties: {
        intervalID : 0,
        timeoutID : 0,

    },

    onLoad () {
        this.startSwingAnimation();
        this.intervalID = 0;
        this.tipActionTag = 1;
        this.recoveryActionTag = 2;
    },

    /**
     * 开始提示文字的摇摆动画
     */
    startSwingAnimation: function () {
        var self = this;
        self.intervalID = setInterval(function () {
            var tipAction = cc.sequence(cc.rotateTo(0.1, -5), cc.rotateTo(0.1, 10)).repeat(2);
            tipAction.setTag(self.tipActionTag);
            self.node.runAction(tipAction);
            self.timeoutID = setTimeout(function () {
                var recoveryAction = cc.rotateTo(0.1, 0);
                recoveryAction.setTag(self.recoveryActionTag);
                self.node.runAction(recoveryAction);
            }.bind(this), 550);
        }.bind(this), 2500);
    },

    /**
     * 停止提示文字的摇摆动画
     */
    stopSwingAnimation : function(){
        clearTimeout(this.timeoutID);
        clearInterval(this.intervalID);
        this.node.stopAllActions();
    },

    /**
     * 显示提示文字
     */
    showTip : function(){
        setTimeout(function(){
            this.node.active = true;
        }.bind(this),500);
    },

    /**
     * 隐藏提示文字
     */
    hideTip : function(){
        this.node.active = false;
    }
});