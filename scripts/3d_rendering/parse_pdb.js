import { Atom } from './atom.js';

class parsePDB {
    constructor(file, test3d){
        this.test3d = test3d;
        this.file = file;
        this.atom_array = [];
    }
    async get_atom_lines(){
        const atom_lines = await this.get_num_atoms();
        return atom_lines.length;
    }
    async start_parsing(){
        const atom_lines = await this.get_num_atoms();
        const num_atoms = atom_lines.length;
        for (let i = 0; i < num_atoms; i++){
            const line = atom_lines[i];
        
            // Extract fields based on column positions
            const molecule = line.slice(0, 6).trim(); // Columns 1-6
            const id = line.slice(6, 11).trim(); // Columns 7-11
            const atom_type = line.slice(12, 16).trim(); // Columns 13-16
            const residue_type = line.slice(17, 20).trim(); // Columns 18-20
            const chain = line.slice(21, 22).trim(); // Column 22
            const residue_id = line.slice(22, 26).trim(); // Columns 23-26
            const x_coord = parseFloat(line.slice(30, 38).trim()); // Columns 31-38
            const y_coord = parseFloat(line.slice(38, 46).trim()); // Columns 39-46
            const z_coord = parseFloat(line.slice(46, 54).trim()); // Columns 47-54

            // Create and push new Atom instance
            this.atom_array.push(new Atom(
                molecule,
                id,
                atom_type,
                residue_type,
                chain,
                residue_id,
                x_coord,
                y_coord,
                z_coord
            ));
        }
        //remove waters
        //this.atom_array = this.atom_array.filter(this.remove_waters);
        return this.atom_array;
    }

    // remove_waters(single_atom){
    //     return single_atom.residue_type !== 'HOH'; //returns true or false
    // }

    get_num_atoms() {
        const lines = this.file.split('\n');
    
        // Filter lines that start with "ATOM" or "HETATM" but exclude lines with 'HOH' in columns 17–20
        const atom_lines = lines.filter(line => {
            const atomType = line.slice(17, 20).trim();
            return (line.startsWith("ATOM") || line.startsWith("HETATM")) && atomType !== 'HOH';
        });
    
        return atom_lines;
    }
}

export { parsePDB };