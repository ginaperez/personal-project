-- query for purchase history
SELECT users.user_id, email, purchase_date, item_name, item_qty, price as item_unit_price, item_qty * price as total_price, image
FROM users
JOIN purchase_history
ON (users.user_id = purchase_history.user_id)
JOIN inventory
ON(purchase_history.item_id = inventory.item_id);