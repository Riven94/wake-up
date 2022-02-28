
import {
    _decorator,
    Component,
    Node,
    PhysicsSystem2D,
    Contact2DType,
    systemEvent,
    SystemEventType,
    macro,
    Label,
    Collider2D,
    director,
    BoxCollider2D,
    RigidBody2D,
    RigidBody,
    AudioSource
} from 'cc';
import { PlayerController } from '../player/playerController';
import config from '../util/config';
import { CHARECTER, TALKS, TALK } from '../util/config';
const { ccclass, property } = _decorator;

@ccclass('FoundationManager')
export class FoundationManager extends Component {
    @property(Node)
    public playerTalkNode: Node;

    @property(Label)
    public playerTalkStr: Label;

    @property(Node)
    public playerNode: Node;

    @property(PlayerController)
    public playerController: PlayerController;

    @property([Node])
    public talkHeaders: Node[] = new Array<Node>(2);

    @property(Node)
    public foundationDoor: Node;

    @property(Node)
    public robotNode: Node;

    @property(Node)
    public emphraseSign: Node;

    @property(Node)
    public char_f: Node;

    @property(Node)
    public talkNode: Node;

    @property(Label)
    public msgLabel: Label;

    public talkStarted: boolean = false;

    private talkNum = 0;

    start() {
        this.playerController.setCanMove(true);
        const phySystem = PhysicsSystem2D.instance;
        this.robotNode.getComponent(RigidBody2D).enabledContactListener = true;
        phySystem.enable = true;
        this.onBindEvent();
        this.playerController.setJumpSpeed(5);
        this.playerController.setSpeed(8);
        this.playerController.setStep(0);
        this.foundationDoor.getComponent(BoxCollider2D).on(Contact2DType.BEGIN_CONTACT, this.onGoOut, this);
        this.robotNode.getComponent(BoxCollider2D).on(Contact2DType.BEGIN_CONTACT, this.emphraseFadeOut, this);

        setTimeout(() => {
            director.preloadScene('game-scene');
        }, 0);
    }

    startTalk(event) {
        if (event.keyCode == macro.KEY.f) {
            this.talkNode.active = true;
            this.char_f.active = false;
            this.playerController.setCanMove(false);
            this.talkStarted = true;
        };
    }

    onBindEvent() {
        systemEvent.on(SystemEventType.KEY_DOWN, this.onKeepTalk, this);
        systemEvent.on(SystemEventType.KEY_DOWN, this.startTalk, this);
        systemEvent.on(SystemEventType.TOUCH_START, this.onKeepTalk, this);
        systemEvent.on(SystemEventType.MOUSE_DOWN, this.onKeepTalk, this);
    }

    onUnBindEvent() {
        systemEvent.off(SystemEventType.KEY_DOWN, this.onKeepTalk, this);
        systemEvent.off(SystemEventType.TOUCH_START, this.onKeepTalk, this);
        systemEvent.off(SystemEventType.MOUSE_DOWN, this.onKeepTalk, this);
    }

    onKeepTalk(event) {
        if (this.talkStarted){
            if (event.keyCode == macro.KEY.space && this.talkNum < config.talk_fun.first.length) {
                this.playerTalkStr.string = config.talk_fun.first[this.talkNum].msg;
                switch (config.talk_fun.first[this.talkNum].from) {
                    case CHARECTER.AI:
                        this.talkHeaders[0].active = false;
                        this.talkHeaders[1].active = true;
                        this.msgLabel.string = "AI";
                        break;
                    case CHARECTER.X:
                        this.talkHeaders[0].active = true;
                        this.talkHeaders[1].active = false;
                        this.msgLabel.string = "你";
                        break;
                }
                this.talkNum++;
            } else if (this.talkNum >= config.talk_fun.first.length) {
                this.playerTalkNode.active = false;
                this.playerController.setCanMove(true);
            }
        }
    }

    onGoOut() {
        this.node.getComponent(AudioSource).stop();
        director.loadScene('game-scene');
    }

    emphraseFadeOut(){
        console.log("1");
        this.emphraseSign.active = false;
        this.char_f.active = true;
    }

    onDestroy() {
        this.onUnBindEvent();
    }
    // update (deltaTime: number) {
    //     // [4]
    // }
}

