const Tag = require('./tag');
const Answer = require('./answer');
const Level = require('./level');
const Quiz = require('./quiz');
const User = require('./user');
const Question = require('./question');

// Association Quiz <-> User (un quiz appartient un auteur)
Quiz.belongsTo(User, {
    foreignKey: "app_users_id",
    as: "author"
});

// Et la réciproque (un user est l'auteur de plusieurs Quiz)
User.hasMany(Quiz, {
    foreignKey: "app_users_id",
    as: "quizzes"
});


// Quiz <-> Question
// 1 quiz possede plusieurs questions
Quiz.hasMany(Question, {
    foreignKey: "quizzes_id",
    as: "questions"
});

// Et la réciproque 
Question.belongsTo(Quiz, {
    foreignKey: "quizzes_id",
    as: "quiz"
});


// Question <-> Level
Question.belongsTo(Level, {
    foreignKey: "levels_id",
    as: "level"
});

Level.hasMany(Question, {
    foreignKey: "levels_id",
    as: "questions"
});


// Quiz <-> Tag 
// Relation de type N:N, utilisant une table de liaison

// Un tag appartient à plusieurs quiz
Tag.belongsToMany(Quiz, { // Pour def une association N:N on donne :
    through: "quizzes_has_tags", // <= le nom de la table de liaison
    foreignKey: "tags_id", // <= le nom de de la clé du modele qui lance la méthode
    otherKey: "quizzes_id", // <= le nom de de la clé de l'autre modele
    timestamps: false, // On les désactive
    
    as: "quizzes"
});

// Un Quiz appartient à plusieurs tag
Quiz.belongsToMany(Tag, {
    through: "quizzes_has_tags",
    foreignKey: "quizzes_id",
    otherKey: "tags_id",
    timestamps: false,
    as: "tags"
});


// Question <-> Answer, première relation : les réponses possibles
// "1 question possède N réponses possibles"
Question.hasMany(Answer, {
    foreignKey: "questions_id",
    as: "answers"
});

// "une Réponse appartient à une seule question"
Answer.belongsTo(Question, {
    foreignKey: "questions_id",
    as: "question"
});


// Question <-> Answer, deuxième relation : la bonne réponse
// "1 question possède 1 seule bonne réponse"
// ASTUCE : instinctivement on voudrait utiliser hasOne mais hasOne cherche la clé etrangere dans le modele cible
// càd celui passer en parametre
// Ici on utilise belongsTo car c'est la seule association qui permet de définir une clé étrangère dans le modele lui même
Question.belongsTo(Answer, {
    foreignKey: "answers_id",
    as: "good_answer"
});


module.exports = {Tag, Answer, Level, Quiz, User, Question}