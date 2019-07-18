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

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property([cc.Node])
    far_bg: [cc.Node] = [null]  //用于管理背景图片结点的数组,记得回cocos面板中添加数组的结点数量

    @property(Number)
    bg_speed: Number=0.6   //移动时控制速度的变量

    bgMove(bgList, speed) {
        //每次循环二张图片一起滚动
        for (var index = 0; index < bgList.length; index++) {
            bgList[index].y -= speed;
        }

        //y坐标减去自身的height得到这张背景刚好完全离开场景时的y值
        if (bgList[0].y <= 10 - bgList[0].height) {
            bgList[0].y = 1334; //离开场景后将此背景图的y重新赋值，位于场景的上方
        }

        if (bgList[1].y <= 1344 - 2 * bgList[1].height) {
            bgList[1].y = 1334;
        }

    }

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.far_bg[0].width=cc.winSize.width;
        this.far_bg[1].width=cc.winSize.width;
    }

    start() {

    }

    update(dt) {
        //console.log("moveeeeeeeeeeeeeee")
        this.bgMove(this.far_bg, this.bg_speed);
    }
}
