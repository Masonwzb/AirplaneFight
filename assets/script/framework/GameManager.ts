
import { _decorator, Component, Node, Prefab, instantiate, math, Vec3 } from 'cc';
import { Bullet } from "../bullet/Bullet";
import { Constant } from "./Constant";
import { EnemyPlane } from "../plane/EnemyPlane";
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

    // bullet
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
    // enemy plane
    @property(Prefab)
    public enemy01: Prefab = null;
    @property(Prefab)
    public enemy02: Prefab = null;

    @property
    public shootTime = 0.1;
    @property
    public bulletSpeed = 1;
    @property
    public createEnemyTime = 1;
    @property
    public enemy1Speed = 0.5;
    @property
    public enemy2Speed = 0.7;

    private currShootTime = 0;
    private planeIsShooting = false;
    private currCreateEnemyTime = 0;
    private combinationInterval = Constant.Combination.PLAN1;

    //  *******************************************生命周期回调函数********************************************************
    start () {
        this.initial();
    }
    //  *******************************************生命周期回调函数********************************************************

    private initial() {
        this.currShootTime = this.shootTime;
        this.changePlaneMode();
    }

    private changePlaneMode() {
        this.schedule(this.modeChanged, 10, 1);
    }

    private modeChanged() {
        this.combinationInterval ++;
    }

    //  *******************************************生命周期回调函数********************************************************
    update (deltaTime: number) {
        this.currShootTime += deltaTime;
        if (this.planeIsShooting && this.currShootTime > this.shootTime) {
            this.createPlayerBullet();
            this.currShootTime = 0;
        }

        this.currCreateEnemyTime += deltaTime;
        switch (this.combinationInterval) {
            case Constant.Combination.PLAN1:
                if (this.currCreateEnemyTime > this.createEnemyTime) {
                    this.createEnemyPlane();
                    this.currCreateEnemyTime = 0;
                }
                break;
            case Constant.Combination.PLAN2:
                if (this.currCreateEnemyTime > this.createEnemyTime * 0.9) {
                    const randomCombination = math.randomRangeInt(1, 3);
                    if (randomCombination === Constant.Combination.PLAN2) {
                        this.createCombinationOne();
                    } else {
                        this.createEnemyPlane();
                    }
                    this.currCreateEnemyTime = 0;
                }
                break;
            case Constant.Combination.PLAN3:
                if (this.currCreateEnemyTime > this.createEnemyTime * 0.8) {
                    const randomCombination = math.randomRangeInt(0, 20);

                    if (randomCombination === 0) {
                        this.createCombinationTwo();
                    }
                    if (randomCombination > 0 && randomCombination < 3) {
                        this.createCombinationOne();
                    }
                    if (randomCombination > 3) {
                        this.createEnemyPlane();
                    }
                    this.currCreateEnemyTime = 0;
                }
                break;
            default:
                break;
        }
    }
    //  *******************************************生命周期回调函数********************************************************

    public createPlayerBullet() {
        const bullet = instantiate(this.bullet01);
        bullet.setParent(this.bulletRoot);
        const pos = this.playerPlane.position;
        bullet.setPosition(pos.x, pos.y, pos.z - 7);
        const bulletComp = bullet.getComponent(Bullet);
        bulletComp.show(this.bulletSpeed, false);
    }

    public createEnemyBullet(targetPos: Vec3) {
        const bullet = instantiate(this.bullet01);
        bullet.setParent(this.bulletRoot);
        bullet.setPosition(targetPos.x, targetPos.y, targetPos.z + 6);
        const bulletComp = bullet.getComponent(Bullet);
        bulletComp.show(this.bulletSpeed, true);
    }

    public isShooting(value: boolean) {
        this.planeIsShooting = value;
    }

    public createEnemyPlane() {
        const whichEnemy = math.randomRangeInt(1, 3);
        let prefab: Prefab = null;
        let speed = 0;
        if (whichEnemy === Constant.EnemyType.TYPE1) {
            prefab = this.enemy01;
            speed = this.enemy1Speed;
        } else {
            prefab = this.enemy02;
            speed = this.enemy2Speed;
        }

        const enemy = instantiate(prefab);
        enemy.setParent(this.node);
        const enemyComp = enemy.getComponent(EnemyPlane);
        enemyComp.show(this, speed, true);

        const randomPos = math.randomRangeInt(-25, 26);
        enemy.setPosition(randomPos, 0, -50);
    }

    public createCombinationOne() {
        const enemyArray = new Array<Node>(5);
        for (let i = 0; i < enemyArray.length; i++) {
            enemyArray[i] = instantiate(this.enemy01);
            const element = enemyArray[i];
            element.parent = this.node;
            element.setPosition(-20 + i * 10, 0, -50);
            const enemyComp = element.getComponent(EnemyPlane);
            enemyComp.show(this, this.enemy1Speed, false);
        }
    }

    public createCombinationTwo() {
        const enemyArray = new Array<Node>(7);

        const combinationPos = [
            -21, 0, -60,
            -14, 0, -55,
            -7, 0, -50,
            0, 0, -45,
            7, 0, -50,
            14, 0, -55,
            21, 0, -60
        ]

        for (let i = 0; i < enemyArray.length; i++) {
            enemyArray[i] = instantiate(this.enemy01);
            const element = enemyArray[i];
            element.parent = this.node;
            const startIndex = i * 3;
            element.setPosition(combinationPos[startIndex], combinationPos[startIndex + 1], combinationPos[startIndex + 2]);
            const enemyComp = element.getComponent(EnemyPlane);
            enemyComp.show(this, this.enemy1Speed, false);
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
