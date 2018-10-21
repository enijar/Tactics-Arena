import FBXLoader from "three-fbxloader-offical";
import {AnimationMixer, Clock, LoopOnce, Math} from "three";
import {getTilePosition} from "../utils";
import {TILE_DEPTH} from "../consts";
import state from "../state";
import config from "../../../config";

export default class Unit {
    clock = new Clock();
    animations = {};
    mixers = [];
    loader = new FBXLoader();
    object = null;
    unitControls = null;
    row = 1;
    col = 1;
    scale = 0.08;
    effects = {
        default: this.defaultEffect,
        hover: this.hoverEffect,
    };

    constructor(position, name) {
        this.col = position.col;
        this.row = position.row;
        this.name = name;
    }

    defaultEffect() {
        //
    }

    hoverEffect() {
        //
    }

    load(gui, index) {
        return new Promise(resolve => {
            this.loader.load(`/models/${this.name}/model.fbx`, object => {
                const debugAnimations = {};
                this.object = object;

                this.object.position.set(...getTilePosition(this.row, this.col, TILE_DEPTH / 2));
                this.object.rotation.set(0, Math.degToRad(180), 0);
                this.object.scale.set(this.scale, this.scale, this.scale);

                this.object.mixer = new AnimationMixer(this.object);
                this.mixers.push(this.object.mixer);

                if (config.debug && gui) {
                    this.unitControls = gui.addFolder(`${this.name} ${index}`);
                }

                for (let i = 0; i < this.object.animations.length; i++) {
                    const animationName = this.object.animations[i].name.replace('Armature|', '');
                    this.animations[animationName] = this.object.mixer.clipAction(this.object.animations[i]);

                    if (animationName === 'attacking') {
                        this.animations[animationName].setLoop(LoopOnce);
                    }

                    if (config.debug && this.unitControls) {
                        debugAnimations[animationName] = () => {
                            this.stopAllAnimations();
                            this.animations[animationName].play();
                        };

                        this.unitControls.add(debugAnimations, animationName);
                    }
                }

                this.animations.standing.play();

                this.object.traverse(child => {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });

                state.objects.push({
                    uuid: this.object.uuid,
                    renderer: 'Unit',
                    name: this.name,
                    col: this.col,
                    row: this.row,
                    effects: this.effects,
                    instance: this.object,
                });

                resolve();
            });
        });
    }

    moveTo(row, col) {
        this.row = row;
        this.col = col;
        this.animations.walking.play();
        this.object.position.set(...getTilePosition(this.row, this.col, TILE_DEPTH / 2));
    }

    stopAllAnimations() {
        for (let animation in this.animations) {
            if (!this.animations.hasOwnProperty(animation)) {
                continue;
            }
            this.animations[animation].stop();
        }
    }

    tick() {
        for (let i = 0; i < this.mixers.length; i++) {
            this.mixers[i].update(this.clock.getDelta());
        }
    }
}
