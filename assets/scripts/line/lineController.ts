import {
    _decorator,
    IPhysics2DContact, Graphics,
    Component, Node, Prefab, instantiate, Animation, Vec2, Vec3, UITransform, RigidBody2D, Collider2D, Contact2DType, director
} from 'cc';
const { ccclass, property } = _decorator;
@ccclass('lineController')
export class lineController extends Component {

    public pointPos: Vec2[] = [
        new Vec2(-450, -65),
        new Vec2(-155, 33),
        new Vec2(135, -55),
        new Vec2(590, 0),
        new Vec2(145, 110)
    ]

    public paint(level: number) {
        if (level <= 0) {
            return;
        }
        let offsetX = 645;
        let offsetY = 0;
        let pos = this.node.position;
        const g = this.getComponent(Graphics);
        if (level < 100) {
            let i = 0;
            for (; i < this.pointPos.length - 1; i++) {
                let cur = this.pointPos[i];
                let next = this.pointPos[i + 1];
                if ((i + 1) * 25 > level) {
                    break;
                }
                g.moveTo(cur.x - pos.x / 2 - offsetX, cur.y - offsetY - pos.y);
                g.lineTo(next.x - pos.x / 2 - offsetX, next.y - offsetY - pos.y);
            }
            let cur = this.pointPos[i];
            let next = this.pointPos[i + 1];

            level %= 25;
            g.moveTo(cur.x - pos.x / 2 - offsetX, cur.y - offsetY - pos.y);
            g.lineTo(cur.x + (next.x - cur.x) * level / 25 - pos.x / 2 - offsetX, cur.y + (next.y - cur.y) * level / 25 - offsetY - pos.y);
            g.fill();
            g.stroke();
        }
    }

    update() {

    }

}
