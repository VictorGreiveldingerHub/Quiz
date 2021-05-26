const { Quiz } = require('../models/associations');

const quizController = {
    
    quizPage: (req, res, next) => {
        const quizId = req.params.id;
        
        Quiz.findByPk(quizId, {
            include: [
                "author",
                {
                    association: "questions",
                    include: [
                        "level",
                        "answer"
                    ]
                },
                "tags"
            ]
        }).then((quiz) => {
            
            if(! quiz) {
                return next();
            };
            console.log(quiz);
            res.render('quiz', {
                quiz
            });
        }).catch((err) => {
            console.trace(err);
            res.status(500).render('500', err);
        });
    },
};

module.exports = quizController;