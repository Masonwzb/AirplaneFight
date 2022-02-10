
import { _decorator, Component, Node, input, Input, EventTouch } from 'cc';
import { GameManager } from "../framework/GameManager";
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = UIMain
 * DateTime = Thu Feb 10 2022 15:18:15 GMT+0800 (中国标准时间)
 * Author = binea
 * FileBasename = UIMain.ts
 * FileBasenameNoExtension = UIMain
 * URL = db://assets/script/ui/UIMain.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('UIMain')
export class UIMain extends Component {
    @property
    public planeSpeed = 6;

    @property(Node)
    public playerPlane: Node = null;

    @property(GameManager)
    public gameManager: GameManager = null;

    start () {
        this.node.on(Input.EventType.TOUCH_START, this.touchStart, this);
        this.node.on(Input.EventType.TOUCH_MOVE, this.touchMove, this);
        this.node.on(Input.EventType.TOUCH_END, this.touchEnd, this);
    }

    touchStart(event: EventTouch) {
        this.gameManager.isShooting(true);
    }

    touchMove(event: EventTouch) {
        const delta = event.getDelta();
        let pos = this.playerPlane.position;
        this.playerPlane.setPosition(pos.x + 0.01 * this.planeSpeed * delta.x, pos.y, pos.z - 0.01 * this.planeSpeed * delta.y);
    }

    touchEnd(event: EventTouch) {
        this.gameManager.isShooting(false);
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
