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

    @property([cc.Prefab])
    //存放障碍物预制资源列表
    obstaclePrefab: [cc.Prefab]=[null];

    counter: number=0;
    //障碍物生成速度，单位/帧
    shiftSpeed: number=105;

    //障碍物随机生成类型
    obstacleTypeList: Array<number>=[]

    blockNum: number=0

    //障碍物靠左的横坐标
    leftX: number=90-cc.winSize.width/2  //参数90设置很迷幻

    //障碍物靠右的横坐标
    rightX: number=cc.winSize.width/2-90

    //障碍物的初始高度
    initY: number=cc.winSize.height/2+300;


    spawnNewObstacle(){
        //根据提前生成的列表，生成一个障碍物节点
        var type=this.obstacleTypeList[this.blockNum];
        let newObstacle=cc.instantiate(this.obstaclePrefab[type]);
        this.node.addChild(newObstacle);
        this.blockNum++
        if(this.blockNum>3){
            this.label.getComponent(cc.Label).string=(this.blockNum-3).toString();
        }
        newObstacle.setPosition(this.getPosition(newObstacle,type));
    }

    getPosition(newObstacle:cc.Node,type){
        if(type===0){  
            //left
            return cc.v2(this.leftX,this.initY)
        }else if(type===1){
            //right
            return cc.v2(this.rightX,this.initY)
        }else if(type===2){
            //middle
         return cc.v2(0,this.initY)
        }else{
            //hollow
            //newObstacle.getComponent("hollowObstacle").si
            return cc.v2(0,this.initY)
        }
    }

    removeUnusedObstacle(){
        for(let i in this.node.children){
            if(this.node.children[i].y<-200){
                //console.log("remove once")
                this.node.children[i].destroy();
                break;
            }
        }
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad () {  
        this.obstacleTypeList.push(Math.floor(Math.random()*4))
        this.spawnNewObstacle();
    }

    start () {

    }

    update (dt) {
        this.counter=(this.counter+1)%this.shiftSpeed;
        if(this.counter===0){
           // console.log("happen once");
            this.obstacleTypeList.push(Math.floor(Math.random()*4))
            this.spawnNewObstacle();
            this.removeUnusedObstacle();
        }
    }
}
