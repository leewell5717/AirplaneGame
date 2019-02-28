window.Global = {

    //用户登录信息对象
    userLoginData: {
        //不包括敏感信息的原始数据字符串，用于计算签名
        rawData: "",
        //使用 sha1( rawData + sessionkey ) 得到字符串，用于校验用户信息
        signature: "",
        //包括敏感数据在内的完整用户信息的加密数据
        encryptedData: "",
        //加密算法的初始向量
        iv: "",
        userInfo: {
            //用户昵称
            nickName: "",
            //用户头像URL（URL 最后一个数值代表正方形头像大小（有 0、46、64、96、132 数值可选，0 代表 640x640 的正方形头像，46 表示 46x46 的正方形头像，
            //剩余数值以此类推。默认132），用户没有头像时该项为空。若用户更换头像，原有头像 URL 将失效。）
            avatarUrl: "",
            //性别（0-未知；1-男性；2-女性）
            gender: 0,
            //所在国家
            country: "",
            //所在省份
            province: "",
            //所在城市
            city: "",
            //所用语言（en-英文；zh_CN-简体中文；zh_TW-繁体中文）
            language: ""
        }
    },

    userLoginBtn : null,
    roleDiamondTotalCount : 0,
    roleCoinTotalCount : 0,
    rolePowerCount : 0,

    //当前可以获得的金币数量
    currentGetCoinCount : 0,


};