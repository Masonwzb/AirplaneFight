
import { _decorator, Component, Node } from 'cc';
import { Constant } from "../framework/Constant";
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
    private enemySpeed = 0;

    public enemyType = Constant.EnemyType.TYPE1;

    start () {
        // [3]
    }

    update (deltaTime: number) {
        const pos = this.node.position;
        const moveZPos = pos.z + this.enemySpeed;
        this.node.setPosition(pos.x, pos.y, moveZPos);

        if (moveZPos > OUT_OF_RANGE) {
            this.node.destroy();
            console.log('enemy plane destroyed');
        }
    }

    public show(speed: number) {
        this.enemySpeed = speed;
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
