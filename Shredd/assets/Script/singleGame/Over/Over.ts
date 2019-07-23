// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

var gameStatus = require("../../gameStatus")

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(cc.Node)
    background: cc.Node = null

    @property(cc.Node)
    scoreBoard: cc.Node = null

    @property(cc.Node)
    singleButton: cc.Node = null

    @property(cc.Node)
    overShift: cc.Node=null

    @property(cc.Node)
    multiPlayerButton: cc.Node = null

    @property(cc.Node)
    rankButton: cc.Node = null

    @property(cc.Node)
    rankBoard: cc.Node = null

    @property(cc.Node)
    settingButton: cc.Node = null
    
    @property(cc.AudioSource)
    audioBg: cc.AudioSource = null

    // LIFE-CYCLE CALLBACKS:

    counter=0;

    onLoad() {
        cc.find('onlineController').getComponent('rank').submitScore(gameStatus.score);
        cc.find('onlineController').getComponent('rank').getRank();
        this.matchScreen();
        this.rankBoard.active=false;
        this.label.getComponent(cc.Label).string = gameStatus.score.toString();

        this.audioBg.volume=gameStatus.audioBgVolume;
    }

    start() {
        this.audioBg.volume=gameStatus.audioBgVolume;
    }

    private matchScreen(){
        const ratioWidth = cc.winSize.width / 750;
        const ratioHeight = cc.winSize.height / 1334;
        this.background = cc.find('Canvas/overPage');
        this.background.width = cc.winSize.width;
        this.background.height = cc.winSize.height;

        //修改score
        this.scoreBoard = cc.find('Canvas/score');
        this.scoreBoard.width = 40 * ratioWidth;
        this.scoreBoard.height = 60 * ratioHeight;
        this.scoreBoard.x = -167 * ratioWidth;
        this.scoreBoard.y = -54 * ratioHeight;

        //修改再玩一次按钮
        this.singleButton = cc.find('Canvas/playButton');
        this.singleButton.width = 250 * ratioWidth;
        this.singleButton.height = 220 * ratioHeight;
        this.singleButton.x = 185 * ratioWidth;
        this.singleButton.y = -390 * ratioHeight;

        this.singleButton = cc.find('Canvas/overShift');
        this.singleButton.width = 256 * ratioWidth;
        this.singleButton.height = 229 * ratioHeight;
        this.singleButton.x = -6 * ratioWidth;
        this.singleButton.y = 387 * ratioHeight;

        this.multiPlayerButton=cc.find('Canvas/multiPlayerButton');
        this.multiPlayerButton.width=335*ratioWidth;
        this.multiPlayerButton.height = 210 * ratioHeight;
        this.multiPlayerButton.x = -125 * ratioWidth;
        this.multiPlayerButton.y = -387 * ratioHeight;

        this.rankButton=cc.find('Canvas/rankButton');
        this.rankButton.width=100*ratioWidth;
        this.rankButton.height = 100 * ratioHeight;
        this.rankButton.x = 86 * ratioWidth;
        this.rankButton.y = 20 * ratioHeight;

        this.settingButton=cc.find('Canvas/settingButton');
        this.settingButton.width=100*ratioWidth;
        this.settingButton.height = 100 * ratioHeight;
        this.settingButton.x = 230 * ratioWidth;
        this.settingButton.y = 20 * ratioHeight;
    }
/*
    update(dt) {
        if (this.counter % 100 === 0) {
            cc.loader.loadRes("overPage/tryAgain", cc.SpriteFrame, function (err, spriteFrame) {
                cc.find('Canvas/playButton').getComponent(cc.Button).normalSprite = spriteFrame;
            })
        } else if (this.counter % 100 === 5) {
            cc.loader.loadRes("overPage/tryAgainCopy", cc.SpriteFrame, function (err, spriteFrame) {
                //this.singleButton.getComponent("playButton").normalSprite = spriteFrame;
            })
        }
        this.counter++;  //做不出频闪qaq
    }
    */

    public gameStart() {
        cc.director.loadScene('Game');
        gameStatus.status='on';
    }

    public hideRank(){
        cc.find('Canvas/rank').active=false;
    }

    public showRank(){
        cc.find('Canvas/rank').active=true;
    }

    public startOnline(){
        gameStatus.startOnlineFromOverpage=true;
        cc.director.loadScene('Start');
        //cc.find('onlineController').getComponent('onlineControl').startOnlineFromOverpage();
    }

    toSetting(){
        cc.director.loadScene('Setting');
    }
}
