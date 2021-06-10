const { Quiz } = require('../models');

const quizController = {
    
    // quizPage: (req, res, next) => {
    //     const quizId = req.params.id;
        
    //     Quiz.findByPk(quizId, {
    //         include: [
    //             "tags",
    //             "author",
    //             {
    //                 association: "questions",
    //                 include : [
    //                     "level",
    //                     "answers"
    //                 ]
    //             },
    //         ],
    //     }).then((quiz) => {
    //         // console.log(quiz);
            
    //         if (! quiz) {
    //             return next();
    //         };
            
    //         res.render('quiz', {
    //             quiz
    //         });
    //     }).catch((err) => {
    //         console.trace(err);
    //         res.status(500).render('500', {err});
    //     });
    // },
    
    quizPage: async (req, res, next) => {
        
        try {
            const quizId = req.params.id;
            const quiz = await Quiz.findByPk(quizId, {
                include: [
                    "tags",
                    "author",
                    {
                        association: "questions",
                        include : [
                            "level",
                            "answers"
                        ]
                    },
                ],
            });
            
            if (! quiz) {
                return next();
            };
            
            res.render('quiz', {
                quiz
            });
            
        } catch (err) {
            console.trace(err);
            res.status(500).render('500', {err});
        };
    },
};

module.exports = quizController;