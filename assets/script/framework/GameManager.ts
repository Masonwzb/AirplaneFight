
import {_decorator, Component, Node, Prefab, instantiate, math, Vec3, BoxCollider, macro, Label, Animation} from 'cc';
import { Bullet } from "../bullet/Bullet";
import { Constant } from "./Constant";
import { EnemyPlane } from "../plane/EnemyPlane";
import { BulletProp } from "../bullet/BulletProp";
import { SelfPlane } from "../plane/SelfPlane";
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
    @property(SelfPlane)
    public playerPlane: SelfPlane = null;
    @property(Node)
    public bulletRoot: Node = null;
    @property(Node)
    public gamePage: Node = null;
    @property(Node)
    public gameOverPage: Node = null;
    @property(Label)
    public gameScore: Label = null;
    @property(Label)
    public gameOverScore: Label = null;

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
    // bullet prop
    @property(Prefab)
    public bulletPropM: Prefab = null;
    @property(Prefab)
    public bulletPropH: Prefab = null;
    @property(Prefab)
    public bulletPropS: Prefab = null;

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
    @property
    public bulletPropSpeed = 0.3;

    @property(Animation)
    public overAnim: Animation = null;

    public isGameStart = false;

    private currShootTime = 0;
    private planeIsShooting = false;
    private currCreateEnemyTime = 0;
    private combinationInterval = Constant.Combination.PLAN1;
    private bulletType = Constant.BulletPropType.BULLET_M;
    private score = 0;

    //  *******************************************生命周期回调函数**************************************************start*
    start () {
        this.initial();
    }
    //  *******************************************生命周期回调函数**************************************************start*

    private initial() {
        this.currShootTime = this.shootTime;
        this.playerPlane.initial();
    }

    private changePlaneMode() {
        this.schedule(this.modeChanged, 10, 1);
    }

    private modeChanged() {
        this.combinationInterval ++;
    }

    private randomCreateBulletProp() {
        this.schedule(this.propChange, 10, macro.REPEAT_FOREVER);
    }

    private propChange() {
        this.createBulletProp();
    }

    //  *******************************************生命周期回调函数*************************************************update*
    update (deltaTime: number) {
        if (!this.isGameStart) {
            return;
        }

        if (this.playerPlane.isDie) {
            this.gameOver();
            return;
        }

        this.currShootTime += deltaTime;
        if (this.planeIsShooting && this.currShootTime > this.shootTime) {
            if (this.bulletType === Constant.BulletPropType.BULLET_H) {
                this.createPlayerBulletH();
            } else if (this.bulletType === Constant.BulletPropType.BULLET_S) {
                this.createPlayerBulletS();
            } else {
                this.createPlayerBulletM();
            }
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
    //  *******************************************生命周期回调函数********************************************update******

    public createPlayerBulletM() {
        const bullet = instantiate(this.bullet01);
        bullet.setParent(this.bulletRoot);
        const pos = this.playerPlane.node.position;
        bullet.setPosition(pos.x, pos.y, pos.z - 7);
        const bulletComp = bullet.getComponent(Bullet);
        bulletComp.show(this.bulletSpeed, false);
    }

    public createPlayerBulletH() {
        const pos = this.playerPlane.node.position;

        // left
        const bullet1 = instantiate(this.bullet03);
        bullet1.setParent(this.bulletRoot);
        bullet1.setPosition(pos.x - 2.5, pos.y, pos.z - 7);
        const bulletComp1 = bullet1.getComponent(Bullet);
        bulletComp1.show(this.bulletSpeed, false);

        // right
        const bullet2 = instantiate(this.bullet03);
        bullet2.setParent(this.bulletRoot);
        bullet2.setPosition(pos.x + 2.5, pos.y, pos.z - 7);
        const bulletComp2 = bullet2.getComponent(Bullet);
        bulletComp2.show(this.bulletSpeed, false);
    }

    public createPlayerBulletS() {
        const pos = this.playerPlane.node.position;

        // middle
        const bullet = instantiate(this.bullet05);
        bullet.setParent(this.bulletRoot);
        bullet.setPosition(pos.x, pos.y, pos.z - 7);
        const bulletComp = bullet.getComponent(Bullet);
        bulletComp.show(this.bulletSpeed, false);

        // left
        const bullet1 = instantiate(this.bullet05);
        bullet1.setParent(this.bulletRoot);
        bullet1.setPosition(pos.x - 4, pos.y, pos.z - 7);
        const bulletComp1 = bullet1.getComponent(Bullet);
        bulletComp1.show(this.bulletSpeed, false, Constant.Direction.LEFT);

        // right
        const bullet2 = instantiate(this.bullet05);
        bullet2.setParent(this.bulletRoot);
        bullet2.setPosition(pos.x + 4, pos.y, pos.z - 7);
        const bulletComp2 = bullet2.getComponent(Bullet);
        bulletComp2.show(this.bulletSpeed, false, Constant.Direction.RIGHT);
    }

    public createEnemyBullet(targetPos: Vec3) {
        const bullet = instantiate(this.bullet02);
        bullet.setParent(this.bulletRoot);
        bullet.setPosition(targetPos.x, targetPos.y, targetPos.z + 6);
        const bulletComp = bullet.getComponent(Bullet);
        bulletComp.show(this.bulletSpeed, true);

        const colliderComp = bullet.getComponent(BoxCollider);
        colliderComp.setGroup(Constant.CollisionType.ENEMY_BULLET);
        colliderComp.setMask(Constant.CollisionType.SELF_PLANE);
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

    public changeBulletType(type: number) {
        this.bulletType = type;
    }

    createBulletProp() {
        const randomProp = math.randomRangeInt(1, 4);
        let prefab: Prefab = null;

        if (randomProp === Constant.BulletPropType.BULLET_H) {
            prefab = this.bulletPropH;
        } else if(randomProp === Constant.BulletPropType.BULLET_S) {
            prefab = this.bulletPropS;
        } else {
            prefab = this.bulletPropM;
        }

        const prop = instantiate(prefab);
        prop.setParent(this.node);
        prop.setPosition(15, 0, -50);
        const propComp = prop.getComponent(BulletProp);
        propComp.show(this, -this.bulletPropSpeed);
    }

    public gameStart() {
        this.isGameStart = true;
        this.changePlaneMode();
        this.randomCreateBulletProp();
    }

    public resetGameLogical() {
        this.currShootTime = 0;
        this.currCreateEnemyTime = 0;
        this.combinationInterval = Constant.Combination.PLAN1;
        this.bulletType = Constant.BulletPropType.BULLET_M;
        this.playerPlane.node.setPosition(0, 0, 15);
    }

    public restart() {
        this.isGameStart = true;
        this.resetGameLogical();
    }

    public returnMain() {
        this.resetGameLogical();
     }

     public gameOver() {
        this.isGameStart = false;
        this.gamePage.active = false;
        this.gameOverPage.active = true;
        this.gameOverScore.string = this.score.toString();
         this.overAnim.play();
         this.planeIsShooting  =  false;
        this.unschedule(this.modeChanged);
        this.unschedule(this.propChange);
        this.destroyAll();
        this.playerPlane.initial();
        this.score = 0;
        this.gameScore.string = this.score.toString();
     }

    public addScore() {
        this.score++;
        this.gameScore.string = this.score.toString();
    }

    public destroyAll() {
        this.node.removeAllChildren();
        this.bulletRoot.removeAllChildren();
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
