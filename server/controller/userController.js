const bcrypt = require('bcrypt');
const dbQueries = require('../dbQueries');

module.exports = {
    register: async (req, res, next) => {
        const { email, password } = req.body;
        const db = req.app.get('db');
        const foundUser = await dbQueries.findUserByEmail(db, email);
        if(foundUser) {
            const logMsg = 'User already exists! Log in to continue';
            console.log(logMsg)
            res.status(400).send(logMsg);
        } else {
            const saltRounds = 12;
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = await dbQueries.addUserToDatabase(db, email, hashedPassword);
            req.session.user = {
                user_id: newUser.user_id,
                email: newUser.email
            };
            console.log(`Created user ${newUser.email}`);
            res.status(200).send(req.session.user)
        }
    },
    login: async (req, res, next) => {
        const { email, password } = req.body;
        const db = req.app.get('db');
        const foundUser = await dbQueries.findUserByEmail(db, email);
        if(!foundUser) {
            const logMsg = 'User not found! Please create an account.';
            console.log(logMsg)
            res.status(401).send(logMsg);
        } else {
            const isAuthenticated = await bcrypt.compare(password, foundUser.password);
            if(isAuthenticated) {
                req.session.user = {
                    user_id: foundUser.user_id,
                    email: foundUser.email
                }
                console.log(`Authenticated user ${foundUser.email}`);
                res.status(200).send(req.session.user);
            } else {
                const logMsg = 'Invalid email or password.';
                console.log(logMsg);
                res.status(401).send(logMsg);
            }
        }
    },
    logout: (req, res, next) => {
        req.session.destroy();
        res.status(200).send("Logged out successfully")
    },
    userSession: (req, res, next) => {
        res.status(200).send(req.session.user);
    }

    // userSession = async () => {
    //     const userSession = await axios.get('/api/userSession').catch(err => console.log(err))
    //     this.props.setUser(userSession.data);
    // }
}


