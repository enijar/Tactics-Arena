import * as dat from "dat.gui";
import FBXLoader from "three-fbxloader-offical";
import {AnimationMixer, Clock, LoopOnce, Math} from "three";
import {getTilePosition} from "../utils";
import {TILE_DEPTH} from "../consts";
import config from "../../../config";

export default class Unit {
    gui = new dat.GUI();
    clock = new Clock();
    animations = {};
    mixers = [];
    loader = new FBXLoader();
    object = null;
    row = 1;
    col = 1;
    scale = 0.08;

    constructor(position, name) {
        this.col = position.col;
        this.row = position.row;
        this.name = name;
    }

    load() {
        return new Promise(resolve => {
            this.loader.load(`/models/${this.name}/model.fbx`, object => {
                let unitAnimations;
                const debugAnimations = {};
                this.object = object;

                this.object.position.set(...getTilePosition(this.row, this.col, TILE_DEPTH / 2));
                this.object.rotation.set(0, Math.degToRad(180), 0);
                this.object.scale.set(this.scale, this.scale, this.scale);

                this.object.mixer = new AnimationMixer(this.object);
                this.mixers.push(this.object.mixer);

                if (config.debug) {
                    unitAnimations = this.gui.addFolder(this.name);
                }

                for (let i = 0; i < this.object.animations.length; i++) {
                    const animationName = this.object.animations[i].name.replace('Armature|', '');
                    this.animations[animationName] = this.object.mixer.clipAction(this.object.animations[i]);

                    if (animationName === 'attacking') {
                        this.animations[animationName].setLoop(LoopOnce);
                    }

                    if (config.debug) {
                        debugAnimations[animationName] = () => {
                            this.stopAllAnimations();
                            this.animations[animationName].play();
                        };

                        unitAnimations.add(debugAnimations, animationName);
                    }
                }

                this.animations.standing.play();

                this.object.traverse(child => {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });

                resolve();
            });
        });
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
