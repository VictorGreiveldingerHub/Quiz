// Ici je veux juste rediriger vers /login si il n'y a pas de user en session
const redirectMD = (req, res, next) => {
    if (! req.session.user) {
        res.redirect('/login');
    } else {
        next();
    };
};

module.exports = redirectMD;