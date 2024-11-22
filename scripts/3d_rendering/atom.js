/**
 * Represents an atom within a molecule, storing its properties such as type, residue, chain, coordinates, and color.
 */
class Atom {
    /**
     * These are the parameters that the atom object stores. Each atom is ascribed one of each of these variables
     * @param {*} molecule the molecule to which it belongs
     * @param {*} id the unique ID for the atom, ranges from 1 to the total number of atoms in the PDB file
     * @param {*} atom_type the type of atom (C, N, O etc.)
     * @param {*} residue_type the amino acid or nucleotide to which it belongs
     * @param {*} chain the chain to which it belongs. This is not used in any of the colorings, but color by chain could be added later
     * @param {*} residue_id the number of the residue, ranges from 1 to the total number of amino acids/nucleotides in the protein/dna/rna
     * @param {*} x_coord the x coordinate of the atom
     * @param {*} y_coord the y coordinate of the atom
     * @param {*} z_coord the z coordinate of the atom
     */
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

        // The default color is white, but gets set to something else when coloring functions are called
        this.color = 0xffffff;
    }
}

export { Atom };