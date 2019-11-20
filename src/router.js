import React from 'react';
import { Switch, Route } from 'react-router-dom';

import InventoryComponent from './components/Inventory/InventoryComponent';
import AuthComponent from './components/Auth/AuthComponent';
import PurchaseHistoryComponent from './components/Purchase History/PurchaseHistoryComponent';
import CartComponent from './components/Cart/CartComponent';

export default (
    <Switch>
        <Route exact path="/" component={InventoryComponent}/>
        <Route path="/login" component={AuthComponent} />
        <Route path="/my_orders" component={PurchaseHistoryComponent} />
        <Route path="/my_cart" component={CartComponent} />
    </Switch>
)
