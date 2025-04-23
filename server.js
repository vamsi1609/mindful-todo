const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Path to the JSON file
const usersFilePath = path.join(__dirname, 'users.json');

// Helper function to read users from the JSON file
const readUsers = () => {
    if (!fs.existsSync(usersFilePath)) {
        fs.writeFileSync(usersFilePath, JSON.stringify([]));
    }
    const data = fs.readFileSync(usersFilePath, 'utf-8');
    return JSON.parse(data);
};

// Helper function to write users to the JSON file
const writeUsers = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

// API endpoint to handle signup
app.post('/api/signup', (req, res) => {
    const { name, email, dob, workType, featureSuggestions } = req.body;

    if (!name || !email || !dob || !workType) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const users = readUsers();

    // Check if email already exists
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
    }

    // Add new user
    users.push({ name, email, dob, workType, featureSuggestions });
    writeUsers(users);

    res.status(201).json({ message: 'User saved successfully!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});