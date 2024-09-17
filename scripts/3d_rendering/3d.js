class test3d {
    constructor(file){
        this.scene_container = document.getElementById("scene-container");
        this.loading_bar_container = document.getElementById('loading-bar-container');
        this.loading_bar = document.getElementById("loading-bar");
        this.progress = 0;
        this.total_steps = 0;
        this.parse_pdb = new parsePDB(file, this);
        this.atom_array = [];
    }

    async mainSequence(){
        
        this.atom_array = await this.parse_pdb.start_parsing();
        //do the animation
        this.set_up_scene();
    }

    set_up_scene(){
        this.scene_container.classList.add("active");
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        this.scene_container.appendChild(renderer.domElement);

        this.scene = new THREE.Scene(); //makes the scene
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 200; //sets camera position
        const protein = new THREE.Group();

        this.show_loading_bar(this.atom_array.length);
        

        for (let i = 0; i < this.atom_array.length; i++){
            var geometry = new THREE.SphereGeometry(1, 17, 17);
            var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
            var atom = new THREE.Mesh(geometry, material);
            atom.position.set(this.atom_array[i].x_coord, this.atom_array[i].y_coord, this.atom_array[i].z_coord);
            protein.add(atom);
            console.log("test")
            this.update_loading_bar(1);
        }

        //somehow group all atoms into another object
        this.scene.add(protein);

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);

            protein.rotation.x += 0.01; // Rotate the group on the x-axis
            protein.rotation.y += 0.01; // Rotate the group on the y-axis

            renderer.render(this.scene, this.camera);
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

    update_loading_bar(incrementValue) {    
        // Increase the progress based on the passed increment value
        this.progress += incrementValue;
        console.log("im on step", this.progress);
        // Ensure progress does not exceed total_steps
        if (this.progress > this.total_steps) {
            this.progress = this.total_steps;
        }
       
        // Update the width of the loading bar
        const progressPercentage = (this.progress / this.total_steps) * 100; 
        this.loading_bar.style.width = `${progressPercentage}%`;
        // Check if loading is complete
        if (this.progress === this.total_steps) {
            this.hideLoadingBar(); // Call hideLoadingBar as a function
        }
    }
    
    hideLoadingBar() {
        this.loading_bar_container.classList.remove('active');
        this.loading_bar.classList.remove('active');
        this.loading_bar.style.width = '0%'; // Reset width for future uses
    }
}