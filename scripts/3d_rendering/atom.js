class Atom {
    constructor(molecule, id, atom_type, residue_type, chain, residue_id, x_coord, y_coord, z_coord){
        this.molecule = molecule;
        this.id = id;
        this.atom_type = atom_type;
        this.residue_type = residue_type;
        this.chain = chain;
        this.residue_id = residue_id;
        this.x_coord = x_coord;
        this.y_coord = y_coord;
        this.z_coord = z_coord;
        return;
    }
}

export { Atom };