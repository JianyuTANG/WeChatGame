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
    shiftSpeed: number = 1.2;

    //障碍物随机生成类型
    obstacleTypeList: Array<number> = [0, 1, 2, 3, 2, 0, 1, 3, 2, 1,
        2, 0, 2, 3, 1, 2, 0, 1, 3, 0,
        1, 1, 2, 0, 1, 3, 0, 3, 2, 0,
        0, 1, 3, 2, 1, 2, 0, 1, 3, 3,
        3, 1, 2, 0, 2, 3, 1, 0, 2, 1]

    blockNum: number = 0

    //障碍物靠左的横坐标
    leftX: number = 110 - cc.winSize.width / 2  //参数90设置很迷幻

    //障碍物靠右的横坐标
    rightX: number = cc.winSize.width / 2 - 110

    //障碍物的初始高度
    initY: number = cc.winSize.height / 2 + 280;

    flag: boolean = false

    level: number = 0;


    spawnNewObstacle() {
        //根据提前生成的列表，生成一个障碍物节点
        var type = this.obstacleTypeList[this.blockNum % 50];
        let newObstacle = cc.instantiate(this.obstaclePrefab[type]);
        this.node.addChild(newObstacle);
        newObstacle.setPosition(this.getPosition(newObstacle, type));
        newObstacle.getComponent(cc.RigidBody).linearVelocity = this.getPace();
        this.blockNum++
        if (this.blockNum > 2) {
            /* if(this.blockNum%5===1){
                 this.blockNum++;
             }*/
            this.label.getComponent(cc.Label).string = (this.blockNum - 2).toString();
            /* if(this.blockNum%5===2){
                 this.blockNum--;
             }*/
        }

    }

    spawnNewBonus() {
        let newBonus = cc.instantiate(this.bonusPrefab);
        this.node.addChild(newBonus);  
        newBonus.getComponent(cc.RigidBody).linearVelocity = this.getPace();
        newBonus.setPosition(0, this.initY);
        this.blockNum++;
        if (this.blockNum > 2) {
            this.label.getComponent(cc.Label).string = (this.blockNum - 2).toString();
        }
        this.blockNum--;
    }

    getPosition(newObstacle: cc.Node, type) {
        if (type === 0) {
            //left
           // newObstacle.width=0.8*cc.winSize.width;
            return cc.v2(this.leftX, this.initY)
        } else if (type === 1) {
            //right
            return cc.v2(this.rightX, this.initY)
        } else if (type === 2) {
           // newObstacle.width=4/5*cc.winSize.width;
            return cc.v2(0, this.initY)
        } else {
            //hollow
            //newObstacle.getComponent("hollowObstacle").si
          //  newObstacle.width=cc.winSize.width;
            return cc.v2(0, this.initY)
        }
    }

    removeUnusedObstacle() {
        for (let i in this.node.children) {
            if (this.node.children[i].y < -400) {
                //console.log("remove once")
                this.node.children[i].destroy();
                break;
            }
        }
    }

    setPause() {
        for (let i in this.node.children) {
            //使所有障碍物静止
            this.node.children[i].getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
        }
    }

    backToLife() {
        for (let i in this.node.children) {
            //使所有障碍物静止
            this.node.children[i].getComponent(cc.RigidBody).linearVelocity = this.getPace();
        }
    }

    getPace() {
        return cc.v2(0, -340 - this.level * 40)
    }

    levelUp() {
        this.level++;
        //控制障碍物间隔不变 
        this.shiftSpeed = 1.2 * 320 / (340 + this.level * 40)
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.obstacleTypeList.push(Math.floor(Math.random() * 4))
        this.spawnNewObstacle();
    }

    callback=function () {
        if (gameStatus.status === 'on') {
            if (this.blockNum % 10 === 0 && this.flag) {
                this.levelUp();                
                this.spawnNewBonus();
                this.flag = false;
                this.unschedule(this.callback)
                this.schedule(this.callback,this.shiftSpeed)
            } else {
                //生成一个障碍物节点
                this.spawnNewObstacle();
                this.removeUnusedObstacle();
                this.flag = true;
            }
        }
    }

    start() {
        //每1秒生成一个新节点
        this.schedule(this.callback, this.shiftSpeed)
    }

    //update(dt) {}
}
