DROP TABLE IF EXISTS purchase_history;
DROP TABLE IF EXISTS inventory;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password VARCHAR(20) NOT NULL,
    email TEXT unique NOT NULL
);

CREATE TABLE inventory (
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR(64) NOT NULL,
    price INTEGER NOT NULL,
    quantity TEXT NOT NULL,
    image TEXT NOT NULL
);

CREATE TABLE purchase_history (
    purchase_id SERIAL PRIMARY KEY,
    purchase_date DATE DEFAULT NOW(),
    user_id INTEGER REFERENCES users(user_id),
    item_id INTEGER REFERENCES inventory(item_id)
);
