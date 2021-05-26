const { Quiz } = require('../models/associations');

const mainController = {
    
    homePage: (req, res) => {
        Quiz.findAll({
            include: [
                "author"
            ]
        }).then( (quizzes) => {
            res.render('homepage', {
                quizzes,
            })
        }).catch((err) => {
            console.trace(err);
            res.status(500).render('500', err);
        });
    },
};

module.exports = mainController;