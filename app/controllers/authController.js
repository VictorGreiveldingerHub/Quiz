
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
    
    // traiter le form d'inscription
    singupAction: (req, res) => {
        
    }
};

module.exports = authController;