const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
    res.render('index');
});

// 404 Page
app.use((req, res) => {
    res.status(404).render('404');
});

app.listen (PORT , () => {
    console.log(`Server running on port ${PORT}`);
})