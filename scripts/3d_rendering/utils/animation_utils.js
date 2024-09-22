import * as THREE from '../../templates/three.module.js';

var bond_array;
var atom_array;


var rotating_speed_x = 0;
var rotating_speed_y = 0;
var rotating_speed_z = 0;

var atomistic_bounding_box;
var sticks_bounding_box;

function build_atomistic_model(atom_array){
    const protein = new THREE.Group();
    const bounding_box = new THREE.Box3(); // To calculate the bounding box of the protein

    for (let i = 0; i < atom_array.length; i++){
        if (atom_array[i].atom_type !== "H"){
            var atom_color = atom_array[i].color;
            var geometry = new THREE.SphereGeometry(0.5, 15, 15);
            var material = new THREE.MeshPhongMaterial({ color: atom_color });
            var atom = new THREE.Mesh(geometry, material);
            atom.position.set(atom_array[i].x_coord, atom_array[i].y_coord, atom_array[i].z_coord);
            protein.add(atom);
            bounding_box.expandByObject(atom); // Expand the bounding box to include each atom
        }
    }
    atomistic_bounding_box = bounding_box;
    return protein;
}

function build_sticks_model(atom_array){
    const protein = new THREE.Group();
    const bounding_box = new THREE.Box3(); // To calculate the bounding box of the protein
    const len = atom_array.length;
    const bond_length = 2; // in angstroms ig?
    const scanning_length = 40; //this is the number of lines above the index line that will be scanned for bonds;
    for (let index = 0; index < len; index++){
        if (atom_array[index].atom_type !== "S") {
            for (let j = 0; j < scanning_length; j++){
                const target_atom_index = j + index;
                    if (target_atom_index > 0 && target_atom_index < len){
                        const dist = distance3D(
                            atom_array[index].x_coord, atom_array[index].y_coord, atom_array[index].z_coord,
                            atom_array[target_atom_index].x_coord, atom_array[target_atom_index].y_coord, atom_array[target_atom_index].z_coord
                        );
                        if (dist < bond_length && 
                            index !== target_atom_index &&
                            atom_array[index].atom_type !== "H" &&
                            atom_array[target_atom_index].atom_type !== "H"){
                            const bond_1 = build_bond_1(
                                new THREE.Vector3(atom_array[index].x_coord, atom_array[index].y_coord, atom_array[index].z_coord),
                                new THREE.Vector3(atom_array[target_atom_index].x_coord, atom_array[target_atom_index].y_coord, atom_array[target_atom_index].z_coord),
                                atom_array[index].color
                            );
                            const bond_2 = build_bond_2(
                                new THREE.Vector3(atom_array[index].x_coord, atom_array[index].y_coord, atom_array[index].z_coord),
                                new THREE.Vector3(atom_array[target_atom_index].x_coord, atom_array[target_atom_index].y_coord, atom_array[target_atom_index].z_coord),
                                atom_array[target_atom_index].color
                            )
                            protein.add(bond_1);
                            protein.add(bond_2);
                            bounding_box.expandByObject(bond_1);
                            bounding_box.expandByObject(bond_2);
                        }
                    }
            }
        } else {
            for (let j = 0; j < atom_array.length; j++){
                const target_atom_index = j + index;
                    if (target_atom_index > 0 && target_atom_index < len){
                        const dist = distance3D(
                            atom_array[index].x_coord, atom_array[index].y_coord, atom_array[index].z_coord,
                            atom_array[target_atom_index].x_coord, atom_array[target_atom_index].y_coord, atom_array[target_atom_index].z_coord
                        );
                        if ((dist < bond_length || (dist < 3 && atom_array[target_atom_index].atom_type === "S")) && 
                            index !== target_atom_index &&
                            atom_array[index].atom_type !== "H" &&
                            atom_array[target_atom_index].atom_type !== "H"){
                            const bond_1 = build_bond_1(
                                new THREE.Vector3(atom_array[index].x_coord, atom_array[index].y_coord, atom_array[index].z_coord),
                                new THREE.Vector3(atom_array[target_atom_index].x_coord, atom_array[target_atom_index].y_coord, atom_array[target_atom_index].z_coord),
                                atom_array[index].color
                            );
                            const bond_2 = build_bond_2(
                                new THREE.Vector3(atom_array[index].x_coord, atom_array[index].y_coord, atom_array[index].z_coord),
                                new THREE.Vector3(atom_array[target_atom_index].x_coord, atom_array[target_atom_index].y_coord, atom_array[target_atom_index].z_coord),
                                atom_array[target_atom_index].color
                            )
                            protein.add(bond_1);
                            protein.add(bond_2);
                            bounding_box.expandByObject(bond_1);
                            bounding_box.expandByObject(bond_2);
                        }
                    }
            }
        }
    }
    sticks_bounding_box = bounding_box;
    return protein;
}

function build_bond_1(point_X, point_Y, curr_color){
    //curr_color = 0xffffff;
    const midpoint = new THREE.Vector3().lerpVectors(point_X, point_Y, 0.5);
    // edge from X to Y
    var direction = new THREE.Vector3().subVectors( midpoint, point_X );
    // cylinder: radiusAtTop, radiusAtBottom, height, radiusSegments, heightSegments
    var edgeGeometry = new THREE.CylinderGeometry( 0.2, 0.2, direction.length(), 6, 4 ); // Adjusted radius for bond size
    var edge = new THREE.Mesh( edgeGeometry, new THREE.MeshPhongMaterial( { color: curr_color } ) );
    // Set the position at the midpoint
    edge.position.copy(point_X.clone().add(direction.multiplyScalar(0.5)));
    // Align the cylinder along the bond direction
    edge.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());
    return edge;
}

function build_bond_2(point_X, point_Y, curr_color){
    const midpoint = new THREE.Vector3().lerpVectors(point_X, point_Y, 0.5);
    // edge from X to Y
    var direction = new THREE.Vector3().subVectors( point_Y, midpoint );
    // cylinder: radiusAtTop, radiusAtBottom, height, radiusSegments, heightSegments
    var edgeGeometry = new THREE.CylinderGeometry( 0.2, 0.2, direction.length(), 6, 4 ); // Adjusted radius for bond size
    var edge = new THREE.Mesh( edgeGeometry, new THREE.MeshPhongMaterial( { color: curr_color } ) );
    // Set the position at the midpoint
    const quarterPoint = new THREE.Vector3().lerpVectors(midpoint, point_Y, 0.5); // Halfway between midpoint and point_Y
    edge.position.copy(quarterPoint); 
    // Align the cylinder along the bond direction
    edge.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());
    return edge;
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

function distance3D(x1, y1, z1, x2, y2, z2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const dz = z2 - z1;
    
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
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