import { homeLogic } from './home_logic.js';
import { PDBfetcher } from './pdb_fetcher.js';
import { ButtonManager } from './button_manager.js';
/*****************************************************
* creates an instance of home which will be          *
* passed to the other .js scripts to modify the html *
*****************************************************/
const home = new homeLogic();
/*******************************************
* creates an instance of PDBfetcher which  *
* contains details about the raw PDB file  *
*******************************************/
const pdb_fetcher = new PDBfetcher(home);
/***************************************************
* creates an instance of buttonManager which       *
* sets up elements from the HTML to be refered to  *
***************************************************/
const button_manager = new ButtonManager(pdb_fetcher, home);

/********************************************
* Initiates event listeners for all buttons *
*********************************************/
button_manager.initiate_button_event_listeners();

/*********************************************
* Automatically loads the DNA upon page load *
*********************************************/
document.addEventListener("DOMContentLoaded", function() {
    button_manager.radio_switch('uniform-color');
    button_manager.radio_switch('on-rotation');
    button_manager.radio_switch('off-trace');
    pdb_fetcher.send_message_to_build_scene("1fly");
});