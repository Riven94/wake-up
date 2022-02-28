
import {
    _decorator,
    Component,
    Label,
    Animation,
    director,
    systemEvent,
    SystemEventType,
    Sprite
} from 'cc';
import config from './../util/config';
const { ccclass, property } = _decorator;

@ccclass('endFalseManager')
export class endFalseManager extends Component {
    // 开屏的文字对象
    @property(Label)
    public storyStr: Label;

    // 开屏的文字动画
    @property(Animation)
    public storyAnim: Animation;

    @property([Sprite])
    public imgs: Sprite[] = [];

    // 定时任务的标记
    private storyInterval: number;

    private intervalTime = 2500;

    private nextSenceName: string = "start-menu";

    public len: number;

    start() {
        this.len = this.imgs.length;
        this.setStoryInterval();
        for (let i = 0; i < this.len; i++) {
            this.imgs[i].node.setPosition(0, 0, 0);
        }
    }

    // 开始加载故事并展现
    setStoryInterval() {
        let i = 0;
        this.storyInterval = setInterval(() => {
            if (i < config.end_false.length) {
                this.storyAnim.stop();
                this.storyAnim.play();
                if (i != config.end_false.length - 1) {
                    this.storyAnim.play();
                } else {
                    this.storyStr.color.set(255, 255, 255);
                    setTimeout(() => {
                        director.loadScene('start-menu');
                    }, 1000);
                }
                this.storyStr.string = config.end_false[i];
                this.imgs[i].node.active = false;
                i++;
            }
        }, this.intervalTime);
    }

}
