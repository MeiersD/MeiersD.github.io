import * as THREE from '../templates/three.module.js';
import { ARButton } from '../templates/ARButton.js';
import { VRButton } from '../templates/VRButton.js';
import { animation_utils } from './utils/animation_utils.js';
import { color_utils } from './utils/color_utils.js';
import { OrbitControls } from '../templates/OrbitControls.js'; // Correct import path

import { parsePDB } from './parse_pdb.js';
import { LoadingBar } from './loading_bar.js';

//*******************/
// Global Variables //
//*******************/
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

/**
 * Represents a 3D test object that parses PDB files and manages the rendering of protein models in a 3D scene.
 */
class test3d {
    constructor(file) {
        this.parse_pdb = new parsePDB(file, this);
        this.atom_array = [];
        this.force_rebuild = false;
        this.sticks_protein;
        this.atomistic_protein;

    }

    /**
     * Executes the main sequence of operations to clear, initialize, and set up the scene with parsed atom data.
     */
    async mainSequence() {
        this.clear_scene();
        this.initialize_scene();
        this.parse_pdb.get_atom_lines().then(total_steps => {
        }).then(() => {
            return this.parse_pdb.start_parsing();
        }).then(atom_array => {
            this.atom_array = atom_array;
            this.set_up_scene();
        });
    }

    /**
     * Initializes the 3D scene by setting up the renderer, camera, and enabling AR capabilities.
     */
    initialize_scene() {
        renderer.setSize(render_width, render_height);
        scene_container.appendChild(renderer.domElement);
        camera.position.z = 200; //sets camera position
        animation_utils.add_resize_listener(renderer, camera);
        scene_container.classList.add("active");

        renderer.xr.enabled = true;
        document.body.appendChild(ARButton.createButton(renderer));

        scene_container.classList.add("active");
    }

    /**
     * Initializes and sets up the 3D scene, including models, lighting, and camera controls, and starts the animation loop.
     */
    set_up_scene() {
        this.force_rebuild = true;

        const rotationVectors = {
            x: new THREE.Vector3(3, 3, 0),
            y: new THREE.Vector3(0, 3, 0),
            z: new THREE.Vector3(0, 0, 3)
        };

        /**
         * Updates the display of the model based on changes in the trace status and forces a rebuild if necessary.
         */
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

        /**
         * Creates the models based on the trace status and adds them to the scene.
         * Also updates the spotlight target to follow the center of the bounding box of the current model.
         */
        const rebuildModels = () => {
            // Remove old models if they exist
            if (this.sticks_protein) removeModel(this.sticks_protein);
            if (this.atomistic_protein) removeModel(this.atomistic_protein);

            //builds both models based off of the array of atoms passed into it
            this.atomistic_protein = animation_utils.build_atomistic_model(this.atom_array);
            this.sticks_protein = animation_utils.build_sticks_model(this.atom_array);

            // sets the center of the box based on the center of the bounding box of the models specified by the trace status
            const center = trace_status
                ? animation_utils.get_sticks_bounding_box().getCenter(new THREE.Vector3())
                : animation_utils.get_atomistic_bounding_box().getCenter(new THREE.Vector3());

            // Add the current protein model to the scene and set spotlight target
            const currentProtein = trace_status ? this.sticks_protein : this.atomistic_protein;
            scene.add(currentProtein);
            spotlight.target.position.copy(center);
        }

        // Redefines the atom_array based on the colors the user has selected
        this.atom_array = color_utils.interpret_colors(color_substatus, this.atom_array);

        // Initialize spotlight
        const spotlight = createSpotlight();

        // Initialize Orbit Controls
        const controls = initializeControls(camera, renderer.domElement);

        // this is the driver function for the animation loop
        const animate = () => {
            updateModelDisplay();
            updateSpotlightPosition(spotlight, camera);
            renderer.render(scene, camera);
            renderer.setAnimationLoop(animate);
        };

        // Start animation loop
        animate();

        /**
         * Creates the spotlight for the scene.
         * The spotlight is positioned at the same location as the camera initially,
         * but its target remains fixed at the origin (0, 0, 0).
         * It has a decay factor of zero which means it does not attenuate over distance.
         * The light color is white and its intensity/power is set to 2.0.
         * @returns the spotlight object
         */
        function createSpotlight() {
            const spotlight = new THREE.SpotLight(light_color, spotlight_power);
            spotlight.position.copy(camera.position);
            spotlight.decay = 0;
            scene.add(spotlight);
            scene.add(spotlight.target); // Ensure the target is added to the scene
            return spotlight;
        }

        /**
         * Creates the controls for the camera.
         * These controls allow users to interact with the camera through mouse movements.
         * The max distance allowed for the camera can also be adjusted here.
         * @param {*} camera 
         * @param {*} domElement 
         * @returns the controls object used to control the camera's movement
         */
        function initializeControls(camera, domElement) {
            const controls = new OrbitControls(camera, domElement);
            controls.maxDistance = 750;
            controls.update();
            return controls;
        }

        /**
         * Removes the model from the scene.
         * If no model is provided, nothing happens.
         * @param {*} model 
         */
        function removeModel(model) {
            if (model) {
                scene.remove(model);
            }
        }

        /**
         * Rotates the given model around the center of the bounding box using provided vectors and speeds.
         * This method uses the `rotateAroundPoint` utility function from `animation_utils`.
         * @param {*} model animation_utils build_sticks_model or animation_utils build_atomistic_model
         * @param {*} center THREE.Vector3
         */
        function animateModelRotation(model, center) {
            animation_utils.rotate_around_point(model, center, rotationVectors.x, rotation_speed_x);
            animation_utils.rotate_around_point(model, center, rotationVectors.y, rotation_speed_y);
            animation_utils.rotate_around_point(model, center, rotationVectors.z, rotation_speed_z);
        }

        /**
         * Ensures that the spotlight will match the camera position
         * this ensures that the spotlight always points towards the center of the model, and the lighting will not flicker
         * when the camera moves around.
         * @param {*} spotlight 
         * @param {*} camera 
         */
        function updateSpotlightPosition(spotlight, camera) {
            spotlight.position.copy(camera.position); // Spotlight follows the camera
        }
    }

    /**
     * Removes all child elements from the scene, effectively clearing it.
     */
    clear_scene() {
        if (scene) {
            while (scene.children.length > 0) {
                scene.remove(scene.children[0]);
            }
        }
    }

    /**
     * Adjusts the rotation speed of the object along the x, y, and z axes.
     * 
     * @param {number} x_speed - The speed of rotation along the x-axis. Use -1 to leave unchanged.
     * @param {number} y_speed - The speed of rotation along the y-axis. Use -1 to leave unchanged.
     * @param {number} z_speed - The speed of rotation along the z-axis. Use -1 to leave unchanged.
     */
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

    /**
     * Set the global variable that determines whether the model should be displayed as a stick or line.
     * then, force a rebuild of the model in the next frame.
     * @param {*} value 
     */
    set_trace_status(value) {
        trace_status = value;
        this.force_rebuild = true;
    }

    /**
     * Set the global color substatus equal to the inputted parameter
     * @param {*} value 
     */
    change_coloring(value) {
        color_substatus = value;
        this.atom_array = color_utils.interpret_colors(value, this.atom_array);
        this.force_rebuild = true;
    }
}

export { test3d };