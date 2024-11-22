import { Atom } from './atom.js';

/**
 * Parses a PDB file to extract atom information and stores it in an array of Atom objects.
 */
class parsePDB {
    /**
     * Initializes the class with a file and a test3d parameter, and sets up an empty array for storing atoms.
     * 
     * @param {string} file - The path to the PDB file.
     */
    constructor(file){
        // sets the file variable
        this.file = file;
        // creates an empty list for the atoms
        this.atom_array = [];
    }
    
    /**
     * Asynchronously retrieves the number of atom lines by fetching the number of atoms and returning its length.
     * 
     * @returns {Promise<number>} A promise resolving to the number of atom lines.
     */
    async get_atom_lines(){
        const atom_lines = await this.get_num_atoms();
        return atom_lines.length;
    }
    
    /**
     * Asynchronously parses atom lines to extract atom details and creates Atom instances for the first model in a PDB file.
     * 
     * @returns {Promise<Array<Atom>>} A promise resolving to an array of Atom instances.
     */
    async start_parsing(){
        /**keeps track of the model being parsed. You may or may not know this, but some pdb files have multiple models. For example, if you load them into pymol with the fetch command, you can actually loop through multiple structures. The way this works in the actual formatting of the pdb file is that it just appends a new list of atoms for each model. If I do not count the number of times a particular id gets scanned, I will end up plotting multiple models overlayed upon one another.*/
        var first_model = true;
        // when we scan the atom with id=1 for the second time, we have started parting the second model, and its time to terminate parsing
        var scanned_atom_1 = 0; 
        // keeps track of how many lines we've read so far
        let i = 0;
        const atom_lines = await this.get_num_atoms();
        const num_atoms = atom_lines.length;
        while(first_model){
            const line = atom_lines[i];
            // Extract fields based on column positions
            const { id, molecule, atom_type, residue_type, chain, residue_id, x_coord, y_coord, z_coord } = this.parse(line); // Columns 47-54
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
    }

    /**
     * Parses a line of text to extract and return atom details including molecule, id, atom type, residue type, chain, residue id, and coordinates.
     */
    parse(line) {
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

    /**
     * Retrieves lines from the file that represent atoms, excluding water molecules ('HOH').
     */
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