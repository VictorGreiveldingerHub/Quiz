// Pour vérifier la présence d'un utilisateur dans la session et de transmettre l'info a res.locals

const userMD = (req, res, next) => {
    if (req.session.user) {
        res.locals.user = req.session.user;
    } else {
        res.locals.user = false;
    };
    next();
};

module.exports = userMD;