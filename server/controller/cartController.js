const dbQueries = require('../dbQueries');

module.exports = {
    
    getCart: async (req, res, next) => {
        if (req.session.user.user_id) {
            const db = req.app.get('db');
            const cart = await dbQueries.getUserCart(db, req.session.user.user_id);
            if (cart) {
                res.status(200).send(cart);
            } else {
                res.status(200).send([]);
            }
        } else {
            res.status(401).send('Your cart is empty! Please sign in or register to add products to your cart.');
        }
    },
    updateCart: async (req, res, next) => {
        const { itemId, itemQty } = req.body;
        if (req.session.user.user_id) {
            const db = req.app.get('db');
            const updatedCartItem = await dbQueries.addOrUpdateCart(db, req.session.user.user_id, itemId, itemQty);
            if (updatedCartItem && updatedCartItem.length > 0) {
                res.status(200).send(updatedCartItem);
            } else {
                res.status(200).send({});
            }
        } else {
            res.status(401).send('Your cart is empty!');
        }
    },
    updateItemQtyInCart: async (req, res, next) => {
        const { itemId, itemQty } = req.body;
        if (req.session.user.user_id) {
            const db = req.app.get('db');
            const updatedCartItem = await dbQueries.modifyItemQtyInCart(db, req.session.user.user_id, itemId, itemQty);
            if (updatedCartItem && updatedCartItem.length > 0) {
                res.status(200).send(updatedCartItem);
            } else {
                res.status(200).send({});
            }
        } else {
            res.status(401).send('You are not authorized to perform this transaction');
        }
    },
    deleteFromCart: async (req, res, next) => {
        const { itemId } = req.params;
        if (req.session.user.user_id) {
            const db = req.app.get('db');
            const updatedCartItem = await dbQueries.addOrUpdateCart(db, req.session.user.user_id, itemId, 0);
            if (updatedCartItem && updatedCartItem.length > 0) {
                res.status(200).send(updatedCartItem);
            } else {
                res.status(200).send({});
            }
        } else {
            res.status(401).send('You are not authorized to perform this transaction');
        }
    },
    clearCart: async (req, res, next) => {
        if (req.session.user.user_id) {
            const db = req.app.get('db');
            const clearedCartData = await dbQueries.clearCart(db, req.session.user.user_id);
            if (clearedCartData !== false) {
                res.status(200).send(clearedCartData);
            } else {
                res.status(200).send([]);
            }
        } else {
            res.status(401).send('You are not authorized to perform this transaction');
        }
    },
    checkout: async (req, res, next) => {
        if (req.session.user.user_id) {
            const db = req.app.get('db');
            const newPurchaseResult = await dbQueries.checkout(db, req.session.user.user_id);
            if (newPurchaseResult && newPurchaseResult.length > 0) {
                res.status(200).send(newPurchaseResult);
            } else {
                res.status(200).send([]);
            }
        } else {
            res.status(401).send('You are not authorized to perform this transaction');
        }
    },
}