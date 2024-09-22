var atom_array = [];

function interpret_colors(value, atom_array){
    switch (value){
        case "white":
            return set_uniform(atom_array, 0xffffff);
        case "cyan":
            return set_uniform(atom_array, 0x00ffff);
        case "magenta":
            return set_uniform(atom_array, 0xff00ff);
        case "gold":
            return set_uniform(0xffd700, atom_array);
        case "classic":
            return set_atomistic_classic(atom_array);
        case "pastel":
            return set_atomistic_pastel(atom_array);
        case "Magma":
            break;
        case "Plasma":
            break;
        case "Rainbow":
            break;

    }
}

function set_atomistic_classic(atom_array){
    for (let i = 0; i < atom_array.length; i++){
        switch (atom_array[i].atom_type){
            case "C":
                console.log("i see carbon!");
                atom_array[i].color = 0x373737;
                break;
            case "N":
                atom_array[i].color = 0x1e34c9;
                break;
            case "H":
                atom_array[i].color = 0xffffff;
                break;
            case "O":
                atom_array[i].color = 0xdc1111;
                break;
            case "S":
                atom_array[i].color = 0xf4e110;
                break;
            case "P":
                atom_array[i].color = 0xf47c10;
                break;
            default:
                atom_array[i].color = 0xd010f4;
                break;
        }
    }
    return atom_array;
}

function set_uniform(atom_array, color){
    for (let i = 0; i < atom_array.length; i++){
        atom_array[i].color = color;
    }
    return atom_array;
}

const color_utils = {
    interpret_colors:interpret_colors,
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