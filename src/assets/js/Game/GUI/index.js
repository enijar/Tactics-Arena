import {Scene, PerspectiveCamera, WebGLRenderer} from "three";
import Background from "./Renderers/Background";
import Board from "./Renderers/Board";
import Light from "./Renderers/Light";
import Camera from "./Renderers/Camera";
import Controls from "./Renderers/Controls";
import Caster from "./Renderers/Caster";

export default class GUI {
    scene = new Scene();
    camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 5000);
    renderer = new WebGLRenderer({antialias: true});
    renderers = [
        new Background(this.scene, this.camera),
        new Board(this.scene, this.camera),
        new Light(this.scene, this.camera),
        new Camera(this.scene, this.camera),
        new Controls(this.scene, this.camera),
        new Caster(this.scene, this.camera),
    ];

    constructor() {
        this.resize();
        window.addEventListener('resize', this.resize);
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
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
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
