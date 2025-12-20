const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const users = [];
// Parse JSON request bodies
app.use(bodyParser.json());

// Simple route to demonstrate the server works
app.get('/', (req, res) => {
	res.send(`Hello from port ${process.env.PORT} for app ${process.env.APP_NAME}`);
});

// POST /users - Add a new user
app.post('/users', (req, res) => {
	const { userId } = req.body;

	// Check if userId is present in request
	if (!userId) {
		return res.status(400).json({ error: 'userId is required' });
	}

	// Check if user already exists
	if (users.includes(userId)) {
		return res.status(400).json({ error: 'User already exists' });
	}

	// Add new user
	users.push(userId);
	return res.status(201).json({ message: 'User added successfully', userId });
});

// GET /users - Retrieve all users
app.get('/users', (req, res) => {
	res.json({ users });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});

