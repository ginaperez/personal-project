import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
// import { getCart } from '../redux/cartReducer';
import API from '../../api';

class CartComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: []
        }
        this.getCart = this.getCart.bind(this);
		this.checkout = this.checkout.bind(this);
		this.updateItemAddToCartQty = this.updateItemAddToCartQty.bind(this);
        this.updateCartItemQty = this.updateCartItemQty.bind(this);
        this.modifyCart = this.modifyCart.bind(this);
    }

    componentDidMount() {
        axios.get('/api/cart').then(response => {
            this.setState({
                cart: response.data,
            })
        })
    }

    async getCart() {
		const cartResponse = await axios.get(API.cart);

		const cartWithInitializedCartQty = cartResponse.data.map((cartItem) => {
			cartItem.cartQty = cartItem.item_qty;
			return cartItem;
		});

		this.setState({ cart: cartWithInitializedCartQty });
	}

	// modifyCart will ADD itemQty to the cart, or it will insert the new
	// itemId into the cart w/ itemQty if it is not in the cart yet
	async modifyCart(itemId, itemQty) {
		if (itemQty === 0) {
			const cartResponse = await axios.delete(`${API.cart}/${itemId}`);
			console.log(cartResponse.data[0].item_id, cartResponse.data[0].item_qty);
		} else {
			const cartResponse = await axios.put(API.cart, {
				itemId: itemId,
				itemQty: itemQty
			});
			console.log(cartResponse.data[0].item_id, cartResponse.data[0].item_qty);
		}
		this.getCart();
	}

	// updateItemQtyInCart will SET the itemQty for the given itemId in the cart
	// This is different from modifyCart in that it only works on existing cart itemsx
	async updateItemQtyInCart(itemId, itemQty) {
		if (itemQty === 0) {
			const cartResponse = await axios.delete(`${API.cart}/${itemId}`);
			console.log(cartResponse.data[0].item_id, cartResponse.data[0].item_qty);
		} else {
			console.log(itemId, itemQty);
			const cartResponse = await axios.patch(API.cart, {
				itemId: itemId,
				itemQty: itemQty
			});
			console.log(cartResponse.data[0].item_id, cartResponse.data[0].item_qty);
		}
		this.getCart();
	}

	async clearCart() {
		const freshCart = await axios.delete(API.cart);

		this.setState({ cart: freshCart.data });
		this.getCart();
    }
    
    async getPurchaseHistory() {
		const purchaseHistoryResponse = await axios.get(`${API.purchaseHistory}`)

		this.setState({ purchaseHistory: purchaseHistoryResponse.data });
    }

	async checkout() {
		const freshCart = await axios.post(API.checkout);

		this.setState({ cart: freshCart.data });
		this.getPurchaseHistory();
		this.getCart();
	}

	updateItemAddToCartQty(itemId, itemQty) {
		var { inventory } = this.state;

		inventory = inventory.map((inventoryItem) => {
			if (inventoryItem.item_id === itemId) {
				inventoryItem.cartQty = itemQty;
			}
			return inventoryItem
		})

		this.setState({ inventory: inventory });
	}

	updateCartItemQty(itemId, itemQty) {
		var { cart } = this.state;

		cart = cart.map((cartItem) => {
			if (cartItem.item_id === itemId) {
				cartItem.cartQty = itemQty;
			}
			return cartItem
		})

		this.setState({ cart: cart });
	}


    render() {
        const { cartItem } = this.state;
        return (
            <div className="cart-view">
						<button className="wide-element" onClick={() => this.clearCart()}>Empty Cart</button>
						<button className="wide-element" onClick={() => this.checkout()}>Checkout</button>
						{
							this.state.cart.map((cartItem, i) => {
								return (
									<div className="cart-view">
                                        <div className="cart-item">
                                        <p><img className="cart-item-picture" src={cartItem.image} /></p>
                                        <p>Item Name: {cartItem.item_name}</p>
                                        <p>Item Qty: {cartItem.item_qty}</p>
                                        <p>Item Total Price: {cartItem.total_price}</p>
										<p>User ID: {cartItem.user_id}</p>
										<p>Item ID: {cartItem.item_id}</p>
										<p>Item Unit Price: {cartItem.item_unit_price}</p>
										
                                        
										<form onSubmit={(e) => { e.preventDefault(); this.updateItemQtyInCart(cartItem.item_id, cartItem.cartQty) }}>
											<input type="number" value={cartItem.cartQty} onChange={(e) => { this.updateCartItemQty(cartItem.item_id, e.target.value); }} />
											<button className="wide-element">Update Item Quantity</button>
										</form>
										<button className="wide-element" onClick={() => { this.modifyCart(cartItem.item_id, 0); }}>Delete from Cart</button>
									</div>
                                    </div>
								)
							})
						}
					</div>
        )
    }
}

function mapStateToProps(state) {
    return state.cartReducer
}

export default connect(mapStateToProps)(CartComponent)