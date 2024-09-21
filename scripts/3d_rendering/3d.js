import * as THREE from '../templates/three.module.js';
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

var spotlight_power = 2.0;


class test3d {
    constructor(file){
        this.parse_pdb = new parsePDB(file, this);
        this.atom_array = [];
        
    }

    async mainSequence(){
        this.clear_scene();
        this.initialize_scene();
        this.parse_pdb.get_atom_lines().then(total_steps => {
            //loading_bar.show_loading_bar(total_steps);
            //return new Promise(resolve => setTimeout(resolve, 100));
        }).then(() => {
            return this.parse_pdb.start_parsing();
        }).then(atom_array => {
            this.atom_array = atom_array;
            this.set_up_scene();
        }).catch(error => {
            console.error("Error in mainSequence:", error);
        });
    }

    initialize_scene(){
        scene_container.classList.add("active");
        
        renderer.setSize(render_width, render_height);
        scene_container.appendChild(renderer.domElement);
        camera.position.z = 200; //sets camera position
        animation_utils.add_resize_listener(renderer, camera);
    }

    set_up_scene(){
        
        const atomistic_protein = animation_utils.build_atomistic_model(this.atom_array); //need to pass it the animation_utils object
        const sticks_protein = animation_utils.build_sticks_model(this.atom_array);

        const atomistic_bounding_box = animation_utils.get_atomistic_bounding_box();
        const sticks_bounding_box = animation_utils.get_sticks_bounding_box();
        
        // const center = atomistic_bounding_box.getCenter(new THREE.Vector3());
        // scene.add(atomistic_protein);
    
        const center = sticks_bounding_box.getCenter(new THREE.Vector3());
        scene.add(sticks_protein);

        const spotlight = new THREE.SpotLight(light_color, spotlight_power);
        spotlight.position.copy(camera.position);
        spotlight.target.position.copy(center);
        spotlight.decay = 0;
        scene.add(spotlight); // Add the spotlight to the scene
        scene.add(spotlight.target); // Ensure the target is added to the scene
        
        const controls = new OrbitControls( camera, renderer.domElement)
        controls.target.copy(center); // Set the target to the center of the bounding box
        controls.update(); // Update the controls to reflect the new target

        camera.lookAt(center)
        controls.maxDistance = 750;
    
        const animate = () => { // Animation loop
            requestAnimationFrame(animate);
            // animation_utils.rotate_around_point(atomistic_protein, center, new THREE.Vector3(3, 3, 0), rotation_speed_x);
            // animation_utils.rotate_around_point(atomistic_protein, center, new THREE.Vector3(0, 3, 0), rotation_speed_y);
            // animation_utils.rotate_around_point(atomistic_protein, center, new THREE.Vector3(0, 0, 3), rotation_speed_z);

            animation_utils.rotate_around_point(sticks_protein, center, new THREE.Vector3(3, 3, 0), rotation_speed_x);
            animation_utils.rotate_around_point(sticks_protein, center, new THREE.Vector3(0, 3, 0), rotation_speed_y);
            animation_utils.rotate_around_point(sticks_protein, center, new THREE.Vector3(0, 0, 3), rotation_speed_z);


            spotlight.position.copy(camera.position); // Ensure the spotlight always points at the center
            renderer.render(scene, camera);
        }
        animate();
    }    

    clear_scene(){
        if (scene) {
            while(scene.children.length > 0){ 
                scene.remove(scene.children[0]); 
            }
        }
    }

    change_rotation_speed(x_speed, y_speed, z_speed){
        if (x_speed !== -1){
            rotation_speed_x = x_speed;
        }
        if (y_speed !== -1){
            rotation_speed_y = y_speed;
        }
        if (z_speed !== -1){
            rotation_speed_z = z_speed;
        }
    }
}

export { test3d };