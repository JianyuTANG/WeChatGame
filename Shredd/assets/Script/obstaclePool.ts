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

    @property(cc.Prefab)
    obstaclePrefab: cc.Prefab=null;

    counter: number=0;
    //障碍物生成速度，单位/帧
    shiftSpeed: number=150;

    spawnNewObstacle(){
        let newObstacle=cc.instantiate(this.obstaclePrefab);
        this.node.addChild(newObstacle);
        newObstacle.setPosition(this.getRandomPosition());
    }

    getRandomPosition(){
        var type=Math.floor(Math.random()*3);
        if(type===1){
            return cc.v2(-100,400)
        }else if(type===2){
            return cc.v2(0,400)
        }else
         return cc.v2(100,400)
    }

    removeUnusedObstacle(){
        for(let i in this.node.children){
            if(this.node.children[i].y<-100){
                console.log("remove once")
                this.node.children[i].destroy();
                break;
            }
        }
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.spawnNewObstacle();
        //cc.director.getPhysicsManager().enabled=true;
    }

    start () {

    }

    update (dt) {
        this.counter=(this.counter+1)%this.shiftSpeed;
        if(this.counter==0){
            console.log("happen once");
            this.spawnNewObstacle();
            this.removeUnusedObstacle();
        }
    }
}
