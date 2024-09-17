class test3d {
    constructor(file){
        this.scene_container = document.getElementById("scene-container");
        this.loading_bar_container = document.getElementById('loading-bar-container');
        this.loading_bar = document.getElementById("loading-bar");
        this.progress = 0;
        this.total_steps = 0;
        this.parse_pdb = new parsePDB(file, this);
        this.atom_array = [];
        this.renderer = new THREE.WebGLRenderer();

    }

    async mainSequence(){
        this.initialize_scene();
        this.parse_pdb.get_atom_lines().then(total_steps => {
            this.show_loading_bar(total_steps);
            return new Promise(resolve => setTimeout(resolve, 100));
        }).then(() => {
            return this.parse_pdb.start_parsing();
        }).then(atom_array => {
            this.atom_array = atom_array;
            // Do the animation
            this.set_up_scene();
        }).catch(error => {
            console.error("Error in mainSequence:", error);
        });
    }

    initialize_scene(){
        this.scene_container.classList.add("active");
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.scene_container.appendChild(this.renderer.domElement);

        this.scene = new THREE.Scene(); //makes the scene
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 200; //sets camera position
    }

    set_up_scene(){
        const protein = new THREE.Group();
        for (let i = 0; i < this.atom_array.length; i++){
            var geometry = new THREE.SphereGeometry(1, 5, 5);
            var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
            var atom = new THREE.Mesh(geometry, material);
            atom.position.set(this.atom_array[i].x_coord, this.atom_array[i].y_coord, this.atom_array[i].z_coord);
            protein.add(atom);
            this.update_loading_bar(); // UPDATE LOADING BAR
        }
        this.scene.add(protein);

        const animate = () => { // Animation loop
            requestAnimationFrame(animate);
            protein.rotation.x += 0.01; // Rotate the group on the x-axis
            protein.rotation.y += 0.01; // Rotate the group on the y-axis
            this.renderer.render(this.scene, this.camera);
        }
        animate();
    }

    show_loading_bar(total_steps) {    
        // Make the loading bar visible
        //total steps is the number of atoms in the pdb file.
        this.loading_bar_container.classList.add('active');
        this.loading_bar.classList.add('active');
        this.total_steps = total_steps;
        console.log("added loading bar, it ought to be active now");
    }

    async update_loading_bar() {   
        await new Promise(resolve => setTimeout(resolve, 1000)); 
        // Increase the progress based on the passed increment value
        this.progress += 1;
        // Ensure progress does not exceed total_steps
        if (this.progress > this.total_steps) {
            this.progress = this.total_steps;
        }
       
        // Update the width of the loading bar
        const progressPercentage = (this.progress / this.total_steps) * 100; 
        //this.total_steps is of type promise. I need it to be an int
        this.loading_bar.style.width = `${progressPercentage}%`;
        console.log("bar updated, it is now", this.progress, "out of", this.total_steps);
        // Check if loading is complete
        if (this.progress === this.total_steps) {
            setTimeout(() => {
                this.hideLoadingBar();
            }, 500);
        }
    }
    
    hideLoadingBar() {
        this.loading_bar_container.classList.remove('active');
        this.loading_bar.classList.remove('active');
        this.loading_bar.style.width = '0%'; // Reset width for future uses
    }
}