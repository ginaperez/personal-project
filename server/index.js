require('dotenv').config();
const express = require('express');
const app = express();
const massive = require('massive');
const session = requiere('express-session');
app.use(express.json());

const { CONNECTION_STRING, SESSION_SECRET, SERVER_PORT } = process.env;

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

massive(CONNECTION_STRING).then(db => {
    console.log("database connected");
    db.init().then(() => {
        app.set('db', db)
    });
});

let port = SERVER_PORT || 4000
app.listen(port, () => console.log(`server listening on ${port}`));