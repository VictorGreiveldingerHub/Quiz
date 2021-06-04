const { User } = require('../models');

// Libr pour vérifier l'email
const emailValidator = require('email-validator');

// Pour le Hashage du mdp
const bcrypt = require('bcrypt');

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
                errorsList.push('Cet email existe déjà');
            };
            
            // - nom prénom non vide
            if (!data.firstname) {
                errorsList.push('Le prénom ne doit pas être vide');
            };
            
            if (!data.lastname) {
                errorsList.push('Le nom ne doit pas être vide');
            };
            
            // - adresse email au bon format
            if (!emailValidator.validate(data.email)) {
                errorsList.push("l'email n'est pas au bon format");
            };
            
            // - longueur minimum du mot de passe
            // + il est long + il est dure à deviner (104**8)
            // donc mot de passe 8 caractere minimum
            if (data.password.length < 8) {
                errorsList.push('Le mot de passe doit contenir au moins 8 caractères');
            };
            
            // - mdp = confirmation
            if (data.password !== data['password-confirm']) {
                errorsList.push("Le mot de passe et la confirmation ne correspondent pas");
            };
            
            // Si on a au moins une erreur on réaffiche le form en affichant les erreurs
            
            // Si il n'y a pas d'erreur dans le tableau errorsList
            if (errorsList.length === 0) {
                // On créé le User
                const newUser = new User();
                newUser.firstname = data.firstname;
                newUser.lastname = data.lastname;
                newUser.email = data.email;
                // on hash le mdp 
                newUser.password = bcrypt.hashSync(data.password, 10);
                
                newUser.save().then((user) => {
                    res.redirect('/login');
                });
                
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