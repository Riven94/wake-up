
import {
    _decorator,
    Component,
    Label,
    Animation,
    director,
    systemEvent,
    SystemEventType,
    Sprite,
    AudioSource,
    Vec3
} from 'cc';
import config from './../util/config';
const { ccclass, property } = _decorator;

@ccclass('OpenManager')
export class OpenManager extends Component {
    // 开屏的文字对象
    @property(Label)
    public storyStr: Label;

    // 开屏的文字动画
    @property(Animation)
    public storyAnim: Animation;

    @property(Animation)
    public roleAnim: Animation;

    // 开屏的文字动画
    @property(Sprite)
    public startPage: Sprite;

    // 定时任务的标记
    private storyInterval: number;

    private intervalTime = 2500;

    private nextSenceName: string = "start-menu";

    public startPos: Vec3;

    start() {
        this.startPos = this.storyStr.node.position;
        console.log(this.startPos);
        this.storyStr.node.setPosition(new Vec3(this.startPos.x, this.startPos.y - 200, 0));
        console.log(this.storyStr.node.position);
        setTimeout(() => {
            director.preloadScene(this.nextSenceName);
        }, 0);
        this.setBindEvent();
        this.setStoryInterval();
    }

    // 开始加载故事并展现
    setStoryInterval() {
        let i = 0;
        this.storyStr.string = config.storys[i++];
        this.roleAnim.play();
        this.storyAnim.play();
        console.log(this.startPos);
        const posY = this.startPos.y + 200;
        this.storyInterval = setInterval(() => {
            this.storyStr.node.setPosition(new Vec3(this.startPos.x, posY, 0));
            this.roleAnim.stop();
            this.roleAnim.node.active = false;
            if (i < config.storys.length) {
                this.storyAnim.stop();
                if (i != config.storys.length - 1) {
                    this.storyAnim.play();
                } else {
                    this.storyStr.color.set(255, 255, 255);
                }
                let color = this.startPage.color;
                this.startPage.color.set(color.r, color.g, color.b, 255 * i / config.storys.length / 2);
                this.storyStr.string = config.storys[i];
                i++;
            } else {
                clearInterval(this.storyInterval);
                this.onGoSence();
            }
        }, this.intervalTime);
    }

    // 按键绑定
    setBindEvent() {
        systemEvent.on(SystemEventType.KEY_DOWN, this.onGoSence, this);
        systemEvent.on(SystemEventType.MOUSE_DOWN, this.onGoSence, this);
        systemEvent.on(SystemEventType.TOUCH_START, this.onGoSence, this);
    }

    // 解除按键绑定
    setUnBindEvent() {
        systemEvent.off(SystemEventType.KEY_DOWN, this.onGoSence, this);
        systemEvent.off(SystemEventType.MOUSE_DOWN, this.onGoSence, this);
        systemEvent.off(SystemEventType.TOUCH_START, this.onGoSence, this);
    }

    // 跳转下一个场景
    onGoSence() {
        this.setUnBindEvent();
        clearInterval(this.storyInterval);
        this.node.getComponent(AudioSource).stop();
        director.loadScene(this.nextSenceName);
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
 */
