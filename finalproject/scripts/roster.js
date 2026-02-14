document.addEventListener('DOMContentLoaded', () => {
    const rosterList = document.getElementById('roster-list');
    const modal = document.getElementById('member-modal');
    const modalTitle = document.getElementById('member-modal-title');
    const modalBody = document.getElementById('member-modal-body');
    const modalClose = document.getElementById('modal-close');

    async function fetchRoster() {
        try {
            const resp = await fetch('data/members.json');
            if (!resp.ok) throw new Error('Network response was not ok');
            const data = await resp.json();
            // display at least 15 items
            const items = data.slice(0, 15);
            renderRoster(items);
        } catch (err) {
            rosterList.innerHTML = '<p class="error">Unable to load roster data.</p>';
        }
    }

    function renderRoster(members) {
        rosterList.innerHTML = '';
        members.forEach((member, index) => {
            const card = document.createElement('div');
            card.className = 'roster-member';
            card.setAttribute('data-index', index);
            card.innerHTML = `
                <h3>${member.name}</h3>
                <p><strong>Class:</strong> ${member.class}</p>
                <p><strong>Level:</strong> ${member.level}</p>
                <p><strong>Role:</strong> ${member.role}</p>
                <button class="details-btn">Details</button>
            `;
            rosterList.appendChild(card);
            // details button listener
            card.querySelector('.details-btn').addEventListener('click', () => openModal(member));
        });
    }

    function openModal(member) {
        modalTitle.textContent = member.name;
        modalBody.innerHTML = `
            <p><strong>Class:</strong> ${member.class}</p>
            <p><strong>Level:</strong> ${member.level}</p>
            <p><strong>Role:</strong> ${member.role}</p>
            <p><strong>Notes:</strong> ${member.notes || '—'}</p>
        `;
        modal.classList.remove('hidden');
        modal.classList.add('open');
        modal.querySelector('.modal-close').focus();
    }

    function closeModal() {
        modal.classList.add('hidden');
        modal.classList.remove('open');
    }

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });

    // raid signup handling using localStorage
    function handleSignup(raidName) {
        const applications = JSON.parse(localStorage.getItem('guildApplications')) || [];
        const isMember = applications.length > 0; // basic check: at least one application means member
        if (!isMember) {
            if (confirm('You must be a guild member to sign up for raids. Go to Join page?')) {
                window.location.href = 'join.html';
            }
            return;
        }

        let signups = JSON.parse(localStorage.getItem('raidSignups')) || [];
        if (signups.includes(raidName)) {
            alert(`You are already signed up for ${raidName}.`);
        } else {
            signups.push(raidName);
            localStorage.setItem('raidSignups', JSON.stringify(signups));
            localStorage.setItem('lastSignup', raidName);
            alert(`Successfully signed up for ${raidName}!`);
        }
    }

    // delegate signup button clicks
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.signup-btn');
        if (!btn) return;
        const raidName = btn.getAttribute('data-raid');
        handleSignup(raidName);
    });

    // init
    fetchRoster();
});
