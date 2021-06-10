const { Tag } = require('../models');

const tagController = {
    
    tagsPage: (req, res) => {
        // récupérer tous les tags depuis la BDD
        Tag.findAll().then( (tags) => {
    
          // renvoyer la view
          res.render('tags', {
            tags
          });
    
    
        }).catch( err => {
          console.trace(err);
          res.status(500).send(500, {err});
        });
    },
    
    pageQuizByTag: (req, res, next) => {
        // récupérer le tag cible
        const tagId = req.params.id;
    
        Tag.findByPk( tagId, {
          include: [
            {
              association: "quizzes",
              include: ["author"]
            }
          ]
        }).then( (tag) => {
          // traitement d'erreur (le tag n'existe pas ?)
          if (!tag) {
            return next();
          }
    
          res.render('quizzesByTag', {
            tag
          });
    
        }).catch( err => {
          console.trace(err);
          res.status(500).render('500', {err});
        });
    
    }
    
};

module.exports = tagController;