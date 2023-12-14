if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const path = require('path');
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')

const { insertUser } = require('./database/users')

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
    res.render('index.ejs');
});

//Serve the painel file
app.get('/painel', async (req, res) => {
    res.render('painel.ejs', { user: req.user });
});

// Serve the login file
app.get('/login', (req, res) => {
    res.render('login.ejs', { message: req.flash('error') });
});

//Login
app.post('/login', passport.authenticate('local', {
    successRedirect: '/painel',
    failureRedirect: '/login',
    failureFlash: true
}), (req, res) => {
    res.render('login.ejs', { message: req.flash('error') });
});

// Serve the candidato file
app.get('/candidato', async (req, res) => {
    res.render('candidato.ejs');
});

//Registar Candidato
app.post('/candidato', async (req, res) => {

    const newUser = {
        tipo: 'Candidato',
        name: req.body.name,
        curso: req.body.curso,
        emailPessoal: req.body.email,
        processos: [],
        password: 'candidato' + (Math.random() * (99999 - 99) + 99)
    };

    try {
        await insertUser(newUser);
        res.render('login.ejs', { message: "Código é '" + newUser.password + "'"});
    } catch (error) {
        res.status(500).send('Erro ao inserir usuário.');
    }

});

// Serve the candidato file
app.get('/informacao', async (req, res) => {
    res.render('informacaoPublica.ejs');
});

// Serve the 404 file for any other routes
app.use((req, res) => {
    res.render('404.ejs');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
