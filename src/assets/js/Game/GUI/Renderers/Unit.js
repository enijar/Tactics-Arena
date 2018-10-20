import FBXLoader from "three-fbxloader-offical";
import * as dat from "dat.gui";
import {AnimationMixer, Clock, LoopOnce, Math} from "three";
import Renderer from "./Renderer";
import {TILE_DEPTH} from "../consts";
import {getTilePosition} from "../utils";
import config from "../../../config";

const TILE_COL = 1;
const TILE_ROW = 9;

export default class Unit extends Renderer {
    constructor(...props) {
        super(...props);

        this.gui = new dat.GUI();
        this.clock = new Clock();
        this.animations = {};
        this.mixers = [];
        this.loader = new FBXLoader();
        this.loader.load('/models/furgon/model.fbx', object => {
            const animations = {};
            const scale = 0.08;

            object.position.set(...getTilePosition(TILE_ROW, TILE_COL, TILE_DEPTH / 2));
            object.rotation.set(0, Math.degToRad(180), 0);
            object.scale.set(scale, scale, scale);

            object.mixer = new AnimationMixer(object);
            this.mixers.push(object.mixer);

            for (let i = 0; i < object.animations.length; i++) {
                const name = object.animations[i].name.replace('Armature|', '');
                this.animations[name] = object.mixer.clipAction(object.animations[i]);

                animations[name] = () => {
                    this.stopAllAnimations();
                    this.animations[name].play();
                };

                if (name === 'attacking') {
                    this.animations[name].setLoop(LoopOnce);
                }
            }

            this.animations.standing.play();

            if (config.debug) {
                this.gui.add(animations, 'standing');
                this.gui.add(animations, 'attacking');
                this.gui.add(animations, 'walking');
            }

            object.traverse(child => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            this.scene.add(object);
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
