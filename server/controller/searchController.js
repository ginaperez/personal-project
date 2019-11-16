module.exports = {
    search: (req, res) => {
        const { query } = req.query;
        const db = req.app.get('db');
        dbQuery = 'SELECT * FROM inventory';
        if(query) {
            dbQuery += ` WHERE item_name ILIKE '%${query}%'`;
        }
        db.query(dbQuery).then(inventoryItems => {
            if (!inventoryItems) {
                res.status(200).send(inventoryItems);
            } else {
                res.status(200).send(inventoryItems);
            }
        })
    }
};
