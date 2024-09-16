/*******************************************
* creates an instance of PDBfetcher which  *
* contains details about the raw PDB file  *
*******************************************/
const pdb_fetcher = new PDBfetcher();
/***************************************************
* creates an instance of buttonManager which       *
* sets up elements from the HTML to be refered to  *
***************************************************/
const button_manager = new ButtonManager(pdb_fetcher);

button_manager.initiate_button_event_listeners();