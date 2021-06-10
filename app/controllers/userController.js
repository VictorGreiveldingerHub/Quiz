const { User } = require('../models');

const userController = {
    userPage: (req, res) => {
        // const userId = req.params.id;
        // User.findByPk(userId).then( (user) => {
        //     if (!req.session.user) { 
        //         res.redirect('/login');
        //     } else {
        //         res.render('/profile', {
        //             user
        //         });
        //     };
        // }).catch((err) => {
        //     console.trace(err);
        //     res.status(500).render('500', {err});
        // });
        res.render('profile');
    }
};

module.exports = userController;