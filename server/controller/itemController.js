const dbQueries = require('../dbQueries');

module.exports = {
    // read: (req, res, next) => {
    //     const db = req.app.get('db');
    //     db.query('SELECT * FROM inventory').then(inventory => {
    //         res.status(200).send(inventory);
    //     });
    // },
    getInventory: async (req, res, next) => {
        // if(req.session.user.user_id) {
        const db = req.app.get('db');
        const inventory = await dbQueries.getInventory(db);
        if(inventory) {
            res.status(200).send(inventory);
        } else {
            res.status(200).send([]);
        }
        // } else {
        //     res.status(401).send('Please sign in to add products to your cart!');
        // }
    }  
}
