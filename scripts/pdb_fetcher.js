class PDBfetcher {
    constructor(home){
        this.home = home;
        this.pdb_code = '';
        this.not_already_fetching = true;
        this.pdb_contents = '';
    }

    async check_pdb_input(pdb_input) {
        pdb_input.addEventListener('keydown', async (event) => {
            if (event.key === "Enter" && this.not_already_fetching) {
                this.pdb_code = pdb_input.value; // Save the value of the pdb_code the user inputted
                console.log("You have inputted the code: ", this.pdb_code, "\nBeginning fetching now...");
                this.not_already_fetching = false; // Stops the user from overloading the function
                this.pdb_contents = ''; // Reset pdb_contents here
                
                try {
                    await this.fetch_pdb_from_rcsb(); // Wait for fetch to complete
                    this.home.request_approved_element(this.pdb_contents); 
                } catch (error) {
                    console.error("Error fetching PDB:", error);
                    this.home.request_denied_element(); // Handle fetch error
                    this.not_already_fetching = true; // Re-enable fetching
                    return;
                }
                                //start loading the model
                //continue with more code that shouldn't be run if there was an error previously
            }
        });
    }

    async fetch_pdb_from_rcsb() {
        const response = await fetch(`https://files.rcsb.org/view/${this.pdb_code}.pdb`);
        if (!response.ok) {
            throw new Error('This was not a real pdb code');
        }
        this.pdb_contents = await response.text();
        console.log(this.pdb_contents); // Process the PDB data
    }
}
