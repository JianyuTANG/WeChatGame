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
let gameStatus = require("../gameStatus")
let io = require('./weapp.socket.io.js')

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property
    roomIo = null;

    @property
    queueIo = null;

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
        cc.game.addPersistRootNode(this.node);
        this.connectBoard = cc.find('Canvas/connectBoard');
        this.connectBoardLabel = cc.find('Canvas/connectBoard/Label');
    }

    start() {

    }

    public startOnlineMatching() {
        this.init();
        this.connectBoard = cc.find('Canvas/connectBoard');
        this.connectBoard.active = true;
        console.log(666)
        this.enterQueue();
    }

    public startOnlineFromOverpage(){
        cc.director.loadScene('Start');
        //this.startOnlineMatching();
    }

    public cancellMatching() {
        this.connectBoard = cc.find('Canvas/connectBoard');
        this.connectBoard.active = false;
        gameStatus.online = false;
        this.queueIo.disconnect();
        if (this.roomIo != null)
            this.roomIo.disconnect();
    }

    public gameOver() {
        this.roomIo.emit('gameEnd', { 'point': gameStatus.score });
    }

    private init() {
        this.queueIo = null;
        this.roomIo = null;
        this.connectionStatus = 0;
        this.playerNum = -1;
        this.rivalScore = 0;
        gameStatus.online = true;
    }

    private enterQueue() {
        this.queueIo = io.connect('http://152.136.192.32:8500/queue', { 'reconnection': false });
        let roomId = -1;
        this.queueIo.on('findroom', data => {
            roomId = data.roomId;
            console.log(data.roomId);
            this.enterRoom(roomId);
            this.queueIo.disconnect();
        });
        this.queueIo.on('reject', () => {
            this.connectionStatus = -1;
            alert('服务器已满，请等候一会儿再进入！');
            this.connectBoard.active = false;
            this.queueIo.disconnect();
        });
    }

    private enterRoom(roomId) {
        this.connectBoard = cc.find('Canvas/connectBoard');
        this.connectBoardLabel = cc.find('Canvas/connectBoard/Label');
        this.roomIo = io.connect(`http://152.136.192.32:8500/room${roomId}`, { 'reconnection': false });
        this.roomIo.on('playerNum', data => {
            this.playerNum = data.num;
            if (this.playerNum === 0) {
                this.connectBoardLabel.getComponent(cc.Label).string = '正在匹配!';
            }
            else {
                this.connectBoardLabel.getComponent(cc.Label).string = '即将开始!';
            }
        });
        this.roomIo.on('start', () => {
            this.connectBoardLabel.getComponent(cc.Label).string = '即将开始!';
            gameStatus.online = true;
            cc.director.loadScene('Game');
            gameStatus.status = 'on';
        });
        this.roomIo.on('end', data => {
            if (this.playerNum === 0) {
                this.rivalScore = data.playerB;
            }
            else {
                this.rivalScore = data.playerA;
            }
            this.connectionStatus = 2;
            this.roomIo.disconnect();
        });
    }

    // update (dt) {}
}
