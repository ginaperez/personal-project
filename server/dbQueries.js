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
    addUserToDatabase: async (db, email, hashedPassword, firstName, lastName) => {
        const newUserQuery = 'INSERT INTO users (first_name, last_name, password, email)'+
            `VALUES ('${firstName}', '${lastName}', '${hashedPassword}', '${email}')` +
            `RETURNING first_name, last_name, password, email`;
        const newUsers = await db.query(newUserQuery);
        if (newUsers.length > 0) {
            return newUsers[0];
        } else {
            return false;
        }
    }
}
