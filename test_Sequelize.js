require('dotenv').config();

// const Tag = require('./app/models/tag');

// Nouvelle syntaxe, introduite par Sequelize :
// - on appelle une méthode, sans définir le callback,
// - on définit le traitement d'erreur dans .catch(),
// et le traitement du résultat dans .then().

// // Test 1 : trouver tous les tags
// Tag.findAll().then( (tags) => {
//     // console.log(tags);
//     for (let tag of tags) {
//         console.log(tag.name);
//     }
// }).catch( (err) => {
//     console.log(err);
// });

// // Test 2 : trouver un Tag (id = 3)
// Tag.findByPk(3).then( (tag) => {
//     // console.log(tag);
//     console.log(tag.name);
//     console.log(tag.id);
//     console.log(tag.getName());
// }).catch( (err) => {
//     console.log(err);
// });

// // Test 3 : Trouver un tag par son nom
// Tag.findOne({
//     where: {
//         name: "Gastronomie"
//     }
// }).then((tag) => {
//     console.log(tag);
// }).catch((err) => {
//     console.log(err);
// });

// const Question = require('./app/models/question');
// const Level = require('./app/models/level');

// // Récup la question 8
// Question.findByPk(8).then( (question ) => {
//     console.log(question);
// }).catch( (err) => {
//     console.log(err)
// });

// const Quiz = require('./app/models/quiz');
// Quiz.findByPk(4, {
//     include: ["author"]
// }).then( (quiz) => {
//     // console.log(quiz);
//     console.log(`Le quiz numéro ${quiz.id} a été écrit par ${quiz.author}`);
// }).catch( console.error );

const { Quiz } = require ('./app/models/associations');

Quiz.findByPk(1, {
    include: [
        "tags",
        {
            association: "questions",
            include : [
                "level"
            ]
        },
        "author"
    ]
}).then((quiz) => {
    console.log(`Détails pour le quiz ${quiz.id} : écrit par ${quiz.author.getFullName()}`);
    // console.log(quiz.tags);
    for (let tag of quiz.tags){
        console.log(`Comporte la catégorie : ${tag.name}`);
    };
    for (let question of quiz.questions){
        console.log(`Niveau ${question.level.name} : ${question.question} `)
    };
    
}).catch(console.error);