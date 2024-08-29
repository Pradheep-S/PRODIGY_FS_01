document.addEventListener('DOMContentLoaded', function() {
    // Toggle between Student and Teacher forms
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

    // Form elements
    const studentForm = document.getElementById('student-signin-form');
    const teacherForm = document.getElementById('teacher-signin-form');
    
    // Validation for Student Sign-Up Form
    studentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = document.getElementById('signup-student-name').value.trim();
        const rollNumber = document.getElementById('signup-student-rollno').value.trim();
        const password = document.getElementById('signup-student-password').value.trim();
        const confirmPassword = document.getElementById('signup-student-confirm-password').value.trim();
        
        // Name validation
        const namePattern = /^[a-zA-Z\s]{3,30}$/;
        if (!namePattern.test(name)) {
            alert('Name must be between 3-30 alphabetic characters.');
            return;
        }

        // Roll Number validation
        const rollNumberPattern = /^[a-zA-Z0-9]{1,10}$/;
        if (!rollNumberPattern.test(rollNumber)) {
            alert('Roll Number must be exactly 10 alphanumeric characters.');
            return;
        }

        // Password validation
        const passwordPattern = /^(?=.*\d)(?=.*[@$_!%*?&])[A-Za-z\d@$_!%*?&]{8,}$/;
        if (!passwordPattern.test(password)) {
            alert('Password must be at least 8 characters long, include an uppercase letter, a number, and a special character.');    
            return;
        }

        // Confirm Password validation
        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        // If all validations pass
        set('/signin', 'student-signin-form', event);
    });

    // Validation for Teacher Sign-Up Form
    teacherForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = document.getElementById('signup-teacher-name').value.trim();
        const accessId = document.getElementById('signup-teacher-id').value.trim();
        const password = document.getElementById('signup-teacher-password').value.trim();
        const confirmPassword = document.getElementById('signup-teacher-confirm-password').value.trim();
        
        // Name validation 
        const namePattern = /^[a-zA-Z\s]{3,30}$/;
        if (!namePattern.test(name)) {
            alert('Name must be between 3-30 alphabetic characters.');
            return;
        }

        // Access ID validation 
        const accessIdPattern = /^[a-zA-Z0-9]{2,12}$/;
        if (!accessIdPattern.test(accessId)) {
            alert('Access ID must be between 6-12 alphanumeric characters.');
            return;
        }

        // Password validation
        const passwordPattern = /^(?=.*\d)(?=.*[@$!%_*?&])[A-Za-z\d@$_!%*?&]{8,}$/;
        if (!passwordPattern.test(password)) {
            alert('Password must be at least 8 characters long, include an uppercase letter, a number, and a special character.');
            return;
        }

        // Confirm Password validation
        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        // If all validations pass
        set('/signin', 'teacher-signin-form', event);
    });

    // Function to set form action and submit
    function set(path, formId, event) {
        const form = document.getElementById(formId);
        form.action = 'http://localhost:3000' + path;
        form.submit(); 
    }
});
