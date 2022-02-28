import {
    _decorator,
    IPhysics2DContact, Graphics,
    Component, Node, Prefab, instantiate, Animation, Vec2, Vec3, UITransform, RigidBody2D, Collider2D, Contact2DType, director, AudioSource
} from 'cc';
import { lineController } from '../line/lineController';
import { PlayerController } from '../player/playerController';
const { ccclass, property } = _decorator;
import config from './../util/config';
import { ScrollController } from './components/scrollController';
@ccclass('SceneManager')
export class SceneManager extends Component {

    @property(Node)
    public playerNode: Node;

    @property(Node)
    public roadNode: Node;

    @property(Node)
    public clueNode: Node;

    @property([Node])
    public wallNode: Node[] = new Array(2);

    @property(Node)
    public cameraBGNode: Node;

    @property(Node)
    public gameScrollUI: Node;

    @property(Animation)
    public playerBodyAnima: Animation;

    @property(Prefab)
    public cube_m: Prefab;

    @property(Prefab)
    public cube_s: Prefab;

    @property(Prefab)
    public cube_xs: Prefab;

    @property(Prefab)
    public cube_xxs: Prefab;

    @property(PlayerController)
    private playerController: PlayerController;

    @property(lineController)
    private lineCtrl: lineController;

    public maps: number[] = [];

    private oneJumpHeight: number = 280;

    private mapBaseLeval: number = 10;

    private currentLeval: number = 0;

    private currentNodeLeval: number = 0;

    private isOnInit: boolean = true;

    private prefNum: number = 4;

    private collectClue: Array<any> = new Array(0);

    @property(Prefab)
    public clue_1: Prefab;

    @property(Prefab)
    public clue_2: Prefab;

    @property(Prefab)
    public clue_3: Prefab;

    @property(Prefab)
    public clue_4: Prefab;

    public graphics: any;

    public need: number = 0;

    start() {
        this.generateRoad();
        this.playerController.setCanJump(true);
        this.playerController.setStep(1);
        config.toolsMap.forEach((value, index) => {
            if (value.type === true) {
                this.need++;
            }
        });
    }

    generateRoad() {
        let baseLeval = this.maps.length - 1;
        let generateLevel = Math.floor(this.mapBaseLeval / 3);
        let that = this;

        if (this.isOnInit) {
            baseLeval = 0;
            generateLevel = this.mapBaseLeval;
            this.isOnInit = false;
            this.maps = [];
            let temp = Math.ceil(Math.random() * 3);
            this.maps.push(temp);
        } else {
            let minLevelHeight = (this.currentNodeLeval - generateLevel) * this.oneJumpHeight;
            for (let node of this.roadNode.children) {
                if (node.position.y < minLevelHeight) {
                    this.roadNode.removeChild(node);
                }
            }
        }

        for (let i = 0; i < generateLevel; i++) {
            let temp = this.getRandom(this.maps[baseLeval + i]);
            this.maps.push(temp);
        }

        for (let i = 0; i < generateLevel; i++) {
            let block: Node = this.spawnBlockByType(Math.ceil(Math.random() * this.prefNum));
            let newLeval = baseLeval + i;
            let newHeight = newLeval * this.oneJumpHeight;
            let toolHeight = newHeight + 50;
            let clue: Node | null = null;
            if (config.toolsMap.has(newLeval)) {
                clue = this.spawnClueRandomly();
                clue.getComponent(RigidBody2D).enabledContactListener = true;
                clue.getComponent(Collider2D).on(Contact2DType.BEGIN_CONTACT, (selfCollider: Collider2D) => {
                    setTimeout(() => {
                        that.clueNode.removeChild(selfCollider.node);
                        if (config.toolsMap.get(that.currentLeval).type === true) {
                            that.need--;
                        }
                        this.collectClue.push(config.toolsMap.get(that.currentLeval));
                    }, 0);
                }, this);
                this.clueNode.addChild(clue);
            }
            this.roadNode.addChild(block);
            let diff = (Math.random() - 0.5) * 50 - 100;
            switch (this.maps[baseLeval + i]) {
                case 1:
                    block.setPosition(-250 + diff, newHeight, 0);
                    if (clue) {
                        clue.setPosition(-225 + diff, toolHeight, 0);
                    }
                    break;
                case 2:
                    block.setPosition(50 + diff, newHeight, 0);
                    if (clue) {
                        clue.setPosition(70 + diff, toolHeight, 0);
                    }
                    break;
                case 3:
                    block.setPosition(250 + diff, newHeight, 0);
                    if (clue) {
                        clue.setPosition(230 + diff, toolHeight, 0);
                    }
                    break;
                case 4:
                    block.setPosition(150 + diff, newHeight, 0);
                    if (clue) {
                        clue.setPosition(150 + diff, toolHeight, 0);
                    }
                    break;
            }
        }
    }

    spawnBlockByType(type: number): Node {
        let block: Node;
        switch (type) {
            case 1:
                block = instantiate(this.cube_m);
                break;
            case 2:
                block = instantiate(this.cube_s);
                break;
            case 3:
                block = instantiate(this.cube_xs);
                break;
            case 4:
                block = instantiate(this.cube_xxs);
                break;
        }
        return block;
    }

    spawnClueRandomly(): Node {
        let clue: Node;
        switch (Math.ceil(Math.random() * 3)) {
            case 0:
                clue = instantiate(this.clue_1);
                break;
            case 1:
                clue = instantiate(this.clue_2);
                break;
            case 2:
                clue = instantiate(this.clue_3);
                break;
            case 3:
                clue = instantiate(this.clue_4);
                break;
        }
        return clue;
    }

    getRandom(last: number) {
        let temp = Math.ceil(Math.random() * this.prefNum);
        while (temp === last) {
            temp = Math.ceil(Math.random() * this.prefNum);
        }
        return temp;
    }

    changeScrollUI() {
        this.gameScrollUI.active = (this.gameScrollUI.active === true) ? false : true;
        if (this.gameScrollUI.active === true) {
            this.gameScrollUI.setPosition(new Vec3(this.playerNode.position.x, this.playerNode.position.y+230, 0));
            this.gameScrollUI.getComponent(ScrollController)
                .updateContent(this.collectClue);
            this.playerController.setCanMove(false);
            this.playerController.setCanJump(false);
        } else {
            this.gameScrollUI.getComponent(ScrollController)
                .saveState();
            this.playerController.setCanMove(true);
            this.playerController.setCanJump(true);
        }
    }

    onTrueEnd() {
        director.loadScene('end-true');
    }

    onFalseEnd() {
        director.loadScene('end-false');
    }

    onDeadEnd() {
        director.loadScene('end-dead');
    }

    update() {
        let _currentLength = Math.max(Math.floor(this.playerNode.position.y / this.oneJumpHeight), 0);
        this.wallNode[0].setPosition(new Vec3(-600, this.playerNode.position.y, 0));
        this.wallNode[1].setPosition(new Vec3(600, this.playerNode.position.y, 0));
        this.cameraBGNode.setPosition(new Vec3(0, this.playerNode.position.y - this.playerNode.getComponent(UITransform).height / 2, 0));
        if (this.currentLeval != _currentLength) {
            if (this.currentLeval - _currentLength > 4) {
                this.getComponent(AudioSource).stop();
                this.onDeadEnd();
            } else if (this.currentLeval < _currentLength) {
                this.currentLeval = _currentLength;
                this.lineCtrl.paint(this.currentLeval);
                let isOK = true;
                this.collectClue.forEach((value) => {
                    if (value.isOK == false) {
                        isOK = false;
                    }
                })
                if (this.currentLeval > 100) {
                    this.getComponent(AudioSource).stop();
                    if (this.need == 0 && isOK) {
                        this.onTrueEnd();
                    } else {
                        this.onFalseEnd();
                    }
                }
                if (this.currentLeval % Math.floor(this.mapBaseLeval / 3) === 0) {
                    this.currentNodeLeval = this.currentLeval;
                    this.generateRoad();
                }
            }
        }
    }
}
