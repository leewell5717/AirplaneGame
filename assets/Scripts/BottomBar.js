cc.Class({
    extends: cc.Component,

    properties: {
        weaponMainLevelUpBtn : {
            default : null,
            type : cc.Sprite,
            displayName : "显示主武器升级面板按钮"
        },
        weaponSubLevelUpBtn : {
            default : null,
            type : cc.Sprite,
            displayName : "显示副武器升级面板按钮"
        },
        coinLevelUpBtn : {
            default : null,
            type : cc.Sprite,
            displayName : "显示金币升级面板按钮"
        },
        weaponMainLevelUpContainer:{
            default : null,
            type : cc.Node,
            displayName : "主武器升级面板"
        },
        weaponSubLevelUpContainer:{
            default : null,
            type : cc.Node,
            displayName : "副武器升级面板"
        },
        coinLevelUpContainer:{
            default : null,
            type : cc.Node,
            displayName : "金币升级面板"
        },
    },

    onLoad () {
        this.weaponMainLevelUpBtn.node.on(cc.Node.EventType.TOUCH_END,this.showWeaponMainLevelUpPanel,this);
        this.weaponSubLevelUpBtn.node.on(cc.Node.EventType.TOUCH_END,this.showWeaponSubLevelUpPanel,this);
        this.coinLevelUpBtn.node.on(cc.Node.EventType.TOUCH_END,this.showCoinLevelUpPanel,this);
        this.mainWeaponSelected = false;
        this.subWeaponSelected = false;
        this.coinSelected = false;
        // var self = this;
        // this.myArr = [];
        // cc.loader.loadResDir("spriteFrames", cc.SpriteFrame, function (err, assets, urls) {
        //     var url = urls.toString().split(",");
        //     cc.log(url);
        //     for(var i=0;i<url.length;i++){
        //         var s = url[i].split("/")[1];
        //         self.myArr.push(s);
        //     }
        //     cc.log(self.myArr);
        // });
    },

    onDestroy(){
        this.weaponMainLevelUpBtn.node.off(cc.Node.EventType.TOUCH_END,this.showWeaponMainLevelUpPanel,this);
        this.weaponSubLevelUpBtn.node.off(cc.Node.EventType.TOUCH_END,this.showWeaponSubLevelUpPanel,this);
        this.coinLevelUpBtn.node.off(cc.Node.EventType.TOUCH_END,this.showCoinLevelUpPanel,this);
    },

    /**
     * 显示主武器升级面板
     */
    showWeaponMainLevelUpPanel : function(){
        // cc.log(this.myArr);

        if(!this.mainWeaponSelected){
            this.mainWeaponSelected = true;
            this.subWeaponSelected = false;
            this.coinSelected = false;

            this.weaponMainLevelUpContainer.active = true;
            this.weaponSubLevelUpContainer.active = false;
            this.coinLevelUpContainer.active = false;
    
            this.changeBtnSpriteFrame(this.weaponMainLevelUpBtn,"spriteFrames/bg_main_weapon_pressed");
            this.changeBtnSpriteFrame(this.weaponSubLevelUpBtn,"spriteFrames/bg_sub_weapon_normal");
            this.changeBtnSpriteFrame(this.coinLevelUpBtn,"spriteFrames/bg_coin_normal");
            // this.changeBtnSpriteFrame(this.weaponMainLevelUpBtn,this.myArr["spriteFrames/bg_main_weapon_pressed"]);
            // this.changeBtnSpriteFrame(this.weaponSubLevelUpBtn,this.myArr["spriteFrames/bg_sub_weapon_normal"]);
            // this.changeBtnSpriteFrame(this.coinLevelUpBtn,this.myArr["spriteFrames/bg_coin_normal"]);
        }
    },

    /**
     * 显示副武器升级面板
     */
    showWeaponSubLevelUpPanel : function(){
        if(!this.subWeaponSelected){
            this.mainWeaponSelected = false;
            this.subWeaponSelected = true;
            this.coinSelected = false;

            this.weaponMainLevelUpContainer.active = false;
            this.weaponSubLevelUpContainer.active = true;
            this.coinLevelUpContainer.active = false;
    
            this.changeBtnSpriteFrame(this.weaponMainLevelUpBtn,"spriteFrames/bg_main_weapon_normal");
            this.changeBtnSpriteFrame(this.weaponSubLevelUpBtn,"spriteFrames/bg_sub_weapon_pressed");
            this.changeBtnSpriteFrame(this.coinLevelUpBtn,"spriteFrames/bg_coin_normal");
            // this.changeBtnSpriteFrame(this.weaponMainLevelUpBtn,this.myArr["spriteFrames/bg_main_weapon_normal"]);
            // this.changeBtnSpriteFrame(this.weaponSubLevelUpBtn,this.myArr["spriteFrames/bg_sub_weapon_pressed"]);
            // this.changeBtnSpriteFrame(this.coinLevelUpBtn,this.myArr["spriteFrames/bg_coin_normal"]);
        }
    },

    /**
     * 显示金币升级面板
     */
    showCoinLevelUpPanel : function(){
        cc.log("1");
        if(!this.coinSelected){
            cc.log("2");
            this.mainWeaponSelected = false;
            this.subWeaponSelected = false;
            this.coinSelected = true;

            this.weaponMainLevelUpContainer.active = false;
            this.weaponSubLevelUpContainer.active = false;
            this.coinLevelUpContainer.active = true;
    
            this.changeBtnSpriteFrame(this.weaponMainLevelUpBtn,"spriteFrames/bg_main_weapon_normal");
            this.changeBtnSpriteFrame(this.weaponSubLevelUpBtn,"spriteFrames/bg_sub_weapon_normal");
            this.changeBtnSpriteFrame(this.coinLevelUpBtn,"spriteFrames/bg_coin_pressed");
            // this.changeBtnSpriteFrame(this.weaponMainLevelUpBtn,this.myArr["spriteFrames/bg_main_weapon_normal"]);
            // this.changeBtnSpriteFrame(this.weaponSubLevelUpBtn,this.myArr["spriteFrames/bg_sub_weapon_normal"]);
            // this.changeBtnSpriteFrame(this.coinLevelUpBtn,this.myArr["spriteFrames/bg_coin_pressed"]);
        }
    },

    /**
     * 改变btn的spriteFrame
     * @param {cc.Button} btn 需要改变的按钮
     * @param {cc.String} spriteFrameStr 改变的图片路径
     */
    changeBtnSpriteFrame : function(btn,spriteFrameStr){
        cc.loader.loadRes(spriteFrameStr, cc.SpriteFrame, function (err, spriteFrame) {
            btn.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
    },


});