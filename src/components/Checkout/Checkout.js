import React, { Component } from 'react';
import { connect } from 'tls';

// import User from '../User/User';
// import SignOut from '../SignOut/SignOut';
// import Item from './Item/Item';

// import BackArrow from 'react-icons/lib/fa/arrow-left';

// import { connect } from 'react-redux';
// import { removeFromCart, checkout } from '../../redux/reducer';

class Checkout extends Component {
    constructor(props) {
        super(props);

        this.backToShop = this.backToShop.bind(this);
    }

    backToShop() {
        const { history } = this.props;
        history.push('/shop');
    }

    render() {
        const { removeFromCart, checkout, cart, total, history } = this.props;
        const cartSwag = cart.map( swag => (
            <Item key={ item.id } id={ item.id } remove={ removeFromCart } title={ item.title } price={ item.price } />
        ));

        return (
            <div id="Checkout_parent">
                <User />
                <SignOut history={ history } />

                <div id="Checkout_backToShop" onClick={ this.backToShop }>
                    <BackArrow id="Checkout_backArrow" />
                    <span>Back to Store</span>
                </div>

                <div id="Checkout_child">
                    <div id="Checkout_itemParent">
                        <div id="Checkout_itemChild">
                            { cartItem }
                        </div>
                    </div>

                <div id="Checkout_bottomContainer">
                    <span id="Checkout_total">Total: ${ total.toFixed(2) }</span>
                    <button id="Checkout_btn" onClick={ checkout }>Checkout</button>
                </div>
                </div>
            </div>
        )
    }
}

export default connect(state => state, {removeFromCart, checkout })(Checkout);