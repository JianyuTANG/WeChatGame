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
    background: cc.Node = null;

    @property(cc.Node)
    startButton: cc.Node = null;

    @property(cc.Node)
    multiPlayerButton: cc.Node = null;

    @property(cc.Node)
    settingButton: cc.Node = null;

    @property(cc.Node)
    rankButton: cc.Node = null;

    @property(cc.Node)
    tutorialButton: cc.Node = null;

    @property
    ratioWidth: number = 0;

    @property
    ratioHeight: number = 0;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.game.removePersistRootNode(cc.find('onlineController'));
        cc.find('Canvas/connectBoard').active = false;
        console.log(cc.winSize.width);
        this.ratioWidth = cc.winSize.width / 750;
        this.ratioHeight = cc.winSize.height / 1334;
        this.background = cc.find('Canvas/newbg');
        this.background.width = cc.winSize.width;
        this.background.height = cc.winSize.height;
        this.startButton = cc.find('Canvas/startButton');
        this.startButton.width = 225 * this.ratioWidth;
        this.startButton.height = 225 * this.ratioHeight;
        this.startButton.x = 197 * this.ratioWidth;
        this.startButton.y = -382 * this.ratioHeight;
        this.multiPlayerButton = cc.find('Canvas/multiPlayerButton');
        this.multiPlayerButton.width = 345 * this.ratioWidth;
        this.multiPlayerButton.height = 65 * this.ratioHeight;
        this.multiPlayerButton.x = -113 * this.ratioWidth;
        this.multiPlayerButton.y = -454 * this.ratioHeight;
        const smallButtonWidth = 100 * this.ratioWidth;
        const smallButtonHeight = 100 * this.ratioHeight;
        const smallButtonY = -332 * this.ratioHeight;
        this.settingButton = cc.find('Canvas/settingButton');
        this.rankButton = cc.find('Canvas/rankButton');
        this.tutorialButton = cc.find('Canvas/tutorialButton');
        this.settingButton.width = smallButtonWidth;
        this.settingButton.height = smallButtonHeight;
        this.settingButton.x = -234 * this.ratioWidth;
        this.settingButton.y = smallButtonY;
        this.rankButton.width = smallButtonWidth;
        this.rankButton.height = smallButtonHeight;
        this.rankButton.x = -110 * this.ratioWidth;
        this.rankButton.y = smallButtonY;
        this.tutorialButton.width = smallButtonWidth;
        this.tutorialButton.height = smallButtonHeight;
        this.tutorialButton.x = 12 * this.ratioWidth;
        this.tutorialButton.y = smallButtonY;
    }

    start() {

    }

    public gameStart() {
        cc.director.loadScene('Game');
        gameStatus.status = 'on';
    }

    // update (dt) {}
}
