module.exports = {
    findUserByEmail: async (db, email) => {
        const dbQuery = `SELECT * FROM users WHERE email = '${email.toString().toLowerCase()}'`;
        const matchedUsers = await db.query(dbQuery);
        if (matchedUsers.length) {
            return matchedUsers[0];
        } else {
            return false;
        }
    },
    addUserToDatabase: async (db, email, hashedPassword) => {
        const newUserQuery = 'INSERT INTO users (password, email)' +
            `VALUES ('${hashedPassword}', '${email}')` +
            `RETURNING user_id, email`;
        const newUsers = await db.query(newUserQuery);
        if (newUsers.length > 0) {
            return newUsers[0];
        } else {
            return false;
        }
    },
    getUserPurchaseHistory: async (db, userId) => {
        const userPurchaseHistoryQuery = `SELECT users.user_id, email, purchase_date, item_name, item_qty, price as item_unit_price, item_qty * price as total_price, image
            FROM users
            JOIN purchase_history
            ON (users.user_id = purchase_history.user_id)
            JOIN inventory
            ON(purchase_history.item_id = inventory.item_id)
            WHERE purchase_history.user_id = '${userId}'`;

        const userPurchaseHistory = await db.query(userPurchaseHistoryQuery);
        if (userPurchaseHistory) {
            return userPurchaseHistory;
        } else {
            return false;
        }
    },
    getUserCart: async (db, userId) => {
        const userCartQuery = `SELECT users.user_id, email, item_name, inventory.item_id, price as item_unit_price, cart.item_qty, cart.item_qty * price as total_price, image
        FROM users
        JOIN cart
        ON (users.user_id = cart.user_id)
        JOIN inventory
        ON(cart.item_id = inventory.item_id)
        WHERE cart.user_id = ${userId};`
        const userCart = await db.query(userCartQuery);
        if (userCart.length > 0) {
            return userCart;
        } else {
            return [];
        }
    },
    updateUserCart: async(db, userId, itemId, itemQty) => {
        const userCartQuery = `UPDATE * FROM cart WHERE user_id = '${userId}'`;
        const userCart = await db.query(userCartQuery);
        if (userCart.length > 0) {
            return userCart;
        } else {
            return [];
        }
    },
}
