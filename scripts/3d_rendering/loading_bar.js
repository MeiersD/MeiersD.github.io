/**
 * Full disclosure, this does not work at all.
 * I tried to get this to work so the user could determine how much more time it would take to load the PDB file,
 * but I couldn't figure out a way to make it work with the current code structure. 
 * 
 * As such, this file is entirely unused and remains here for posterity's sake.
*/
class LoadingBar {
    /**
     * Initializes the loading bar by setting up references to the loading bar container and loading bar elements, and initializes progress and total steps to zero.
     */
    constructor(){
        this.loading_bar_container = document.getElementById('loading-bar-container');
        this.loading_bar = document.getElementById("loading-bar");
        this.progress = 0;
        this.total_steps = 0;
        return;
    }

    /**
     * Activates and displays the loading bar based on the total number of steps (atoms) in the PDB file.
     */
    show_loading_bar(total_steps) {    
        this.loading_bar_container.classList.add('active');
        this.loading_bar.classList.add('active');
        this.total_steps = total_steps;
        console.log("added loading bar, it ought to be active now");
    }

    /**
     * Asynchronously updates the loading bar's progress and adjusts its width based on the current progress relative to total steps.
     */
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

export { LoadingBar };