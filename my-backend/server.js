require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Only one import needed
const User = require('./models/User'); // Ensure this model is defined correctly
const Lead = require('./models/Leads'); // Ensure this model is defined correctly
const Agreement = require('./models/Agreement'); // Import Agreement model
const multer = require('multer'); // For handling file uploads
const path = require('path');
const fs = require('fs');
const uploadsDir = path.join(__dirname, 'uploads');

// Ensure uploads folder exists
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}


const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); // Save files to the 'uploads' directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});

const upload = multer({ storage: storage });


// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(async () => {
    console.log('MongoDB connected');
    // Fetch users after connection
    const users = await User.find();
    console.log('Users:', users); // Log users here
})
.catch(err => console.error('MongoDB connection error:', err.message));


// Generate JWT token
const generateToken = (user) => {
    return jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '3h' });
};

// Login endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = generateToken(user);
            return res.status(200).json({ message: 'Login successful!', token });
        } else {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});



// Middleware to authenticate the token
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    console.log('Received token:', token); // Debug line to see if the token is coming through

    if (!token) {
        console.log('No token provided');
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error('Token verification error:', err); // Debug line to log verification errors
            return res.status(403).json({ message: 'Forbidden: Token verification failed' });
        }
        req.user = user; // Attach the user object to req for later use
        next();
    });
};


// const getUserData = async () => {
//     const token = localStorage.getItem('token');

//     try {
//         const userResponse = await axios.get('http://localhost:5000/api/user', {
//             headers: { Authorization: `Bearer ${token}` } // Include the token here
//         });
//         console.log('User data:', userResponse.data);
//     } catch (error) {
//         console.error('Error fetching user data:', error);
//     }
// };


// Fetch user details
app.get('/api/user', authenticateToken, async (req, res) => {
    const userEmail = req.user.email;

    try {
        const user = await User.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ email: user.email, name: user.name, address: user.address, contact: user.contact });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Add user endpoint
app.post('/api/add-user', async (req, res) => {
    const { email, password, name, address, contact } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword, name, address, contact });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: 'Error adding user', error });
    }
});

// Get all leads
app.get('/api/leads', async (req, res) => {
    try {
        const leads = await Lead.find();
        res.json(leads);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching leads', error });
    }
});

// Add a new lead
app.post('/api/leads', async (req, res) => {
    const newLead = new Lead(req.body);
    try {
        await newLead.save();
        res.status(201).json(newLead);
    } catch (error) {
        res.status(400).json({ message: 'Error creating lead', error });
    }
});

// Add an agreement
app.post('/api/agreements', upload.single('doc'), async (req, res) => {
    const { name, propertyType } = req.body;

    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }

    const docPath = req.file.filename; // Only save the filename, not full path

    try {
        const agreement = new Agreement({ name, propertyType, doc: docPath });
        await agreement.save();
        res.status(201).json(agreement);
    } catch (error) {
        console.error('Error creating agreement:', error);
        res.status(400).json({ message: 'Error creating agreement', error });
    }
});


// Get all agreements
app.get('/api/agreements', async (req, res) => {
    try {
        const agreements = await Agreement.find();
        res.json(agreements);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching agreements', error });
    }
});

// Start the server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://192.168.2.202:${port}`);
});
