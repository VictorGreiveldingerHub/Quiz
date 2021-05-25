const express = require('express');
const router = express.Router();

const mainController = require('./controllers/mainController');


router.get('/', mainController.homePage);

router.use((req, res) => {res.status(404).send('404')});

module.exports = router;