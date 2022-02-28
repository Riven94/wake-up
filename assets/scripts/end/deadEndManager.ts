
import {
    _decorator,
    Component,
    Label,
    Animation,
    director,
    systemEvent,
    SystemEventType,
} from 'cc';
import config from './../util/config';
const { ccclass, property } = _decorator;

@ccclass('deadEndManager')
export class deadEndManager extends Component {
    // 开屏的文字对象
    @property(Label)
    public storyStr: Label;

    // 开屏的文字动画
    @property(Animation)
    public storyAnim: Animation;

    // 定时任务的标记
    private storyInterval: number;

    private intervalTime = 2500;

    private nextSenceName: string = "start-menu";

    start() {
        this.setStoryInterval();
    }

    // 开始加载故事并展现
    setStoryInterval() {
        let i = 0;
        this.storyStr.string = config.end_dead[i++];
        this.storyAnim.play();
        this.storyInterval = setInterval(() => {
            if (i < config.end_dead.length) {
                this.storyAnim.stop();
                if (i != config.end_dead.length - 1) {
                    this.storyAnim.play();
                } else {
                    this.storyStr.color.set(255, 255, 255);
                    setTimeout(() => {
                        director.loadScene('start-menu');
                    }, 1000);
                }
                this.storyStr.string = config.end_dead[i];
                i++;
            }
        }, this.intervalTime);
    }

}
