// Join Page Functionality

// Set timestamp when page loads
function setTimestamp() {
    const now = new Date();
    const timestampValue = now.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        timestampField.value = timestampValue;
    }
}

// Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    // Set timestamp on page load
    setTimestamp();

    // Get all info buttons
    const infoButtons = document.querySelectorAll('.info-btn');
    
    infoButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                modal.showModal();
            }
        });
    });

    // Close modals
    const closeButtons = document.querySelectorAll('.close-modal');
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Find the parent modal dialog
            const modal = this.closest('dialog');
            if (modal) {
                modal.close();
            }
        });
    });

    // Close modal when clicking outside the modal content
    const modals = document.querySelectorAll('.membership-modal');
    
    modals.forEach(modal => {
        modal.addEventListener('click', function(event) {
            // Only close if clicking on the dialog background, not the content
            if (event.target === this) {
                this.close();
            }
        });

        // Close with Escape key
        modal.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                this.close();
            }
        });
    });
});
