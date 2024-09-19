class ButtonManager {
    constructor(pdb_fetcher, home){
        this.home = home; //gets access to the home object
        this.pdb_fetcher = pdb_fetcher; //gets access to home_script's copy of the pdb_fetcher instance
        this.pdb_input = document.getElementById("pdb-input"); //makes a variable for the pdb textbox input
        this.color_radios = document.getElementsByName('color-type');
        this.shaders_radios = document.getElementsByName('shaders-type');
        this.rotation_radios = document.getElementsByName('rotation-type');

    }
    initiate_button_event_listeners(){
        this.pdb_fetcher.check_pdb_input(this.pdb_input);
        this.color_radios.forEach(radio => {
            radio.addEventListener('change', (event) => {
                console.log(`Selected value: ${event.target.value}`);
            });
        });
        this.shaders_radios.forEach(radio => {
            radio.addEventListener('change', (event) => {
                console.log(`Selected value: ${event.target.value}`);
            });
        });
        this.rotation_radios.forEach(radio => {
            radio.addEventListener('change', (event) => {
                console.log(`Selected value: ${event.target.value}`);
            });
        });
    }
}

export { ButtonManager };
    