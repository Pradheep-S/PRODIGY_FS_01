const http = require('http');
const { MongoClient } = require('mongodb');
const querystring = require('querystring');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

connectDB();

async function onRequest(req, res) {
    const path = req.url;
    console.log('Request for ' + path + ' received');

    if (req.method === 'POST' && path === "/signin") {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            const formData = querystring.parse(body);
            console.log('Form Data:', formData);

            if (formData['signup-student-name']) {
                const username = formData['signup-student-name'];
                const rollNo = formData['signup-student-rollno'];
                const password = formData['signup-student-password'];

                await insertStudentData(res, username, rollNo, password);
            } else if (formData['signup-teacher-name']) {
                const name = formData['signup-teacher-name'];
                const accessID = formData['signup-teacher-id'];
                const password = formData['signup-teacher-password'];

                await insertTeacherData(res, name, accessID, password);
            }
        });
    } else if (req.method === 'POST' && path === "/login") {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            const formData = querystring.parse(body);
            console.log('Login Form Data:', formData);

            if (formData['roll-number']) {
                const rollNo = formData['roll-number'];
                const password = formData['password'];

                await authenticateStudent(res, rollNo, password);
            } else if (formData['teacher-id']) {
                const teacherID = formData['teacher-id'];
                const accessID = formData['access-id'];

                await authenticateTeacher(res, teacherID, accessID);
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
}

async function insertStudentData(res, username, rollNo, password) {
    try {
        const database = client.db('institution');
        const collection = database.collection('students');

        const student = { username, rollNo, password };
        const result = await collection.insertOne(student);

        console.log('Student registered successfully');
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Student registered successfully');
    } catch (error) {
        console.error('Error inserting student data:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    }
}

async function insertTeacherData(res, name, accessID, password) {
    try {
        const database = client.db('institution');
        const collection = database.collection('teachers');

        const teacher = { name, accessID, password };
        const result = await collection.insertOne(teacher);

        console.log('Teacher registered successfully');
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Teacher registered successfully');
    } catch (error) {
        console.error('Error inserting teacher data:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    }
}

async function authenticateStudent(res, rollNo, password) {
    try {
        const database = client.db('institution');
        const collection = database.collection('students');

        const student = await collection.findOne({ rollNo, password });

        if (student) {
            console.log('Student authenticated successfully');
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Student authenticated successfully');
        } else {
            console.log('Authentication failed for student');
            res.writeHead(401, { 'Content-Type': 'text/plain' });
            res.end('Authentication failed');
        }
    } catch (error) {
        console.error('Error authenticating student:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    }
}

async function authenticateTeacher(res, accessID, password) {
    try {
        const database = client.db('institution');
        const collection = database.collection('teachers');

        // Change the query to check for accessID and password
        const teacher = await collection.findOne({ accessID, password });

        if (teacher) {
            console.log('Teacher authenticated successfully');
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Teacher authenticated successfully');
        } else {
            console.log('Authentication failed for teacher');
            res.writeHead(401, { 'Content-Type': 'text/plain' });
            res.end('Authentication failed');
        }
    } catch (error) {
        console.error('Error authenticating teacher:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    }
}


http.createServer(onRequest).listen(3000, () => {
    console.log('Server is running on port 3000');
});
