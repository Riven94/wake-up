
import { _decorator, Component, Node, Sprite, Camera, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BackgroubParellex')
export class BackgroubParellex extends Component {
    
    @property(Sprite)
    public background: Sprite;

    public parallaxScale: number = 1.2;
    public parallaxReductionFactor: number = 1;
    public smoothing: number;

    public curCamPos: Vec3;

    public prevCamPos:Vec3;

    onload(){
        this.curCamPos = this.node.position;
    }

    start () {
        this.prevCamPos = this.curCamPos;
    }

    update(dt){
        let parallax = (this.prevCamPos.x - this.curCamPos.x) * this.parallaxScale;

        let backgroundTargetPosX = this.background.node.position.x + parallax * (this.parallaxReductionFactor + 1);

        let backgroundTargetPos = new Vec3(backgroundTargetPosX, this.background.node.position.y, this.background.node.position.z);

        this.background.node.position.lerp(this.background.node.position, this.smoothing * dt);

        this.prevCamPos = this.node.position;
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
