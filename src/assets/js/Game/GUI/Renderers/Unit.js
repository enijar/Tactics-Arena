import ColladaLoader from "three-collada-loader-2";
import {AnimationMixer, Math, Clock} from "three";
import Renderer from "./Renderer";
import {TILE_WIDTH, TILE_DEPTH, TILE_SPACING, TILE_LENGTH, BOARD_WIDTH, BOARD_HEIGHT} from "../consts";

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
            const scale = TILE_WIDTH / 4;

            console.log('animations', animations);

            const x = (BOARD_WIDTH / 2) - ((TILE_WIDTH + TILE_SPACING) * TILE_ROW);
            const y = TILE_DEPTH / 2;
            const z = (BOARD_HEIGHT / 2) - ((TILE_LENGTH + TILE_SPACING) * TILE_COL);

            avatar.position.set(x, y, z);
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
