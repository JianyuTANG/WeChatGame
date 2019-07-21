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
export default class rank extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.getRank();
    }

    public showRank(){
        cc.find('Canvas/rank').active=true;
    }

    public hideRank(){
        cc.find('Canvas/rank').active=false;
    }

    private submitScore(myScore:number){
        window.wx.postMessage({
            requestType: 'submit',
            dataType: 'score',
            score: myScore,
        })
    }

    private getRank(){
        window.wx.postMessage({
            requestType: 'getrank',
            dataType: 'score',
        })
    }

    // update (dt) {}
}
