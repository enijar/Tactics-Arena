import {Color} from "three";
import Renderer from "./Renderer";

export default class Background extends Renderer {
    constructor(...props) {
        super(...props);

        this.scene.background = new Color(0x333333);
    }

    tick() {
        //
    }
}
