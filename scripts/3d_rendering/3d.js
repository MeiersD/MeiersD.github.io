import * as THREE from '../templates/three.module.js';
import { ARButton } from '../templates/ARButton.js';
import { animation_utils } from './utils/animation_utils.js';
import { color_utils } from './utils/color_utils.js';
import { OrbitControls } from '../templates/OrbitControls.js'; // Correct import path

import { parsePDB } from './parse_pdb.js';
import { LoadingBar } from './loading_bar.js';

const scene = new THREE.Scene(); //makes the scene
const loading_bar = new LoadingBar();
const scene_container = document.getElementById("scene-container");
const render_width = scene_container.offsetWidth;
const render_height = scene_container.offsetHeight;
const renderer = new THREE.WebGLRenderer();
const camera = new THREE.PerspectiveCamera(13, render_width / render_height, 0.1, 1000);
const light_color = 0xFFFFFF;
var rotation_speed_x = 0.000;
var rotation_speed_y = 0.0025;
var rotation_speed_z = 0.000;
var trace_status = true; //determines if the model is either lines or sticks, initialized to true
var spotlight_power = 2.0;
var color_substatus = "classic";

class test3d {
    constructor(file) {
        this.parse_pdb = new parsePDB(file, this);
        this.atom_array = [];
        this.force_rebuild = false;
        this.sticks_protein;
        this.atomistic_protein;

    }

    async mainSequence() {
        this.clear_scene();
        this.initialize_scene();
        this.parse_pdb.get_atom_lines().then(total_steps => {
            //for anyone curious about the loading bar, I tried for a long time to get this to work and eventually gave up
            //loading_bar.show_loading_bar(total_steps);
            //return new Promise(resolve => setTimeout(resolve, 100));
        }).then(() => {
            return this.parse_pdb.start_parsing();
        }).then(atom_array => {
            this.atom_array = atom_array;
            this.set_up_scene();
        });
    }

    initialize_scene() {

        renderer.setSize(render_width, render_height);
        scene_container.appendChild(renderer.domElement);
        camera.position.z = 200; //sets camera position
        animation_utils.add_resize_listener(renderer, camera);
        scene_container.classList.add("active");

        const ar_button = ARButton.createButton(renderer);
        scene_container.appendChild(ar_button);
        scene_container.classList.add("active");
        renderer.xr.enabled = true;
    }

    set_up_scene() {
        this.force_rebuild = true;

        const rotationVectors = {
            x: new THREE.Vector3(3, 3, 0),
            y: new THREE.Vector3(0, 3, 0),
            z: new THREE.Vector3(0, 0, 3)
        };

        const updateModelDisplay = () => {
            if (this.force_rebuild) {
                rebuildModels();
                this.force_rebuild = false;
            }

            const model = trace_status ? this.sticks_protein : this.atomistic_protein;
            const center = trace_status
                ? animation_utils.get_sticks_bounding_box().getCenter(new THREE.Vector3())
                : animation_utils.get_atomistic_bounding_box().getCenter(new THREE.Vector3());

            controls.target.copy(center); // Set controls to point at the center
            camera.lookAt(center); // Ensure camera is focused on the center

            animateModelRotation(model, center);
        }

        const rebuildModels = () => {
            // Remove old models if they exist
            if (this.sticks_protein) removeModel(this.sticks_protein);
            if (this.atomistic_protein) removeModel(this.atomistic_protein);

            this.atomistic_protein = animation_utils.build_atomistic_model(this.atom_array);
            this.sticks_protein = animation_utils.build_sticks_model(this.atom_array);

            const center = trace_status
                ? animation_utils.get_sticks_bounding_box().getCenter(new THREE.Vector3())
                : animation_utils.get_atomistic_bounding_box().getCenter(new THREE.Vector3());

            // Add the current protein model to the scene and set spotlight target
            const currentProtein = trace_status ? this.sticks_protein : this.atomistic_protein;
            scene.add(currentProtein);
            spotlight.target.position.copy(center);
        }

        this.atom_array = color_utils.interpret_colors(color_substatus, this.atom_array);

        // Initialize spotlight
        const spotlight = createSpotlight();

        // Initialize Orbit Controls
        const controls = initializeControls(camera, renderer.domElement);

        const animate = () => {
            updateModelDisplay();
            updateSpotlightPosition(spotlight, camera);
            renderer.render(scene, camera);
            // requestAnimationFrame(animate);
            enderer.setAnimationLoop(animate);
        };

        // Start animation loop
        animate();

        function createSpotlight() {
            const spotlight = new THREE.SpotLight(light_color, spotlight_power);
            spotlight.position.copy(camera.position);
            spotlight.decay = 0;
            scene.add(spotlight);
            scene.add(spotlight.target); // Ensure the target is added to the scene
            return spotlight;
        }

        function initializeControls(camera, domElement) {
            const controls = new OrbitControls(camera, domElement);
            controls.maxDistance = 750;
            controls.update();
            return controls;
        }

        function removeModel(model) {
            if (model) {
                scene.remove(model);
            }
        }

        function animateModelRotation(model, center) {
            animation_utils.rotate_around_point(model, center, rotationVectors.x, rotation_speed_x);
            animation_utils.rotate_around_point(model, center, rotationVectors.y, rotation_speed_y);
            animation_utils.rotate_around_point(model, center, rotationVectors.z, rotation_speed_z);
        }

        function updateSpotlightPosition(spotlight, camera) {
            spotlight.position.copy(camera.position); // Spotlight follows the camera
        }
    }

    clear_scene() {
        if (scene) {
            while (scene.children.length > 0) {
                scene.remove(scene.children[0]);
            }
        }
    }

    change_rotation_speed(x_speed, y_speed, z_speed) {
        if (x_speed !== -1) {
            rotation_speed_x = x_speed;
        }
        if (y_speed !== -1) {
            rotation_speed_y = y_speed;
        }
        if (z_speed !== -1) {
            rotation_speed_z = z_speed;
        }
    }

    set_trace_status(value) {
        trace_status = value;
        this.force_rebuild = true;
    }

    change_coloring(value) {
        color_substatus = value;
        this.atom_array = color_utils.interpret_colors(value, this.atom_array);
        this.force_rebuild = true;
    }
}

export { test3d };