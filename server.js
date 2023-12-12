const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Serve the index file
app.get('/', async (req, res) => {
    res.render('index.ejs');
});

// Serve the login file
app.get('/login', async (req, res) => {
    res.render('login.ejs');
});

// Serve the register file
app.get('/register', async (req, res) => {
    res.render('register.ejs');
});

// Serve the 404 file for any other routes
app.use((req, res) => {
    res.render('404.ejs');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
