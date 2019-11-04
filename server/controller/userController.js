const bcrypt = require('bcrypt');

module.exports = {
    register: async (req, res, next) => {
        const { email, password, firstName, lastName} = req.body;
        const db = req.app.get('db');
        const foundUser = await db.find_user_by_email(email)
        if(foundUser.length) {
            res.status(400).send('User already exists!')
        } else {
            const saltRounds = 12;
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(password, salt);
            const { newUser } = await db.create_user([email, hashedPassword, firstName, lastName]);
            req.session.user = newUser
            res.status(200).send(req.session.user)
        }
    },
    login: (req, res, next) => {
        const { email, password } = req.body;
        const db = req.app.get('db');
        db.find_user_by_email(email).then(([foundUser]) => {
            if(!foundUser) {
                res.status(400).send('User not found. Create an account!');
            } else {
                bcrypt.compare(password, foundUser.password).then(isAuthenticated => {
                    if(isAuthenticated) {
                        req.session.user = {
                            user_id: foundUser.user_id,
                            email: foundUser.email
                        }
                        res.status(200).send(req.session.user)
                    } else {
                        res.status(404).send("User not found")
                    }
                });
            }
        });
    },
    logout: (req, res, next) => {
        req.session.destroy();
        res.status(200).send("Enjoy your new purchase!")
    },
    userSession: (req, res, next) => {
        res.status(200).send(req.ession.user);
    }
}