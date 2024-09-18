import * as THREE from '../../node_modules/three/build/three.module.js';
import { OrbitControls } from '../templates/OrbitControls.js'; // Correct import path

import { parsePDB } from './parse_pdb.js';
import { LoadingBar } from './loading_bar.js';

class test3d {
    constructor(file){
        this.scene_container = document.getElementById("scene-container");
        this.parse_pdb = new parsePDB(file, this);
        this.loading_bar = new LoadingBar();
        this.atom_array = [];
        this.renderer = new THREE.WebGLRenderer();

    }

    async mainSequence(){
        this.initialize_scene();
        this.parse_pdb.get_atom_lines().then(total_steps => {
            //this.loading_bar.show_loading_bar(total_steps);
            //return new Promise(resolve => setTimeout(resolve, 100));
        }).then(() => {
            return this.parse_pdb.start_parsing();
        }).then(atom_array => {
            this.atom_array = atom_array;
            // Do the animation
            this.set_up_scene();
        }).catch(error => {
            console.error("Error in mainSequence:", error);
        });
    }

    initialize_scene(){
        this.scene_container.classList.add("active");
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.scene_container.appendChild(this.renderer.domElement);

        this.scene = new THREE.Scene(); //makes the scene
        this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
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
            var geometry = new THREE.SphereGeometry(0.5, 15, 15);
            var material = new THREE.MeshBasicMaterial({ color: 0x808080 });
            var atom = new THREE.Mesh(geometry, material);
            atom.position.set(this.atom_array[i].x_coord, this.atom_array[i].y_coord, this.atom_array[i].z_coord);
            protein.add(atom);
            boundingBox.expandByObject(atom); // Expand the bounding box to include each atom
            //this.loading_bar.update_loading_bar(); // UPDATE LOADING BAR
        }
    
        const center = boundingBox.getCenter(new THREE.Vector3());
        this.scene.add(protein);
        const controls = new OrbitControls( this.camera, this.renderer.domElement)
        controls.target.copy(center); // Set the target to the center of the bounding box
        controls.update(); // Update the controls to reflect the new target

        this.camera.lookAt(center)
        
    
        const animate = () => { // Animation loop
            requestAnimationFrame(animate);
            this.rotate_around_point(protein, center, new THREE.Vector3(0, 0, 3), 0.0005);
            this.rotate_around_point(protein, center, new THREE.Vector3(0, 3, 0), 0.0005);
            this.renderer.render(this.scene, this.camera);
        }
        animate();
    }

    rotate_around_point(obj, point, axis, theta, pointIsWorld = false){
  
        if(pointIsWorld){
            obj.parent.localToWorld(obj.position); // compensate for world coordinate
        }
      
        obj.position.sub(point); // remove the offset
        obj.position.applyAxisAngle(axis, theta); // rotate the POSITION
        obj.position.add(point); // re-add the offset
      
        if(pointIsWorld){
            obj.parent.worldToLocal(obj.position); // undo world coordinates compensation
        }
      
        obj.rotateOnAxis(axis, theta); // rotate the OBJECT
    }
    
}

export { test3d };