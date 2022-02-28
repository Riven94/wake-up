
import { _decorator, Component, Node, Label, Button } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ClueItemController')
export class ClueItemController extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    @property(Label)
    public msgStr: Label;

    @property(Button)
    public btnYes: Button;

    @property(Button)
    public btnNo: Button;

    start() {
        // [3]
    }

    public setOk() {
        this.btnNo.interactable = true;
        this.btnYes.interactable = false;
    }

    public setNo() {
        this.btnNo.interactable = false;
        this.btnYes.interactable = true;
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
