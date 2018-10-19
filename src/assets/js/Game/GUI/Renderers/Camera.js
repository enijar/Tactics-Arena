import Renderer from "./Renderer";

export default class Camera extends Renderer {
    constructor(...props) {
        super(...props);

        this.camera.position.set(0, 250, 1000);
        this.scene.add(this.camera);
    }

    tick() {
        //
    }
}
