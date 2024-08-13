document.getElementById('signup-student-btn').addEventListener('click', function() {
    document.getElementById('signup-student-form').classList.add('active');
    document.getElementById('signup-teacher-form').classList.remove('active');
    this.classList.add('active');
    document.getElementById('signup-teacher-btn').classList.remove('active');
});

document.getElementById('signup-teacher-btn').addEventListener('click', function() {
    document.getElementById('signup-teacher-form').classList.add('active');
    document.getElementById('signup-student-form').classList.remove('active');
    this.classList.add('active');
    document.getElementById('signup-student-btn').classList.remove('active');
});

function set(path, formId, event) {
    event.preventDefault(); // Prevent default form submission behavior
    const form = document.getElementById(formId);
    form.action = 'http://localhost:3000' + path;
    form.submit(); // Submit the form after setting the action
}
document.getElementById('student-btn').addEventListener('click', function() {
    document.getElementById('student-form').classList.add('active');
    document.getElementById('teacher-form').classList.remove('active');
    this.classList.add('active');
    document.getElementById('teacher-btn').classList.remove('active');
});

document.getElementById('teacher-btn').addEventListener('click', function() {
    document.getElementById('teacher-form').classList.add('active');
    document.getElementById('student-form').classList.remove('active');
    this.classList.add('active');
    document.getElementById('student-btn').classList.remove('active');
});
