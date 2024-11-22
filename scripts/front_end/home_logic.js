class homeLogic {
    /**
     * Initializes the class by setting up references to the notification and input container elements.
     */
    constructor(){
        this.notificationElement = document.getElementById("notification");
        this.input_container = document.getElementById("input-container");
        return;
    }

    /**
     * Shows a notification with the specified message and type.
     *
     * @param {string} message - The message to display in the notification.
     * @param {string} type - The type of notification (e.g., "approved", "denied").
     */
    showNotification(message, type) {
        this.notificationElement.innerText = message;
        this.notificationElement.classList.remove('approved', 'denied', 'show');
        this.notificationElement.classList.add(`${type}`, 'show');
        setTimeout(() => {
            this.notificationElement.classList.remove('approved', 'denied', 'show');
        }, 3000); // Hide the notification after 3 seconds
    }
}

export { homeLogic };