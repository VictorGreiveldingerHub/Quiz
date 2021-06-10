
const adminMD = (req, res, next) => {
    // Si l'utilisateur a le role d'admin, il passe
    if (req.session.user.role === 'admin') {
        next();
    } else {
        // Sinon on le redirige vers 401 ?
        res.status(401).render('401');
    };
    
};

module.exports = adminMD;