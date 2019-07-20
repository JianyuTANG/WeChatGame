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

    @property(cc.Prefab)
    rankItem: cc.Prefab = null;

    @property(cc.Node)
    content: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        window.wx.onMessage(data => {
            switch (data.requestType) {
                case 'submit':
                    this.submit(data.score);
                    break;
                case 'getrank':
                    this.postRank();
                    break;
                case 'closeRANK':
                    this.hideRank();
                    break;

            }
        })
    }

    private submit(score) {
        window.wx.getUserCloudStorage({
            keyList: ['score'],
            success: response => {
                if (response.KVDataList.length > 0) {
                    if (response.KVDataList[0].value > score)
                        return;
                }
                window.wx.setUserCloudStorage({
                    KVDataList: [{
                        key: 'score',
                        value: score,
                    }]
                })
            }
        })
    }

    private postRank() {
        this.clear();
        window.wx.getUserInfo({
            openIdList: ['selfOpenId'],
            success: response => {
                let selfData = response.data[0];
                wx.getFriendCloudStorage({
                    keyList: ['score'],
                    success: res => {
                        let friendData = res.data;
                        friendData.sort(function (x, y) {
                            if (x.KVDataList.length === 0 && y.KVDataList.length === 0) {
                                return 0;
                            }
                            else if (x.KVDataList.length === 0) {
                                return 1;
                            }
                            else if (y.KVDataList.length === 0) {
                                return -1;
                            }
                            return (y.KVDataList[0].value - x.KVDataList[0].value);
                        })
                        const n=friendData.length;
                        for(let i=0;i<n;i++){
                            this.initUserItem(i, friendData[i]);
                        }
                    }
                })
            }
        });
        cc.find('Canvas/scrollview').active = true;
    }

    private hideRank() {

    }

    private clear() {
        cc.find('Canvas/scrollview').active = false;
        cc.find('Canvas/scrollview/view/content').removeAllChildren();
    }

    public initUserItem(position: number, data) {
        let node = cc.instantiate(this.rankItem);
        node.parent = this.content;
        node.getChildByName('position').getComponent(cc.Label).string = (position + 1) + '';//名词
        node.getChildByName('name').getComponent(cc.Label).string = data.nickName || data.nickname;//昵称
        node.getChildByName('score').getComponent(cc.Label).string = '0';
        if (data.KVDataList.length > 0) {
            node.getChildByName('score').getComponent(cc.Label).string = data.KVDataList[0].value + '';//分数
        }
        cc.loader.load({ url: data.avatarUrl, type: 'png' }, (err, texture) => {
            if (err) console.error(err);
            let userIcon = node.getChildByName('image').getComponent(cc.Sprite);
            userIcon.spriteFrame = new cc.SpriteFrame(texture);
        });
    }

    // update (dt) {}
}
