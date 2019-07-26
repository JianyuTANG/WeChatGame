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
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property([cc.Prefab])
    //存放障碍物预制资源列表
    obstaclePrefab: [cc.Prefab] = [null];

    @property(cc.Prefab)
    //存放每过十个障碍物的彩蛋
    bonusPrefab: cc.Prefab = null;

    @property(cc.Node)
    background: cc.Node = null

    counter: number = 0;
    //障碍物生成速度，单位/秒
    shiftSpeed: number = 1.1;

    //障碍物随机生成类型
    obstacleTypeList: Array<number> = [0, 1, 2, 3, 2, 0, 1, 3, 2, 1,
        2, 0, 2, 3, 1, 2, 0, 1, 3, 0,
        1, 1, 2, 0, 1, 3, 0, 3, 2, 0,
        0, 1, 3, 2, 1, 2, 0, 1, 3, 3,
        3, 1, 2, 0, 2, 3, 1, 0, 2, 1,
        2, 3, 1, 0, 1, 0, 2, 3, 1, 2]

    blockNum: number = 0

    //障碍物靠左的横坐标
    //leftX: number = 110 - cc.winSize.width / 2;  //参数110设置很迷幻
    leftX: number = -56;

    //障碍物靠右的横坐标
    //rightX: number = cc.winSize.width / 2 - 110;
    rightX: number = 56;

    //障碍物的初始高度
    initY: number = cc.winSize.height / 2 + 280;

    flag: boolean = false

    level: number = 0;

    startSpeed = 380

    currentScore = 0;

    removeStatus = 0;


    spawnNewObstacle() {
        //根据提前生成的列表，生成一个障碍物节点
        var type = Math.floor(Math.random() * 4);
        let newObstacle = cc.instantiate(this.obstaclePrefab[type]);
        this.node.addChild(newObstacle);
        newObstacle.setPosition(this.getPosition(newObstacle, type));
        newObstacle.getComponent(cc.RigidBody).linearVelocity = this.getPace();
        this.blockNum++;
        /*
        if (this.blockNum > 2) {
            this.label.getComponent(cc.Label).string = (this.blockNum - 2).toString();
        }
        */
    }

    spawnNewBonus() {
        let newBonus = cc.instantiate(this.bonusPrefab);
        this.node.addChild(newBonus);
        newBonus.getComponent(cc.RigidBody).linearVelocity = this.getPace();
        newBonus.setPosition(0, this.initY);
        /*
        this.blockNum++;
        if (this.blockNum > 2) {
            this.label.getComponent(cc.Label).string = (this.blockNum - 2).toString();
        }
        this.blockNum--;
        */
    }

    getPosition(newObstacle: cc.Node, type) {
        if (type === 0) {
            //left
            return cc.v2(this.leftX, this.initY)
        } else if (type === 1) {
            //right
            return cc.v2(this.rightX, this.initY)
        } else if (type === 2) {
            //middle
            return cc.v2(0, this.initY)
        } else {
            //hollow
            return cc.v2(0, this.initY)
        }
    }

    removeUnusedObstacle() {
        //每帧只移除一个
        /*
        if (this.node.children[0].y < -220) {
            this.currentScore++;
            this.label.getComponent(cc.Label).string = this.currentScore.toString();
        }
        */
        if (this.node.children[0].y < -400) {
            this.node.children[0].destroy();
            this.removeStatus = 0;
        }
    }

    setPause() {
        this.node.children.forEach(element => {
            //使所有障碍物静止
            element.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
        })
    }

    backToLife() {
        this.node.children.forEach(element => {
            //使所有障碍物恢复原速度
            element.getComponent(cc.RigidBody).linearVelocity = this.getPace();
        })
    }

    getPace() {
        return cc.v2(0, -340 - this.level * 40)
    }

    levelUp() {
        this.level++;
        //控制障碍物间隔不变 
        this.shiftSpeed = 1.1 * this.startSpeed / (this.startSpeed + this.level * 30);
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.obstacleTypeList.push(Math.floor(Math.random() * 4))
        this.spawnNewObstacle();
    }

    callback = function () {
        if (gameStatus.status === 'on') {
            if (this.blockNum % 10 === 0 && this.flag) {
                this.levelUp();
                this.spawnNewBonus();
                this.flag = false;
                this.unschedule(this.callback);
                this.schedule(this.callback, this.shiftSpeed);
                this.removeStatus = 0;
            } else {
                //生成一个障碍物节点
                this.spawnNewObstacle();
                this.removeUnusedObstacle();
                this.flag = true;
            }
        }
    }

    start() {
        //每1.1秒生成一个新节点
        this.schedule(this.callback, this.shiftSpeed)
    }

    update(dt) {
        if (this.removeStatus === 0 && this.node.children[0] != null) {
            if(this.blockNum%10===2){
                ;//不做操作
            }
            else if (this.node.children[0].y < -290) {
                this.removeStatus = 1;
                this.currentScore++;
                this.label.getComponent(cc.Label).string = this.currentScore.toString();
            }
        }
    }
}
