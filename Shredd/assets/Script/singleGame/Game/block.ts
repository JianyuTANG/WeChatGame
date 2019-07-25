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

@ccclass
export default class Block extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property
    duration: number = 0.2;

    //@property
    moveDistance: number = Math.floor((cc.winSize.width / 2) - 39);

    @property(cc.Node)
    obstacleNode: cc.Node = null

    @property(cc.Node)
    onlineController: cc.Node = null

    @property(cc.AudioSource)
    audioCollision: cc.AudioSource = null

    @property(cc.AudioSource)
    audioTap: cc.AudioSource = null

    @property(cc.Prefab)
    bonusShine: cc.Prefab=null


    // 只在两个碰撞体开始接触时被调用一次
    onBeginContact(contact, selfCollider, otherCollider) {
      //  console.log(otherCollider.node.name)
        if (otherCollider.node.name === 'blueBonus') {
            //彩蛋效果:粒子系统
            var newShine=cc.instantiate(this.bonusShine)
            cc.find('Canvas').addChild(newShine)
        } else {
            //播放撞击音效
            this.audioCollision.play()
            //将分数写入全局
            let score = this.obstacleNode.getComponent("obstaclePool").blockNum - 2;
            if (score > 0) {
                gameStatus.score = score;
            }
            //修改游戏状态为结束，触发结束效果：先暂停，后抖动，再加载结束界面
            gameStatus.status = 'over'
            this.node.dispatchEvent(new cc.Event.EventCustom('setPause', true));
        }
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        //调整背景音乐和音效音量
        this.audioCollision.volume = gameStatus.audioEffectVolume;
        this.audioTap.volume = gameStatus.audioEffectVolume;
        this.screenMatch();
    }

    start() {
    }

    private screenMatch(){
        if(cc.winSize.width<361){
            this.moveDistance = Math.floor((cc.winSize.width / 2) - 30);
        }
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
