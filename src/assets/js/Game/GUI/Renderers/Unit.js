import Renderer from "./Renderer";
import state from "../state";
import {UNIT_CLASSES} from "../consts";

export default class Unit extends Renderer {
    units = [];

    constructor(...props) {
        super(...props);
        this.loadUnits();
    }

    async loadUnits() {
        const unitsToLoad = [];

        for (let row = 1; row < state.board.length; row++) {
            for (let col = 1; col < state.board[row].length; col++) {
                const tile = state.board[row][col];

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
