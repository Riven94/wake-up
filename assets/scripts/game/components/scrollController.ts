
import {
    _decorator, Component, Node, Prefab,
    instantiate,
    Script
} from 'cc';
import { ClueItemController } from './clueItemController';
const { ccclass, property } = _decorator;

@ccclass('ScrollController')
export class ScrollController extends Component {
    @property(Node)
    private content: Node;

    @property(Prefab)
    private showItem: Prefab;

    private items: Array<any>;

    private clues: Array<any>;

    start() {
    }

    updateContent(clues: Array<any>) {
        this.content.removeAllChildren();
        this.clues = clues;
        this.items = new Array(clues.length);
        clues.forEach((value, index) => {
            let item: Node = instantiate(this.showItem);
            this.items[index] = item;
            let itemController = item.getComponent(ClueItemController);
            itemController.msgStr.string = value.msg;
            this.content.addChild(item);
            if (value.isOK) {
                itemController.setOk();
            } else {
                itemController.setNo();
            }
        });
    }

    public saveState() {
        this.items.forEach((value, index) => {
            if (value.getComponent(ClueItemController).btnYes.interactable === false) {
                this.clues[index].isOK = true;
            }
        })
    }
}
