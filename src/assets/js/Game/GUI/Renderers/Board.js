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
import {ROWS, COLS, TILE_WIDTH, TILE_DEPTH, TILE_LENGTH} from "../consts";
import {getTilePosition} from "../utils";
import state from "../state";

export default class Board extends Renderer {
    hoveringTile = null;
    mouse = null;
    raycaster = new Raycaster();
    loader = new TextureLoader();
    textures = {
        default: null,
        hover: null,
    };

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
                const mesh = new Mesh(this.geometry, material);
                const tile = {
                    uuid: mesh.uuid,
                    col,
                    row,
                    mesh,
                };

                tile.mesh.position.set(...getTilePosition(row, col));
                state.tiles.push(tile);
                this.board.add(tile.mesh);
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
        if (this.mouse === null) {
            this.mouse = new Vector2();
        }

        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    tick() {
        if (this.mouse === null) {
            return;
        }

        this.raycaster.setFromCamera(this.mouse, this.camera);

        const intersects = this.raycaster.intersectObjects(this.board.children, true);

        if (intersects.length === 0) {
            // Reset hoveringTile texture map and cursor to default
            if (this.hoveringTile) {
                this.hoveringTile.material.map = this.textures.default;
                this.hoveringTile = null;
                document.body.style.cursor = 'default';
            }
            return;
        }

        // Set hoveringTile texture map to default
        if (this.hoveringTile) {
            this.hoveringTile.material.map = this.textures.default;
        }

        // Set hoveringTile texture map to hover
        this.hoveringTile = intersects[0].object;
        this.hoveringTile.material.map = this.textures.hover;
        document.body.style.cursor = 'pointer';

        // const tile = state.tiles.find(tile => tile.uuid === this.hoveringTile.uuid);
        //
        // if (tile) {
        //     console.log(tile);
        // }
    }
}
