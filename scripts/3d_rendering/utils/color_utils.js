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
            return set_uniform(atom_array, 0xffd700);
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
