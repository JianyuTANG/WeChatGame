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
let gameStatus = require("../gameStatus")

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(cc.Node)
    bg: cc.Node = null;

    @property(cc.Node)
    win: cc.Node = null;

    @property(cc.Node)
    lose: cc.Node = null;

    @property(cc.Node)
    waiting: cc.Node = null;

    @property(cc.Node)
    deuce: cc.Node = null;

    @property(cc.Node)
    selfScore: cc.Node = null;

    @property(cc.Node)
    rivalScore: cc.Node = null;

    @property(cc.Node)
    button: cc.Node = null;

    @property(cc.Node)
    onlineController: cc.Node = null;


    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.matchScreen();
        this.onlineController = cc.find('onlineController');
        console.log(this.onlineController);
        this.onlineController.getComponent('rank').submitScore();
        this.onlineController.getComponent('onlineControl').gameOver();
        this.selfScore.getComponent(cc.Label).string = gameStatus.score.toString();
        console.log(666777);
        if (this.onlineController.getComponent('onlineControl').connectionStatus === 2) {
            this.showMatchResult();
            this.onlineController.getComponent('onlineControl').connectionStatus = 0;
        }
        else {
            this.waiting.active = true;
        }
    }

    start() {
    }

    private matchScreen() { //屏幕适配
        const winWidth = cc.winSize.width;
        const winHeight = cc.winSize.height;
        const widthRatio = winWidth / 740;
        const heightRatio = winHeight / 1334;
        this.bg = cc.find('Canvas/bg');
        this.bg.width = winWidth;
        this.bg.height = winHeight;
        this.win = cc.find('Canvas/win');
        this.win.y = 400 * heightRatio;
        this.win.width = 650 * widthRatio;
        this.lose = cc.find('Canvas/lose');
        this.lose.y = 400 * heightRatio;
        this.lose.width = 650 * widthRatio;
        this.waiting.y = 400 * heightRatio;
        this.waiting.width = 650 * widthRatio;
        this.deuce.y = 400 * heightRatio;
        this.deuce.width = 650 * widthRatio;
        this.selfScore = cc.find('Canvas/selfScore');
        this.selfScore.x = -200 * widthRatio;
        this.selfScore.y = -120 * heightRatio;
        this.selfScore.getComponent(cc.Label).fontSize = 250 * heightRatio;
        this.selfScore.getComponent(cc.Label).lineHeight = 250 * heightRatio;
        this.rivalScore = cc.find('Canvas/rivalScore');
        this.rivalScore.x = -this.selfScore.x;
        this.rivalScore.y = this.selfScore.y;
        this.rivalScore.getComponent(cc.Label).fontSize = this.selfScore.getComponent(cc.Label).fontSize;
        this.rivalScore.getComponent(cc.Label).lineHeight = this.selfScore.getComponent(cc.Label).lineHeight;
        this.button = cc.find('Canvas/button');
        this.button.y = -427 * heightRatio;
        this.button.width = 600 * widthRatio;
        this.button.height = 130 * heightRatio;
        this.rivalScore.getComponent(cc.Label).string = '';
        this.win.active = false;
        this.lose.active = false;
        this.deuce.active = false;
        this.waiting.active = false;
    }

    private showMatchResult() {
        this.waiting.active = false;
        if (this.onlineController.getComponent('onlineControl').rivalScore > gameStatus.score) {
            this.lose.active = true;
        }
        else if (this.onlineController.getComponent('onlineControl').rivalScore < gameStatus.score) {
            this.win.active = true;
        }
        else {
            this.deuce.active = true;
        }
        //this.selfScore.getComponent(cc.Label).string=gameStatus.score.toString();
        this.rivalScore.getComponent(cc.Label).string = this.onlineController.getComponent('onlineControl').rivalScore.toString();
    }

    public goBack() {
        gameStatus.online = false;
        cc.director.loadScene('Start');
    }

    update(dt) {
        if (this.onlineController.getComponent('onlineControl').connectionStatus === 2) {
            this.onlineController.getComponent('onlineControl').connectionStatus = 0;
            this.showMatchResult();
        }
    }
}
