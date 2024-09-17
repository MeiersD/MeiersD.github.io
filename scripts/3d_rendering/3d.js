class test3d {
    constructor(file){
        this.scene_container = document.getElementById("scene-container");
        this.loading_bar_container = document.getElementById('loading-bar-container');
        this.loading_bar = document.getElementById("loading-bar");
        this.progress = 0;
        this.total_steps = 0;
        this.parse_pdb = new parsePDB(file, this);
    }

    mainSequence(){
        this.set_up_scene();
        const atom_array = this.parse_pdb.start_parsing();
        console.log(atom_array);
    }

    set_up_scene(){
        this.scene_container.classList.add("active");
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        this.scene_container.appendChild(renderer.domElement);
    }

    show_loading_bar(total_steps) {    
        // Make the loading bar visible
        //total steps is the number of atoms in the pdb file.
        this.loading_bar_container.classList.add('active');
        this.loading_bar.classList.add('active');
        this.total_steps = total_steps;
    }

    update_loading_bar(incrementValue) {    
        // Increase the progress based on the passed increment value
        this.progress += incrementValue;
    
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

    generateCube(){
        // Create a scene
        var scene = new THREE.Scene();

        // Create a camera
        var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        // Create a renderer and attach it to the document
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // Create a geometry and a material, and combine them into a mesh
        var geometry = new THREE.BoxGeometry();
        var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        var cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        // Animation loop
        function animate() {
        requestAnimationFrame(animate);

        // Rotate the cube
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render(scene, camera);
        }

        animate();
    }
}