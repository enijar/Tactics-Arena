import {Math} from "three";
import * as dat from "dat.gui";
import Renderer from "./Renderer";
import config from "../../../config";

export default class Camera extends Renderer {
    constructor(...props) {
        super(...props);

        this.scene.add(this.camera);

        if (config.debug) {
            this.gui = new dat.GUI();
            const position = this.gui.addFolder('Camera Position');
            position.add(this.camera.position, 'x', -1000, 1000).step(0.1).listen();
            position.add(this.camera.position, 'y', -1000, 1000).step(0.1).listen();
            position.add(this.camera.position, 'z', -2500, 2500).step(0.1).listen();

            const rotation = this.gui.addFolder('Camera Rotation');
            rotation.add(this.camera.rotation, 'x', -Math.degToRad(360), Math.degToRad(360)).step(Math.degToRad(1)).listen();
            rotation.add(this.camera.rotation, 'y', -Math.degToRad(360), Math.degToRad(360)).step(Math.degToRad(1)).listen();
            rotation.add(this.camera.rotation, 'z', -Math.degToRad(360), Math.degToRad(360)).step(Math.degToRad(1)).listen();
            this.gui.close();
        }
    }

    tick() {
        //
    }
}
