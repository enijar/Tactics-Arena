import Renderer from "./Renderer";
import {CAMERA} from "../consts";

export default class Camera extends Renderer {
    constructor(...props) {
        super(...props);

        this.camera.position.set(CAMERA.position.x, CAMERA.position.y, CAMERA.position.z);
        this.camera.rotation.set(CAMERA.rotation.x, CAMERA.rotation.y, CAMERA.rotation.z);
        this.scene.add(this.camera);
    }

    tick() {
        //
    }
}
