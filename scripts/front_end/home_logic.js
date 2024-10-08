class homeLogic {
    constructor(){
        this.notificationElement = document.getElementById("notification");
        this.input_container = document.getElementById("input-container");
        return;
    }
    showNotification(message, type) {
        this.notificationElement.innerText = message;
        this.notificationElement.classList.remove('approved', 'denied', 'show');
        this.notificationElement.classList.add(`${type}`, 'show');
        setTimeout(() => {
            this.notificationElement.classList.remove('approved', 'denied', 'show');
        }, 3000); // Hide the notification after 3 seconds
    }
    request_approved_element(pdb_contents) {
        console.log("pdb found");
        this.showNotification("PDB found", "approved");
    }

    request_denied_element(pdb_contents) {
        console.log("pdb not found");
        this.showNotification("PDB not found", "denied");
    }
}

export { homeLogic };