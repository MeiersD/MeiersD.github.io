function color_uniform(){
    return;
}

function color_atomic(){
    //get all atom types
    //for (let i = 0; i < atom_types.length; i ++){
    //  let 
    //  color-container.appendChild(color_picker_element)
    //  need to add event listeners for each element buttons;
    //  
    //}
    return;
}

function color_residue(){
    return;
}


const color_utils = {
    color_uniform, color_uniform,
    color_atomic: color_atomic,
    color_residue: color_residue
};

export { color_utils };

// To create a continuous color scale from yellow through red to brown for your values from 1 to 100, you can use interpolation. Here’s how you can set it up:

// Color Definitions
// Yellow: #FFFF00 (RGB: 255, 255, 0)
// Red: #FF0000 (RGB: 255, 0, 0)
// Brown: #A52A2A (RGB: 165, 42, 42)
// Steps to Create the Color Scale
// Determine Intervals:

// 1 to 33: Interpolate from Yellow to Red.
// 34 to 66: Interpolate from Red to Brown.
// 67 to 100: Continue interpolating within Brown.
// Interpolate Colors:

// For values 1-33 (Yellow to Red):
// R=255
// G=255−((value ×255)/33)
// B=0
// For values 34-66 (Red to Brown):
// R=255−((value−34)/32*(225-165))
// G=0
// B=0+((value−34)/32 ×(42))
// For values 67-100 (Brown to darker Brown):
// Continue the brown gradient by slightly adjusting RGB values within the brown range.