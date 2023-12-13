if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const path = require('path');
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')

const initializePassport = require('./passport-config')
initializePassport(passport)

const app = express();

const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

// Serve the index file
app.get('/', async (req, res) => {
    res.render('index.ejs', { name: req.user.name });
});

// Serve the login file
app.get('/login', (req, res) => {
    res.render('login.ejs', { message: req.flash('error') });
});

//Login
app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}), (req, res) => {
    res.render('login.ejs', { message: req.flash('error') });
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
