const courses = [
    { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, certificate: 'Web and Computer Programming', description: 'This course introduces...', completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, certificate: 'Web and Computer Programming', description: 'This course introduces...', completed: true },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, certificate: 'Web and Computer Programming', description: 'CSE 111 students become more proficient...', completed: true },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, certificate: 'Web and Computer Programming', description: 'This course will introduce...', completed: false },
    { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, certificate: 'Web and Computer Programming', description: 'This course builds on...', completed: true },
    { subject: 'WDD', number: 231, title: 'Web Frontend Development I', credits: 2, certificate: 'Web and Computer Programming', description: 'This course focuses on...', completed: false }
];

const courseContainer = document.querySelector('#course-list');
const totalCreditsDisplay = document.querySelector('#total-credits');

// Function to render courses
function displayCourses(filteredCourses) {
    courseContainer.innerHTML = ""; // Clear current list

    filteredCourses.forEach(course => {
        const card = document.createElement("div");
        card.className = `course-card ${course.completed ? 'completed' : ''}`;
        card.innerHTML = `<strong>${course.subject} ${course.number}</strong>`;
        courseContainer.appendChild(card);
    });

    // Calculate total credits using reduce
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsDisplay.textContent = totalCredits;
}

// Event Listeners for Filtering
document.querySelector('#all').addEventListener('click', () => displayCourses(courses));
document.querySelector('#cse').addEventListener('click', () => {
    displayCourses(courses.filter(course => course.subject === 'CSE'));
});
document.querySelector('#wdd').addEventListener('click', () => {
    displayCourses(courses.filter(course => course.subject === 'WDD'));
});

// Initial display
displayCourses(courses);