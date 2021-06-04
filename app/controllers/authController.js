const { User } = require('../models');

const authController = {
    
    // Afficher le fromaulaire de connexion (loginPage)
    loginPage: (req, res) => {
        res.render('login');
    },
    
    // Traiter le formulaire
    loginAction: (req, res) => {
        
    },
    
    // afficher le form d'inscription
    signupPage: (req, res) => {
        res.render('signup');
    },
    
    // traiter le form d'inscription, enregistrer un nouveau user
    singupAction: (req, res) => {
        // Récup les données du formulaire
        const data = req.body;
        
        // NTUI : vérifier que les infos sont logiques
        
        // Vérifier que l'utilisateur n'existe pas déjà (via email)
        User.findOne({
            where: {
                email: data.email
            }
        }).then((user) => {
            // On se prépare une liste vide pour récuperer toutes les erreurs
            let errorsList = [];
            
            if (user) {
                errorsList.push('Cet email existe déjà')
            };
            
            // - nom prénom non vide
            if (!data.firstname) {
                errorsList.push('Le prénom ne doit pas être vide')
            };
            
            if (!data.lastname) {
                errorsList.push('Le nom ne doit pas être vide')
            };
            
            // - adresse email au bon format
            
            // - mdp = confirmation 
            
            // - longueur minimum du mot de passe
            // + il est long + il est dure à deviner (104**8)
            // donc mot de passe 8 caractere minimum
            
            // Si on a au moins une erreur on réaffiche le form en affichant les erreurs
            
            // Si il n'y a pas d'erreur dans le tableau errorsList
            if (errorsList.length === 0) {
                
            } else {
                res.render('signup', {
                    errorsList
                });
            };
            
            // Si tout va bien : Insérer les données dans la BDD
            
            // Redirection de l'utilisateur
        }).catch((err) => {
            console.trace(err);
            res.status(500).render('500', {err});
        });
    }
};

module.exports = authController;