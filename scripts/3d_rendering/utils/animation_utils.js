import * as THREE from '../../templates/three.module.js';

var atomistic_bounding_box;
var sticks_bounding_box;

/**
 * Builds a 3D atomistic model of a protein using an array of atoms, excluding hydrogen atoms.
 * 
 * @param {Array} atom_array - An array containing information about individual atoms.
 * @returns {THREE.Group} A group representing the 3D atomistic model of the protein.
 *
 * This function generates a detailed 3D representation of a protein by placing spheres at the positions
 * specified by the input `atom_array`. Each sphere's color corresponds to its type according to predefined rules.
 * The resulting model is returned as a `THREE.Group`, allowing for easy manipulation and rendering within a Three.js scene.
 */
function build_atomistic_model(atom_array){
    const protein = new THREE.Group();
    const bounding_box = new THREE.Box3(); // To calculate the bounding box of the protein

    for (let i = 0; i < atom_array.length; i++){
        if (atom_array[i].atom_type == "H"){ continue; }
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

/**
 * Builds a 3D sticks model of a protein from an array of atoms, creating bonds between atoms based on their types.
 * 
 * @param {Array} atom_array - An array containing information about individual atoms.
 * @returns {THREE.Group} A group representing the 3D sticks model of the protein.
 *
 * This function creates a 3D representation of a protein by connecting atoms with cylinders (sticks).
 * It scans through the provided `atom_array` and connects atoms within a certain distance threshold (`bond_length`)
 * to form bonds. The resulting bonds are added to a `protein` object which represents the entire structure.
 * Additionally, it calculates and returns the bounding box encompassing all parts of the protein.
 */
function build_sticks_model(atom_array){
    const protein = new THREE.Group();
    const bounding_box = new THREE.Box3(); // To calculate the bounding box of the protein
    const len = atom_array.length;
    const bond_length = 2; // in angstroms
    const scanning_length = 40; //this is the number of lines above the index line that will be scanned for bonds;
    for (let index = 0; index < len; index++){
        if (atom_array[index].atom_type !== "S") {
            build_bond_with_carbon(scanning_length, index, len, bond_length, protein, bounding_box, atom_array);
        } else {
            build_bond_disulfide(index, len, bond_length, protein, bounding_box, atom_array);
        }
    }
    sticks_bounding_box = bounding_box;
    return protein;
}

/**
 * builds bonds that are not involving hydrogen or disulfides
 * 
 * @param {*} scanning_length this is the length of the scan; basically I am only checking for atoms that are within 30 ids of eachother to avoid unneeded computational cost. I am assuming there will be no bonds formed across chains (besides disulfides which are handeled elsewhere)
 * @param {*} index this is the index of the particular atom being checked
 * @param {*} len this is the length of the atom array
 * @param {*} bond_length this is the length of the bond being allowed for. For non-disulfied I am giving it a max of 2 angstroms
 * @param {*} protein this is the group that contains all the bonds
 * @param {*} bounding_box this is the bounding box of the protein
 * @param {*} atom_array this is the array of atoms
*/
function build_bond_with_carbon(scanning_length, index, len, bond_length, protein, bounding_box, atom_array) {
    for (let j = 0; j < scanning_length; j++) {
        const target_atom_index = j + index;
        if (!(target_atom_index > 0 && target_atom_index < len)) { break; }
        const dist = distance3D(
            atom_array[index].x_coord, atom_array[index].y_coord, atom_array[index].z_coord,
            atom_array[target_atom_index].x_coord, atom_array[target_atom_index].y_coord, atom_array[target_atom_index].z_coord
        );
        if (dist < bond_length &&
            index !== target_atom_index &&
            atom_array[index].atom_type !== "H" &&
            atom_array[target_atom_index].atom_type !== "H") {
            build_bonds(atom_array, index, target_atom_index, protein, bounding_box);
        }
        
    }
}

/**
 * builds disulfide bonds only, check occurs if the atom is sulfur. I could probably speed this up by only calling the function if the atom is NOT methionine, but unsure how to implement this
 * 
 * No need for scanning length as we are checking the entire length of the file for possible cystines to form the disufide bonds
 * @param {*} index this is the index of the particular atom being checked
 * @param {*} len this is the length of the atom array
 * @param {*} bond_length this is the length of the bond being allowed for. For non-disulfied I am giving it a max of 2 angstroms
 * @param {*} protein this is the group that contains all the bonds
 * @param {*} bounding_box this is the bounding box of the protein
 * @param {*} atom_array this is the array of atoms

 */
function build_bond_disulfide(index, len, bond_length, protein, bounding_box, atom_array) {
    for (let j = 0; j < atom_array.length; j++) {
        const target_atom_index = j + index;
        if (!(target_atom_index > 0 && target_atom_index < len)) { break; }
        const dist = distance3D(
            atom_array[index].x_coord, atom_array[index].y_coord, atom_array[index].z_coord,
            atom_array[target_atom_index].x_coord, atom_array[target_atom_index].y_coord, atom_array[target_atom_index].z_coord
        );
        if ((dist < bond_length || (dist < 3 && atom_array[target_atom_index].atom_type === "S")) &&
            index !== target_atom_index &&
            atom_array[index].atom_type !== "H" &&
            atom_array[target_atom_index].atom_type !== "H") {
            build_bonds(atom_array, index, target_atom_index, protein, bounding_box);
        }
    }
}


/**
 * Creates and adds two bonds between specified atoms in the protein model, updating the bounding box accordingly.
 * 
 * NOTE: you may be asking yourself, why in the world are you making two bonds for every bond. That is, why is const = bond_1 and const = bond_2 being instantiated for each time the function is called? Shouldn't each function call represent the formation of a single bond? Well, this is true we are only making a single bond, but remember that we are not technically creating one cylinder here, but rather two cylinders, one for each atom. For example, a bond formed between a nitrogen and a carbon requires the formation of two cylinders, one blue and one black, for each of the respective atoms forming the bond. Therefore, we must create two separate bonds for each atom involved in the bond. The cylinders we are creating will extend from the atom position to the point that bisects the total bond length. This creates two pseudo "half-bonds" between the two atoms
 * 
 * @param {number} index - Index of the first atom involved in the bond.
 * @param {number} target_atom_index - Index of the second atom involved in the bond.
 * @param {Array} atom_array - Array containing information about individual atoms.
 * @param {THREE.Group} protein - Group where the bonds will be added.
 * @param {THREE.Box3} bounding_box - Bounding box of the protein model.
 */
function build_bonds(atom_array, index, target_atom_index, protein, bounding_box) {
    const bond_1 = build_bond_1(
        new THREE.Vector3(atom_array[index].x_coord, atom_array[index].y_coord, atom_array[index].z_coord),
        new THREE.Vector3(atom_array[target_atom_index].x_coord, atom_array[target_atom_index].y_coord, atom_array[target_atom_index].z_coord),
        atom_array[index].color
    );
    const bond_2 = build_bond_2(
        new THREE.Vector3(atom_array[index].x_coord, atom_array[index].y_coord, atom_array[index].z_coord),
        new THREE.Vector3(atom_array[target_atom_index].x_coord, atom_array[target_atom_index].y_coord, atom_array[target_atom_index].z_coord),
        atom_array[target_atom_index].color
    );
    protein.add(bond_1);
    protein.add(bond_2);
    bounding_box.expandByObject(bond_1);
    bounding_box.expandByObject(bond_2);
}

/**
 * Constructs a bond between two points with a given color.
 *
 * @param {THREE.Vector3} point_X - Starting point of the bond.
 * @param {THREE.Vector3} point_Y - Ending point of the bond.
 * @param {number} curr_color - Color of the bond.
 * @returns {THREE.Mesh} Mesh representing the constructed bond.
 */
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

/**
 * Constructs another bond between two points with a different color.
 *
 * @param {THREE.Vector3} point_X - Starting point of the bond.
 * @param {THREE.Vector3} point_Y - Ending point of the bond.
 * @param {number} curr_color - Color of the bond.
 * @returns {THREE.Mesh} Mesh representing the constructed bond.
 */
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

/**
 * getter method for the atomistic bounding box
 * @returns 
 */
function get_atomistic_bounding_box(){
    return atomistic_bounding_box;
}

/**
 * getter method for the sticks bounding box
 * @returns 
 */
function get_sticks_bounding_box(){
    return sticks_bounding_box;
}

/**
 * rotates around a point
 * 
 * @param {*} obj the object to be rotated
 * @param {*} point the point around which the rotation should occur
 * @param {*} axis the axis around which the rotation should occur
 * @param {*} theta the angle of rotation in radians
 * @param {*} pointIsWorld unsure about this one... I think chatGPT added it?
 */
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

/**
 * checks if the window has been resized and adjusts the renderer and camera aspect ratio accordingly
 * @param {*} renderer 
 * @param {*} camera 
 */
function add_resize_listener(renderer, camera){
    window.addEventListener('resize', () => {
        var width = window.innerWidth;
        var height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width/height;
        camera.updateProjectionMatrix();
    });
}

/**
 * Nice little helper method for calculating the distance between two points in 3D space.
 * 
 * @author chatGPT
 * @returns the distance
 */
function distance3D(x1, y1, z1, x2, y2, z2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const dz = z2 - z1;
    
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

// Packages all of the functions to be exported into a dictionary
const animation_utils = {
    rotate_around_point: rotate_around_point,
    add_resize_listener: add_resize_listener,
    build_atomistic_model: build_atomistic_model,
    build_sticks_model: build_sticks_model,
    get_atomistic_bounding_box: get_atomistic_bounding_box,
    get_sticks_bounding_box: get_sticks_bounding_box
};

export { animation_utils };