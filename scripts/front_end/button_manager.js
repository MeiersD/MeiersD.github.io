class ButtonManager {
    constructor(pdb_fetcher, home){
        this.home = home; //gets access to the home object
        this.pdb_fetcher = pdb_fetcher; //gets access to home_script's copy of the pdb_fetcher instance
        this.create_html_objects();

        this.initial_speed = 250;

        this.add_titles_to_buttons();
    }

    /**
     * Initializes and assigns HTML elements to class properties for user interaction with PDB input, color, rotation, and trace options.
     */
    create_html_objects() {
        this.pdb_input = document.getElementById("pdb-input"); //makes a variable for the pdb textbox input
        this.color_radios = document.getElementsByName('color-type');
        this.rotation_radios = document.getElementsByName('rotation-type');
        this.trace_radios = document.getElementsByName('trace-type');
        this.animation_menu_color = document.getElementById('animation-menu-color');
        this.animation_menu_rotation = document.getElementById('animation-menu-rotation');
        this.animation_menu_trace = document.getElementById('animation-menu-trace');

        this.uniform_button = document.getElementById('uniform-button');
        this.atomic_button = document.getElementById('atomic-button');
        this.residue_button = document.getElementById('residue-button');
        this.on_rotation_button = document.getElementById('on-rotation-button');
        this.off_rotation_button = document.getElementById('off-rotation-button');
        this.on_trace_button = document.getElementById('on-trace-button');
        this.off_trace_button = document.getElementById('off-trace-button');
    }

    /**
     * Adds descriptive titles to various buttons for color schemes, rotation, and trace options in the UI.
     */
    add_titles_to_buttons() {
        this.color_uniform_title =
            "White:\tall atoms colored white\n"
            + "Cyan: \tall atoms colored cyan\n"
            + "Magenta:   all atoms colored magenta\n"
            + "Gold: \tall atoms colored gold\n";
        this.uniform_button.title = this.color_uniform_title;

        this.color_atomic_title =
            "Classic:    Carbon is charcoal\n"
            + "\t\tNitrogen is blue\n"
            + "\t\tOxygen is red\n"
            + "\t\tSulfur is yellow\n"
            + "\t\tPhosphorus is orange\n"
            + "\t\tOther atoms are green\n"
            + "Pastel:     Carbon is slate-gray\n"
            + "\t\tNitrogen is sky-blue\n"
            + "\t\tOxygen is watermelon\n"
            + "\t\tSulfur is sunshine\n"
            + "\t\tPhosphorus is neon-orange\n"
            + "\t\tOther atoms are aquamarine\n";
        this.atomic_button.title = this.color_atomic_title;

        this.color_residue_title =
            "Magma:  Browns are hydrophobic\n"
            + "\t\tReds are polar\n"
            + "\t\tYellows are charged\n"
            + "\t\tOther atoms are white\n"
            + "Plasma:   Purples are hydrophobic\n"
            + "\t\tBlues and greens are polar\n"
            + "\t\tYellows are charged\n"
            + "\t\tOther atoms are red\n"
            + "Rainbow: Residues are colored diversely\n"
            + "\t\tOther atoms are black";
        this.residue_button.title = this.color_residue_title;

        this.on_rotation_button_title =
            "Automatically rotate the macromolecule along one of these axes";
        this.on_rotation_button.title = this.on_rotation_button_title;

        this.off_rotation_button_title =
            "Remove automatic rotation of the macromolecule";
        this.off_rotation_button.title = this.off_rotation_button_title;

        this.on_trace_button_title =
            "Replace atomistic model with line tracing adjacent atoms ";
        this.on_trace_button.title = this.on_trace_button_title;

        this.off_trace_button_title =
            "Replace trace model with atomistic model";
        this.off_trace_button.title = this.off_trace_button_title;
    }

    /**
     * Executes a specific function or sets a status based on the provided radio button value.
     */
    radio_switch(value){
        switch(value){
            case "uniform-color":
                this.case1();
                break;

            case "atomic-color":
                this.case2();
                break;

            case "residue-color":
                this.case3();
                break;

            case "on-rotation":
                this.case4();
                break;
            case "off-rotation":
                this.case5();
                break;
            case "on-trace":
                this.pdb_fetcher.set_trace_status(true);
                break;
            case "off-trace":
                this.pdb_fetcher.set_trace_status(false);
                break;
        }        
    }

    /**
     * Initializes event listeners for button interactions, checking PDB input and handling changes in color, rotation, and trace radio buttons.
     */
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

    /**
     * Creates and appends a uniform color menu to the animation menu, allowing users to select a uniform color for the visualization.
     */
    case1(){
        if(this.atomic_color_menu) this.atomic_color_menu.remove();
        if(this.residue_color_menu) this.residue_color_menu.remove();
        this.uniform_color_menu = document.createElement('uniform-color-menu');
        this.animation_menu_color.appendChild(this.uniform_color_menu);
        this.uniform_color_menu.innerHTML = `

            <div title="${this.color_uniform_title.replace(/\n/g, ' &#10;')}">
                <label for="uniform-color-select">Select color:</label>
                <select id="uniform-color-select">
                    <option value="white">White</option>
                    <option value="cyan">Cyan</option>
                    <option value="magenta">Magenta</option>
                    <option value="gold">Gold</option>
                </select>
            </div>
            `;
        this.uniform_color_select = document.getElementById('uniform-color-select');
        this.uniform_color_select.addEventListener('change', () =>{
            this.pdb_fetcher.change_coloring(this.uniform_color_select.value);
        })
        this.pdb_fetcher.change_coloring("white");
    }

    /**
     * Creates and appends an atomic color menu to the animation menu, allowing users to select a color scheme for atoms.
     */
    case2(){
        if(this.uniform_color_menu) this.uniform_color_menu.remove();
        if(this.residue_color_menu) this.residue_color_menu.remove();
        this.atomic_color_menu = document.createElement('atomic-color-menu');
        this.animation_menu_color.appendChild(this.atomic_color_menu);
        this.atomic_color_menu.innerHTML = `
            <div title="${this.color_atomic_title.replace(/\n/g, ' &#10;')}">
                <label for="atomic-color-select">Select atomic color scheme:</label>
                <select id="atomic-color-select">
                    <option value="classic">Classic</option>
                    <option value="pastel">Pastel</option>
                </select>
            </div>
        `;
        this.atomic_color_select = document.getElementById('atomic-color-select');
        this.atomic_color_select.addEventListener('change', () =>{
            this.pdb_fetcher.change_coloring(this.atomic_color_select.value);
        })
        this.pdb_fetcher.change_coloring("classic");
    }

    /**
     * Creates and appends a residue color menu to the animation menu, allowing users to select a color scheme for residues.
     */
    case3(){
        if(this.atomic_color_menu) this.atomic_color_menu.remove();
        if(this.uniform_color_menu) this.uniform_color_menu.remove();
        this.residue_color_menu = document.createElement('residue-color-menu');
        this.animation_menu_color.appendChild(this.residue_color_menu);
        this.residue_color_menu.innerHTML = `
            <div title="${this.color_residue_title.replace(/\n/g, ' &#10;')}">
                <label for="residue-color-select">Select residue color scheme:</label>
                <select id="residue-color-select">
                    <option value="magma">Magma</option>
                    <option value="plasma">Plasma</option>
                    <option value="rainbow">Rainbow</option>
                </select>
            </div>
        `;
        this.residue_color_select = document.getElementById('residue-color-select');
        this.residue_color_select.addEventListener('change', () =>{
            this.pdb_fetcher.change_coloring(this.residue_color_select.value);
        })
        this.pdb_fetcher.change_coloring("magma");
    }

    /**
     * Creates and appends a rotation menu to the animation menu, allowing users to adjust rotation speeds along the X, Y, and Z axes via sliders.
     */
    case4(){
        this.on_rotation_menu = document.createElement('on-rotation-menu');
        this.animation_menu_rotation.appendChild(this.on_rotation_menu);
        this.on_rotation_menu.innerHTML = `
            <div title="${this.on_rotation_button_title}">
                <div>Rotate along X-axis: <input type="range" id="rotation-x" min="0" max="360" value="0"></div>
                <div>Rotate along Y-axis: <input type="range" id="rotation-y" min="0" max="360" value="${this.initial_speed}"></div>
                <div>Rotate along Z-axis: <input type="range" id="rotation-z" min="0" max="360" value="0"></div>
            </div>
        `;
        const slider_x = document.getElementById('rotation-x');
        const slider_y = document.getElementById('rotation-y');
        const slider_z = document.getElementById('rotation-z');
        slider_x.addEventListener("input", (event) => {
            this.pdb_fetcher.change_rotation_speed((event.target.value**2)/2.5e7, -1, -1);
        });

        slider_y.addEventListener("input", (event) => {
            this.pdb_fetcher.change_rotation_speed(-1, (event.target.value**2)/2.5e7, -1);
        });

        slider_z.addEventListener("input", (event) => {
            this.pdb_fetcher.change_rotation_speed(-1, -1, (event.target.value**2)/2.5e7);
        });
    }

    /**
     * Resets the rotation speed and updates the rotation sliders to zero.
     */
    case5(){
        this.pdb_fetcher.change_rotation_speed(0, 0, 0);
        document.getElementById("rotation-x").value = 0;
        document.getElementById("rotation-y").value = 0;
        document.getElementById("rotation-z").value = 0;
        this.initial_speed = 0; //makes the y-slider go to zero
        if (this.on_rotation_menu) this.on_rotation_menu.remove();
    }
}

export { ButtonManager };
    