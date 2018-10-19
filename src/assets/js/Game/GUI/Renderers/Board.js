import {RepeatWrapping, Mesh, MeshPhongMaterial, TextureLoader, GridHelper, BoxGeometry, Object3D} from "three";
import Renderer from "./Renderer";

const ROWS = 11;
const COLS = 11;
const TILE_WIDTH = 50;
const TILE_DEPTH = 10;
const TILE_LENGTH = 50;
const TILE_SPACING = 1;

const TILES = [
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
];

export default class Board extends Renderer {
    constructor(...props) {
        super(...props);

        this.loader = new TextureLoader();
        this.texture = this.loader.load('/img/textures/tile.jpg', texture => {
            texture.wrapS = texture.wrapT = RepeatWrapping;
            texture.offset.set(0, 0);
            texture.repeat.set(2, 2);
        });
        this.material = new MeshPhongMaterial({
            color: 0xffffff,
            specular: 0x111111,
            shininess: 10,
            map: this.texture,
        });
        this.geometry = new BoxGeometry(TILE_WIDTH, TILE_DEPTH, TILE_LENGTH);
        this.board = new Object3D();

        const board = {
            width: ROWS * (TILE_WIDTH + TILE_SPACING),
            height: COLS * (TILE_LENGTH + TILE_SPACING),
        };

        for (let row = 1; row <= ROWS; row++) {
            for (let col = 1; col <= COLS; col++) {
                if (TILES[row - 1][col - 1] === 0) {
                    continue;
                }

                const tile = new Mesh(this.geometry, this.material);
                tile.position.set(
                    (board.width / 2) - ((TILE_WIDTH + TILE_SPACING) * row),
                    0,
                    (board.width / 2) - ((TILE_LENGTH + TILE_SPACING) * col),
                );
                this.board.add(tile);
            }
        }

        // Grid
        this.helper = new GridHelper(2000, 100);
        this.helper.position.y = -199;
        this.helper.material.opacity = 0.25;
        this.helper.material.transparent = true;

        this.scene.add(this.helper);
        this.scene.add(this.board);
    }

    tick() {
        //
    }
}
