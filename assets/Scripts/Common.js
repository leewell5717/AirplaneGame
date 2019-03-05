module.exports = {

    /**
     * 副武器列表Item对象
     */
    subWeaponListDatas: {
        weaponIcon: -1,
        weaponName: "",
        weaponFunctionName: "",
        weaponFunctionValue: "",
        weaponFunctionLevel: -1,
        weaponFunctionLevelUpCoin: -1,
        weaponFireName: "",
        weaponFireValue: "",
        weaponFireLevel: -1,
        weaponFireLevelUpCoin: -1
    },

    /**
     * 创建副武器列表Item对象
     * @param {number} weaponIcon 武器图标
     * @param {string} weaponName 武器名称
     * @param {string} weaponFunctionName 武器功能名称
     * @param {number} weaponFunctionValue 武器功能值
     * @param {number} weaponFunctionLevel 武器功能等级
     * @param {number} weaponFunctionLevelUpCoin 武器功能升级所需金币
     * @param {string} weaponFireName 武器火力名称
     * @param {number} weaponFireValue 武器火力值
     * @param {number} weaponFireLevel 武器火力等级
     * @param {number} weaponFireLevelUpCoin 武器火力升级所需金币
     */
    SubWeaponItemFunc: function (weaponIcon, weaponName, weaponFunctionName, weaponFunctionValue, weaponFunctionLevel, weaponFunctionLevelUpCoin,
        weaponFireName, weaponFireValue, weaponFireLevel, weaponFireLevelUpCoin) {
        this.weaponIcon = weaponIcon;
        this.weaponName = weaponName;
        this.weaponFunctionName = weaponFunctionName;
        this.weaponFunctionValue = weaponFunctionValue;
        this.weaponFunctionLevel = weaponFunctionLevel;
        this.weaponFunctionLevelUpCoin = weaponFunctionLevelUpCoin;
        this.weaponFireName = weaponFireName;
        this.weaponFireValue = weaponFireValue;
        this.weaponFireLevel = weaponFireLevel;
        this.weaponFireLevelUpCoin = weaponFireLevelUpCoin;
    },
};