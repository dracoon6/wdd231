// Thank You Page Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    
    // Display form data
    const firstNameElement = document.getElementById('summary-first-name');
    const lastNameElement = document.getElementById('summary-last-name');
    const emailElement = document.getElementById('summary-email');
    const phoneElement = document.getElementById('summary-phone');
    const businessNameElement = document.getElementById('summary-business-name');
    const timestampElement = document.getElementById('summary-timestamp');
    
    // Get form values from URL parameters
    const firstName = urlParams.get('first-name') || 'Not provided';
    const lastName = urlParams.get('last-name') || 'Not provided';
    const email = urlParams.get('email') || 'Not provided';
    const phone = urlParams.get('phone') || 'Not provided';
    const businessName = urlParams.get('business-name') || 'Not provided';
    const timestamp = urlParams.get('timestamp') || 'Not provided';
    
    // Populate summary elements
    if (firstNameElement) firstNameElement.textContent = firstName;
    if (lastNameElement) lastNameElement.textContent = lastName;
    if (emailElement) emailElement.textContent = email;
    if (phoneElement) phoneElement.textContent = phone;
    if (businessNameElement) businessNameElement.textContent = businessName;
    if (timestampElement) timestampElement.textContent = timestamp;
    
    // If no data found, show a message
    if (firstName === 'Not provided') {
        console.warn('No form data received. Make sure the form was submitted properly.');
    }
});
