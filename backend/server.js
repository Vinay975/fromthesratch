const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const loginDetails = require('./loginDetails'); 
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' folder for CSS and other assets
app.use(express.static('public'));

// Serve the HTML landing page explicitly at the root URL ('/')
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'index.html'));
});

// Serve static files from the React app's build directory
app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));

// Route to serve the React app for '/login'
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
});

// MongoDB connection
mongoose.connect('mongodb+srv://tellagorlavinay78:Vinay123@logindetails.vbb1r.mongodb.net/')
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log('MongoDB connection error:', err));

// Register route
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new loginDetails({ name: username, password: hashedPassword });
    
    try {
        await user.save();
        res.status(201).send('User created');
    } catch (error) {
        res.status(400).send('Error creating user: ' + error.message);
    }
});

// Login route
app.post('/signin', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await loginDetails.findOne({ name: username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send('Invalid credentials');
        }
        res.send('Login successful');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Fallback route for React Router: Serve React app for any other path not specified
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
});

// Start the server
const PORT = 2000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
