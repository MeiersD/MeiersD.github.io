import * as THREE from '../templates/three.module.js';
import { animation_utils } from './utils/animation_utils.js';
import { color_utils } from './utils/color_utils.js';
import { OrbitControls } from '../templates/OrbitControls.js'; // Correct import path

import { parsePDB } from './parse_pdb.js';
import { LoadingBar } from './loading_bar.js';

const scene = new THREE.Scene(); //makes the scene
const loading_bar = new LoadingBar();
const scene_container = document.getElementById("scene-container");

class test3d {
    constructor(file){
        //this.animation_menu = document.getElementById("animation-menu");
        this.parse_pdb = new parsePDB(file, this);
        this.atom_array = [];
        this.renderer = new THREE.WebGLRenderer();



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
        // Set the dimensions of the scene container
        const containerWidth = 80;  // Customize the width
        const containerHeight = 100; // Customize the height
        // Apply these dimensions to the scene container
        scene_container.style.width = `${containerWidth}%`;
        scene_container.style.height = `${containerHeight}%`;
        // Add the 'active' class and set the renderer size accordingly
        scene_container.classList.add("active");
        //this.animation_menu.classList.add("active");

        const render_width = scene_container.offsetWidth;
        const render_height = scene_container.offsetHeight;
        this.renderer.setSize(render_width, render_height);

        // Append the renderer to the scene container
        scene_container.appendChild(this.renderer.domElement);
        this.camera = new THREE.PerspectiveCamera(50, render_width / render_height, 0.1, 1000);
        this.camera.position.z = 200; //sets camera position

        window.addEventListener('resize', () => {
            var width = window.innerWidth;
            var height = window.innerHeight;
            this.renderer.setSize(width, height);
            this.camera.aspect = width/height;
            this.camera.updateProjectionMatrix();
        });
    }

    set_up_scene(){
        const protein = new THREE.Group();
        const boundingBox = new THREE.Box3(); // To calculate the bounding box of the protein
    
        for (let i = 0; i < this.atom_array.length; i++){
            var atom_color = this.atom_array[i].color;
            var geometry = new THREE.SphereGeometry(0.5, 15, 15);
            var material = new THREE.MeshBasicMaterial({ color: atom_color });
            var atom = new THREE.Mesh(geometry, material);
            atom.position.set(this.atom_array[i].x_coord, this.atom_array[i].y_coord, this.atom_array[i].z_coord);
            protein.add(atom);
            boundingBox.expandByObject(atom); // Expand the bounding box to include each atom
            //loading_bar.update_loading_bar(); // UPDATE LOADING BAR
        }
    
        const center = boundingBox.getCenter(new THREE.Vector3());
        scene.add(protein);
        const controls = new OrbitControls( this.camera, this.renderer.domElement)
        controls.target.copy(center); // Set the target to the center of the bounding box
        controls.update(); // Update the controls to reflect the new target

        this.camera.lookAt(center)
        controls.maxDistance = 750;
    
        const animate = () => { // Animation loop
            requestAnimationFrame(animate);
            animation_utils.rotate_around_point(protein, center, new THREE.Vector3(0, 3, 0), 0.001);
            this.renderer.render(scene, this.camera);
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
}

export { test3d };