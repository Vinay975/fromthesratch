const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const loginDetails = require('./loginDetails'); 
const bcrypt = require('bcrypt');
const bodyPareser = require('body-parser');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyPareser.urlencoded({extended:true}));

mongoose.connect('mongodb+srv://tellagorlavinay78:Vinay123@logindetails.vbb1r.mongodb.net/')
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log('MongoDB connection error:', err));

// Register route
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new loginDetails({ name: username, password: hashedPassword});
    
    try {
        await user.save();
        res.status(201).send('User created');
    } catch (error) {
        res.status(400).send('Error creating user: ' + error.message);
    }
});

// Login route
app.post('/login', async (req, res) => {
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


const PORT = 2000;

app.get('/', (req,res) => "hello people")
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});