require('dotenv').config();
const express = require('express');
const app = express();
const massive = require('massive');
const session = require('express-session');
app.use(express.json());
const { register, login, logout, userSession } = require('./controller/userController');
const checkForSession = require('../middleware/sessionCheck');

const { CONNECTION_STRING, SESSION_SECRET, SERVER_PORT } = process.env;

const cart = [];
// const products =

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 14
    }
}));

app.use(checkForSession);

massive(CONNECTION_STRING).then(db => {
    console.log("database connected");
    db.init().then(() => {
        app.set('db', db)
    });
});

app.post('/auth/register', register);
app.post('/auth/login', login);

app.use((req, res, next) => {
    next();
    // if(req.session.user) {
    //     next()
    //     console.log('hit', req.session.user)
    // }else {
    //     // res.writeHead(301, { "Location": "http://" + 'localhost:3000' + '/' });
    //     // return res.end();
    //     res.redirect('http://localhost:3000/')
    // }
})

app.get('/auth/user_session' , userSession);

app.get('/api/view_cart', function(req, res, next) {
    res.status(200).send(products) // replace with inventory from database
});
app.post('/api/add_to_cart', function(req, res, next) {
    const { id, name, price, desc } = req.body;
    let addedProduct = { id, name, price, desc }
    cart.push(addedProduct)
    res.status(200).send(cart)
})

app.delete('/auth/logout', logout);

app.get('/api/inventory', (req, res, next) => {
    const db = req.app.get('db');
    db.query('SELECT * FROM inventory').then(inventory => {
        res.status(200).send(inventory);
    })
})

let port = SERVER_PORT || 4000
app.listen(port, () => console.log(`server listening on ${port}`));