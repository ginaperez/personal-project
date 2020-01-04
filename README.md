addToCart => post, /api/add_to_cart
viewCart => get, /api/view_cart
removeFromCart => delete, /api/remove_from_cart/:id
updateUser => put, /api/update_user
viewPurchaseHistory => get, /api/purchase_history

// running nodemon
pm2 start nodemon --watch --name gina-personal-project-nodemon

// inputting this will only allow me to run 1 nodemon in pm2 simultaneously
pm2 start nodemon --watch
