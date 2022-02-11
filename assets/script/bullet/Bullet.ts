
import { _decorator, Component, Node } from 'cc';
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
    @property
    private bulletSpeed = 0;
    @property
    private isEnemyBullet = false;

    //  *******************************************生命周期回调函数********************************************************
    start () {
        // [3]
    }
    //  *******************************************生命周期回调函数********************************************************

    //  *******************************************生命周期回调函数********************************************************
    update (deltaTime: number) {
        const pos = this.node.position;
        let moveLength = 0;

        if (this.isEnemyBullet) {
            moveLength = pos.z + this.bulletSpeed;
            if (moveLength > 50) {
                this.node.destroy();
                console.log('EnemyBullet bullet destroyed');
            }
        } else {
            moveLength = pos.z - this.bulletSpeed;
            if (moveLength < -50) {
                this.node.destroy();
                console.log('playerPlane bullet destroyed');
            }
        }

        this.node.setPosition(pos.x, pos.y, moveLength);
    }
    //  *******************************************生命周期回调函数********************************************************

    public show(speed: number, isEnemyBullet: boolean) {
        this.bulletSpeed = speed;
        this.isEnemyBullet = isEnemyBullet;
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
