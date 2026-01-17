// Member Display Functionality
const membersContainer = document.getElementById('members-container');
const gridViewBtn = document.getElementById('grid-view');
const listViewBtn = document.getElementById('list-view');

let membersData = [];
let currentView = 'grid'; // Default view

// Fetch and display members from JSON
async function loadMembers() {
    const response = await fetch('./data/members.json');
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    membersData = await response.json();
    displayMembers();
}

// Display members in current view
function displayMembers() {
    membersContainer.innerHTML = '';

    if (currentView === 'grid') {
        displayGridView();
    } else {
        displayListView();
    }
}

// Grid view display
function displayGridView() {
    membersContainer.className = 'members-grid';
    
    membersData.forEach(member => {
        const memberCard = createMemberCard(member);
        membersContainer.appendChild(memberCard);
    });
}

// List view display
function displayListView() {
    membersContainer.className = 'members-list';
    
    membersData.forEach(member => {
        const memberItem = createMemberListItem(member);
        membersContainer.appendChild(memberItem);
    });
}

// Create member card element
function createMemberCard(member) {
    const card = document.createElement('div');
    card.className = 'member-card';
    
    const membershipClass = getMembershipClass(member.membershipLevel);
    const membershipLabel = getMembershipLabel(member.membershipLevel);
    
    card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name}" class="member-card-image" onerror="this.src='images/placeholder.png'">
        <div class="member-card-content">
            <h3>${member.name}</h3>
            <p class="member-address">${member.address}</p>
            <p class="member-phone">Phone: ${member.phone}</p>
            <p class="member-website">
                <a href="${member.website}" target="_blank" rel="noopener noreferrer">${member.website}</a>
            </p>
            ${member.email ? `<p>Email: <a href="mailto:${member.email}">${member.email}</a></p>` : ''}
            <span class="membership-badge ${membershipClass}">${membershipLabel}</span>
        </div>
    `;
    
    return card;
}

// Create member list item element
function createMemberListItem(member) {
    const item = document.createElement('div');
    item.className = 'member-list-item';
    
    const membershipClass = getMembershipClass(member.membershipLevel);
    const membershipLabel = getMembershipLabel(member.membershipLevel);
    
    item.innerHTML = `
        <img src="images/${member.image}" alt="${member.name}" onerror="this.src='images/placeholder.png'">
        <div class="member-list-content">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><a href="${member.website}" target="_blank" rel="noopener noreferrer">${member.website}</a></p>
        </div>
        <span class="membership-badge ${membershipClass}">${membershipLabel}</span>
    `;
    
    return item;
}

// Get membership class for styling
function getMembershipClass(level) {
    switch(level) {
        case 1: return 'membership-member';
        case 2: return 'membership-silver';
        case 3: return 'membership-gold';
        default: return 'membership-member';
    }
}

// Get membership label
function getMembershipLabel(level) {
    switch(level) {
        case 1: return 'Member';
        case 2: return 'Silver';
        case 3: return 'Gold';
        default: return 'Member';
    }
}

// Event listeners for view toggle
gridViewBtn.addEventListener('click', () => {
    currentView = 'grid';
    gridViewBtn.classList.add('active');
    listViewBtn.classList.remove('active');
    displayMembers();
});

listViewBtn.addEventListener('click', () => {
    currentView = 'list';
    listViewBtn.classList.add('active');
    gridViewBtn.classList.remove('active');
    displayMembers();
});

// Load members when page loads
document.addEventListener('DOMContentLoaded', loadMembers);
