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

    @property(cc.Node)
    bg: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.matchScreen();
        wx.setEnableDebug({
            enableDebug: true
        });
        //分包加载
    }

    private matchScreen() {
        this.bg.width = cc.winSize.width;
        this.bg.height = cc.winSize.height;
    }

    start() {
        this.loadPackage();
    }

    private loadPackage() {
        cc.loader.downloader.loadSubpackage('Texture', function (err) {
            if (err) {
                return console.error(err);
            }
            console.log('load subpackage successfully.');
            cc.director.loadScene('Start');
        });
    }

    // update (dt) {}
}
