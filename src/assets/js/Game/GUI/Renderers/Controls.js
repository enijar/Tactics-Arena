const THREE = require('three');
const OrbitControls = require('three-orbit-controls')(THREE);
import Renderer from "./Renderer";

export default class Controls extends Renderer {
    constructor(...props) {
        super(...props);

        this.controls = new OrbitControls(this.camera);
        this.controls.damping = 0.2;

        this.camera.position.set(0, 250, 1000);
        this.scene.add(this.camera);
    }

    tick() {
        this.controls.update();
    }
}
