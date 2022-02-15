
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = gameManager
 * DateTime = Wed Feb 09 2022 16:36:48 GMT+0800 (中国标准时间)
 * Author = binea
 * FileBasename = gameManager.ts
 * FileBasenameNoExtension = gameManager
 * URL = db://assets/script/gameManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('movingSceneBg')
export class movingSceneBg extends Component {
    @property(Node)
    bg01: Node = null;

    @property(Node)
    bg02: Node = null;

    private bgSpeed = 10;
    // 移动Z轴最大值（可视范围为-90 ~ 0）
    private bgMovingRange = 90;

    //  *******************************************生命周期回调函数********************************************************
    start () {
        this.initial();
    }
    //  ****************************************************************************************************************

    private initial() {
        this.bg01.setPosition(0, 0, 0);
        this.bg02.setPosition(0, 0, -this.bgMovingRange);
    }

    //  *******************************************生命周期回调函数********************************************************
    update (deltaTime: number) {
        this.moveBackground(deltaTime);
    }
    //  ****************************************************************************************************************

    private moveBackground(deltaTime: number) {
        this.bg01.setPosition(0, 0, this.bg01.position.z + this.bgSpeed * deltaTime);
        this.bg02.setPosition(0, 0, this.bg02.position.z + this.bgSpeed * deltaTime);

        // Z轴可移动范围为 -90 ~ 90 之间（可视范围为-90 ~ 0）
        if (this.bg01.position.z > this.bgMovingRange) {
            this.bg01.setPosition(0, 0, this.bg02.position.z - this.bgMovingRange);
        } else if (this.bg02.position.z > this.bgMovingRange) {
            this.bg02.setPosition(0, 0, this.bg01.position.z - this.bgMovingRange);
        }
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
