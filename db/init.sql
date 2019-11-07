DROP TABLE IF EXISTS purchase_history;
DROP TABLE IF EXISTS inventory;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    password VARCHAR(20) NOT NULL,
    email TEXT unique NOT NULL
);

INSERT INTO users (first_name, last_name, password, email) 
VALUES ('Gina', 'Perez', 'gmp123', 'gmperez92@gmail.com');

CREATE TABLE inventory (
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR(64) NOT NULL,
    price INTEGER NOT NULL,
    quantity TEXT NOT NULL,
    image TEXT NOT NULL
);

INSERT INTO inventory (item_name, price, quantity, image)
VALUES ('White Sofa', 400, 1, 'https://images-na.ssl-images-amazon.com/images/I/81%2BLinGw%2BeL._SX425_.jpg');
INSERT INTO inventory (item_name, price, quantity, image)
VALUES ('Bastien Light Oak Shelf TV Stand', 200, 1, 'https://images-na.ssl-images-amazon.com/images/I/81%2BLinGw%2BeL._SX425_.jpg');
INSERT INTO inventory (item_name, price, quantity, image)
VALUES ('Brown Wicker Bed Frame', 600, 1, 'https://images-na.ssl-images-amazon.com/images/I/81%2BLinGw%2BeL._SX425_.jpg');
INSERT INTO inventory (item_name, price, quantity, image)
VALUES ('Dresser', 400, 1, 'https://images-na.ssl-images-amazon.com/images/I/81%2BLinGw%2BeL._SX425_.jpg');
INSERT INTO inventory (item_name, price, quantity, image)
VALUES ('White Writing Desk', 400, 1, 'https://images-na.ssl-images-amazon.com/images/I/81%2BLinGw%2BeL._SX425_.jpg');
INSERT INTO inventory (item_name, price, quantity, image)
VALUES ('Vintage Rattan Chair', 400, 1, 'https://images-na.ssl-images-amazon.com/images/I/81%2BLinGw%2BeL._SX425_.jpg');
INSERT INTO inventory (item_name, price, quantity, image)
VALUES ('Natural Wood Matching End Table Set', 400, 1, 'https://images-na.ssl-images-amazon.com/images/I/81%2BLinGw%2BeL._SX425_.jpg');
INSERT INTO inventory (item_name, price, quantity, image)
VALUES ('Dining Set', 400, 1, 'https://images-na.ssl-images-amazon.com/images/I/81%2BLinGw%2BeL._SX425_.jpg');
INSERT INTO inventory (item_name, price, quantity, image)
VALUES ('Kitchen Console Table', 400, 1, 'https://images-na.ssl-images-amazon.com/images/I/81%2BLinGw%2BeL._SX425_.jpg');
INSERT INTO inventory (item_name, price, quantity, image)
VALUES ('The Goodest Boy', 1000000, 1, 'https://images-na.ssl-images-amazon.com/images/I/81%2BLinGw%2BeL._SX425_.jpg');
INSERT INTO inventory (item_name, price, quantity, image)
VALUES ('Plant Stand', 400, 1, 'https://images-na.ssl-images-amazon.com/images/I/81%2BLinGw%2BeL._SX425_.jpg');
INSERT INTO inventory (item_name, price, quantity, image)
VALUES ('Poppin Pink File Cabinet', 400, 1, 'https://images-na.ssl-images-amazon.com/images/I/81%2BLinGw%2BeL._SX425_.jpg');
INSERT INTO inventory (item_name, price, quantity, image)
VALUES ('Farmhouse Style Console Table', 400, 1, 'https://images-na.ssl-images-amazon.com/images/I/81%2BLinGw%2BeL._SX425_.jpg');
INSERT INTO inventory (item_name, price, quantity, image)
VALUES ('Minsmere Coffee Table', 400, 1, 'https://images-na.ssl-images-amazon.com/images/I/81%2BLinGw%2BeL._SX425_.jpg');

CREATE TABLE purchase_history (
    purchase_id SERIAL PRIMARY KEY,
    purchase_date DATE DEFAULT NOW(),
    user_id INTEGER REFERENCES users(user_id),
    item_id INTEGER REFERENCES inventory(item_id)
);

INSERT INTO purchase_history (user_id, item_id)
VALUES (1, 1);
INSERT INTO purchase_history (user_id, item_id)
VALUES (1, 6);

SELECT users.user_id, email, password, purchase_date, item_name, inventory.item_id, price, image 
FROM users
JOIN purchase_history
ON (users.user_id = purchase_history.user_id)
JOIN inventory
ON(purchase_history.item_id = inventory.item_id)
