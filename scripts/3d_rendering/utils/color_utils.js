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
                atom_array[i].color = 0xFF2800;
                break;
            case "DT":
                atom_array[i].color = 0xFF6A00;
                break;
            case "DC":
                atom_array[i].color = 0x682600;
                break;
            case "DG":
                atom_array[i].color = 0x302000;
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
                atom_array[i].color = 0xffffff;
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
                atom_array[i].color = 0x6600D6;
                break;
            case "DT":
                atom_array[i].color = 0x3E08FF;
                break;
            case "DC":
                atom_array[i].color = 0x3FFF2A;
                break;
            case "DG":
                atom_array[i].color = 0xE1FF33;
                break;
            //Charged Amino Acids at pH7
            case "ARG":
                atom_array[i].color = 0xDDFF20;
                break;
            case "LYS":
                atom_array[i].color = 0xE9FF84;
                break;
            case "HIS":
                atom_array[i].color = 0xEAFF70;
                break;
            case "GLU":
                atom_array[i].color = 0xD2F600;
                break;
            case "ASP":
                atom_array[i].color = 0xFCFF34;
                break;
            //Polar Amino Acids
            case "GLN":
                atom_array[i].color = 0x0023D7;
                break;
            case "ASN":
                atom_array[i].color = 0xf4e110;
                break;
            case "THR":
                atom_array[i].color = 0x76FF25;
                break;
            case "SER":
                atom_array[i].color = 0x00D3B2;
                break;
            case "CYS":
                atom_array[i].color = 0x4EFFBD;
                break;
            case "PRO":
                atom_array[i].color = 0x0BE3FF;
                break;
            //Non-polar Amino Acids
            case "GLY":
                atom_array[i].color = 0x7F00E3;
                break;
            case "PHE":
                atom_array[i].color = 0x4700A3;
                break;
            case "TYR":
                atom_array[i].color = 0x8B00F4;
                break;
            case "VAL":
                atom_array[i].color = 0xf4e110;
                break;
            case "ALA":
                atom_array[i].color = 0x5300B7;
                break;
            case "LEU":
                atom_array[i].color = 0x7900CF;
                break;
            case "ILE":
                atom_array[i].color = 0x5400F2;
                break;
            case "TRP":
                atom_array[i].color = 0x927DFF;
                break;
            case "MET":
                atom_array[i].color = 0x744DFF;
                break;
            default:
                atom_array[i].color = 0xff0000;
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
                atom_array[i].color = 0xF20100;
                break;
            case "DT":
                atom_array[i].color = 0x0BC8FF;
                break;
            case "DC":
                atom_array[i].color = 0x71FF00;
                break;
            case "DG":
                atom_array[i].color = 0xE008FF;
                break;
            //Charged Amino Acids at pH7
            case "ARG":
                atom_array[i].color = 0x00EE97;
                break;
            case "LYS":
                atom_array[i].color = 0x00DAF2;
                break;
            case "HIS":
                atom_array[i].color = 0xFFEB04;
                break;
            case "GLU":
                atom_array[i].color = 0xB2FF04;
                break;
            case "ASP":
                atom_array[i].color = 0x4BFF07;
                break;
            //Polar Amino Acids
            case "GLN":
                atom_array[i].color = 0xF70E00;
                break;
            case "ASN":
                atom_array[i].color = 0xF27700;
                break;
            case "THR":
                atom_array[i].color = 0x005BE7;
                break;
            case "SER":
                atom_array[i].color = 0xEB008A;
                break;
            case "CYS":
                atom_array[i].color = 0xFF979F;
                break;
            case "PRO":
                atom_array[i].color = 0x660083;
                break;
            //Non-polar Amino Acids
            case "GLY":
                atom_array[i].color = 0x84A900;
                break;
            case "PHE":
                atom_array[i].color = 0xB00200;
                break;
            case "TYR":
                atom_array[i].color = 0xDAA2FF;
                break;
            case "VAL":
                atom_array[i].color = 0xFFA269;
                break;
            case "ALA":
                atom_array[i].color = 0x6FFFFC;
                break;
            case "LEU":
                atom_array[i].color = 0x005760;
                break;
            case "ILE":
                atom_array[i].color = 0x8983FF;
                break;
            case "TRP":
                atom_array[i].color = 0x890BFF;
                break;
            case "MET":
                atom_array[i].color = 0xDE00E8;
                break;
            default:
                atom_array[i].color = 0x000000;
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
                atom_array[i].color = 0x2DFF03;
                break;
        }
    }
    return atom_array;
}

function set_atomistic_pastel(atom_array){
    for (let i = 0; i < atom_array.length; i++){
        switch (atom_array[i].atom_type){
            case "C":
                atom_array[i].color = 0x8b9cab;
                break;
            case "N":
                atom_array[i].color = 0x2370ff;
                break;
            case "H":
                atom_array[i].color = 0xdaffda;
                break;
            case "O":
                atom_array[i].color = 0xff546b;
                break;
            case "S":
                atom_array[i].color = 0xfae100;
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
