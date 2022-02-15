
import { _decorator, Component, Node } from 'cc';
import {PoolManager} from "./framework/PoolManager";
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Explode
 * DateTime = Tue Feb 15 2022 16:28:13 GMT+0800 (中国标准时间)
 * Author = binea
 * FileBasename = Explode.ts
 * FileBasenameNoExtension = Explode
 * URL = db://assets/script/Explode.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

@ccclass('Explode')
export class Explode extends Component {
    onEnable() {
        this.scheduleOnce(this.putBack, 1);
    }

    public putBack() {
        PoolManager.instance().putNode(this.node);
    }

    start () {
        // [3]
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
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
