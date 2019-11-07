INSERT INTO users(first_name, last_name, email, password)
VALUES ($1, $2, $3, $4);
SELECT email, password
FROM users
WHERE email = $3;