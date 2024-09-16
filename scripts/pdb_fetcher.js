class PDBfetcher {
    constructor(){
        this.pdb_code;
    }
    check_pdb_input(pdb_input){
        pdb_input.addEventListener('keydown', (event)=>{
            if (event.key === "Enter"){
                console.log("pdb_code submitted");
                this.pdb_code = pdb_input.value; //saves the value of the pdb_code the user inputed
                console.log("you have inputted", this.pdb_code);
            }
        });
    }
}