
import {_decorator, AudioClip, AudioSource, Component, Node} from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = AudioManager
 * DateTime = Tue Feb 15 2022 14:17:39 GMT+0800 (中国标准时间)
 * Author = binea
 * FileBasename = AudioManager.ts
 * FileBasenameNoExtension = AudioManager
 * URL = db://assets/script/framework/AudioManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
interface IAudioMap {
    [name: string]: AudioClip;
}

@ccclass('AudioManager')
export class AudioManager extends Component {
    @property(AudioClip)
    public audioList: AudioClip[] = [];

    private dict: IAudioMap = {};
    private audioSource: AudioSource = null;

    start () {
        for (let i = 0; i < this.audioList.length; i++) {
            const element = this.audioList[i];
            this.dict[element.name] = element;
        }

        this.audioSource = this.getComponent(AudioSource);
    }

    public play(name: string) {
        const audioClip = this.dict[name];

        if (!audioClip) return;
        this.audioSource.playOneShot(audioClip);
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
