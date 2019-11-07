require('dotenv').config();
const express = require('express');
const app = express();
const massive = require('massive');
const session = require('express-session');
app.use(express.json());
const { register, login, logout, userSession } = require('./controller/userController');

const { CONNECTION_STRING, SESSION_SECRET, SERVER_PORT } = process.env;

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 14
    }
}));

massive(CONNECTION_STRING).then(db => {
    console.log("database connected");
    db.init().then(() => {
        app.set('db', db)
    });
});

app.post('/auth/register', register);
app.get('/auth/user_session' , userSession);
app.post('/auth/login', login);

app.delete('/auth/logout', logout);

app.get('/api/inventory', (req, res, next) => {
    const db = req.app.get('db');
    db.query('SELECT * FROM inventory').then(inventory => { 
        res.status(200).send(inventory);
    })
})

let port = SERVER_PORT || 4000
app.listen(port, () => console.log(`server listening on ${port}`));