class ButtonManager {
    constructor(pdb_fetcher, home){
        this.home = home; //gets access to the home object
        this.pdb_fetcher = pdb_fetcher; //gets access to home_script's copy of the pdb_fetcher instance
        this.pdb_input = document.getElementById("pdb-input"); //makes a variable for the pdb textbox input
    }
    initiate_button_event_listeners(){
        this.pdb_fetcher.check_pdb_input(this.pdb_input);
    }
}

