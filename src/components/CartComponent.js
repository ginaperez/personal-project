import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getCart } from '../redux/cartReducer';

class CartComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        let cart = this.props.getCart();
        this.setState({
            cart: this.props.cart
        })
    }

    render() {
        return (
            <div>
                <h1>Cart</h1>
                <button>Add To Cart</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state.cartReducer
}

export default connect(mapStateToProps, { getCart })(CartComponent)