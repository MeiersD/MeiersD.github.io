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
            return set_residue_magma(atom_array);
        case "Plasma":
            return set_residue_plasma(atom_array);
        case "Rainbow":
            return set_residue_rainbow(atom_array);

    }
}

function set_residue_magma(atom_array){
    for (let i = 0; i < atom_array.length; i++){
        switch (atom_array[i].residue_type){
            case "DA":
                atom_array[i].color = 0x373737;
                break;
            case "DT":
                atom_array[i].color = 0x1e34c9;
                break;
            case "DC":
                atom_array[i].color = 0xffffff;
                break;
            case "DG":
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

function set_residue_plasma(atom_array){
    for (let i = 0; i < atom_array.length; i++){
        switch (atom_array[i].residue_type){
            case "C":
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

function set_residue_rainbow(atom_array){
    for (let i = 0; i < atom_array.length; i++){
        switch (atom_array[i].residue_type){
            case "C":
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

function set_atomistic_classic(atom_array){
    for (let i = 0; i < atom_array.length; i++){
        switch (atom_array[i].atom_type){
            case "C":
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

function set_atomistic_pastel(atom_array){
    for (let i = 0; i < atom_array.length; i++){
        switch (atom_array[i].atom_type){
            case "C":
                atom_array[i].color = 0xb3b3b3;
                break;
            case "N":
                atom_array[i].color = 0x93ccff;
                break;
            case "H":
                atom_array[i].color = 0xdaffda;
                break;
            case "O":
                atom_array[i].color = 0xff9af9;
                break;
            case "S":
                atom_array[i].color = 0xfaff8d;
                break;
            case "P":
                atom_array[i].color = 0xffc800;
                break;
            default:
                atom_array[i].color = 0x00ffa2;
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
