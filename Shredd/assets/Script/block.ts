// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Block extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property
    duration: number = 0.2;

    @property
    moveDistance: number = 200;

    // 只在两个碰撞体开始接触时被调用一次
   /* onBeginContact(contact, selfCollider, otherCollider) {
        console.log("xxxxxxxxxxxxxxxxxxxxxxxxx")
       // cc.director.loadScene("Over");
    }*/
 
    // 只在两个碰撞体结束接触时被调用一次
    onEndContact(contact, selfCollider, otherCollider) {
        console.log("lllllllllllllllllllllll")
        cc.director.loadScene("Over")
    }/*,
 
    // 每次将要处理碰撞体接触逻辑时被调用
    onPreSolve: function (contact, selfCollider, otherCollider) {
    },
 
    // 每次处理完碰撞体接触逻辑时被调用
    onPostSolve: function (contact, selfCollider, otherCollider) {
    }*/

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //this.addEventListners();
        this.moveDistance = Math.floor(cc.view.getFrameSize().width/2 - 40);
    }

    start () {
    }

    public moveRight(){
        return cc.moveBy(this.duration, cc.v2(this.moveDistance, 0)).easing(cc.easeCubicActionIn());
    }

    public moveLeft(){
        return cc.moveBy(this.duration, cc.v2(-this.moveDistance, 0)).easing(cc.easeCubicActionIn());
    }

    public onLeftTouchStart(){
        let __this=this;
        this.node.runAction(__this.moveLeft());
    }

    public onLeftTouchEnd(){
        let __this=this;
        this.node.runAction(__this.moveRight());
    }

    public onRightTouchStart(){
        let __this=this;
        this.node.runAction(__this.moveRight());
    }

    public onRightTouchEnd(){
        let __this=this;
        this.node.runAction(__this.moveLeft());
    }

    // update (dt) {}
}
