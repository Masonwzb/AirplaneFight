import { _decorator, Component, Node, Collider, ITriggerEvent } from 'cc';
import {Constant} from "../framework/Constant";
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = selfPlane
 * DateTime = Thu Feb 10 2022 14:44:50 GMT+0800 (中国标准时间)
 * Author = binea
 * FileBasename = selfPlane.ts
 * FileBasenameNoExtension = selfPlane
 * URL = db://assets/script/selfPlane.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

@ccclass('SelfPlane')
export class SelfPlane extends Component {
    public lifeValue = 5;
    public isDie = false;

    private currLife = 0;

    onEnable () {
        const collider = this.getComponent(Collider);
        collider.on('onTriggerEnter', this.onTriggerEnter, this);
    }

    onDisable () {
        const collider = this.getComponent(Collider);
        collider.off('onTriggerEnter', this.onTriggerEnter, this);
    }


    // update (deltaTime: number) {
    //     // [4]
    // }

    private onTriggerEnter(event: ITriggerEvent) {
        const collisionGroup = event.otherCollider.getGroup();
        if (collisionGroup === Constant.CollisionType.ENEMY_PLANE || collisionGroup === Constant.CollisionType.ENEMY_BULLET) {
            this.currLife--;
            if (this.currLife <= 0) {
                this.isDie = true;
            }
        }
    }

    public initial() {
        this.currLife = this.lifeValue;
        this.isDie = false;
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
