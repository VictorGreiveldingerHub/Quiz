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
    
    // METHODE ASYNC
    
    // Traiter le formulaire
    loginAction: async (req, res) => {
        
        try {
            // récup les infos du form
            const { email, password } = req.body;
            
            const user = await User.findOne({
                where: {
                    email
                }
            });
            
            // si il n'existe pas => err
            if (!user) {
                return res.render('login', {
                    error: "Cet email n'existe pas"
                });
            };
            
            // si il existe on vérifie le mot de passe 
            if (! bcrypt.compareSync(password, user.password)) {
                // si le mdp n'est pas bon => err
                return res.render('login', {
                    error: "Mauvais mot de passe"
                });
            };
            
            // Sinon tout est bon => on ajoute l'utilisateur dans la session
            req.session.user = user;
            
            // et on redirige vers "/"
            res.redirect('/');
            
        } catch (err) {
            console.trace(err);
            res.status(500).render('500', {err});
        };
    },
    
    
    // // Traiter le formulaire
    // loginAction: (req, res) => {
    //     // récup les infos du form
    //     const { email, password } = req.body;
    //     // const email = req.body.email;
    //     // const password = req.body.password;
        
    //     // tenter de récuperer l'utilisateur grace a son email
    //     User.findOne({
    //         where: {
    //             email
    //         }
    //     }).then((user) => {
    //         // si il n'existe pas => err
    //         if (!user) {
    //             return res.render('login', {
    //                 error: "Cet email n'existe pas"
    //             });
    //         };
            
    //         // si il existe on vérifie le mot de passe 
    //         if (! bcrypt.compareSync(password, user.password)) {
    //             // si le mdp n'est pas bon => err
    //             return res.render('login', {
    //                 error: "Mauvais mot de passe"
    //             });
    //         };
            
    //         // Sinon tout est bon => on ajoute l'utilisateur dans la session
    //         req.session.user = user;
            
    //         // et on redirige vers "/"
    //         res.redirect('/');
            
    //     }).catch((err) => {
    //         console.trace(err);
    //         res.status(500).render('500', {err});
    //     });
    // },
    
    // afficher le form d'inscription
    signupPage: (req, res) => {
        res.render('signup');
    },
    
    // traiter le form d'inscription, enregistrer un nouveau user
    singupAction: async (req, res) => {
        
        try {
            // Récup les données du formulaire
        const data = req.body;
        
        // NTUI : vérifier que les infos sont logiques
        
        // Vérifier que l'utilisateur n'existe pas déjà (via email)
        const user = await User.findOne({
            where: {
                email: data.email
            }
        });
        
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
            
            const savedUser = await newUser.save()
                // Au lieu de mettre une redirection vers /login
                // res.redirect('/login);
                // On récup un utilisateur => on le met directement en session
                // Du coup il est déjà loggé.
                req.session.user = savedUser;
                res.redirect('/');
        };    
        } catch (err) {
            console.trace(err);
            res.status(500).render('500', {err});
        };
        // // Récup les données du formulaire
        // const data = req.body;
        
        // // NTUI : vérifier que les infos sont logiques
        
        // // Vérifier que l'utilisateur n'existe pas déjà (via email)
        // User.findOne({
        //     where: {
        //         email: data.email
        //     }
        // }).then((user) => {
        //     // On se prépare une liste vide pour récuperer toutes les erreurs
        //     let errorsList = [];
            
        //     if (user) {
        //         errorsList.push('Cet email existe déjà');
        //     };
            
        //     // - nom prénom non vide
        //     if (!data.firstname) {
        //         errorsList.push('Le prénom ne doit pas être vide');
        //     };
            
        //     if (!data.lastname) {
        //         errorsList.push('Le nom ne doit pas être vide');
        //     };
            
        //     // - adresse email au bon format
        //     if (!emailValidator.validate(data.email)) {
        //         errorsList.push("l'email n'est pas au bon format");
        //     };
            
        //     // - longueur minimum du mot de passe
        //     // + il est long + il est dure à deviner (104**8)
        //     // donc mot de passe 8 caractere minimum
        //     if (data.password.length < 8) {
        //         errorsList.push('Le mot de passe doit contenir au moins 8 caractères');
        //     };
            
        //     // - mdp = confirmation
        //     if (data.password !== data['password-confirm']) {
        //         errorsList.push("Le mot de passe et la confirmation ne correspondent pas");
        //     };
            
        //     // Si on a au moins une erreur on réaffiche le form en affichant les erreurs
            
        //     // Si il n'y a pas d'erreur dans le tableau errorsList
        //     if (errorsList.length === 0) {
        //         // On créé le User
        //         const newUser = new User();
        //         newUser.firstname = data.firstname;
        //         newUser.lastname = data.lastname;
        //         newUser.email = data.email;
        //         // on hash le mdp 
        //         newUser.password = bcrypt.hashSync(data.password, 10);
                
        //         newUser.save().then((user) => {
        //             // Au lieu de mettre une redirection vers /login
        //             // res.redirect('/login);
        //             // On récup un utilisateur => on le met directement en session
        //             // Du coup il est déjà loggé.
        //             req.session.user = user;
        //             res.redirect('/');
        //         });
                
        //     } else {
        //         res.render('signup', {
        //             errorsList
        //         });
        //     };
            
        //     // Si tout va bien : Insérer les données dans la BDD
            
        //     // Redirection de l'utilisateur
        // }).catch((err) => {
        //     console.trace(err);
        //     res.status(500).render('500', {err});
        // });
    },
    
    logout: (req, res) => {
        delete req.session.user;
        res.redirect('/');
    }
};

module.exports = authController;