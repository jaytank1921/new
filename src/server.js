const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Mock user data
const mockUser = {
  email: 'user@example.com',
  password: 'password',
  name: 'John Doe',
  address: '123 Main St, Springfield, USA',
  contact: 'john.doe@example.com',
};

let leadsData = [
  {
    contact: 'john.doe@example.com',
    field: 'Real Estate',
    name: 'John Doe',
    address: '123 Main St, Springfield, USA',
    docType: 'PDF',
  },
  {
    contact: 'jane.smith@example.com',
    field: 'Insurance',
    name: 'Jane Smith',
    address: '456 Elm St, Springfield, USA',
    docType: 'DOCX',
  },
];
app.use(cors());
app.use(bodyParser.json());

// Login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === mockUser.email && password === mockUser.password) {
    res.status(200).json({ message: 'Login successful!' });
  } else {
    res.status(401).json({ message: 'Invalid email or password.' });
  }
});


// User details endpoint
app.get('/api/user', (req, res) => {
  res.json(mockUser); // Return the mock user data
});
// Endpoint to get all leads
app.get('/api/leads', (req, res) => {
  res.json(leadsData);
});

// Endpoint to add a new lead
app.post('/api/leads', (req, res) => {
  const newLead = req.body;
  leadsData.push(newLead);
  res.status(201).json(newLead);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
