// Member Data & Spotlights - Dynamic Display
const spotlightsContainer = document.getElementById('spotlights-container');

// Load member spotlights from local JSON data
async function loadSpotlights() {
    try {
        const response = await fetch('./data/members.json');
        
        if (!response.ok) {
            throw new Error('Members data fetch failed');
        }
        
        const members = await response.json();
        
        // Filter for gold (level 3) and silver (level 2) members
        const premiumMembers = members.filter(m => m.membershipLevel === 2 || m.membershipLevel === 3);
        
        if (premiumMembers.length === 0) {
            spotlightsContainer.innerHTML = '<p>No featured members available.</p>';
            return;
        }
        
        // Randomly select 2-3 members (no duplicates)
        const numSpotlights = Math.min(3, Math.max(2, Math.floor(Math.random() * 4)));
        const selectedMembers = [];
        const availableIndices = Array.from({ length: premiumMembers.length }, (_, i) => i);
        
        for (let i = 0; i < numSpotlights && availableIndices.length > 0; i++) {
            const randomIdx = Math.floor(Math.random() * availableIndices.length);
            selectedMembers.push(premiumMembers[availableIndices[randomIdx]]);
            availableIndices.splice(randomIdx, 1);
        }
        
        displaySpotlights(selectedMembers);
    } catch (error) {
        console.error('Error loading spotlights:', error);
        spotlightsContainer.innerHTML = '<p class="error">Unable to load featured members at this time.</p>';
    }
}

// Display member spotlight cards with company information
function displaySpotlights(members) {
    let html = '<div class="spotlights-grid">';
    
    members.forEach(member => {
        const membershipLabel = getMembershipLabel(member.membershipLevel);
        html += `
            <article class="spotlight-card">
                <div class="spotlight-image">
                    <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
                </div>
                <div class="spotlight-content">
                    <h3>${member.name}</h3>
                    <p class="membership-level ${getMembershipClass(member.membershipLevel)}">${membershipLabel}</p>
                    <p class="description">${member.description}</p>
                    <div class="spotlight-info">
                        <p><strong>Phone:</strong> <a href="tel:${member.phone}">${member.phone}</a></p>
                        <p><strong>Address:</strong> ${member.address}</p>
                        <p><strong>Website:</strong> <a href="${member.website}" target="_blank">Visit Site</a></p>
                    </div>
                </div>
            </article>
        `;
    });
    
    html += '</div>';
    spotlightsContainer.innerHTML = html;
}

// Get membership level label
function getMembershipLabel(level) {
    const labels = {
        1: 'Bronze Member',
        2: 'Silver Member',
        3: 'Gold Member'
    };
    return labels[level] || 'Member';
}

// Get membership level CSS class for styling
function getMembershipClass(level) {
    const classes = {
        1: 'bronze',
        2: 'silver',
        3: 'gold'
    };
    return classes[level] || 'member';
}

// Initialize spotlights on page load
document.addEventListener('DOMContentLoaded', loadSpotlights);
