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
export default class online extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property
    wsQueue: WebSocket = null;

    @property
    wsRoom: WebSocket = null;

    @property
    connectionStatus: number = 0;//-1连接失败，0未开始，1均开始，2均结束，3自己结束对方未结束

    @property
    playerNum: number = -1;

    @property
    rivalScore: number = 0;

    @property(cc.Node)
    connectBoard: cc.Node = null;

    @property(cc.Node)
    connectBoardLabel: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.connectBoard = cc.find('Canvas/connectBoard');
        this.connectBoardLabel = cc.find('Canvas/connectBoard/Label')
    }

    start() {

    }

    public startOnlineMatching() {
        this.connectBoard.active = true;
        this.enterQueue();
    }

    public cancellMatching() {
        this.connectBoard.active = false;
        this.wsQueue.close();
        if (this.wsRoom != null)
            this.wsRoom.close();
    }

    public enterQueue() {
        this.wsQueue = new WebSocket("ws://http://152.136.192.32:8500/queue");
        let roomId = -1;
        const __this = this;
        this.wsQueue.onmessage = function (event) {
            if (event.data.findroom != null) {
                roomId = event.data.findroom;
                __this.wsQueue.close();
                __this.enterRoom(roomId);
            }
            else {
                __this.connectionStatus = -1;
                alert('服务器已满，请等候一会儿再进入！');
                __this.wsQueue.close();
                __this.connectBoard.active = false;
                //回大厅
            }
        }
    }

    public enterRoom(roomId) {
        this.wsRoom = new WebSocket(`ws://http://152.136.192.32:8500/room${roomId}`);
        const __this = this;
        this.wsRoom.onmessage = function (event) {
            if (event.data.playerNum != null) {
                __this.playerNum = parseInt(event.data.playerNum);
                if (__this.playerNum === 0) {
                    //显示请等待
                    __this.connectBoardLabel.getComponent('Label').string = '正在匹配旗鼓相当的对手!';
                }
                else {
                    __this.connectBoardLabel.getComponent('Label').string = '即将开始!';
                }
            }
            else if (event.data === 'start') {
                //开始游戏
                __this.connectBoardLabel.getComponent('Label').string = '即将开始!';
                gameStatus.online = true;
                cc.director.loadScene('Game');
            }
            else if (event.data.end === 1) {
                if (__this.playerNum === 0) {
                    __this.rivalScore = parseInt(event.data.playerB);
                }
                else {
                    __this.rivalScore = parseInt(event.data.playerA);
                }
                //显示相应画面
                __this.wsRoom.close();
            }
        }
    }

    // update (dt) {}
}
