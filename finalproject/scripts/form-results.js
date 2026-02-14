// Parse query string and display saved application data on form-results page
function parseQuery(qs) {
    const params = new URLSearchParams(qs);
    const out = {};
    for (const [k, v] of params.entries()) out[k] = v;
    return out;
}

document.addEventListener('DOMContentLoaded', () => {
    const results = document.getElementById('results');
    if (!results) return;
    const params = parseQuery(location.search);
    if (Object.keys(params).length) {
        let html = '<dl>';
        Object.entries(params).forEach(([k, v]) => {
            html += `<dt>${k}</dt><dd>${v}</dd>`;
        });
        html += '</dl>';
        results.innerHTML = html;
        return;
    }

    // show last saved application from localStorage if present
    const apps = JSON.parse(localStorage.getItem('guildApplications')) || [];
    if (apps.length) {
        const last = apps[apps.length - 1];
        let html = '<h3>Last saved application</h3><dl>';
        Object.entries(last).forEach(([k, v]) => (html += `<dt>${k}</dt><dd>${v}</dd>`));
        html += '</dl>';
        results.innerHTML = html;
    } else {
        results.innerHTML = '<p>No submitted data found.</p>';
    }
});
