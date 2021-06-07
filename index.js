require('dotenv').config();

const PORT = process.env.PORT || 8888;
const express = require('express');

const app = express();

// On ajoute la gestion des sessions
const session = require('express-session');
app.use(session({
    secret: 'I am the Secret',
    saveUninitialized: true,
    resave: true,
    cookie: {
        secure: false,
        maxAge: (1000*60*60)
    }
}));

app.set('view engine', 'ejs');
app.set('views', 'app/views');

// Pour récuperer les données du form en POST = urlEncoded
app.use(express.urlencoded({extended: true}));

app.use(express.static('integration'));

const router = require('./app/router');
app.use(router);

app.listen(PORT, () => {
    console.log(`Server listening on port : ${PORT}`)
});