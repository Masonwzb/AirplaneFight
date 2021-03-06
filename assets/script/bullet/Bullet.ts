
import {_decorator, Collider, Component, ITriggerEvent, Node} from 'cc';
import {Constant} from "../framework/Constant";
import {PoolManager} from "../framework/PoolManager";
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Bullet
 * DateTime = Thu Feb 10 2022 16:05:48 GMT+0800 (中国标准时间)
 * Author = binea
 * FileBasename = Bullet.ts
 * FileBasenameNoExtension = Bullet
 * URL = db://assets/script/bullet/Bullet.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

@ccclass('Bullet')
export class Bullet extends Component {
    private bulletSpeed = 0;
    private isEnemyBullet = false;
    private direction = Constant.Direction.MIDDLE;

    //  *******************************************生命周期回调函数********************************************************
    onEnable () {
        const collider = this.getComponent(Collider);
        collider.on('onTriggerEnter', this.onTriggerEnter, this);
    }

    onDisable () {
        const collider = this.getComponent(Collider);
        collider.off('onTriggerEnter', this.onTriggerEnter, this);
    }

    private onTriggerEnter(event: ITriggerEvent) {
        PoolManager.instance().putNode(this.node);
    }
    //  *******************************************生命周期回调函数********************************************************

    //  *******************************************生命周期回调函数********************************************************
    update (deltaTime: number) {
        const pos = this.node.position;
        let moveLength = 0;

        if (this.isEnemyBullet) {
            moveLength = pos.z + this.bulletSpeed;
            if (moveLength > 50) {
                PoolManager.instance().putNode(this.node);
            }
            this.node.setPosition(pos.x, pos.y, moveLength);
        } else {
            moveLength = pos.z - this.bulletSpeed;

            if (this.direction === Constant.Direction.LEFT) {
                this.node.setPosition(pos.x - this.bulletSpeed * 0.2, pos.y, moveLength);
            } else if (this.direction === Constant.Direction.RIGHT) {
                this.node.setPosition(pos.x + this.bulletSpeed * 0.2, pos.y, moveLength);
            } else {
                this.node.setPosition(pos.x, pos.y, moveLength);
            }

            if (moveLength < -50) {
                PoolManager.instance().putNode(this.node);
            }
        }

    }
    //  *******************************************生命周期回调函数********************************************************

    public show(speed: number, isEnemyBullet: boolean, direction: number = Constant.Direction.MIDDLE) {
        this.bulletSpeed = speed;
        this.isEnemyBullet = isEnemyBullet;
        this.direction = direction;
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/en/scripting/life-cycle-callbacks.html
 */
