import { attractions } from '../data/discover.mjs';

// Initialize discover page
document.addEventListener('DOMContentLoaded', () => {
    displayVisitorMessage();
    renderAttractionCards();
});

/**
 * Display visitor message based on last visit
 */
function displayVisitorMessage() {
    const messageElement = document.getElementById('visitor-message');
    const lastVisitKey = 'lastVisitDate';
    const lastVisitString = localStorage.getItem(lastVisitKey);
    
    let message = '';
    
    if (!lastVisitString) {
        // First visit
        message = 'Welcome! Let us know if you have any questions.';
    } else {
        const lastVisitDate = new Date(parseInt(lastVisitString));
        const currentDate = new Date();
        
        // Calculate difference in milliseconds
        const timeDifference = currentDate - lastVisitDate;
        
        // One day in milliseconds
        const oneDay = 24 * 60 * 60 * 1000;
        
        if (timeDifference < oneDay) {
            // Less than a day
            message = 'Back so soon! Awesome!';
        } else {
            // Calculate number of days
            const daysDifference = Math.floor(timeDifference / oneDay);
            const dayWord = daysDifference === 1 ? 'day' : 'days';
            message = `You last visited ${daysDifference} ${dayWord} ago.`;
        }
    }
    
    // Display the message
    messageElement.innerHTML = `<div class="visitor-info">${message}</div>`;
    
    // Update the last visit date to now
    localStorage.setItem(lastVisitKey, Date.now().toString());
}

/**
 * Render attraction cards from data
 */
function renderAttractionCards() {
    const container = document.getElementById('attractions-container');
    
    // Clear existing content
    container.innerHTML = '';
    
    // Create cards for each attraction
    attractions.forEach((attraction, index) => {
        const card = createAttractionCard(attraction, index);
        container.appendChild(card);
    });
}

/**
 * Create a single attraction card element
 * @param {Object} attraction - The attraction data object
 * @param {number} index - The index for grid area naming
 * @returns {Element} The card element
 */
function createAttractionCard(attraction, index) {
    const card = document.createElement('div');
    card.className = 'attraction-card';
    card.style.setProperty('--card-index', index + 1);
    
    card.innerHTML = `
        <h2>${attraction.name}</h2>
        <figure>
            <img 
                src="/wdd231/chamber/images/${attraction.image}" 
                alt="${attraction.name}" 
                width="300" 
                height="200"
                loading="lazy"
            >
            <figcaption>${attraction.name}</figcaption>
        </figure>
        <address>${attraction.address}</address>
        <p>${attraction.description}</p>
        <button class="learn-more-btn">Learn More</button>
    `;
    
    // Add click handler to Learn More button
    const button = card.querySelector('.learn-more-btn');
    button.addEventListener('click', () => {
        alert(`More information about ${attraction.name} coming soon!`);
    });
    
    return card;
}
