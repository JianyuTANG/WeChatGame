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
    bg: cc.Node = null

    @property(cc.AudioSource)
    bgMusic: cc.AudioSource = null

    ratioWidth = cc.winSize.width / 750;
    ratioHeight = cc.winSize.height / 1334;

    @property(cc.Node)
    public blockRight: cc.Node = null;

    @property(cc.Node)
    public blockLeft: cc.Node = null;

    @property
    stateRight: number = 0;

    @property
    stateLeft: number = 0;

    @property(cc.Node)
    labelText: cc.Node = null

    @property(cc.Node)
    rtnBtn: cc.Node = null

    step = 0

    // LIFE-CYCLE CALLBACKS:

    back() {
            cc.director.loadScene("Start");
    }

    onLoad() {
        this.bg.width = cc.winSize.width;
        this.bg.height = cc.winSize.height;

        this.bgMusic.volume = gameStatus.audioBgVolume;

        this.blockRight = cc.find("Canvas/blockRight");
        this.blockLeft = cc.find("Canvas/blockLeft");
        this.stateLeft = 0;
        this.stateRight = 0;

        this.rtnBtn.width = 588 * this.ratioWidth;
        this.rtnBtn.height = 135 * this.ratioHeight;
        this.rtnBtn.x = 6 * this.ratioWidth;
        this.rtnBtn.y = -438 * this.ratioHeight;

        console.log(this.blockLeft.getComponent('block').moveDistance)
        this.addEventListners();
    }

    start() {

    }

    private addEventListners() {
        this.node.on('leftTouchStart', this.leftTouchStart, this);
        this.node.on('leftTouchEnd', this.leftTouchEnd, this);

        this.node.on('rightTouchStart', this.rightTouchStart, this);
        this.node.on('rightTouchEnd', this.rightTouchEnd, this);
    }

    private leftTouchStart() {
        if (this.stateLeft >= 1) {
            this.stateLeft += 1;
            return;
        }
        this.stateLeft = 1;
        if (this.stateRight === 0) {
            this.blockLeft.getComponent('block').onLeftTouchStart();
            this.blockRight.getComponent('block').onLeftTouchStart();
        }
        else {
            this.blockLeft.getComponent('block').onRightTouchEnd();
            this.blockLeft.getComponent('block').onLeftTouchStart();
        }
    }

    private leftTouchEnd() {
        if (this.stateLeft > 1) {
            this.stateLeft -= 1;
            return;
        }
        this.stateLeft = 0;
        if (this.stateRight === 0) {
            this.blockRight.getComponent('block').onLeftTouchEnd();
            this.blockLeft.getComponent('block').onLeftTouchEnd();
            if (this.step === 1) {
                this.step = 2;
                this.labelText.getComponent(cc.Label).string = '点击左右两半屏幕\n两个方块会分别移动\n到两边';
            }
        }
        else {
            this.blockLeft.getComponent('block').onLeftTouchEnd();
            this.blockLeft.getComponent('block').onRightTouchStart();
            if (this.step === 2) {
                this.step = 3;
                this.labelText.getComponent(cc.Label).string = '游戏中，\n你需要通过以上动作\n来躲避障碍物。\n游戏难度会随着游戏\n速度提高而增大.\n教程结束!';
            }
        }
    }

    private rightTouchStart() {
        if (this.stateRight >= 1) {
            this.stateRight += 1;
            return;
        }
        this.stateRight = 1;
        if (this.stateLeft === 0) {
            this.blockRight.getComponent('block').onRightTouchStart();
            this.blockLeft.getComponent('block').onRightTouchStart();
        }
        else {
            this.blockRight.getComponent('block').onLeftTouchEnd();
            this.blockRight.getComponent('block').onRightTouchStart();
        }
    }

    private rightTouchEnd() {
        if (this.stateRight > 1) {
            this.stateRight -= 1;
            return;
        }
        this.stateRight = 0;
        if (this.stateLeft === 0) {
            this.blockLeft.getComponent('block').onRightTouchEnd();
            this.blockRight.getComponent('block').onRightTouchEnd();
            if (this.step === 0) {
                this.step = 1;
                this.labelText.getComponent(cc.Label).string = '点击左半屏幕\n两个方块会迅速移动\n到最左边';
            }
        }
        else {
            this.blockRight.getComponent('block').onRightTouchEnd();
            this.blockRight.getComponent('block').onLeftTouchStart();
            if (this.step === 2) {
                this.step = 3;
                this.labelText.getComponent(cc.Label).string = '游戏中，\n你需要通过以上动作\n来躲避障碍物。\n游戏难度会随着游戏\n速度提高而增大.\n教程结束!';
            }
        }
    }



    //update(dt) {}
}
