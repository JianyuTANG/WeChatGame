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

    @property(cc.Prefab)
    pageItem: cc.Prefab = null;

    @property(cc.Node)
    content: cc.Node = null;

    @property
    pages = [];

    @property
    currrentPage: number = 0;

    @property
    pageNum: number = 0;

    // LIFE-CYCLE CALLBACKS:

    //onLoad () {}

    start() {
        window.wx.onMessage(data => {
            switch (data.requestType) {
                case 'submit':
                    this.submit(data.score);
                    break;
                case 'getrank':
                    this.postRank();
                    break;
                case 'showrank':
                    this.showRank();
                    break;
                case 'closerank':
                    this.hideRank();
                    break;
                case 'down':
                    this.pageDown();
                    break;
                case 'up':
                    this.pageUp();
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
                        value: '' + score,
                    }],
                    success: res => {
                        console.log('succeed submit!')
                    }
                });
            }
        })
    }

    private postRank() {
        this.clear();
        window.wx.getUserInfo({
            openIdList: ['selfOpenId'],
            success: response => {
                let selfData = response.data[0];
                window.wx.getFriendCloudStorage({
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
                        const n = friendData.length;
                        this.pageNum = Math.floor(n / 7);
                        for (let i = 0; i <= this.pageNum; i++) {
                            let page = cc.instantiate(this.pageItem);
                            page.parent = cc.find('Canvas');
                            page.active = false;
                            page.x = 0;
                            page.y = 0;
                            this.pages.push(page);
                        }
                        for (let i = 0; i < n; i++) {
                            this.initUserItem(i, friendData[i], this.pages[Math.floor(i / 7)]);
                        }
                    }
                })
            }
        });
    }

    private hideRank() {
        this.pages[this.currrentPage].active = false;
    }

    private showRank() {
        this.pages[0].active = true;
        this.currrentPage = 0;
    }

    private pageDown() {
        if (this.currrentPage === this.pageNum) {
            return;
        }
        this.pages[this.currrentPage].active = false;
        this.currrentPage++;
        this.pages[this.currrentPage].active = true;
    }

    private pageUp() {
        if (this.currrentPage === 0) {
            return;
        }
        this.pages[this.currrentPage].active = false;
        this.currrentPage--;
        this.pages[this.currrentPage].active = true;
    }

    private clear() {
        this.pages = [];
    }

    public initUserItem(position: number, data, father) {
        let node = cc.instantiate(this.rankItem);
        node.parent = father;
        node.x = 0;
        node.getChildByName('position').getComponent(cc.Label).string = (position + 1) + '';//名次
        node.getChildByName('name').getComponent(cc.Label).string = data.nickName || data.nickname;//昵称
        switch (position) {
            case 0:
                node.getChildByName('name').color = cc.color(255, 0, 0, 255);
                break;
            case 1:
                node.getChildByName('name').color = cc.color(255, 255, 0, 255);
                break;
            case 2:
                node.getChildByName('name').color = cc.color(255, 255, 0, 255);
                break;
        }
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
