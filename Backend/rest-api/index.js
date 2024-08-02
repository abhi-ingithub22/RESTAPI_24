const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Helper function to process the data
const processData = (data) => {
    let numbers = [];
    let alphabets = [];
    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (item.match(/[a-z]/i)) {
            alphabets.push(item);
        }
    });
    const highestAlphabet = alphabets.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' })).pop();
    return { numbers, alphabets, highestAlphabet };
};

// GET endpoint
app.get('/api/data', (req, res) => {
    res.json({
        operation_code: 'OP12345'
    });
});

// POST endpoint
app.post('/api/data', (req, res) => {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
        return res.status(400).json({ status: 'error', message: 'Missing or invalid data field' });
    }

    const { numbers, alphabets, highestAlphabet } = processData(data);

    res.json({
        is_success: true,
        user_id: 'john_doe_17091999',
        email: 'john@xyz.com',
        roll_number: 'ABCD123',
        numbers,
        alphabets,
        highest_alphabet: highestAlphabet ? [highestAlphabet] : []
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
