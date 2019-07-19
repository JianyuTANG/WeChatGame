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
    content:cc.Node=null;

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
                        friendData.forEach(element => {
                            let myItem = cc.instantiate(this.rankItem);
                            myItem.getComponent('item').init(friendData.IndexOf(element),element);
                            cc.find('Canvas/scrollview/view/content').addChild(myItem);
                        });
                    }
                })
            }
        });
        cc.find('Canvas/scrollview').active=true;
    }

    private hideRank() {

    }

    private clear() {
        cc.find('Canvas/scrollview').active=false;
        cc.find('Canvas/scrollview/view/content').removeAllChildren();
    }

    // update (dt) {}
}
