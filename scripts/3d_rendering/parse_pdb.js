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
        var first_model = true;
        var scanned_atom_1 = 0;
        let i = 0;
        const atom_lines = await this.get_num_atoms();
        const num_atoms = atom_lines.length;
        while(first_model){
            const line = atom_lines[i];
            // Extract fields based on column positions
            const { id, molecule, atom_type, residue_type, chain, residue_id, x_coord, y_coord, z_coord } = parse(line); // Columns 47-54
            if (id === "1"){
                scanned_atom_1 ++;
            }
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
            i++;
            if (i === num_atoms || scanned_atom_1 === 2){ //checks for multiple models in the same pdb or end of file
                first_model = false;
            }
        }
        return this.atom_array;

        function parse(line) {
            const molecule = line.slice(0, 6).trim(); // Columns 1-6
            const id = line.slice(6, 11).trim(); // Columns 7-11
            const atom_type = line.slice(76, 78).trim(); // Columns 13-16
            const residue_type = line.slice(17, 20).trim(); // Columns 18-20
            const chain = line.slice(21, 22).trim(); // Column 22
            const residue_id = line.slice(22, 26).trim(); // Columns 23-26
            const x_coord = parseFloat(line.slice(30, 38).trim()); // Columns 31-38
            const y_coord = parseFloat(line.slice(38, 46).trim()); // Columns 39-46
            const z_coord = parseFloat(line.slice(46, 54).trim()); // Columns 47-54
            return { id, molecule, atom_type, residue_type, chain, residue_id, x_coord, y_coord, z_coord };
        }
    }

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