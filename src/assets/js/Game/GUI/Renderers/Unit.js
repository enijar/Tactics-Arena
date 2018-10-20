import ColladaLoader from "three-collada-loader-2";
import {AnimationMixer, Math, Clock} from "three";
import Renderer from "./Renderer";
import {TILE_WIDTH, TILE_DEPTH} from "../consts";
import {getTilePosition} from "../utils";

const TILE_COL = 6;
const TILE_ROW = 6;

export default class Unit extends Renderer {
    constructor(...props) {
        super(...props);

        this.clock = new Clock();
        this.mixer = null;
        this.loader = new ColladaLoader();
        this.loader.load('/models/furgon/model.dae', collada => {
            const animations = collada.animations;
            const avatar = collada.scene;
            const scale = TILE_WIDTH / 6;

            console.log('animations', animations);

            avatar.position.set(...getTilePosition(TILE_ROW, TILE_COL, TILE_DEPTH / 2));
            avatar.rotation.set(Math.degToRad(-90), 0, 0);
            avatar.scale.set(scale, scale, scale);

            avatar.traverse(node => {
                if (node.isSkinnedMesh) {
                    node.frustumCulled = false;
                }
            });

            this.mixer = new AnimationMixer(avatar);
            this.mixer.clipAction(animations[0]).play();
            this.scene.add(avatar);
        });
    }

    tick() {
        this.mixer && this.mixer.update(this.clock.getDelta());
    }
}
