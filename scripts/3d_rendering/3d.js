class test3d {
    constructor(file){
        this.scene_container = document.getElementById("scene-container");
        this.parse_pdb = new parsePDB(file, this);
        this.loading_bar = new LoadingBar();
        this.atom_array = [];
        this.renderer = new THREE.WebGLRenderer();

    }

    async mainSequence(){
        this.initialize_scene();
        this.parse_pdb.get_atom_lines().then(total_steps => {
            this.loading_bar.show_loading_bar(total_steps);
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
            this.loading_bar.update_loading_bar(); // UPDATE LOADING BAR
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
}