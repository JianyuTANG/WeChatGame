

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

    // LIFE-CYCLE CALLBACKS:

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

        //cc.director.getCollisionManager().enabled=true;
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



    // update (dt) {}
}
