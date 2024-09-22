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
        case "magma":
            return set_residue_magma(atom_array);
        case "plasma":
            return set_residue_plasma(atom_array);
        case "rainbow":
            return set_residue_rainbow(atom_array);

    }
}

function set_residue_magma(atom_array){
    for (let i = 0; i < atom_array.length; i++){
        switch (atom_array[i].residue_type){
            //DNA Nucleotides
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
            //Charged Amino Acids at pH7
            case "ARG":
                atom_array[i].color = 0xf5ff28;
                break;
            case "LYS":
                atom_array[i].color = 0xFFD630;
                break;
            case "HIS":
                atom_array[i].color = 0xFFF045;
                break;
            case "GLU":
                atom_array[i].color = 0xFFFF5E;
                break;
            case "ASP":
                atom_array[i].color = 0xFFFA89;
                break;
            //Polar Amino Acids
            case "GLN":
                atom_array[i].color = 0xFF9F28;
                break;
            case "ASN":
                atom_array[i].color = 0xFF6408;
                break;
            case "THR":
                atom_array[i].color = 0xFF5C5B;
                break;
            case "SER":
                atom_array[i].color = 0xCB0A00;
                break;
            case "CYS":
                atom_array[i].color = 0xE54D00;
                break;
            case "PRO":
                atom_array[i].color = 0xFF1918;
                break;
            //Non-polar Amino Acids
            case "GLY":
                atom_array[i].color = 0x9E4400;
                break;
            case "PHE":
                atom_array[i].color = 0x6B3600;
                break;
            case "TYR":
                atom_array[i].color = 0x601C00;
                break;
            case "VAL":
                atom_array[i].color = 0x5C4800;
                break;
            case "ALA":
                atom_array[i].color = 0x332900;
                break;
            case "LEU":
                atom_array[i].color = 0x4B1B00;
                break;
            case "ILE":
                atom_array[i].color = 0x633B00;
                break;
            case "TRP":
                atom_array[i].color = 0x424242;
                break;
            case "MET":
                atom_array[i].color = 0x501E1F;
                break;
            default:
                atom_array[i].color = 0x131313;
                break;
        }
    }
    return atom_array;
}

function set_residue_plasma(atom_array){
    for (let i = 0; i < atom_array.length; i++){
        switch (atom_array[i].residue_type){
            //DNA Nucleotides
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
            //Charged Amino Acids at pH7
            case "ARG":
                atom_array[i].color = 0xf4e110;
                break;
            case "LYS":
                atom_array[i].color = 0xf47c10;
                break;
            case "HIS":
                atom_array[i].color = 0xf4e110;
                break;
            case "GLU":
                atom_array[i].color = 0xf47c10;
                break;
            case "ASP":
                atom_array[i].color = 0xf4e110;
                break;
            //Polar Amino Acids
            case "GLN":
                atom_array[i].color = 0xf47c10;
                break;
            case "ASN":
                atom_array[i].color = 0xf4e110;
                break;
            case "THR":
                atom_array[i].color = 0xf47c10;
                break;
            case "SER":
                atom_array[i].color = 0xf4e110;
                break;
            case "CYS":
                atom_array[i].color = 0xf47c10;
                break;
            case "PRO":
                atom_array[i].color = 0xf4e110;
                break;
            //Non-polar Amino Acids
            case "GLY":
                atom_array[i].color = 0xf47c10;
                break;
            case "PHE":
                atom_array[i].color = 0xf4e110;
                break;
            case "TYR":
                atom_array[i].color = 0xf47c10;
                break;
            case "VAL":
                atom_array[i].color = 0xf4e110;
                break;
            case "ALA":
                atom_array[i].color = 0xf47c10;
                break;
            case "LEU":
                atom_array[i].color = 0xf47c10;
                break;
            case "ILE":
                atom_array[i].color = 0xf47c10;
                break;
            case "TRP":
                atom_array[i].color = 0xf47c10;
                break;
            case "MET":
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
            //DNA Nucleotides
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
            //Charged Amino Acids at pH7
            case "ARG":
                atom_array[i].color = 0xf4e110;
                break;
            case "LYS":
                atom_array[i].color = 0xf47c10;
                break;
            case "HIS":
                atom_array[i].color = 0xf4e110;
                break;
            case "GLU":
                atom_array[i].color = 0xf47c10;
                break;
            case "ASP":
                atom_array[i].color = 0xf4e110;
                break;
            //Polar Amino Acids
            case "GLN":
                atom_array[i].color = 0xf47c10;
                break;
            case "ASN":
                atom_array[i].color = 0xf4e110;
                break;
            case "THR":
                atom_array[i].color = 0xf47c10;
                break;
            case "SER":
                atom_array[i].color = 0xf4e110;
                break;
            case "CYS":
                atom_array[i].color = 0xf47c10;
                break;
            case "PRO":
                atom_array[i].color = 0xf4e110;
                break;
            //Non-polar Amino Acids
            case "GLY":
                atom_array[i].color = 0xf47c10;
                break;
            case "PHE":
                atom_array[i].color = 0xf4e110;
                break;
            case "TYR":
                atom_array[i].color = 0xf47c10;
                break;
            case "VAL":
                atom_array[i].color = 0xf4e110;
                break;
            case "ALA":
                atom_array[i].color = 0xf47c10;
                break;
            case "LEU":
                atom_array[i].color = 0xf47c10;
                break;
            case "ILE":
                atom_array[i].color = 0xf47c10;
                break;
            case "TRP":
                atom_array[i].color = 0xf47c10;
                break;
            case "MET":
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
