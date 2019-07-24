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

var gameStatus = require('../../gameStatus')

import { Shake } from './shake';

@ccclass
export default class Control extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(cc.Node)
    public blockRight: cc.Node = null;

    @property(cc.Node)
    public blockLeft: cc.Node = null;

    @property
    stateRight: number = 0;

    @property
    stateLeft: number = 0;

    @property(cc.Node)
    obstacleNode: cc.Node = null

    @property(cc.Node)
    rightButton: cc.Node = null

    @property(cc.Node)
    leftButton: cc.Node = null

    @property(cc.Node)
    pauseBtn: cc.Node = null

    @property(cc.AudioSource)
    audioBg: cc.AudioSource = null


    counter: number = 0;

    // LIFE-CYCLE CALLBACKS:

    setPause() {
        console.log('00000' + gameStatus.status)
        if (gameStatus.status === 'pause') {
            gameStatus.status = 'on'
            this.rightButton.active = true;
            this.leftButton.active = true;
            this.obstacleNode.getComponent('obstaclePool').backToLife();
        } else {
            if (gameStatus.status === 'on') {
                gameStatus.status = 'pause'
            }
            this.obstacleNode.getComponent('obstaclePool').setPause();
            //控制面板使不激活
            this.rightButton.active = false;
            this.leftButton.active = false;

            if (gameStatus.status === 'over') {
                //生成撞击抖动效果,0.5秒后加载结束界面
                let shake: Shake = Shake.create(0.5, 2, 10);
                this.node.runAction(shake);
                // this.counter++;
                this.scheduleOnce(function () {
                    if (gameStatus.online === true) {
                        cc.director.loadScene('onlineOver');
                    }
                    else {
                        cc.director.loadScene("Over");
                    }
                }, 0.5);

            }
        }
    }

    onLoad() {
        this.blockRight = cc.find("Canvas/blockRight");
        this.blockLeft = cc.find("Canvas/blockLeft");
        this.stateLeft = 0;
        this.stateRight = 0;
        //console.log(this.blockRight.getComponent('block').onLeftTouchStart)
        //this.blockRight.getComponent('block').moveDistance=Math.floor((cc.winSize.width / 2) - 40);
        //this.blockLeft.getComponent('block').moveDistance=Math.floor((cc.winSize.width / 2) - 40);
        console.log(this.blockLeft.getComponent('block').moveDistance)
        this.addEventListners();

        //调整背景音乐音量
        this.audioBg.volume = gameStatus.auidoBgVolume;
    }

    start() {

    }

    private addEventListners() {
        this.node.on('leftTouchStart', this.leftTouchStart, this);
        this.node.on('leftTouchEnd', this.leftTouchEnd, this);

        this.node.on('rightTouchStart', this.rightTouchStart, this);
        this.node.on('rightTouchEnd', this.rightTouchEnd, this);

        this.node.on('setPause', this.setPause, this);
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
        }
        else {
            this.blockLeft.getComponent('block').onLeftTouchEnd();
            this.blockLeft.getComponent('block').onRightTouchStart();
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
        }
        else {
            this.blockRight.getComponent('block').onRightTouchEnd();
            this.blockRight.getComponent('block').onLeftTouchStart();
        }
    }



    //update(dt) {}
}
