// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

module.exports={
    score: 0, //分数
    online: false,//false为单机，true为对战模式
    status: "start",  //游戏状态有start,on, pause, over
    audioBgVolume: 0.5,  //背景音乐音量大小
    audioEffectVolume: 0.5,   //音效音量大小
    startPageStatus: false //是否直接开始匹配（用于从结束页面直接开始双人对战的匹配）
}
