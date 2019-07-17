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

var gameStatus=require("../gameStatus")

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(cc.Node)
    background: cc.Node=null

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var ratioWidth = cc.winSize.width / 750;
        var ratioHeight = cc.winSize.height / 1334;
        this.background.width = cc.winSize.width;
        this.background.height = cc.winSize.height;
        console.log(gameStatus.score);
        this.label.getComponent(cc.Label).string=gameStatus.score.toString();
    }

    start () {

    }

    // update (dt) {}
}
