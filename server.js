const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Serve the index.html file
app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Serve the processo.html file
app.get('/processo', async (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'processo.html'));
});

// Serve the 404.html file for any other routes
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
