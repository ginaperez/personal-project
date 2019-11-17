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
    getUserCart: async (db, userId) => {
        const userCartQuery = `SELECT * FROM cart WHERE user_id = '${userId}'`;
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
