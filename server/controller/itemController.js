// const item = require("database")

module.exports = {
    read: (req, res, next) => {
        res.status(200).send(item);
    }
}