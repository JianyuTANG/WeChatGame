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
export default class Block extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property
    duration: number = 0.2;

    //@property
    moveDistance: number = Math.floor((cc.winSize.width / 2) - 20);

    @property(cc.Node)
    obstacleNode: cc.Node = null

    @property(cc.Node)
    onlineController: cc.Node = null

    @property(cc.AudioSource)
    audioCollision: cc.AudioSource = null

    @property(cc.AudioSource)
    audioBg: cc.AudioSource = null

    @property(cc.AudioSource)
    audioTap: cc.AudioSource = null

    // 只在两个碰撞体开始接触时被调用一次
    onBeginContact(contact, selfCollider, otherCollider) {
        console.log(otherCollider.node.name)
        if (otherCollider.node.name === 'blueBonus') {
            /*let shake: Shake = Shake.create(0.5, 0, 10);
            this.node.runAction(shake);*/
        } else {
            this.audioCollision.play()
            let score = this.obstacleNode.getComponent("obstaclePool").blockNum - 2;
            if (score > 0) {
                gameStatus.score = score;
            }

            console.log("#################")
            gameStatus.status = 'over'
            this.node.dispatchEvent(new cc.Event.EventCustom('setPause', true));
            // cc.director.loadScene("Over");
        }
    }

    // 只在两个碰撞体结束接触时被调用一次
    /* onEndContact(contact, selfCollider, otherCollider) {
         if (otherCollider.getComponent('blueBonus') !== null) {
             let shake: Shake = Shake.create(1, 20, 10);
             this.node.runAction(shake);
         } else {
             console.log("lllllllllllllllllllllll")
             //获取当前成绩，写入全局变量中
             let score = this.obstacleNode.getComponent("obstaclePool").blockNum - 2;
             if (score > 0) {
                 gameStatus.score = score;
             }
             gameStatus.status = 'over'
         }
         if (gameStatus.online === true) {
             this.onlineController = cc.find('onlineController');
             const online = this.onlineController.getComponent('online');
             online.gameOver();
         }
         cc.director.loadScene("Over");
 
     }/*,
  
     // 每次将要处理碰撞体接触逻辑时被调用
     onPreSolve: function (contact, selfCollider, otherCollider) {
     },
  
     // 每次处理完碰撞体接触逻辑时被调用
     onPostSolve: function (contact, selfCollider, otherCollider) {
     }*/

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        //this.moveDistance=Math.floor((cc.winSize.width / 2) - 40);
        console.log(cc.winSize.width)
        //console.log(this.moveDistance)
        this.audioBg.volume = gameStatus.audioBgVolume;
        this.audioCollision.volume = gameStatus.audioEffectVolume;
        this.audioTap.volume = gameStatus.audioEffectVolume;
    }

    start() {
    }

    public moveRight() {
        return cc.moveBy(this.duration, cc.v2(this.moveDistance, 0)).easing(cc.easeCubicActionIn());
    }

    public moveLeft() {
        return cc.moveBy(this.duration, cc.v2(-this.moveDistance, 0)).easing(cc.easeCubicActionIn());
    }

    public onLeftTouchStart() {
        let __this = this;
        this.node.runAction(__this.moveLeft());
    }

    public onLeftTouchEnd() {
        let __this = this;
        this.node.runAction(__this.moveRight());
    }

    public onRightTouchStart() {
        let __this = this;
        this.node.runAction(__this.moveRight());
    }

    public onRightTouchEnd() {
        let __this = this;
        this.node.runAction(__this.moveLeft());
    }

    // update (dt) {}
}
