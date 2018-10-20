import Renderer from "./Renderer";
import Furgon from "../Unit/Furgon";

export default class Unit extends Renderer {
    units = [];

    constructor(...props) {
        super(...props);
        this.loadUnits();
    }

    async loadUnits() {
        const furgon = new Furgon({col: 1, row: 9});
        await furgon.load();
        this.scene.add(furgon.object);
        this.units.push(furgon);
    }

    tick() {
        for (let i = 0; i < this.units.length; i++) {
            this.units[i].tick();
        }
    }
}
