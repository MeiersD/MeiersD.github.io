class LoadingBar {
    constructor(){
        this.loading_bar_container = document.getElementById('loading-bar-container');
        this.loading_bar = document.getElementById("loading-bar");
        this.progress = 0;
        this.total_steps = 0;
        return;
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
        console.log("progress is:", this.progress, "total steps is:", this.total_steps)
        //this.total_steps is of type promise. I need it to be an int
        this.loading_bar.style.width = `${progressPercentage}%`;
        //console.log("bar updated, it is now", this.progress, "out of", this.total_steps);
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