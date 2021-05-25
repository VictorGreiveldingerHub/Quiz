require('dotenv').config();

const PORT = process.env.PORT || 8888;
const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'app/views');

app.use(express.static('integration'));
app.use(express.urlencoded({extended: true}));

const router = require('./app/router');
app.use(router);

app.listen(PORT, () => {
    console.log(`Server listening on port : ${PORT}`)
});