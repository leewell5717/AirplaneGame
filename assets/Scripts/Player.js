cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        
    },

    /**
     * 注册玩家飞机的触摸移动事件
     */
    registerMoveEvent : function(){
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.movePlayer, this);
    },

    unregisterMoveEvent : function(){
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.movePlayer, this);
    },

    /**
     * 通过动画，向上移动飞机
     */
    moveUpAnimation: function () {
        var playerAction = cc.moveTo(0.5, -15, -40);
        this.node.runAction(playerAction);
    },

    /**
     * 通过动画，向下移动飞机
     */
    moveDownAnimation: function () {
        var playerAction = cc.moveTo(0.5, -15, -480);
        this.node.runAction(playerAction);
    },

    /**
     * 通过手指移动飞机
     */
    movePlayer: function (event) {
        if (Global.isStartGame) {
            //以下注释的方法有待验证
            //以下这种拖动方式需要有一个父节点，通过convertToNodeSpaceAR方法，转换坐标系为父节点的坐标系
            //触摸点的世界坐标
            // var pos = new cc.Vec2(event.getDeltaX(), event.getDeltaY());
            //转换为UI坐标
            // pos = this.parent.node.convertToNodeSpaceAR(pos);
            //给要移动的物体赋值
            // this.node.position = pos;

            var delta = event.touch.getDelta();
            this.node.x += delta.x;
            this.node.y += delta.y;
        }
    }
});