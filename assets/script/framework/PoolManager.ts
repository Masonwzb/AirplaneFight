
import {_decorator, Component, instantiate, Node, NodePool, Prefab} from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = PoolManager
 * DateTime = Tue Feb 15 2022 14:53:19 GMT+0800 (中国标准时间)
 * Author = binea
 * FileBasename = PoolManager.ts
 * FileBasenameNoExtension = PoolManager
 * URL = db://assets/script/framework/PoolManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
interface IDictPool {
    [name: string]: NodePool;
}

interface IDictPrefab {
    [name: string]: Prefab;
}

@ccclass('PoolManager')
export class PoolManager {

    private static _instance: PoolManager;

    public static instance() {
        if (!this._instance) {
            this._instance = new PoolManager();
        }

        return this._instance;
    }

    private dictPool: IDictPool = {};
    private dictPrefab: IDictPrefab = {};

    public getNode(prefab: Prefab, parent: Node) {
        let name = prefab.data.name;
        let node: Node = null;
        this.dictPrefab[name] = prefab;
        const pool = this.dictPool[name];
        if (pool) {
            if (pool.size() > 0) {
                node = pool.get();
            } else {
                node = instantiate(prefab);
            }
        } else {
            this.dictPool[name] = new NodePool();
            node = instantiate(prefab);
        }

        node.parent = parent;
        node.active = true;
        return node;
    }

    public putNode(node: Node) {
        let name = node.name;
        node.parent = null;
        if (!this.dictPool[name]) {
            this.dictPool[name] = new NodePool();
        }
        this.dictPool[name].put(node);
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
