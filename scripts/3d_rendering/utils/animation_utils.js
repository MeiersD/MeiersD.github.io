import * as THREE from '../../templates/three.module.js';

var rotating_speed_x = 0;
var rotating_speed_y = 0;
var rotating_speed_z = 0;

var atomistic_bounding_box;
var sticks_bounding_box;

//var color_pattern = 

function build_atomistic_model(atom_array){
    const protein = new THREE.Group();
    const bounding_box = new THREE.Box3(); // To calculate the bounding box of the protein

    for (let i = 0; i < atom_array.length; i++){
        var atom_color = atom_array[i].color;
        var geometry = new THREE.SphereGeometry(0.5, 15, 15);
        var material = new THREE.MeshPhongMaterial({ color: atom_color });
        var atom = new THREE.Mesh(geometry, material);
        atom.position.set(atom_array[i].x_coord, atom_array[i].y_coord, atom_array[i].z_coord);
        protein.add(atom);
        bounding_box.expandByObject(atom); // Expand the bounding box to include each atom
    }
    atomistic_bounding_box = bounding_box;
    return protein;

}

function build_sticks_model(atom_array){

}

function get_atomistic_bounding_box(){
    return atomistic_bounding_box;
}

function get_sticks_bounding_box(){
    return sticks_bounding_box;
}

function rotate_around_point(obj, point, axis, theta, pointIsWorld = false){
  
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
    return;
}
function add_resize_listener(renderer, camera){
    window.addEventListener('resize', () => {
        var width = window.innerWidth;
        var height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width/height;
        camera.updateProjectionMatrix();
    });
}

const animation_utils = {
    rotate_around_point: rotate_around_point,
    add_resize_listener: add_resize_listener,
    build_atomistic_model: build_atomistic_model,
    build_sticks_model: build_sticks_model,
    get_atomistic_bounding_box: get_atomistic_bounding_box,
    get_sticks_bounding_box: get_sticks_bounding_box
};

export { animation_utils };