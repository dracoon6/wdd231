try {
	const currentYear = new Date().getFullYear();
	const elYear = document.getElementById('currentyear');
	if (elYear) elYear.textContent = currentYear;

	const lastModifiedDate = document.lastModified;
	const elModified = document.getElementById('lastModified');
	if (elModified) elModified.textContent = `Last Modification: ${lastModifiedDate}`;
} catch (e) {
	// fail silently in production build
}