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

    @property(cc.Node)
    background: cc.Node = null

    @property(cc.Node)
    bgSlider: cc.Node = null

    @property(cc.Node)
    audioSlider: cc.Node = null

    @property(cc.Node)
    rtnBtn: cc.Node = null
    // LIFE-CYCLE CALLBACKS:

    @property(cc.AudioSource)
    bgMusic: cc.AudioSource = null 

    ratioWidth: number = cc.winSize.width / 750
    ratioHeight: number = cc.winSize.height / 1334;

    backToStart(){
        cc.director.loadScene("Start");
    }

    onLoad() {
        //修改背景适配大小
        this.background.width = cc.winSize.width;
        this.background.height = cc.winSize.height;

        this.bgSlider.width = 400 * this.ratioWidth;
        this.bgSlider.height = 40 * this.ratioHeight;
        this.bgSlider.y = 150 * this.ratioHeight;

        this.audioSlider.width = 400 * this.ratioWidth;
        this.audioSlider.height = 40 * this.ratioHeight;
        this.audioSlider.y = -150 * this.ratioHeight;

        this.rtnBtn.width = 588 * this.ratioWidth;
        this.rtnBtn.height = 135 * this.ratioHeight;
        this.rtnBtn.x = 6 * this.ratioWidth;
        this.rtnBtn.y = -438 * this.ratioHeight;

        //读取默认背景和音效音量
        this.bgSlider.getComponent(cc.Slider).progress = gameStatus.audioBgVolume;
        this._updateBackgroundVolume(this.bgSlider.getComponent(cc.Slider).progress);

        this.audioSlider.getComponent(cc.Slider).progress = gameStatus.audioEffectVolume;
        this._updateEffectVolume(this.audioSlider.getComponent(cc.Slider).progress);
    }

    _updateBackgroundVolume(progress){
        this.bgMusic.volume = progress;
        gameStatus.audioBgVolume = progress;
    }

    _updateEffectVolume(progress){
        //this.music.volume = progress;
        gameStatus.audioEffectVolume = progress;
    }

    onBgSliderEvent (sender, eventType) {
        this._updateBackgroundVolume(sender.progress);
        console.log(sender.progress);
    }

    
    onEffectSliderEvent (sender, eventType) {
        //this._updateEffectVolume(sender.progress);
        console.log(sender.progress);
    }

    start() {

    }

    // update (dt) {}
}
