const express = require('express');
const router = express.Router();

const mainController = require('./controllers/mainController');
const quizController = require('./controllers/quizController');
const tagController = require('./controllers/tagController');
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const adminController = require('./controllers/adminController');

// Import des middlewares
const userMD = require('../app/middleware/userMD');
const redirectMD = require('../app/middleware/redirectMD');
const adminMD = require('./middleware/adminMD');

router.get('/', mainController.homePage);

router.get('/quiz/:id', quizController.quizPage);

router.get('/tags', tagController.tagsPage );
router.get('/tags/:id', tagController.pageQuizByTag );

router.get('/login', authController.loginPage);
router.post('/login', authController.loginAction);

router.get('/signup', authController.signupPage);
router.post('/signup', authController.singupAction);

router.get('/logout', authController.logout);

router.get('/profile', userMD, redirectMD, userController.userPage);

router.get('/admin', redirectMD, adminMD, adminController.adminPage);

router.use((req, res) => {res.status(404).render('404')});

module.exports = router;