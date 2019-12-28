require('dotenv').config();
const express = require('express');
const app = express();
const massive = require('massive');
const session = require('express-session');
app.use(express.json());
// const { register, login, logout, userSession } = require('./controller/userController');
const checkForSession = require('../middleware/sessionCheck');
const cartController = require('./controller/cartController');
const userController = require('../server/controller/userController');
const itemController = require('../server/controller/itemController');
const searchController = require('../server/controller/searchController');
const purchaseHistoryController = require('../server/controller/purchaseHistoryController');
// var proxy = require('http-proxy-middleware');

const { CONNECTION_STRING, SESSION_SECRET, SERVER_PORT } = process.env;

app.use(express.static(__dirname + "/../build"))

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

// endpoints for inventory display
app.get('/api/inventory', itemController.read);

// endpoints for login, logout, register
app.post('/api/register', userController.register);
app.post('/api/login', userController.login);
app.post('/api/logout', userController.logout);
app.get('/api/session' , userController.userSession);

app.get('/api/purchasehistory', purchaseHistoryController.getUserPurchaseHistory);

// endpoints for cart
app.get('/api/cart', cartController.getCart);
app.put('/api/cart', cartController.updateCart);
app.patch('/api/cart', cartController.updateItemQtyInCart);
app.delete('/api/cart/:itemId', cartController.deleteFromCart);
app.delete('/api/cart', cartController.clearCart);
app.post('/api/checkout', cartController.checkout);

app.get('/api/search', searchController.search);

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

// app.get('/api/view_cart', function(req, res, next) {
//     res.status(200).send(products) // replace with inventory from database
// });
// app.post('/api/add_to_cart', function(req, res, next) {
//     const { id, name, price, desc } = req.body;
//     let addedProduct = { id, name, price, desc }
//     cart.push(addedProduct)
//     res.status(200).send(cart)
// })

// app.get('/api/inventory', (req, res, next) => {
//     const db = req.app.get('db');
//     db.query('SELECT * FROM inventory').then(inventory => {
//         res.status(200).send(inventory);
//     })
// })

// app.use(
//     '/api',
//     proxy({
//       target: 'http://localhost:4000',
//       changeOrigin: true,
//     })
// );
// app.use(
//     '/auth',
//     proxy({
//       target: 'http://localhost:4000',
//       changeOrigin: true,
//     })
// );
// app.use(
//     '/',
//     proxy({
//       target: 'http://localhost:3000',
//       changeOrigin: true,
//     })
// );

let port = SERVER_PORT || 4000
app.listen(port, () => console.log(`server listening on ${port}`));