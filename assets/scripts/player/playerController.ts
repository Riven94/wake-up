
import {
    _decorator,
    Component,
    Node,
    macro,
    RigidBody2D,
    Vec2,
    Animation,
    PhysicsSystem2D,
    Collider2D,
    Contact2DType,
    Quat,
    RigidBody
} from 'cc';
const { ccclass, property } = _decorator;

import { AxInput } from './AxInput';
const Input = AxInput.instance;
@ccclass('PlayerController')
export class PlayerController extends Component {
    private canJump = true;

    private canMove: boolean = true;

    @property(Animation)
    private playerStopAnim: Animation;

    @property(Node)
    private playerNode: Node;

    @property(Node)
    private playerBodyNode: Node;

    private step: number = 0;

    private speed = 16;

    private jumpSpeed = 24;

    onLoad() {
        PhysicsSystem2D.instance.gravity = new Vec2(0, -600);
        const rigidBody2D: RigidBody2D = this.playerNode.getComponent(RigidBody2D);

        if (rigidBody2D) {
            rigidBody2D.fixedRotation = true;
        }
        let colliders = this.playerNode.getComponents(Collider2D);
        for (let collider of colliders) {
            if (collider.tag == 1 || collider.tag == 2) {
                collider?.on(Contact2DType.BEGIN_CONTACT, () => {
                    let grivity = PhysicsSystem2D.instance.gravity;
                    if (Math.sign(grivity.y) > 0 && collider.tag == 2) {
                        return;
                    } else if (Math.sign(grivity.y) < 0 && collider.tag == 1) {
                        return;
                    }
                    this.canJump = true;
                }, this);
            }
        }
    }

    setCanMove(_canMove: boolean) {
        this.canMove = _canMove;
    }

    setCanJump(_canJump) {
        this.canJump = _canJump;
    }

    setSpeed(_speed) {
        this.speed = _speed;
    }

    setJumpSpeed(_jumpSpeed) {
        this.jumpSpeed = _jumpSpeed;
    }

    setStep(_step) {
        this.step = _step;
        if (this.step === 0) {
            this.playerStopAnim.play();
        } else {
            this.playerStopAnim.play("player-stop-out");
        }
    }

    update() {
        let rb = this.playerNode.getComponent(RigidBody2D);
        let lv = rb!.linearVelocity;

        let isMove = false;
        if (this.canMove && Input.is_action_pressed(macro.KEY.a) ||
            Input.is_action_pressed(macro.KEY.left)) {
            lv.x = -this.speed;
            this.playerBodyNode.rotation.set(0, 1, 0, 0);
            isMove = true;
        } else if (this.canMove && Input.is_action_pressed(macro.KEY.d) ||
            Input.is_action_pressed(macro.KEY.right)) {
            lv.x = this.speed;
            this.playerBodyNode.rotation.set(0, 0, 0, 0);
            isMove = true;
        } else {
            lv = new Vec2(0, lv.y);
            if (this.step === 0 && !this.playerStopAnim.getState('player-stop').isPlaying) {
                this.playerStopAnim.play();
            } else if (this.step === 1 && this.canJump && !this.playerStopAnim.getState('player-stop-out').isPlaying) {
                this.playerStopAnim.play("player-stop-out");
            }
        }

        if (isMove) {
            if (this.step === 0 && !this.playerStopAnim.getState('player-move').isPlaying) {
                this.playerStopAnim.play("player-move");
            } else if (this.step === 1 && this.canJump && !this.playerStopAnim.getState('player-move-out').isPlaying) {
                this.playerStopAnim.play("player-move-out")
            }
        }

        if ((Input.is_action_just_pressed(macro.KEY.w) ||
            Input.is_action_just_pressed(macro.KEY.up)
        ) && this.canJump) {
            let grivity = PhysicsSystem2D.instance.gravity;

            lv.y = this.jumpSpeed * - Math.sign(grivity.y);
            this.canJump = false;
            if (this.step == 1) {
                this.playerStopAnim.play('player-jump');
            }
        }

        rb!.linearVelocity = lv;
    }

    /*onDestroy() {
        this.onUnBindControl();
    }*/
}
