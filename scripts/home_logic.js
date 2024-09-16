// class homeLogic {
//     constructor(){
//         return;
//     }
//     request_approved_element(pdb_contents){
//         console.log("pdb found")
//     }
//     request_denied_element(pdb_contents){
//         console.log("pdb not found")
//     }
// }

class homeLogic {
    constructor(){
        this.notificationElement = document.getElementById("notification");
        return;
    }
    showNotification(message, type) {
        //message appears for a few sec.
        this.notificationElement.innerText = message;
        this.notificationElement.classList.remove('approved', 'denied', 'show');
        this.notificationElement.classList.add(`${type}`, 'show');
        //then hides
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