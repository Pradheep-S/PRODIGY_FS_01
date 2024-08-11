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
