import React, { Component } from 'react';

export default class Item extends Component {
    render() {
        const { id, name, price, remove} = this.props;
        return (
            <div id="CheckoutItem_parent">
                <div id="CheckoutItem_child">
                    <span id="CheckoutItem_price">${price.toFixed(2)}</span>
                    <span id="CheckoutItem_title">{title}</span>
                    <TrashIcon id="CheckoutItem_trash" onClick={() => remove( id )} />
                </div>
            </div>
        )
    }
}