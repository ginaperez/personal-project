DROP TABLE IF EXISTS cart;
DROP TABLE IF EXISTS purchase_history;
DROP TABLE IF EXISTS inventory;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    -- first_name TEXT NOT NULL,
    -- last_name TEXT NOT NULL,
    password VARCHAR(64) NOT NULL,
    email TEXT unique NOT NULL
);

INSERT INTO users (password, email)
VALUES ('$2b$12$Iep7Rr1ynT8I1rS1k0gSP.1cFH2W/6JOZdv3D1BBYENSop5gLjwDu', 'gmperez92@gmail.com');

CREATE TABLE inventory (
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR(64) NOT NULL,
    price INTEGER NOT NULL,
    image TEXT NOT NULL
);

INSERT INTO inventory (item_name, price, image)
VALUES ('White Sofa', 400, 'https://images-na.ssl-images-amazon.com/images/I/81%2BLinGw%2BeL._SX425_.jpg');
INSERT INTO inventory (item_name, price, image)
VALUES ('Bastien Light Oak Shelf TV Stand', 200, 'https://images-na.ssl-images-amazon.com/images/I/81%2BLinGw%2BeL._SX425_.jpg');
INSERT INTO inventory (item_name, price, image)
VALUES ('Brown Wicker Bed Frame', 600, 'https://images-na.ssl-images-amazon.com/images/I/81%2BLinGw%2BeL._SX425_.jpg');
INSERT INTO inventory (item_name, price, image)
VALUES ('Dresser', 400, 'https://images-na.ssl-images-amazon.com/images/I/81%2BLinGw%2BeL._SX425_.jpg');
INSERT INTO inventory (item_name, price, image)
VALUES ('White Writing Desk', 400, 'https://images-na.ssl-images-amazon.com/images/I/81%2BLinGw%2BeL._SX425_.jpg');
INSERT INTO inventory (item_name, price, image)
VALUES ('Vintage Rattan Chair', 400, 'https://images-na.ssl-images-amazon.com/images/I/81%2BLinGw%2BeL._SX425_.jpg');
INSERT INTO inventory (item_name, price, image)
VALUES ('Natural Wood Matching End Table Set', 400, 'https://images-na.ssl-images-amazon.com/images/I/81%2BLinGw%2BeL._SX425_.jpg');
INSERT INTO inventory (item_name, price, image)
VALUES ('Dining Set', 400, 'https://images-na.ssl-images-amazon.com/images/I/81%2BLinGw%2BeL._SX425_.jpg');
INSERT INTO inventory (item_name, price, image)
VALUES ('Kitchen Console Table', 400, 'https://images-na.ssl-images-amazon.com/images/I/81%2BLinGw%2BeL._SX425_.jpg');
INSERT INTO inventory (item_name, price, image)
VALUES ('The Goodest Boy', 1000000, 'https://images-na.ssl-images-amazon.com/images/I/81%2BLinGw%2BeL._SX425_.jpg');
INSERT INTO inventory (item_name, price, image)
VALUES ('Plant Stand', 400, 'https://images-na.ssl-images-amazon.com/images/I/81%2BLinGw%2BeL._SX425_.jpg');
INSERT INTO inventory (item_name, price, image)
VALUES ('Poppin Pink File Cabinet', 400, 'https://images-na.ssl-images-amazon.com/images/I/81%2BLinGw%2BeL._SX425_.jpg');
INSERT INTO inventory (item_name, price, image)
VALUES ('Farmhouse Style Console Table', 400, 'https://images-na.ssl-images-amazon.com/images/I/81%2BLinGw%2BeL._SX425_.jpg');
INSERT INTO inventory (item_name, price, image)
VALUES ('Minsmere Coffee Table', 400, 'https://images-na.ssl-images-amazon.com/images/I/81%2BLinGw%2BeL._SX425_.jpg');

CREATE TABLE purchase_history (
    purchase_id SERIAL PRIMARY KEY,
    purchase_date DATE DEFAULT NOW(),
    transaction_id VARCHAR(36) NOT NULL,
    user_id INTEGER REFERENCES users(user_id),
    item_id INTEGER REFERENCES inventory(item_id),
    item_qty INTEGER DEFAULT 0
);

INSERT INTO purchase_history (transaction_id, user_id, item_id, item_qty)
VALUES ('4f060187-2a3c-4dea-b092-4ceaf4f5a690', 1, 1, 10);

-- query for purchase history
-- SELECT users.user_id, email, purchase_date, item_name, item_qty, price as item_unit_price, item_qty * price as total_price, image
-- FROM users
-- JOIN purchase_history
-- ON (users.user_id = purchase_history.user_id)
-- JOIN inventory
-- ON(purchase_history.item_id = inventory.item_id);

CREATE TABLE cart (
    user_id INTEGER REFERENCES users(user_id),
    item_id INTEGER REFERENCES inventory(item_id),
    item_qty INTEGER DEFAULT 0
);

INSERT INTO cart (user_id, item_id, item_qty)
VALUES (1,1,10),(1,2,10);

-- query for cart
-- SELECT users.user_id, email, item_name, inventory.item_id, price as item_unit_price, cart.item_qty, cart.item_qty * price as total_price, image
-- FROM users
-- JOIN cart
-- ON (users.user_id = cart.user_id)
-- JOIN inventory
-- ON(cart.item_id = inventory.item_id);