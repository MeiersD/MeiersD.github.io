import { test3d } from '../3d_rendering/3d.js';

class PDBfetcher {
    constructor(home){
        this.home = home;
        this.pdb_code = '';
        this.not_already_fetching = true;
        this.pdb_contents = '';
        this.keyword = '';
    }

    /**
     * adds event listener to the html text entry field. If enter is pressed,
     * it will call the send_message_to_build_scene method with the current
     *
     * @param {*} pdb_input the html text entry field that contains the pdb code.
     */
    check_pdb_input(pdb_input) {
        pdb_input.addEventListener('keydown', async (event) => {
            if (event.key === "Enter" && this.not_already_fetching) {
                this.send_message_to_build_scene(pdb_input.value); // Save the value of the pdb_code the user inputted
            }
        });
    }

    /**
     * Fetches the pdb contents from RCSB using the provided pdb code and stores them in this.pdb_contents.
     */
    async fetch_pdb_from_rcsb() {
        const response = await fetch(`https://files.rcsb.org/view/${this.pdb_code}.pdb`);
        if (!response.ok) {
            throw new Error('This was not a real pdb code');
        }
        this.pdb_contents = await response.text();
    }

    /**
     * Gets the keyword from the pdb file by searching for the KEYWDS line
     *
     * @param {*} file The pdb file as a string
     */
    get_keyword(file) {
        const lines = file.split('\n');
        const keyword_line = lines.filter(line => {
            return line.startsWith("KEYWDS");
        });
        const keyword_str = keyword_line[0]; // Access the first (and likely only) matching line
        const myInt = keyword_str.indexOf(','); // Find the index of the comma
        this.keyword = keyword_str.slice(10, myInt).trim(); // Extract the keyword starting from index 11
        this.keyword = this.keyword.toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
    }

    /**
     * Sends message to build scene when enter key is pressed on the text box
     * 
     * @param {*} pdb_input The pdb code entered into the text box
     */
    async send_message_to_build_scene(pdb_input){
        this.pdb_code = pdb_input;
        console.log("You have inputted the code: ", this.pdb_code, "\nBeginning fetching now...");
        this.not_already_fetching = false; // Stops the user from overloading the function
        this.pdb_contents = ''; // Reset pdb_contents here
        
        try {
            await this.fetch_pdb_from_rcsb(); // Wait for fetch to complete
            this.home.showNotification("PDB found", "approved"); 
        } catch (error) {
            console.error("Error fetching PDB:", error);
            this.home.showNotification("PDB not found", "denied"); // Handle fetch error
            this.not_already_fetching = true; // Re-enable fetching
            return;
        }

        this.temp = new test3d(this.pdb_contents);
        this.temp.mainSequence().then(() => {
            this.not_already_fetching = true; 
        }).then(() => {
            console.log("fetching re-enabled");
            this.get_keyword(this.pdb_contents);
        }).then(() => {
            document.getElementById("animation-menu-code").innerHTML = 
                "<span style='font-size: larger;'>PDB Code:</span><br>"
                + this.pdb_code.toUpperCase();
            document.getElementById("animation-menu-description").innerHTML = 
                "<br><br><span style='font-size: larger;'>Macromolecule type:</span><br>" 
                + this.keyword;
        });
    }

    /**
     * passes this function directly to 3d.js
     * @param {*} x_speed 
     * @param {*} y_speed 
     * @param {*} z_speed 
     */
    change_rotation_speed(x_speed, y_speed, z_speed){
        this.temp.change_rotation_speed(x_speed, y_speed, z_speed);
    }

    /**
     * passes this function directly to 3d.js
     * @param {*} value the trace status chosen by the user (atomic vs sticks)
     */
    set_trace_status(value){
        if(this.temp){
            this.temp.set_trace_status(value);
        }
    }

    /**
     * passes this function directly to 3d.js
     * @param {*} value the color chosen by the user
     */
    change_coloring(value){
        if(this.temp){
            this.temp.change_coloring(value);
        }
    }
}

export { PDBfetcher };