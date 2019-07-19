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
export default class item extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(cc.Label)
    position: cc.Label = null;

    @property(cc.Sprite)
    image: cc.Sprite = null;

    @property(cc.Label)
    wxName: cc.Label = null;

    @property(cc.Label)
    score: cc.Label = null;

    @property
    avatarUrl = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    public init(position: number, data) {
        this.position.string = (position + 1) + '';//名词
        this.wxName.string = data.nickname;//昵称
        this.score.string = '0';
        if (data.KVDataList.length > 0) {
            this.score.string = data.KVDataList[0].value + '';//分数
        }
        this.avatarUrl = data.avatarUrl;//头像
        this.addAvatar();//加载头像
    }

    private addAvatar() {
        let avatar = wx.createImage();
        avatar.onLoad = function () {
            let texture = new cc.Texture2D();
            texture.initWithElement(avatar);
            texture.handleLoadedTexture();
            this.image.spriteFrame = new cc.SpriteFrame(texture);
        };
        avatar.src = this.avatarUrl;
    }

    // update (dt) {}
}
