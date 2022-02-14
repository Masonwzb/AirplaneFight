
import {_decorator, Collider, Component, ITriggerEvent, Node} from 'cc';
import {Constant} from "../framework/Constant";
import { GameManager } from "../framework/GameManager";
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = BulletProp
 * DateTime = Mon Feb 14 2022 11:26:35 GMT+0800 (中国标准时间)
 * Author = binea
 * FileBasename = BulletProp.ts
 * FileBasenameNoExtension = BulletProp
 * URL = db://assets/script/bullet/BulletProp.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

@ccclass('BulletProp')
export class BulletProp extends Component {
    private propSpeed = 0.3;
    private propXSpeed = 0.3;
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
        const name = event.selfCollider.node.name;
        if (name === Constant.BulletPropNodeName.BULLET_H) {
            this.gameManager.changeBulletType(Constant.BulletPropType.BULLET_H);
        } else if (name === Constant.BulletPropNodeName.BULLET_S) {
            this.gameManager.changeBulletType(Constant.BulletPropType.BULLET_S);
        } else {
            this.gameManager.changeBulletType(Constant.BulletPropType.BULLET_M);
        }

        this.node.destroy();
    }

    update (deltaTime: number) {
        let pos = this.node.position;
        if (pos.x >= 15) {
            this.propXSpeed = this.propSpeed;
        } else if (pos.x <= -15) {
            this.propXSpeed = -this.propSpeed;
        }

        this.node.setPosition(pos.x + this.propXSpeed, pos.y, pos.z - this.propSpeed);
        pos = this.node.position;
        if (pos.z > 50) {
            this.node.destroy();
        }
    }

    show(gameManager: GameManager, speed: number) {
        this.gameManager = gameManager;
        this.propSpeed = speed;
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
