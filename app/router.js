const express = require('express');
const router = express.Router();

const mainController = require('./controllers/mainController');
const quizController = require('./controllers/quizController');


router.get('/', mainController.homePage);

router.get('/quizz/:id', quizController.quizPage);

router.use((req, res) => {res.status(404).send('404')});

module.exports = router;