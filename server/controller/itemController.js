module.exports = {
    read: (req, res, next) => {
        const db = req.app.get('db');
        db.query('SELECT * FROM inventory').then(inventory => {
            res.status(200).send(inventory);
        });
    }
}
