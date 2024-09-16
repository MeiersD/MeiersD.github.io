class ButtonManager {
    constructor(pdb_fetcher){
        this.pdb_fetcher = pdb_fetcher;
        this.pdb_input = document.getElementById("pdb-input");
    }
    initiate_button_event_listeners(){
        this.pdb_fetcher.check_pdb_input(this.pdb_input);
    }
}

