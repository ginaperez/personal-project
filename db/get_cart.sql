SELECT users.user_id, email, item_name, inventory.item_id, price as item_unit_price, cart.item_qty, cart.item_qty * price as total_price, image
FROM users
JOIN cart
ON (users.user_id = cart.user_id)
JOIN inventory
ON(cart.item_id = inventory.item_id);