document.addEventListener('DOMContentLoaded', () => {
    const joinForm = document.getElementById('join-form');
    const formStatus = document.getElementById('form-status');
    function getFormData(formData) {
        const data = {};
        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }
        return data;
    }

    function showStatusMessage(message, isSuccess) {
        formStatus.classList.remove('success', 'error', 'hidden');
        if (isSuccess) {
            formStatus.classList.add('success');
        } else {
            formStatus.classList.add('error');
        }
        formStatus.innerHTML = `<p>${message}</p>`;
    }

    function submitApplication(applicationData) {
        let applications = JSON.parse(localStorage.getItem('guildApplications')) || [];
        if (applicationData['char-name'] && applicationData['char-class'] && applicationData['bnet-id']) {
            applicationData.timestamp = new Date().toLocaleString();
            applications.push(applicationData);
            localStorage.setItem('guildApplications', JSON.stringify(applications));
            showStatusMessage('Application saved locally. Redirecting to results...', true);
            return true;
        } else {
            showStatusMessage('Please fill out all required fields.', false);
            return false;
        }
    }

    joinForm.addEventListener('submit', (event) => {
        // allow navigation to form-results.html but store the application first
        const formData = new FormData(joinForm);
        const applicationData = getFormData(formData);
        const ok = submitApplication(applicationData);
        if (!ok) {
            event.preventDefault();
        }
        // if ok, let the browser submit (method=get action=form-results.html)
    });
});
