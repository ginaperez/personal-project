async function findUserByEmail(db, email) {
    const dbQuery = `SELECT * FROM users WHERE email = '${email.toString().toLowerCase()}'`;
    const matchedUsers = await db.query(dbQuery);
    if (matchedUsers.length) {
        return matchedUsers[0];
    } else {
        return false;
    }
};
async function addUserToDatabase(db, email, hashedPassword) {
    const newUserQuery = 'INSERT INTO users (password, email)' +
        `VALUES ('${hashedPassword}', '${email}')` +
        `RETURNING user_id, email`;
    const newUsers = await db.query(newUserQuery);
    if (newUsers.length > 0) {
        return newUsers[0];
    } else {
        return false;
    }
};
async function getUserPurchaseHistory(db, userId) {
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
};
async function getUserCart(db, userId) {
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
};
async function getItemFromCart(db, userId, itemId) {
    const cartItemQuery = `SELECT users.user_id, email, item_name, inventory.item_id, price as item_unit_price, cart.item_qty, cart.item_qty * price as total_price, image
        FROM users
        JOIN cart
        ON (users.user_id = cart.user_id)
        JOIN inventory
        ON(cart.item_id = inventory.item_id)
        WHERE cart.user_id = ${userId} AND cart.item_id = ${itemId};`
    const userCart = await db.query(cartItemQuery);
    if (userCart.length > 0) {
        return userCart;
    } else {
        return [];
    }
}
async function addOrUpdateCart(db, userId, itemId, itemQty) {
    // check to see if there is an existing cart for the user
    const userCart = await getItemFromCart(db, userId, itemId);
    console.log(userCart);
    if (userCart && userCart.length > 0) {
        var userCartQuery = `UPDATE cart SET item_qty = (item_qty + ${itemQty}) WHERE user_id = '${userId}' AND item_id = '${itemId}'
            RETURNING item_id, item_qty;`;
        // if the user wants to delete an item from cart, the itemQty is 0
        if (itemQty === 0) {
            userCartQuery = `DELETE FROM cart WHERE item_id = '${itemId}' RETURNING *;`;
        }
        console.log(userCartQuery);
        const userCart = await db.query(userCartQuery);
        console.log(userCart);
        if (userCart.length > 0) {
            return userCart;
        } else {
            return [];
        }
    } else {
        if (itemQty === 0) {
            return [];
        } else {
            // add this item to the cart table
            const addCartQuery = `INSERT INTO cart (user_id, item_id, item_qty)
                    VALUES ('${userId}', '${itemId}', '${itemQty}')
                    RETURNING item_id, item_qty;`;
            const addCartResult = await db.query(addCartQuery);
            console.log(addCartQuery);
            if (addCartResult) {
                return [addCartResult];
            } else {
                return [];
            }
        }
    }
};

// I had to do it this way because trying to reuse the local function getUserCart wouldn't work.
module.exports = {
    findUserByEmail: findUserByEmail,
    addUserToDatabase: addUserToDatabase,
    getUserPurchaseHistory: getUserPurchaseHistory,
    getUserCart: getUserCart,
    getItemFromCart: getItemFromCart,
    addOrUpdateCart: addOrUpdateCart,
}
