const { Quiz } = require('../models'); // A la place de dataMapper par exemple

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
            res.status(500).render('500', {err});
        });
    },
};

module.exports = mainController;