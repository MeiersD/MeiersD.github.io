# This repository contains all of the code for my website.
Please visit [here](https://meiersd.github.io) to see the website!

Key features:
  - Coloring
    - Color all atoms uniformly
    - Color all atoms based on their atom type
    - Color all atoms based on their residue type (20 amino acids and 4 nucleotides supported)
  - Rotation
    - Rotation along all three axis supported
  - Model type
     - Either sticks or atomistic model supported
    - Disulfide bonds are also modeled (model protein with PDB code 1AKI for example)
  - Adding new models
    - As long as there is a pdb file that can be found on RCSB, this website can model it. It will probably lag your computer a good deal if you choose a protein that is too large, but it will be loaded in eventually. If you load in a protein that is too large, such as a multi-subunit complex, there is a good chance your browser will crash.
  - Controls
    - Orbital Controls are implemented with three.js
