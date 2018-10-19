import {Raycaster, Vector2} from "three";
import Renderer from "./Renderer";

export default class Caster extends Renderer {
    constructor(...props) {
        super(...props);

        this.raycaster = new Raycaster();
        this.mouse = new Vector2();

        window.addEventListener('mousemove', this.handleMouseMove);
    }

    destroy() {
        window.removeEventListener('mousemove', this.handleMouseMove);
    }

    handleMouseMove = event => {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    tick() {
        this.raycaster.setFromCamera(this.mouse, this.camera);

        const intersects = this.raycaster.intersectObjects(this.scene.children);

        // Check the raycaster has hit an object
        if (intersects.length === 0) {
            return;
        }

        for (let i = 0; i < intersects.length; i++) {
            // intersects[i].object.material.emissive.setHex(0xff0000);

            console.log(intersects[i].object.constructor.name);
        }
    }
}
