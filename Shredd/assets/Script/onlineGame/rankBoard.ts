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
let gameStatus = require('../gameStatus');

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(cc.Node)
    backButton: cc.Node = null;

    @property(cc.Node)
    upButton: cc.Node = null;

    @property(cc.Node)
    downButton: cc.Node = null;

    @property
    rankController: cc.Node = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        
    }

    start() {
        this.rankController = cc.find('onlineController');
    }

    public showRank() {
        this.rankController = cc.find('onlineController');
        if (!gameStatus.online) {
            this.rankController.getComponent('rank').showRank();
            this.node.active = true;
        }
    }

    public hideRank() {
        this.node.active = false;
        this.rankController.getComponent('rank').hideRank();
    }

    public pageDown() {
        this.rankController.getComponent('rank').pageDown();
    }

    public pageUp() {
        this.rankController.getComponent('rank').pageUp();
    }

    // update (dt) {}
}
