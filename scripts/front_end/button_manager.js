class ButtonManager {
    constructor(pdb_fetcher, home){
        this.home = home; //gets access to the home object
        this.pdb_fetcher = pdb_fetcher; //gets access to home_script's copy of the pdb_fetcher instance
        this.pdb_input = document.getElementById("pdb-input"); //makes a variable for the pdb textbox input
        this.color_radios = document.getElementsByName('color-type');
        this.rotation_radios = document.getElementsByName('rotation-type');
        this.trace_radios = document.getElementsByName('trace-type');
        this.animation_menu_color = document.getElementById('animation-menu-color');
        this.animation_menu_rotation = document.getElementById('animation-menu-rotation');
        this.animation_menu_trace = document.getElementById('animation-menu-trace');


        //

    }

    radio_switch(value){
        switch(value){
            case "uniform-color":
                if(this.atomic_color_menu) this.atomic_color_menu.remove();
                if(this.residue_color_menu) this.residue_color_menu.remove();
                this.uniform_color_menu = document.createElement('uniform-color-menu');
                this.animation_menu_color.appendChild(this.uniform_color_menu);
                this.uniform_color_menu.innerHTML = 
                    `
                    <div>Inner HTML here</div>
                    `;
                break;
            case "atomic-color":
                if(this.uniform_color_menu) this.uniform_color_menu.remove();
                if(this.residue_color_menu) this.residue_color_menu.remove();
                this.atomic_color_menu = document.createElement('atomic-color-menu');
                this.animation_menu_color.appendChild(this.atomic_color_menu);
                this.atomic_color_menu.innerHTML = 
                    `
                    <div>Inner HTML here</div>
                    `;
                break;
            case "residue-color":
                if(this.atomic_color_menu) this.atomic_color_menu.remove();
                if(this.uniform_color_menu) this.uniform_color_menu.remove();
                this.residue_color_menu = document.createElement('residue-color-menu');
                this.animation_menu_color.appendChild(this.residue_color_menu);
                this.residue_color_menu.innerHTML = 
                    `
                    <div>Inner HTML here</div>
                    `;
                break;
            case "on-rotation":
                this.on_rotation_menu = document.createElement('on-rotation-menu');
                this.animation_menu_rotation.appendChild(this.on_rotation_menu);
                this.on_rotation_menu.innerHTML = 
                    `
                    <div>Inner HTML here</div>
                    `;
                break;
            case "off-rotation":
                if (this.on_rotation_menu) this.on_rotation_menu.remove();
                break;
            case "on-trace":
                this.on_trace_menu = document.createElement('on-trace-menu');
                this.animation_menu_trace.appendChild(this.on_trace_menu);
                this.on_trace_menu.innerHTML = 
                    `
                    <div>Inner HTML here</div>
                    `;
                break;
            case "off-trace":
                if (this.on_trace_menu) this.on_trace_menu.remove();
                break;
        }
        // this.initiate_radio_event_listeners(value);
        
    }

    // initiate_radio_event_listeners(value){
    //     another switch statement which might make the event listeners for the elements in the thingy
    // }

    initiate_button_event_listeners(){
        this.pdb_fetcher.check_pdb_input(this.pdb_input);
        this.color_radios.forEach(radio => {
            radio.addEventListener('change', (event) => {
                this.radio_switch(event.target.value);
            });
        });
        this.rotation_radios.forEach(radio => {
            radio.addEventListener('change', (event) => {
                this.radio_switch(event.target.value);
            });
        });
        this.trace_radios.forEach(radio => {
            radio.addEventListener('change', (event) => {
                this.radio_switch(event.target.value);
            });
        });
    }
}

export { ButtonManager };
    