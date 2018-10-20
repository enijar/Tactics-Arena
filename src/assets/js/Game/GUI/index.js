import {Scene, PerspectiveCamera, WebGLRenderer, Math} from "three";
import * as dat from "dat.gui";
import config from "../../config";
import Background from "./Renderers/Background";
import Board from "./Renderers/Board";
import Unit from "./Renderers/Unit";
import Light from "./Renderers/Light";
import Camera from "./Renderers/Camera";
import Controls from "./Renderers/Controls";

export default class GUI {
    scene = new Scene();
    camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 5000);
    renderer = new WebGLRenderer({antialias: true});
    renderers = [
        new Background(this.scene, this.camera),
        new Board(this.scene, this.camera),
        new Unit(this.scene, this.camera),
        new Light(this.scene, this.camera),
        new Camera(this.scene, this.camera),
        new Controls(this.scene, this.camera),
    ];

    constructor() {
        this.resize();
        window.addEventListener('resize', this.resize);

        if (config.debug) {
            this.gui = new dat.GUI();
            this.gui.addFolder('Camera Position');
            this.gui.add(this.camera.position, 'x', -1000, 1000).step(0.1).listen();
            this.gui.add(this.camera.position, 'y', -1000, 1000).step(0.1).listen();
            this.gui.add(this.camera.position, 'z', -2500, 2500).step(0.1).listen();

            this.gui.addFolder('Camera Rotation');
            this.gui.add(this.camera.rotation, 'x', -Math.degToRad(360), Math.degToRad(360)).step(Math.degToRad(1)).listen();
            this.gui.add(this.camera.rotation, 'y', -Math.degToRad(360), Math.degToRad(360)).step(Math.degToRad(1)).listen();
            this.gui.add(this.camera.rotation, 'z', -Math.degToRad(360), Math.degToRad(360)).step(Math.degToRad(1)).listen();
        }
    }

    destroy() {
        window.removeEventListener('resize', this.resize);

        for (let i = 0; i < this.renderers.length; i++) {
            this.renderers[i].destroy();
        }
    }

    resize = () => {
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
    };

    mount(node) {
        node.appendChild(this.renderer.domElement);
    }

    render = () => {
        requestAnimationFrame(this.render);

        for (let i = 0; i < this.renderers.length; i++) {
            this.renderers[i].tick();
        }

        this.renderer.render(this.scene, this.camera);
    };
}
