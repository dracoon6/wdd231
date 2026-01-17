// Navigation Toggle
const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
    navigation.classList.toggle('show');
    hamButton.classList.toggle('open');
});

// Close navigation when a link is clicked
document.querySelectorAll('.navigation a').forEach(link => {
    link.addEventListener('click', () => {
        navigation.classList.remove('show');
        hamButton.classList.remove('open');
    });
});
