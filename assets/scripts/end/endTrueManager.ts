
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

@ccclass('endTrueManager')
export class endTrueManager extends Component {

    // 开屏的文字动画
    @property(Animation)
    public storyAnim: Animation;

    // 定时任务的标记
    private storyInterval: number;

    private intervalTime = 5300;

    private nextSenceName: string = "start-menu";

    public len: number;

    start(){
        this.setStoryInterval();
    }

    // 开始加载故事并展现
    setStoryInterval() {
        this.storyInterval = setTimeout(() => {
                this.storyAnim.stop();
                director.loadScene(this.nextSenceName);
        }, this.intervalTime);
    }

}
