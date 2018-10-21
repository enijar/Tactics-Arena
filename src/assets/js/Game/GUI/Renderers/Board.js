import {RepeatWrapping, Mesh, MeshPhongMaterial, TextureLoader, GridHelper, BoxGeometry, Group} from "three";
import Renderer from "./Renderer";
import config from "../../../config";
import {ROWS, COLS, TILE_WIDTH, TILE_DEPTH, TILE_LENGTH} from "../consts";
import {getTilePosition} from "../utils";
import state from "../state";

export default class Board extends Renderer {
    loader = new TextureLoader();
    textures = {};
    effects = {};

    constructor(...props) {
        super(...props);

        const defaultTexture = this.loader.load('/img/textures/tile.jpg', texture => {
            texture.wrapS = texture.wrapT = RepeatWrapping;
            texture.offset.set(0, 0);
            texture.repeat.set(2, 2);
        });
        const hoverTexture = this.loader.load('/img/textures/tile-hover.jpg', texture => {
            texture.wrapS = texture.wrapT = RepeatWrapping;
            texture.offset.set(0, 0);
            texture.repeat.set(2, 2);
        });
        this.textures.default = defaultTexture;
        this.textures.hover = hoverTexture;
        this.effects.default = this.defaultEffect;
        this.effects.hover = this.hoverEffect;
        this.geometry = new BoxGeometry(TILE_WIDTH, TILE_DEPTH, TILE_LENGTH);
        this.board = new Group();

        for (let row = 1; row <= ROWS; row++) {
            for (let col = 1; col <= COLS; col++) {
                if (state.board[row - 1][col - 1] === 0) {
                    continue;
                }

                const material = new MeshPhongMaterial({
                    color: 0xffffff,
                    specular: 0x111111,
                    shininess: 10,
                    map: defaultTexture,
                });
                const object = new Mesh(this.geometry, material);

                object.position.set(...getTilePosition(row, col));
                state.objects.push({
                    uuid: object.uuid,
                    renderer: 'Board',
                    name: 'tile',
                    effects: this.effects,
                    col,
                    row,
                    instance: object,
                });
                this.board.add(object);
            }
        }

        // Grid
        this.helper = new GridHelper(2000, 100);
        this.helper.position.y = -199;
        this.helper.material.opacity = 0.25;
        this.helper.material.transparent = true;

        config.debug && this.scene.add(this.helper);
        this.scene.add(this.board);
    }

    defaultEffect = object => {
        object.material.map = this.textures.default;
    };

    hoverEffect = object => {
        object.material.map = this.textures.hover;
    };

    tick() {
        //
    }
}
