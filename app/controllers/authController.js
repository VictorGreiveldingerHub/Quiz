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
            
            if (user) {
                return res.render('signup', {
                    error: 'Cet email existe déjà'
                });
            };
            
            // - nom prénom non vide
            
            // - adresse email au bon format
            
            // - mdp = confirmation 
            
            // - longueur minimum du mot de passe
            // + il est long + il est dure à deviner (104**8)
            // donc mot de passe 8 caractere minimum
            
            // Si on a au moins une erreur on réaffiche le form en affichant les erreurs
            
            
            // Si tout va bien : Insérer les données dans la BDD
            
            // Redirection de l'utilisateur
        }).catch((err) => {
            console.trace(err);
            res.status(500).render('500', {err});
        });
    }
};

module.exports = authController;