import {AmbientLight, SpotLight, SpotLightHelper} from "three";
import Renderer from "./Renderer";

export default class Light extends Renderer {
    constructor(...props) {
        super(...props);

        this.ambient = new AmbientLight(0xf0f0f0);
        this.spot = new SpotLight(0x999999, 0.4);
        this.spotHelper = new SpotLightHelper(this.spot);

        this.spot.position.set(0, 800, 0);

        this.scene.add(this.spotHelper);
        this.scene.add(this.spot);
        this.scene.add(this.ambient);
    }

    tick() {
        //
    }
}
