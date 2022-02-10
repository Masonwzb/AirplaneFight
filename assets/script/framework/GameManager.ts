
import { _decorator, Component, Node, Prefab, instantiate } from 'cc';
import { Bullet } from "../bullet/Bullet";
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = GameManager
 * DateTime = Thu Feb 10 2022 16:42:22 GMT+0800 (中国标准时间)
 * Author = binea
 * FileBasename = GameManager.ts
 * FileBasenameNoExtension = GameManager
 * URL = db://assets/script/framework/GameManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('GameManager')
export class GameManager extends Component {
    @property(Node)
    public playerPlane: Node = null;
    @property(Node)
    public bulletRoot: Node = null;

    @property(Prefab)
    public bullet01: Prefab = null;
    @property(Prefab)
    public bullet02: Prefab = null;
    @property(Prefab)
    public bullet03: Prefab = null;
    @property(Prefab)
    public bullet04: Prefab = null;
    @property(Prefab)
    public bullet05: Prefab = null;

    @property
    public shootTime = 0.1;
    @property
    public bulletSpeed = 1;

    private currShootTime = 0;
    private planeIsShooting = false;

    //  *******************************************生命周期回调函数********************************************************
    start () {
        // [3]
    }
    //  *******************************************生命周期回调函数********************************************************

    //  *******************************************生命周期回调函数********************************************************
    update (deltaTime: number) {
        this.currShootTime += deltaTime;
        if (this.planeIsShooting && this.currShootTime > this.shootTime) {
            this.createPlayerBullet();
            this.currShootTime = 0;
        }
    }
    //  *******************************************生命周期回调函数********************************************************

    public createPlayerBullet() {
        const bullet = instantiate(this.bullet01);
        bullet.setParent(this.bulletRoot);
        const pos = this.playerPlane.position;
        bullet.setPosition(pos.x, pos.y, pos.z - 7);
        const bulletComp = bullet.getComponent(Bullet);
        bulletComp.bulletSpeed = this.bulletSpeed;
    }

    public isShooting(value: boolean) {
        this.planeIsShooting = value;
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
