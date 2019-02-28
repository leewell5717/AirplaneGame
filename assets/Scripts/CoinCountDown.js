cc.Class({
    extends: cc.Component,

    properties: {
        circleProgress: {
            default : null,
            type : cc.ProgressBar,
            displayName : "倒计时进度条"
        },
        coinCountLabel : {
            default : null,
            type : cc.Label,
            displayName : "当前累计获得的金币数量"
        },
        intervalTime: {
            default: 0,
            type: cc.Integer,
            visible: false,
            displayName: "倒计时的一个时间间隔"
        },
    },

    onLoad () {

    },

    update (dt) {
        if(this.intervalTime < 5){
            this.intervalTime += dt;
            var currentProgress = this.intervalTime / 5;
            this.circleProgress.progress = currentProgress;
        }else{
            this.circleProgress.progress = 0;
            this.intervalTime = 0;
            //修改获得的金币
            this.addCoinCount(5);
        }
    },

    /**
     * 修改当前金币数量
     * @param {Number} num 金币
     */
    addCoinCount : function(num){
        Global.currentGetCoinCount += num;
        this.coinCountLabel.string = Global.currentGetCoinCount;
    }
});