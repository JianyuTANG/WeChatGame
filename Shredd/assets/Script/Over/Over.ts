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

var gameStatus = require("../gameStatus")

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

    // LIFE-CYCLE CALLBACKS:

    counter=0;

    onLoad() {
        const ratioWidth = cc.winSize.width / 750;
        const ratioHeight = cc.winSize.height / 1334;
        this.background = cc.find('Canvas/overPage');
        this.background.width = cc.winSize.width;
        this.background.height = cc.winSize.height;

        //修改score
        this.scoreBoard = cc.find('Canvas/score');
        this.scoreBoard.width = 50 * ratioWidth;
        this.scoreBoard.height = 80 * ratioHeight;
        this.scoreBoard.x = -167 * ratioWidth;
        this.scoreBoard.y = -54 * ratioHeight;

        //修改再玩一次按钮
        this.singleButton = cc.find('Canvas/playButton');
        this.singleButton.width = 250 * ratioWidth;
        this.singleButton.height = 220 * ratioHeight;
        this.singleButton.x = 190 * ratioWidth;
        this.singleButton.y = -390 * ratioHeight;

        this.singleButton = cc.find('Canvas/overShift');
        this.singleButton.width = 256 * ratioWidth;
        this.singleButton.height = 229 * ratioHeight;
        this.singleButton.x = -6 * ratioWidth;
        this.singleButton.y = 387 * ratioHeight;

        console.log(cc.winSize.width)
        console.log(gameStatus.score);
        this.label.getComponent(cc.Label).string = gameStatus.score.toString();
    }

    start() {

    }

    update(dt) {
        /*if (this.counter % 100 === 0) {
            cc.loader.loadRes("overPage/tryAgain", cc.SpriteFrame, function (err, spriteFrame) {
                cc.find('Canvas/playButton').getComponent(cc.Button).normalSprite = spriteFrame;
            })
        } else if (this.counter % 100 === 5) {
            cc.loader.loadRes("overPage/tryAgainCopy", cc.SpriteFrame, function (err, spriteFrame) {
                //this.singleButton.getComponent("playButton").normalSprite = spriteFrame;
            })
        }
        this.counter++;*/  //做不出频闪qaq
    }

    public gameStart() {
        cc.director.loadScene('Game');
        gameStatus.status='on';
    }
}
