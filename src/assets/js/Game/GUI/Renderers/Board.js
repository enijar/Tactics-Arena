import {
    RepeatWrapping,
    Mesh,
    MeshPhongMaterial,
    TextureLoader,
    GridHelper,
    BoxGeometry,
    Group,
    Vector2,
    Raycaster,
} from "three";
import Renderer from "./Renderer";
import config from "../../../config";

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
    hoveringObjects = [];
    mouse = new Vector2();
    textures = {
        default: null,
        hover: null,
    };

    constructor(...props) {
        super(...props);

        this.raycaster = new Raycaster();
        this.loader = new TextureLoader();
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
        this.geometry = new BoxGeometry(TILE_WIDTH, TILE_DEPTH, TILE_LENGTH);
        this.board = new Group();

        const board = {
            width: ROWS * (TILE_WIDTH + TILE_SPACING),
            height: COLS * (TILE_LENGTH + TILE_SPACING),
        };

        for (let row = 1; row <= ROWS; row++) {
            for (let col = 1; col <= COLS; col++) {
                if (TILES[row - 1][col - 1] === 0) {
                    continue;
                }

                const material = new MeshPhongMaterial({
                    color: 0xffffff,
                    specular: 0x111111,
                    shininess: 10,
                    map: defaultTexture,
                });

                const tile = new Mesh(this.geometry, material);
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

        config.debug && this.scene.add(this.helper);
        this.scene.add(this.board);

        window.addEventListener('mousemove', this.handleMouseMove);
    }

    destroy() {
        window.removeEventListener('mousemove', this.handleMouseMove);
    }

    handleMouseMove = event => {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    tick() {
        this.raycaster.setFromCamera(this.mouse, this.camera);

        const intersects = this.raycaster.intersectObjects(this.board.children, true);

        // Reset hoveringObjects material to default texture map
        for (let i = 0; i < this.hoveringObjects.length; i++) {
            this.hoveringObjects[i].material.map = this.textures.default;
        }

        // Free-up memory
        delete this.hoveringObjects;
        this.hoveringObjects = [];

        for (let i = 0; i < intersects.length; i++) {
            intersects[i].object.material.map = this.textures.hover;
            this.hoveringObjects.push(intersects[i].object);
        }

        if (this.hoveringObjects.length > 0) {
            document.body.style.cursor = 'pointer';
        } else {
            document.body.style.cursor = 'default';
        }
    }
}
