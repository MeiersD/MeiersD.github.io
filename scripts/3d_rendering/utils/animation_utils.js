var rotating_speed_x = 0;
var rotating_speed_y = 0;
var rotating_speed_z = 0;

//var color_pattern = 

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
    add_resize_listener: add_resize_listener
};

export { animation_utils };