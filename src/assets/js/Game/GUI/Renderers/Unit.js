import {Math} from "three";
import Renderer from "./Renderer";
import state from "../state";
import {UNIT_CLASSES, ROWS, COLS} from "../consts";

export default class Unit extends Renderer {
    units = [];

    constructor(...props) {
        super(...props);
        this.loadUnits();
    }

    async loadUnits() {
        const unitsToLoad = [];

        for (let row = 1; row <= ROWS; row++) {
            for (let col = 1; col <= COLS; col++) {
                const tile = state.board[row - 1][col - 1];

                if (!UNIT_CLASSES.hasOwnProperty(tile)) {
                    continue;
                }

                // Instantiate new unit class at this col and row
                unitsToLoad.push(new UNIT_CLASSES[tile]({col, row}));
            }
        }

        // Load unit class models
        for (let i = 0; i < unitsToLoad.length; i++) {
            await unitsToLoad[i].load();

            // Rotate unit to face camera when past half-way of board (away from camera)
            if (unitsToLoad[i].col > 6) {
                console.log('rotate');
                unitsToLoad[i].object.rotateY(Math.degToRad(180));
            }

            this.scene.add(unitsToLoad[i].object);
            this.units.push(unitsToLoad[i]);
        }
    }

    tick() {
        for (let i = 0; i < this.units.length; i++) {
            this.units[i].tick();
        }
    }
}
