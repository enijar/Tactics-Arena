import {Vector2, Raycaster} from "three";
import Action from "./Action";
import state from "../state";

export default class Mouse extends Action {
    hoveringObject = null;
    mouse = null;
    mouseClicked = false;
    raycaster = new Raycaster();

    constructor(...props) {
        super(...props);
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mousedown', this.handleMouseDown);
    }

    destroy() {
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mousedown', this.handleMouseDown);
    }

    handleMouseMove = event => {
        if (this.mouse === null) {
            this.mouse = new Vector2();
        }

        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    handleMouseDown = () => {
        this.mouseClicked = true;
    };

    tick() {
        if (this.mouse === null) {
            return;
        }

        this.raycaster.setFromCamera(this.mouse, this.camera);

        const intersects = this.raycaster.intersectObjects(this.scene.children, true);
        let object = null;

        if (intersects.length === 0) {
            return;
        }

        // Set object from state.objects
        for (let i = 0; i < intersects.length; i++) {
            for (let j = 0; j < state.objects.length; j++) {
                if (state.objects[j].uuid === intersects[i].object.uuid) {
                    object = state.objects[j];
                    break;
                }
            }
        }

        // Reset hoveringObject texture map and cursor to default
        if (!object && this.hoveringObject || (object && this.hoveringObject && object.uuid !== this.hoveringObject.uuid)) {
            this.hoveringObject.effects.default(this.hoveringObject.instance);
            this.hoveringObject = null;
            document.body.style.cursor = 'default';
            return;
        }

        // Set hoveringObject texture map to hover
        if (object && !this.hoveringObject) {
            this.hoveringObject = object;
            this.hoveringObject.effects.hover(this.hoveringObject.instance);
            document.body.style.cursor = 'pointer';
        }

        if (this.mouseClicked && this.hoveringObject) {
            const {col, row} = this.hoveringObject;
            const units = state.objects.filter(object => object.renderer === 'Unit');
            const clickedUnit = units.find(unit => unit.col === col && unit.row === row);

            if (clickedUnit) {
                console.log('clicked unit', clickedUnit);
            }
        }

        this.mouseClicked = false;
    }
}
