// const users = require('database')

module.exports = {

login: (req, res) => {
    const { session } = req;
    const { email, password } = req.body;

    const user = users.find(user => user.email === email && user.password === password);

    if(user) {
        session.user.email = user.email;
        res.status(200).send(session.user);
    } else {
        res.status(500).send('Unauthorized');
    }
},

register: (req, res) => {
    const { session } = req;
    const { email, password } = req.body;

    users.push({id, email, password});
    id++;

    session.user.email = email;

    res.status(200).send(session.user);
},

signout: (req, res) => {
    req.session.destroy();
    res.status(200).send(req.session);
},

getUser: (req, res) => {
    const { session } = req;
    res.status(200).send(session.user);
}
}