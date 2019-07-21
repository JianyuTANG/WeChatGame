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
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(cc.AudioSource)
    audioTap: cc.AudioSource = null

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.addEventListners();
    }

    start () {

    }

    private addEventListners(){
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
    }

    private touchStart(){
        this.audioTap.play()
        this.node.dispatchEvent( new cc.Event.EventCustom('rightTouchStart', true) );
        this.node.emit('rightTouchStart');
    }

    private touchEnd(){
        this.node.dispatchEvent( new cc.Event.EventCustom('rightTouchEnd', true) );
    }

    // update (dt) {}
}
