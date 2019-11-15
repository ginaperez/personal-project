import Reach, { Component } from 'react';

import { connect } from 'react-redux';
import { addToCart } from '../../../redux/reducer';

class Item extends Component {
    render() {
        const { id, name, price, addToCart } = this.props;
        return (
            <div id="Item_parent">
                <span id="Item_name"> {name} </span>
                <div id="Item_detailsContainer">
                    <div id="Item_priceContainer">
                        <span>${price.toFixed(2)}</span>
                    </div>
                    <div id="Item_atcContainer" onClick={() => addToCart(id) }>
                        <span>Add to Cart</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state => state, { addToCart })(Swag);