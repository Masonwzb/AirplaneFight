
import {_decorator, Collider, Component, ITriggerEvent, Node} from 'cc';
import { Constant } from "../framework/Constant";
import { GameManager } from "../framework/GameManager";
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = EnemyPlane
 * DateTime = Fri Feb 11 2022 10:08:46 GMT+0800 (中国标准时间)
 * Author = binea
 * FileBasename = EnemyPlane.ts
 * FileBasenameNoExtension = EnemyPlane
 * URL = db://assets/script/plane/EnemyPlane.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
const OUT_OF_RANGE = 50;
 
@ccclass('EnemyPlane')
export class EnemyPlane extends Component {
    @property
    public createBulletTime = 0.5;

    private enemySpeed = 0;
    private needBullet = false;
    private currCreateBulletTime = 0;
    private gameManager: GameManager = null;

    onEnable () {
        const collider = this.getComponent(Collider);
        collider.on('onTriggerEnter', this.onTriggerEnter, this);
    }

    onDisable () {
        const collider = this.getComponent(Collider);
        collider.off('onTriggerEnter', this.onTriggerEnter, this);
    }

    private onTriggerEnter(event: ITriggerEvent) {
        const collisionGroup = event.otherCollider.getGroup();
        if (collisionGroup === Constant.CollisionType.SELF_PLANE || collisionGroup === Constant.CollisionType.SELF_BULLET) {
            this.node.destroy();
            this.gameManager.addScore();
            console.log('trigger enemy destroy');
        }
    }

    update (deltaTime: number) {
        // 敌机位置处理
        const pos = this.node.position;
        const moveZPos = pos.z + this.enemySpeed;
        this.node.setPosition(pos.x, pos.y, moveZPos);

        if (moveZPos > OUT_OF_RANGE) {
            this.node.destroy();
            console.log('enemy plane destroyed');
        }

        // 子弹发射逻辑
        if (this.needBullet) {
            this.currCreateBulletTime += deltaTime;
            if (this.currCreateBulletTime > this.createBulletTime) {
                this.gameManager.createEnemyBullet(pos);
                this.currCreateBulletTime = 0;
            }
        }

    }

    public show(gameManager: GameManager, speed: number, needBullet: boolean) {
        this.gameManager = gameManager;
        this.enemySpeed = speed;
        this.needBullet = needBullet;
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
