const http = require('http');
const { MongoClient } = require('mongodb');
const querystring = require('querystring');

const uri = 'mongodb+srv://sivampradheep:cHD9STNHX68d9etw@cluster0.hzgdr.mongodb.net/';
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

            // Check if it's a student or teacher form submission
            if (formData['signup-student-name']) {
                const username = formData['signup-student-name'];
                const rollNo = formData['signup-student-rollno'];
                const password = formData['signup-student-password'];
                const confirmPassword = formData['signup-student-confirm-password'];

                await insertStudentData(req, res, username, rollNo, password, confirmPassword);
            } else if (formData['signup-teacher-name']) {
                const name = formData['signup-teacher-name'];
                const accessID = formData['signup-teacher-id'];
                const password = formData['signup-teacher-password'];
                const confirmPassword = formData['signup-teacher-confirm-password'];

                await insertTeacherData(req, res, name, accessID, password, confirmPassword);
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
}

async function insertStudentData(req, res, username, rollNo, password, confirmPassword) {
    try {
        const database = client.db('institution');
        const collection = database.collection('students');

        const student = { username, rollNo, password, confirmPassword };

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

async function insertTeacherData(req, res, name, accessID, password, confirmPassword) {
    try {
        const database = client.db('institution');
        const collection = database.collection('teachers');

        const teacher = { name, accessID, password, confirmPassword };

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

http.createServer(onRequest).listen(3000, () => {
    console.log('Server is running on port 3000');
});
